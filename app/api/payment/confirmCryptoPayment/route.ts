import { NextResponse, NextRequest } from "next/server";
import fetch from 'node-fetch';
import { connectMongoDB } from "@/app/lib/mongodb/mongodb";
import Payment, { PaymentDocument } from "@/app/lib/mongodb/models/payment";

const PAYMENT_API_CHECK_URL_CRYPTO = process.env.PAYMENT_API_CHECK_URL_CRYPTO!;
const AUTH_TOKEN_CRYPTO = process.env.AUTH_TOKEN_CRYPTO!;

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        await connectMongoDB();

        // Find payments for the user within the last 10 hours
        const tenHoursAgo = new Date(Date.now() - 10 * 60 * 60 * 1000);
        const payments = await Payment.find({
            userId,
            createdAt: { $gte: tenHoursAgo }
        }).sort({ createdAt: 1 }); // Sort by createdAt in ascending order

        console.log('all payments within 10 hours payments', payments);

        if (!payments.length) {
            console.log('No payment found for the user in the last 10 hours');
            return new NextResponse(JSON.stringify({
                message: 'No payment found for the user in the last 10 hours',
                completed: false,
                paymentId: ''
            }), { status: 404 });
        }

        // Check for completed payments and prefer higher plans
        const completedPayments = payments.filter(payment => payment.state === 'completed');
        console.log('completedPayments within 10 hours payments', completedPayments);
        let paymentToCheck: PaymentDocument | null = null;

        if (completedPayments.length > 0) {
            // Sort completed payments by subscription type ("Max" > "Pro") and take the highest one
            completedPayments.sort((a, b) => {
                const rank: { [key: string]: number } = { "Max": 2, "Pro": 1 };
                return (rank[b.subscriptionType || ''] || 0) - (rank[a.subscriptionType || ''] || 0);
            });
            paymentToCheck = completedPayments[0];
        } else {
            // No completed payments found, take the earliest payment
            paymentToCheck = payments[0];
        }

        let isCompleted = false;

        if (paymentToCheck) {
            const plisioResponse = await fetch(`${PAYMENT_API_CHECK_URL_CRYPTO}/${paymentToCheck.paymentId}?api_key=${AUTH_TOKEN_CRYPTO}`, {
                method: 'GET'
            });

            const plisioData: any = await plisioResponse.json();
            console.log('plisioData', plisioData);

            if (plisioResponse.ok && plisioData.status === 'success') {
                isCompleted = plisioData.data.status === 'completed';

                console.log('payment._id, paymentId, completed', paymentToCheck._id, paymentToCheck.paymentId, isCompleted)


                // Update the payment state in the database if it has changed
                if (paymentToCheck.state !== plisioData.data.status) {
                    await Payment.updateOne(
                        { _id: paymentToCheck._id },
                        { 
                            state: plisioData.data.status,
                            endDate: isCompleted && !paymentToCheck.endDate ? 
                                (paymentToCheck.annual 
                                    ? new Date(paymentToCheck.createdAt.setFullYear(paymentToCheck.createdAt.getFullYear() + 1)) 
                                    : new Date(paymentToCheck.createdAt.setMonth(paymentToCheck.createdAt.getMonth() + 1))) 
                                : paymentToCheck.endDate 
                        }
                    );
                }

                return NextResponse.json({
                    message: 'Payment status fetched successfully',
                    id: paymentToCheck._id,
                    paymentId: paymentToCheck.paymentId,
                    completed: isCompleted,
                    amount: paymentToCheck.amount,
                }, { status: 200 });
            } else {
                return NextResponse.json({
                    message: 'Error fetching payment status from Plisio',
                    completed: false,
                    paymentId: paymentToCheck._id
                }, { status: 500 });
            }
        }

    } catch (error) {
        console.error('Error fetching payment status:', error);
        return NextResponse.json({
            message: 'Error fetching payment status',
            error: error,
            completed: false,
            paymentId: ''
        }, { status: 500 });
    }
}