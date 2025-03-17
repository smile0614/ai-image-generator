"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import styles from '../../styles/Pricing.module.css';
import { title } from "@/components/primitives";
import { Switch, Card, Accordion, AccordionItem } from "@nextui-org/react";
import PlanCard from "@/components/PlanCard";
import { signIn, signOut, useSession } from "next-auth/react";
import LoginModal from "@/components/loginModal";
import PricingModal from "@/components/PricingModal";
import SubscriptionModal from "@/components/SubscriptionModal";

const NEXT_PUBLIC_FREE_PLAN_CREDITS = parseInt(process.env.NEXT_PUBLIC_FREE_PLAN_CREDITS!);
const NEXT_PUBLIC_PRO_PLAN_CREDITS = parseInt(process.env.NEXT_PUBLIC_PRO_PLAN_CREDITS!);
const NEXT_PUBLIC_MAX_PLAN_CREDITS = parseInt(process.env.NEXT_PUBLIC_MAX_PLAN_CREDITS!);

const NEXT_PUBLIC_FREE_PLAN_PRICE = parseInt(process.env.NEXT_PUBLIC_FREE_PLAN_PRICE!);
const NEXT_PUBLIC_PRO_PLAN_PRICE = parseInt(process.env.NEXT_PUBLIC_PRO_PLAN_PRICE!);
const NEXT_PUBLIC_MAX_PLAN_PRICE = parseInt(process.env.NEXT_PUBLIC_MAX_PLAN_PRICE!);


export default function PricingPage() {

	const { data: session, status, update } = useSession();

	const [shouldFetchData, setShouldFetchData] = useState(true);

	const [userCountry, setUserCountry] = useState(''); 
	const [allowedPaymentOptions, setAllowedPaymentOptions] = useState<string[]>([]);

    const fetchUpdatedUserData = async () => {
        try {
            const response = await fetch(`/api/user/${session?.user?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                await update({
                    user: {
                        ...session?.user,
                        name: data.user.name,
                        email: data.user.email,
                        emailVerified: data.user.emailVerified,
                        credits: data.user.credits,
                        subscription: data.user.subscription,
                        feedbackSubmitted: data.user.feedbackSubmitted,
                        serviceModalShown: data.user.serviceModalShown,
						favoriteModels: data.user.favoriteModels,
						registrationGtmSent: data.user.registrationGtmSent,
                    },
                });
                // console.log("updated test", data.user);
                // console.log("updated usersession", session?.user);
                // setTimeout(() => console.log("Updated session:", session?.user), 2000);
            } else {
                console.error('Failed to fetch updated user data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching updated user data:', error);
        }
    };

    useEffect(() => {
        if (session?.user?.id && shouldFetchData) {
            fetchUpdatedUserData();
			fetchInitialData();
            setShouldFetchData(false); // Reset the fetch control variable
        }
    }, [session, shouldFetchData]);

	const fetchInitialData = async () => {
        const country = await fetchUserCountry();
        if (country) {
            const allowedOptions = determineAllowedPaymentOptions(country);
            setAllowedPaymentOptions(allowedOptions);
        }
    };

	const fetchUserCountry = async () => {
        try {
            const response = await fetch('/api/user/getIpInfo', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
                console.log("data.country", data.country);
                if (data.country && data.country !== "unknown") {
                    setUserCountry(data.country);
                    return data.country;
                }
                return 'unknown';
            } else {
                console.error('Failed to fetch user country:', data.message);
            }
        } catch (error) {
            console.error('Error fetching user country:', error);
        }
        return 'unknown';
    };

	const countriesWithStripe = [
        "AU","GB","CA","US","NZ","AT","BE","DE","DK","IE","IT","IS","IL","NL","NO","SI","FI","FR","CZ","SE","CH" 
    ];

	const determineAllowedPaymentOptions = (country: string) => {
        console.log('country', country);
        let paymentOptions = ["Stripe", "Pay with card", "Instant bank transfer", "Crypto"];

        if (country === '' || country === 'unknown' || !country) {
            return ["Crypto"];
        } 

        if (!countriesWithStripe.includes(country)) {
            console.log("!== Stripe")
            paymentOptions = paymentOptions.filter(option => option !== "Stripe");
        }

        if (paymentOptions.includes("Stripe")) {
            return ["Stripe"];
        }
        
        console.log('paymentOptions', paymentOptions)
        return paymentOptions;
    };

	const [isPayYearlySelected, setIsPayYearlySelected] = useState(true);

	const yearDiscount = 30;

	interface PlanFeatureSegment {
		text: string;
		highlight: boolean;
	  }
	  
	  interface PlanFeature {
		key: PlanFeatureSegment[];
		value: boolean;
	  }
	  
	  interface Plan {
		planName: string;
		planDescription: string;
		imageAmountText: string;
		planPrice: number;
		planCredits: number;
		planFeatures: PlanFeature[];
	  }

	const plans: Plan[] = [
		{
		  planName: 'Free',
		  planDescription: 'For newcomers exploring, with limited features and image generation.',
		  imageAmountText: `equals ${NEXT_PUBLIC_FREE_PLAN_CREDITS} images`,
		  planPrice: NEXT_PUBLIC_FREE_PLAN_PRICE,
		  planCredits: NEXT_PUBLIC_FREE_PLAN_CREDITS,
		  planFeatures: [
			// { 
			// 	key: [
			// 		{ text: 'AI Generator', highlight: false },
			// 	], 
			// 	value: true 
			// },
			// { 
			// 	key: [
			// 		{ text: '20+', highlight: true },
			// 		{ text: ' AI Models', highlight: false },
			// 	], 
			// 	value: true 
			// },
			{ 
				key: [
					{ text: 'Take ', highlight: false },
					{ text: `${NEXT_PUBLIC_FREE_PLAN_CREDITS}`, highlight: true },
					{ text: ' AI Photos (credits) ', highlight: false },
				], 
				value: true 
			},
			{ 
				key: [
					{ text: 'Character / Facelock', highlight: false },
				], 
				value: true 
			},
			{ 
				key: [
					{ text: 'Generate ', highlight: false },
					{ text: '2', highlight: true },
					{ text: ' photos simultaneously ', highlight: false },
				], 
				value: true 
			},
			{ 
				key: [
					{ text: 'Collections', highlight: false },
				], 
				value: false 
			},
			{ 
				key: [
					{ text: 'Speed of photo generation - no queuing', highlight: false },
				], 
				value: false 
			},
			{ 
				key: [
					{ text: 'Fixated poses (ControlNet)', highlight: false },
				], 
				value: false 
			},
			{ 
				key: [
					{ text: '2k/4k Resolution', highlight: false },
				], 
				value: false 
			},
			{ 
				key: [
					{ text: 'Early Access to new features', highlight: false },
				], 
				value: false 
			},
			// { 
			// 	key: [
			// 		{ text: 'Storage of 20 photos', highlight: false },
			// 	], 
			// 	value: false 
			// },
		  ],
		},
		{
			planName: 'Pro',
			planDescription: 'Serious users to generate personal/commercial images.',
			imageAmountText: 'equals 1000 images, or 500 images in 2K',
			planPrice: NEXT_PUBLIC_PRO_PLAN_PRICE,
			planCredits: NEXT_PUBLIC_PRO_PLAN_CREDITS,
			planFeatures: [
				// { 
				// 	key: [
				// 		{ text: 'AI Generator', highlight: false },
				// 	], 
				// 	value: true 
				// },
				// { 
				// 	key: [
				// 		{ text: '50+', highlight: true },
				// 		{ text: ' AI Models', highlight: false },
				// 	], 
				// 	value: true 
				// },
				{ 
					key: [
						{ text: 'Take ', highlight: false },
						{ text: `${NEXT_PUBLIC_PRO_PLAN_CREDITS}`, highlight: true },
						{ text: ' AI Photos (credits) ', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: 'Character / Facelock', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: 'Generate ', highlight: false },
						{ text: '4', highlight: true },
						{ text: ' photos simultaneously ', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: 'Collections', highlight: false },
					], 
					value: true 
				},
	
				{ 
					key: [
						{ text: 'Speed of photo generation - no queuing', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: 'Fixated poses (ControlNet)', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: '2K', highlight: true },
						{ text: ' Resolution ', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: 'Early Access to new features', highlight: false },
					], 
					value: false 
				},
				// { 
				// 	key: [
				// 		{ text: 'Unlimited history cloud storage', highlight: false },
				// 	], 
				// 	value: false 
				// },
			],
		  },
		  {
			planName: 'Max',
			planDescription: 'Maximising opportunities for researchers in the world of artificial intelligence.',
			imageAmountText: 'equals 15000 images, or 7500 images in 2K, or 3750 images in 4K',
			planPrice: NEXT_PUBLIC_MAX_PLAN_PRICE,
			planCredits: NEXT_PUBLIC_MAX_PLAN_CREDITS,
			planFeatures: [
				// { 
				// 	key: [
				// 		{ text: 'AI Generator', highlight: false },
				// 	], 
				// 	value: true 
				// },
				// { 
				// 	key: [
				// 		{ text: '80+', highlight: true },
				// 		{ text: ' AI Models', highlight: false },
				// 	], 
				// 	value: true 
				// },
				{ 
					key: [
						{ text: 'Take ', highlight: false },
						{ text: `${NEXT_PUBLIC_MAX_PLAN_CREDITS}`, highlight: true },
						{ text: ' AI Photos (credits) ', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: 'Character / Facelock', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: 'Generate ', highlight: false },
						{ text: '8', highlight: true },
						{ text: ' photos simultaneously ', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: 'Collections', highlight: false },
					], 
					value: true 
				},
	
				{ 
					key: [
						{ text: 'Speed of photo generation - no queuing', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: 'Fixated poses (ControlNet)', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: '4K', highlight: true },
						{ text: ' Resolution ', highlight: false },
					], 
					value: true 
				},
				{ 
					key: [
						{ text: 'Early Access to new features', highlight: false },
					], 
					value: true 
				},
				// { 
				// 	key: [
				// 		{ text: 'Unlimited history cloud storage', highlight: false },
				// 	], 
				// 	value: true 
				// },
			],
		  },
		  
	];

	const [selectedPlan, setSelectedPlan] = useState<Plan | null>(plans[1]);

	const handlePlanSelection = (plan: Plan) => {
		if (!session) {
			toggleLoginModal();
		}
		// console.log(plan)
		
		// Find the corresponding discounted plan
		let selectedDiscountedPlan = discountedPlans.find((discounted) => discounted.planName === plan.planName);
		if (selectedDiscountedPlan) {
			setSelectedPlan(selectedDiscountedPlan);
		} else {
			setSelectedPlan(plan);
		}
		// Log the discounted plan
		// console.log(selectedPlan);
    };

	const [isLoginModalOpen, setLoginModalOpen] = useState(false);
	const [isPricingModalOpen, setPricingModalOpen] = useState(false);


	const toggleLoginModal = () => {
		setLoginModalOpen(!isLoginModalOpen);
	};

	const togglePricingModalStripe = (amount: number, subscriptionType: string) => {
		// console.log(isPricingModalOpen);
		if (!session?.user) {
			setLoginModalOpen(!isLoginModalOpen);
		} else {
			if (allowedPaymentOptions.includes("Stripe")) {
				handleStripePaymentSubmit(amount, subscriptionType);
			} else {
				setPricingModalOpen(!isPricingModalOpen);
			}
		}
	};

	const togglePricingModal = () => {
		// console.log(isPricingModalOpen);
		if (!session?.user) {
			setLoginModalOpen(!isLoginModalOpen);
		} else {
			setPricingModalOpen(!isPricingModalOpen);
		}
	};

	const handleStripePaymentSubmit = async (amount: number, subscriptionType: string) => {
        let safariWindow = window.open();
        safariWindow!.document?.write('<html><head><title>Loading...</title></head><body><p></p></body></html>');
        
        try {
            // Step 1: Add payment to the database
            const addPaymentResponse = await fetch('/api/payment/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: session?.user?.id,
                    paymentMethod: "STRIPE",
                    state: "CREATED",
                    amount,
                    currency: "USD",
                    paymentMethodCode: "STRIPE",
                    annual: isPayYearlySelected,
                    locale: 'en',
                    subscriptionType,
                }),
            });

            const addPaymentData = await addPaymentResponse.json();
            if (!addPaymentResponse.ok) {
                throw new Error(`Failed to add payment: ${addPaymentData.message}`);
            }

            const paymentId = addPaymentData.paymentId;
            const ftd = addPaymentData.firstTimeDeposit;

            // Step 2: Submit payment to the external API
            const submitPaymentResponse = await fetch('/api/payment/stripe/createPaymentLink', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: session?.user.id,
                    paymentId,
                    subscriptionType,
                    annual: isPayYearlySelected,
					couponCode: "OFF50",
                }),
            });

            const submitPaymentData = await submitPaymentResponse.json();
            if (!submitPaymentResponse.ok) {
                throw new Error(`Failed to submit payment: ${submitPaymentData.message}`);
            }

            await trackEventPayment("STRIPE", paymentId, amount);

            // console.log('submitPaymentData', submitPaymentData.result.redirectUrl)
            // console.log(submitPaymentData.result.redirectUrl)
            // console.log('submitPaymentData.url', submitPaymentData.url)
            let paymentUrl = submitPaymentData.url;
            // await redirectUserToPayment(paymentUrl);
            
            safariWindow!.location.href = paymentUrl;

        } catch (error) {
            console.log(`Error submitting payment: ${error}`);
        }
    }

	const trackEventPayment = async (paymentMethodName: string, transaction_id: string, amount: number) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "begin_checkout",
          ecommerce: {
            currency: "USD", // Assuming USD as the currency, you can change it if needed
            value: amount, // The amount of the transaction
            user_id: session?.user?.id, // User ID
            paymentMethodName: paymentMethodName, // Payment method name
            transaction_id: transaction_id, // Transaction ID
            items: [
              {
                item_name: "Пополнение аккаунта", // Formality for Google
              },
            ],
          },
        });
        // console.log('window.dataLayer', window.dataLayer);
      };

	// Calculate discounted price if yearly option is selected
	const discountedPlans = plans.map((plan) => {
		return {
			...plan,
			planPrice: isPayYearlySelected
				? parseFloat((plan.planPrice * ((100 - yearDiscount) / 100)).toFixed(1))
				: plan.planPrice,
		};
	});

	const trackEvent = (eventName: string) => {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
		  event: eventName,
		  ecommerce: {
			usid: session?.user?.id,
		 },
		});
		// console.log('window.dataLayer', window.dataLayer)
	};

	return (
		<>
		<div className={`flex flex-col min-h-screen ${styles['plans_upgrade_wrapper']}`}>
			<div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
				<div className={`${styles['hero']}`}>
					<div className={`${styles['hero-inner']} ${styles['center']}`}>
						<h1 className={`${styles['h2']}`}>
							Get the full power of Generative AI
						</h1>
						<p className={`${styles['p2']}`}>
							Choose the best plan for your needs.
							<br />
						</p>
					</div>
				</div>
				<div className={`${styles['banner']}`}>
					<span className={`${styles['banner_text']}`}>
						<strong>Try Us Now:</strong> 50% Off Your First Month – <em>This January Only!</em>
					</span>
				</div>
				<div className={`${styles['plans_upgrade']}`}>
					<div className={`${styles['plans_top']}`}>
						<div className={`${styles['plans_period_switch']}`}>
							<div className={`${styles['switch__plans']}`}>
								<span className={`${styles['switch_label1']}`}>
									Pay Monthly
								</span>
								<Switch
									color="secondary"
									isSelected={isPayYearlySelected}
									onValueChange={setIsPayYearlySelected}
								/>
								<span className={`${styles['switch_label2']}`}>Pay Yearly</span>
							</div>
							<label className={`${styles['plans_popular_tag']}`}>{yearDiscount}% off</label>
						</div>
					</div>
					<div className={`${styles['plans_plans']}`}>
					{discountedPlans.map((plan, index) => (
						<PlanCard 
							key={index} 
							{...plan} 
							isDiscounted={isPayYearlySelected}
							yearDiscount={yearDiscount}
							isSelected={selectedPlan?.planName === plan.planName}	
							onSelect={() => handlePlanSelection(plan)}
							onModalOpen={() => togglePricingModalStripe(plan.planPrice, plan.planName)}
						/>
					))}
					</div>
					<div className={`${styles['plans_bottom']}`}>
              				1 standart image generation = 1 Credit, 2k Resolution = 2 Credit, 4k Resolution = 4 Credit
					</div>
				</div>
				<div className={`${styles['website_faq_email']}`}>
					Contact us at <span className={`${styles['website_faq_span']}`}>hi@mixart.ai</span> for any additional queries and concerns
				</div>
				<section className={`${styles['website_faq']}`}>
					<h2 className={`${styles['website_heading']}`}>Frequently Asked Questions</h2>
					<Accordion 
						selectionMode="multiple"
						className={`${styles['website_questions']}`}	
					>
						<AccordionItem
						key="1"
						aria-label="How do image credits work?"
						title="How do image credits work?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									When you create an image, one credit will be used up. Thus, when you generate two images at once, two credits will be spent. 
								</p>
								<p>
									You can also improve the quality of the image at the expense of credits. Improving the quality costs one credit.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="2"
						aria-label="Can I use created images for commercial projects?"
						title="Can I use created images for commercial projects?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									Yes, but only with our paid plans. Images generated under these
									plans can be used commercially, adhering to the{" "}
									<a
									target="_blank"
									rel="noreferrer noopener"
									href="https://huggingface.co/spaces/CompVis/stable-diffusion-license"
									>
									CreativeML Open RAIL-M
									</a>{" "}
									license.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="3"
						aria-label="Can I create NSFW content?"
						title="Can I create NSFW content?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									You can create anything you want! But keep in mind that we do
									monitor generated content. Usage that violates any applicable
									national, federal, state, local, or international law or regulation
									will <b>be banned and reported!</b>
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="4"
						aria-label="Can I change my plan later?"
						title="Can I change my plan later?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									Yes, you can change your plan at any time, either upgrading or
									downgrading. Upgrades will be prorated for the remaining month.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="5"
						aria-label="What if I decide to cancel?"
						title="What if I decide to cancel?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									If you no longer wish to use mixart.ai, you can cancel your
									subscription anytime. When canceled, you will still be able to use
									your credits for the remaining of the current billing cycle.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="6"
						aria-label="What payment options are accepted?"
						title="What payment options are accepted?"
						>
							<div className={`${styles['website_answer']}`}>
							<p>We accept major credit and debit cards, PayPal, Apple Pay, and Google Pay.</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="7"
						aria-label="Will my unused credits roll over to the next month?"
						title="Will my unused credits roll over to the next month?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>Plan&apos;s credits <b>do not</b> roll over to the next month.</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="8"
						aria-label="Can I get more credits?"
						title="Can I get more credits?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									Yes, we offer an option to top up with more credits. You can
									purchase 2400 credits for $9 <a href="/api/billing/checkout">here</a>. These credits do not expire.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="9"
						aria-label="Will I be able to use the plan to access the API?"
						title="Will I be able to use the plan to access the API?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									No, the API is a separate product and is not included in the
									subscription plans. To access the API, please create another account{" "}
									<a href="https://mixart.ai/">here</a>.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="10"
						aria-label="Do prices include tax?"
						title="Do prices include tax?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									All prices listed in our table are exclusive of tax. Taxes, if
									applicable, will be added and calculated at the checkout stage.
								</p>
								<p>
									Please note that we apply VAT/GST in certain regions according to
									local tax regulations. For recurring payments, please be aware that
									we may begin to add tax if required by regulations, once we meet a
									local sales threshold. It&apos;s important to review your final invoice
									to see the detailed tax breakdown and any changes to your recurring
									charges.
								</p>
							</div>
						</AccordionItem>
					</Accordion>
				</section>
			</div>
			<Footer />
		</div>
		<LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} order='default' />
		{/* <PricingModal isOpen={isPricingModalOpen} onClose={togglePricingModal} /> */}
		<SubscriptionModal 
			subscriptionType={selectedPlan?.planName}
			planPrice={selectedPlan?.planPrice}
			isPayYearlySelected={isPayYearlySelected}
			yearDiscount={yearDiscount}
			isOpen={isPricingModalOpen} 
			onClose={togglePricingModal} 
		/>
		</>
	);
}
