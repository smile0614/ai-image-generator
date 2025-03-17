"use client";
import React, { useState } from "react";
import Footer from "@/components/footer";
import styles from '@/styles/Pricing.module.css';
import { title } from "@/components/primitives";
import { Switch, Card, Accordion, AccordionItem, Modal, ModalContent } from "@nextui-org/react";
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

interface PricingPopupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PricingPopupModal({ isOpen, onClose }: PricingPopupModalProps) {

	const { data: session, status, update } = useSession();

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

	const togglePricingModal = () => {
		// console.log(isPricingModalOpen);
		if (!session?.user) {
			setLoginModalOpen(!isLoginModalOpen);
		} else {
			setPricingModalOpen(!isPricingModalOpen);
		}
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

    const handleClose = () => {
        onClose();
    };

	return (
		<>
		<div className={`${styles['image__overlay']} ${!isOpen ? 'hidden' : ''}`}>
            <div className={styles['pricing__modal']}>
                <Modal
                    backdrop="blur" 
                    isOpen={isOpen} 
                    onClose={handleClose}
                    placement="center"
                    className={`${styles['modal_pricing']} ${styles['modal_sm_pricing']}`}
                >
                    <ModalContent className={`${styles['modal_pricing_content']}`}>
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
                                    onModalOpen={() => togglePricingModal()}
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
                    </ModalContent>
                </Modal>
			</div>
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
