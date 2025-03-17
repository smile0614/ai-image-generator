"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { button as buttonStyles } from "@nextui-org/theme";
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input, Checkbox, Spinner } from "@nextui-org/react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import styles from "@/styles/FeedbackPopup.module.css";


interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ServiceModal({ isOpen, onClose }: ServiceModalProps) {

    const { data: session, update, status  } = useSession();

    const [shouldFetchData, setShouldFetchData] = useState(true);

    // console.log("Start session?.user", session?.user)
    // console.log("Start session?.user?.visitedSocials", session?.user?.visitedSocials)

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
                
                update({
                    user: {
                        ...session?.user,
                        serviceModalShown: data.user.serviceModalShown,
                    },
                });
                // setTimeout(() => console.log("Updated session:", session?.user), 2000);
                // const currentSession = await getSession();
                // update(currentSession);
                // console.log('currentSession', currentSession)
            } else {
                console.error('Failed to fetch updated user data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching updated user data:', error);
        }
    };

    // console.log('visitedSocials', visitedSocials)
    const searchParams = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : '',
      );

    const params = searchParams;
    const router = useRouter();
    let callbackUrl = params.get('callbackUrl') || '/';


    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        if (session?.user && shouldFetchData) {
            fetchUpdatedUserData();
            setShouldFetchData(false);
        }
    }, [session, shouldFetchData]);

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

    const handleMenuClick = (path: string) => {
		if (!session) {
            handleClose();
			router.push('/');
		} else {
            handleClose();
			router.push(path);
		}
	};

    const buttonText = () => {
        if (!session?.user) {
            return "Get started for free";
        } else if (session?.user?.subscription === 'Free') {
            return "Upgrade";
		} else if (session?.user?.subscription === 'Pro') {
            return "Upgrade";
        } else if (session?.user?.subscription === 'Max') {
            return "Buy Coins";
        }
    };

    const handleNavigation = (path: string) => {
		router.push(path);
	};

    return (
        <div className={`${styles['image__overlay']} ${!isOpen ? 'hidden' : ''}`}>
            <div className={styles['feedback__modal']}>
            <Modal
                isOpen={isOpen} 
                onClose={onClose}
                size="md"
                placement="center"
                aria-labelledby="modal-title"
                className={`${styles['modal_feedback']} ${styles['modal_sm_feedback']}`}
            >
                <ModalContent className={`${styles['modal_feedback_content']}`}>
                    <div className={`${styles['modal_feedback_content__inner']}`}>
                        <h1 id="modal-title" className={styles.header}>
                            <strong>Refill Your Balance and Get New Generations!</strong>
                        </h1>
                        <p className={`${styles['modal_feedback_p']}`}>Dear Users,</p>
                        <p className={`${styles['modal_feedback_p']}`}>We are pleased to announce that you can now easily refill your balance and choose new generation plans!</p>
                        <p className={`${styles['modal_feedback_p']}`}>If your credits have run out, simply log in to your account and select the plan that suits you. With our new payment system, making payments is now even easier and more convenient.</p>
                        {/* <ul>
                            <li>🚀 Faster access to all your favorite features.</li>
                            <li>🔒 Improved security with our new SSL certificate.</li>
                            <li>🎨 More creative possibilities and updates!</li>
                        </ul>
                        <p className={`${styles['modal_feedback_p']}`}><strong>What to do?</strong></p>
                        <ul>
                            <li>Visit <a href="https://mixart.ai" target="_blank" rel="noopener noreferrer">mixart.ai</a>.</li>
                            <li>Update your bookmarks.</li>
                        </ul> */}
                        <p className={`${styles['modal_feedback_p']}`}>Thank you for staying with us! If you have any questions, our support team is always ready to assist.</p>
                        <p className={`${styles['modal_feedback_p']}`}>Best regards,</p>
                        <p className={`${styles['modal_feedback_p']}`}><strong>The Mixart.ai Team</strong></p>
                        <Button
                            className="text-md text-white bg-[#5858e6]"
                            radius='sm'
                            color='success'
                            size='sm'
                            onClick={() => {
                                if (buttonText() === 'Get started for free') {
                                    trackEvent('header_get_started');
                                } else {
                                    trackEvent('header_upgrade');
                                }
                                handleNavigation('/pricing');
                                handleClose();
                            }}
                        >
                            {buttonText()}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&amp;>path]:stroke-[2.5px]"
                                focusable="false"
                                tabIndex={-1}
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M4 12h16m0 0l-6-6m6 6l-6 6"
                                ></path>
                            </svg>
                        </Button>
                    </div>
                </ModalContent>
            </Modal>
            </div>
        </div>
    );
}