import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { connectMongoDB } from "@/app/lib/mongodb/mongodb";
import Payment from "@/app/lib/mongodb/models/payment";
import User from "@/app/lib/mongodb/models/user";

const STRIPE_PRICE_ID_PRO_MONTHLY = process.env.STRIPE_PRICE_ID_PRO_MONTHLY!;
const STRIPE_PRICE_ID_PRO_ANNUAL = process.env.STRIPE_PRICE_ID_PRO_ANNUAL!;
const STRIPE_PRICE_ID_MAX_MONTHLY = process.env.STRIPE_PRICE_ID_MAX_MONTHLY!;
const STRIPE_PRICE_ID_MAX_ANNUAL = process.env.STRIPE_PRICE_ID_MAX_ANNUAL!;
const PRODUCT_ID_PRO = process.env.PRODUCT_ID_PRO!;
const PRODUCT_ID_MAX = process.env.PRODUCT_ID_MAX!;
const STRIPE_REDIRECT_URL = process.env.STRIPE_REDIRECT_URL!;
const STRIPE_COUPON_ID = process.env.STRIPE_COUPON_ID!;

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { userId, paymentId, subscriptionType, annual, couponCode } = body;

    if (!userId || !subscriptionType || typeof annual === "undefined") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectMongoDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    let priceId;
    let productId;

    if (subscriptionType === "Pro") {
      priceId = annual ? STRIPE_PRICE_ID_PRO_ANNUAL : STRIPE_PRICE_ID_PRO_MONTHLY;
      productId = PRODUCT_ID_PRO;
    } else if (subscriptionType === "Max") {
      priceId = annual ? STRIPE_PRICE_ID_MAX_ANNUAL : STRIPE_PRICE_ID_MAX_MONTHLY;
      productId = PRODUCT_ID_MAX;
    } else {
      return NextResponse.json({ error: "Invalid subscription type" }, { status: 400 });
    }

    // Create the payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      after_completion: {
        type: "redirect",
        redirect: {
          url: STRIPE_REDIRECT_URL,
        },
      },
      allow_promotion_codes: true,
      metadata: {
        mixart_user_id: userId,
        mixart_payment_id: paymentId,
      },
    });

    // Add the coupon code to the payment link URL as a query parameter
    let paymentLinkUrl = paymentLink.url;
    if (couponCode) {
      paymentLinkUrl += `?prefilled_promo_code=${encodeURIComponent(STRIPE_COUPON_ID)}`;
    }

    // Save payment information
    payment.state = "PENDING";
    payment.stripeProductId = productId;
    payment.stripePriceId = priceId;
    payment.stripePaymentLink = paymentLinkUrl;
    await payment.save();

    return NextResponse.json({ url: paymentLinkUrl }, { status: 200 });
  } catch (error) {
    console.error("Error creating payment link:", error);
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      {
        message: "Error creating payment link",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}