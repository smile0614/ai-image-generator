"use client";

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {Progress} from "@nextui-org/react";


import {Avatar} from "@nextui-org/react";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/dropdown";

import NextLink from "next/link";
import { Link } from "@nextui-org/link";

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";

import clsx from "clsx";
import { link as linkStyles } from "@nextui-org/theme";
import FeedbackModal from "./FeedbackModal";
import ServiceModal from "./ServiceModal";
import styles from "@/styles/User.module.css";

const NEXT_PUBLIC_FREE_PLAN_CREDITS = parseInt(process.env.NEXT_PUBLIC_FREE_PLAN_CREDITS!);
const NEXT_PUBLIC_PRO_PLAN_CREDITS = parseInt(process.env.NEXT_PUBLIC_PRO_PLAN_CREDITS!);
const NEXT_PUBLIC_MAX_PLAN_CREDITS = parseInt(process.env.NEXT_PUBLIC_MAX_PLAN_CREDITS!);

interface UserProfileProps {
    onMenuToggle: () => void;
}

export default function UserProfile({ onMenuToggle }: UserProfileProps) {
    const router = useRouter();

    const { data: session, update, status  } = useSession();

    const firstNameLetter = session?.user?.name ? session.user.name[0] : 'U';
    const plan = session?.user?.subscription ? session.user.subscription : '';
    const credits = session?.user?.credits ? session.user.credits : 0;

    const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
    const [subscriptionGtmSent, setSubscriptionGtmSent] = useState(true);
    const [paymentValue, setPaymentValue] = useState(0);
    const [paymentMethodName, setPaymentMethodName] = useState('');

    const [isRegistrationGtmEventSent, setIsRegistrationGtmEventSent] = useState(true);

    const hasTrackedSubscriptionEvent = useRef(false);

    const hasTrackedRegisteredEvent = useRef(false);

    // console.log('credits', credits);

    const handleItemClick = () => {
        onMenuToggle();
    };

    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

    const toggleFeedbackModal = () => {
		// console.log(isPricingModalOpen);
		setFeedbackModalOpen(!isFeedbackModalOpen);
	};

    const checkFeedbackModalOpenCase = () => {
        if (!session) return;
        if (session?.user?.feedbackSubmitted) return;
        if (session?.user?.credits !== 0) return;
        setFeedbackModalOpen(true);
    }

    const [isServiceModalOpen, setServiceModalOpen] = useState(false);

    const toggleServiceModal = () => {
		// console.log(isPricingModalOpen);
		setServiceModalOpen(!isServiceModalOpen);
	};


    const updateServiceModalStatus = async () => {
        try {
            const response = await fetch('/api/user/update/service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session?.user.id,
                }),
            });
            const data = await response.json();
            // console.log('data', data)
            if (data.message === 'Service modal info updated successfully') {
                fetchUpdatedUserData();
                // console.log("session?.user", session?.user)
            }
        } catch (error) {
            console.error('Error submitting service info:', error);
        }
    };

    const checkServiceModalOpenCase = () => {
        if (!session) return;
        if (session?.user?.serviceModalShown) return;
    
        const userCreatedAt = session?.user?.createdAt ? new Date(session?.user?.createdAt) : null;
        const thresholdDate = new Date('2024-07-10');
    
        if (userCreatedAt && userCreatedAt > thresholdDate) {
            updateServiceModalStatus();
        } else {
            updateServiceModalStatus();
            setServiceModalOpen(true);
        }
    }

    const [shouldFetchData, setShouldFetchData] = useState(true);
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
                        registrationGtmSent: data.user.registrationGtmSent,
                    },
                });
                // console.log("updated test", data.user);
                // console.log("updated usersession", session?.user);
                // setTimeout(() => console.log("Updated session:", session?.user), 2000);
                setSubscriptionId(data.user.subscriptionId);
                setSubscriptionGtmSent(data.user.subscriptionGtmSent);
                setIsRegistrationGtmEventSent(data.user.registrationGtmSent)
            } else {
                console.error('Failed to fetch updated user data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching updated user data:', error);
        }
    };

    const sendRegistrationGtmEvent = (eventName: string) => {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
		  event: eventName,
		  ecommerce: {
			usid: session?.user?.id,
		 },
		});
		// console.log('window.dataLayer', window.dataLayer)
	};

    const updateUserRegisterGtm = async () => {
        try {
            const response = await fetch('api/user/update/registerGtm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session?.user?.id,
                }),
            });
    
            const data = await response.json();
            if (data.message === 'Register gtm updated successfully') {
                await fetchUpdatedUserData();
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    }

    useEffect(() => {
        if (session && session?.user?.authMethod === 'google' && !hasTrackedRegisteredEvent.current && !isRegistrationGtmEventSent) {
            sendRegistrationGtmEvent('register');
            updateUserRegisterGtm();
            hasTrackedRegisteredEvent.current = true;
        } else if (session && session?.user?.authMethod === 'email' && !hasTrackedRegisteredEvent.current && !isRegistrationGtmEventSent) {
            sendRegistrationGtmEvent('register');
            updateUserRegisterGtm();
            hasTrackedRegisteredEvent.current = true;
        }
    }, [isRegistrationGtmEventSent]);

    const clearReferralCode = () => {
		if (status !== "unauthenticated") {
			try {   
				// Check if the referral code is present in cookies
				const referralCodeCookie = document.cookie.split('; ').find(row => row.startsWith('mixart_refcode='));
			
				if (referralCodeCookie) {
					// Clear from localStorage
					localStorage.removeItem('mixart_refcode');
			
					// Clear the cookie
					document.cookie = 'mixart_refcode=; path=/; max-age=0; samesite=Lax';
				}
			} catch (error) {
				console.error('Error clearing user cookies:', error);
			}
		}
	};

    useEffect(() => {
        if (session?.user?.id && shouldFetchData) {
            fetchUpdatedUserData();
            setShouldFetchData(false);
            checkFeedbackModalOpenCase();
            // checkServiceModalOpenCase();
            clearReferralCode();
        }
    }, [session, shouldFetchData]);

    const getPayment = async () => {
        try {
            const response = await fetch(`/api/payment/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentId: subscriptionId })
            });
            const data = await response.json();
            if (response.ok) {
                // console.log('data.payment.amount', data.payment.amount)
                setPaymentValue(data.payment.amount);
                setPaymentMethodName(data.payment.paymentMethod);
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
        }
    };

    const updateUserSubscriptionGtm = async () => {
        try {
            const response = await fetch('api/user/update/subscriptionGtm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session?.user?.id,
                }),
            });
    
            const data = await response.json();
            if (data.message === 'Subscription gtm updated successfully') {
                await fetchUpdatedUserData();
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    }

    const trackEvent = () => {
        window.dataLayer = window.dataLayer || [];
        // console.log('trackEvent')
        // console.log('paymentValue', paymentValue)
        // console.log('session?.user?.id', session?.user?.id)
        // console.log('paymentMethodName', paymentMethodName)
        // console.log('referenceId', referenceId)
        window.dataLayer.push({
            event: "purchase",
            ecommerce: {
                currency: "USD",
                value: paymentValue,
                user_id: session?.user?.id,
                paymentMethodName: paymentMethodName,
                transaction_id: subscriptionId,
                items: [
                    {
                        item_name: "Пополнение аккаунта",
                    },
                ],
            },
        });
        // console.log('window.dataLayer', window.dataLayer);
    };

    useEffect(() => {
        if (subscriptionId) {
            getPayment();
        }
    }, [subscriptionId]);
    
    useEffect(() => {
        if (paymentValue && paymentMethodName && !hasTrackedSubscriptionEvent.current && !subscriptionGtmSent) {
            trackEvent();
            updateUserSubscriptionGtm();
            hasTrackedSubscriptionEvent.current = true;
        }
    }, [paymentValue, paymentMethodName]);

    let maxPlanCredits;
    switch (plan) {
        case "Free":
            maxPlanCredits = NEXT_PUBLIC_FREE_PLAN_CREDITS;
            break;
        case "Pro":
            maxPlanCredits = NEXT_PUBLIC_PRO_PLAN_CREDITS;
            break;
        case "Max":
            maxPlanCredits = NEXT_PUBLIC_MAX_PLAN_CREDITS;
            break;
        default:
            maxPlanCredits = 0;
    }

    // Calculate the percentage of credits used
    const creditPercentage = maxPlanCredits > 0 ? (credits / maxPlanCredits) * 100 : 0;

     // Determine the color based on the percentage
    let percentageColor = "#ff4b4b"; // Less than 25%
    if (creditPercentage > 50) {
        percentageColor = "#14a561"; // More than 50%
    } else if (creditPercentage > 25) {
        percentageColor = "#ffa500"; // Between 25% and 50%
    }

    // Directly using the handler function without conditionally calling useRouter
    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    
    const handleLinkNavigation = (path: string) => {
		// Check if 'window' is defined (for SSR frameworks like Next.js)
		if (typeof window !== "undefined") {
			window.open(path, '_blank'); // '_blank' opens the link in a new tab
		}
	};

    return (
        <>
            <div className={`${styles['header_user_layout']}`}>
                        <Dropdown>
                            <NavbarItem>
                                <DropdownTrigger>
                                    <div className={`${styles['layout_header_user']}`}>
                                        <div className={`${styles['layout_credits']}`}>
                                            <div className={`${styles['layout_plan_name']}`}>
                                                {plan} plan
                                            </div>
                                            <div className={`${styles['layout_plan_name']}`}>
                                                <Progress size="sm" aria-label="Loading..." value={creditPercentage} />
                                            </div>
                                            <div className={`${styles['layout_credits_number']}`}>
                                            <span className={`text-[${percentageColor}]`}>{credits}</span> / {maxPlanCredits}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins "><circle cx="8" cy="8" r="6"></circle><path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path><path d="M7 6h1v4"></path><path d="m16.71 13.88.7.71-2.82 2.82"></path></svg>
                                            </div>
                                        </div>
            
                                        <Avatar
                                            className={`${styles['profile_avatar']}`}
                                            size="sm"
                                            isBordered
                                            radius="sm"
                                            src={session?.user?.image || undefined}
                                            name={firstNameLetter.toUpperCase()}
                                            color="default"
                                        />
                                    </div>
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu
                                aria-label="Profile options"
                                // className="w-[90vw]"
                                itemClasses={{
                                    base: "gap-4",
                                }}
                            >
                                <DropdownItem
                                    key="profile_pricing"
                                    startContent={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins "><circle cx="8" cy="8" r="6"></circle><path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path><path d="M7 6h1v4"></path><path d="m16.71 13.88.7.71-2.82 2.82"></path></svg>
                                    }
                                    onClick={() => {
                                        handleItemClick();
                                        handleNavigation('/pricing');
                                        setIsProfileMenuOpen(!isProfileMenuOpen);
                                    }}
                                >
                                    <NextLink href="/pricing" passHref>
                                        <Link color="foreground" className={`${styles['profile_menu_item']}`}>
                                            Pricing
                                        </Link>
                                    </NextLink>
                                </DropdownItem>
                                <DropdownItem
                                    key="profile_faq"
                                    startContent={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers2"><path d="m16.02 12 5.48 3.13a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74L7.98 12"></path><path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74Z"></path></svg>                                    }
                                    onClick={() => {
                                        handleItemClick();
                                        handleNavigation('/faq');
                                        setIsProfileMenuOpen(!isProfileMenuOpen);
                                    }}
                                >
                                    <NextLink href="/faq" passHref>
                                        <Link color="foreground" className={`${styles['profile_menu_item']}`}>
                                            FAQ
                                        </Link>
                                    </NextLink>
                                </DropdownItem>
                                <DropdownItem
                                    key="profile_gallery"
                                    startContent={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gallery-horizontal-end "><path d="M2 7v10"></path><path d="M6 5v14"></path><rect width="12" height="18" x="10" y="3" rx="2"></rect></svg>
                                    }
                                    onClick={() => {
                                        handleItemClick();
                                        handleNavigation('/gallery');
                                        setIsProfileMenuOpen(!isProfileMenuOpen);
                                    }}
                                >
                                    <NextLink href="/gallery" passHref>
                                        <Link color="foreground" className={`${styles['profile_menu_item']}`}>
                                            My Creations
                                        </Link>
                                    </NextLink>
                                </DropdownItem>
                                <DropdownItem
                                    key="profile_settings"
                                    startContent={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings "><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    }
                                    onClick={() => {
                                        handleItemClick();
                                        handleNavigation('/settings');
                                        setIsProfileMenuOpen(!isProfileMenuOpen);
                                    }}
                                >
                                    <NextLink href="/settings" passHref>
                                        <Link color="foreground" className={`${styles['profile_menu_item']}`}>
                                            Settings
                                        </Link>
                                    </NextLink>
                                </DropdownItem>
                                <DropdownItem
                                    key="profile_privacy_policy"
                                    startContent={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield "><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>
                                    }
                                    onClick={() => {
                                        handleItemClick();
                                        handleNavigation('/legal/privacy-policy');
                                        setIsProfileMenuOpen(!isProfileMenuOpen);
                                    }}
                                >
                                    <NextLink href="/legal/privacy-policy" passHref>
                                        <Link color="foreground" className={`${styles['profile_menu_item']}`}>
                                            Privacy policy
                                        </Link>
                                    </NextLink>
                                </DropdownItem>
                                <DropdownItem
                                    key="profile_terms_of_service"
                                    startContent={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scroll-text "><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"></path><path d="M19 17V5a2 2 0 0 0-2-2H4"></path><path d="M15 8h-5"></path><path d="M15 12h-5"></path></svg>
                                    }
                                    onClick={() => {
                                        handleItemClick();
                                        handleNavigation('/legal/terms-of-service');
                                        setIsProfileMenuOpen(!isProfileMenuOpen);
                                    }}
                                >
                                    <NextLink href="/legal/terms-of-service" passHref>
                                        <Link color="foreground" className={`${styles['profile_menu_item']}`}>
                                            Terms of service
                                        </Link>
                                    </NextLink>
                                </DropdownItem>
                                <DropdownItem
                                    key="profile_log_out"
                                    startContent={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out "><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleItemClick();
                                        signOut();
                                        handleNavigation('/');
                                    }}
                                >
                                    <span className={`${styles['profile_menu_item']}`}>Log out</span>
                                </DropdownItem>
                                <DropdownItem
                                    key="profile_referrals"
                                    className={`${styles['profile_menu_invite']}`}
                                    color="secondary"
                                    startContent={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-contact2 "><path d="M16 18a4 4 0 0 0-8 0"></path><circle cx="12" cy="11" r="3"></circle><rect width="18" height="18" x="3" y="4" rx="2"></rect><line x1="8" x2="8" y1="2" y2="4"></line><line x1="16" x2="16" y1="2" y2="4"></line></svg>
                                    }
                                    onClick={() => {
                                        handleItemClick();
                                        handleNavigation('/referrals');
                                        setIsProfileMenuOpen(!isProfileMenuOpen);
                                    }}
                                >
                                    <NextLink href="/referrals" passHref >
                                        <Link color="foreground" className={`${styles['profile_menu_item']}`}>
                                            Invite friends & Earn credits
                                        </Link>
                                    </NextLink>
                                </DropdownItem>

                                <DropdownItem
                                    key="profile_socials"
                                    className={`${styles['socials_icon_dropdown']}`}
                                    >
                                    <div className={`${styles['socials_icons_wrapper']}`}>

                                        <div
                                            className={`${styles['social_icon']}`}
                                            onClick={() => handleLinkNavigation('https://x.com/MixArt_AI')}
                                        >
                                            <Link
                                                color="foreground"
                                                href="https://x.com/MixArt_AI"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true" className="d-block">
                                                <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"></path>
                                                </svg>
                                            </Link>
                                        </div>

                                        <div
                                            className={`${styles['social_icon']}`}
                                            onClick={() => handleLinkNavigation('https://www.youtube.com/@mixart_ai')}
                                        >
                                            <Link
                                                color="foreground"
                                                href="https://www.youtube.com/@mixart_ai"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 19.17 13.6" aria-hidden="true" className="d-block">
                                                <path d="M18.77 2.13A2.4 2.4 0 0 0 17.09.42C15.59 0 9.58 0 9.58 0a57.55 57.55 0 0 0-7.5.4A2.49 2.49 0 0 0 .39 2.13 26.27 26.27 0 0 0 0 6.8a26.15 26.15 0 0 0 .39 4.67 2.43 2.43 0 0 0 1.69 1.71c1.52.42 7.5.42 7.5.42a57.69 57.69 0 0 0 7.51-.4 2.4 2.4 0 0 0 1.68-1.71 25.63 25.63 0 0 0 .4-4.67 24 24 0 0 0-.4-4.69zM7.67 9.71V3.89l5 2.91z" fill="currentColor"></path>
                                                </svg>
                                            </Link>
                                        </div>

                                        <div
                                            className={`${styles['social_icon']}`}
                                            onClick={() => handleLinkNavigation('https://www.tiktok.com/@mixart.ai')}
                                        >
                                            <Link
                                                color="foreground"
                                                href="https://www.tiktok.com/@mixart.ai"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" role="img" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="d-block">
                                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="currentColor"></path>
                                                </svg>
                                            </Link>
                                        </div>

                                    </div>
                                </DropdownItem>

                            </DropdownMenu>
                        </Dropdown>
            </div>
            <FeedbackModal isOpen={isFeedbackModalOpen} onClose={toggleFeedbackModal} />
            {/* <ServiceModal isOpen={isServiceModalOpen} onClose={toggleServiceModal} /> */}
        </>
    );
}