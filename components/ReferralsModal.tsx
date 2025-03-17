"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input, Checkbox, Spinner } from "@nextui-org/react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import styles from "@/styles/FeedbackPopup.module.css";

interface ReferralModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {

    const { data: session, update, status  } = useSession();

    const router = useRouter();

    const handleClose = () => {
        onClose();
    };

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

    const handleNavigation = (path: string) => {
		router.push(path);
	};

    return (
        <div className={`${styles['image__overlay']} ${!isOpen ? 'hidden' : ''}`}>
            <div className={styles['feedback__modal']}>
                <Modal 
                    backdrop="blur" 
                    isOpen={isOpen} 
                    onClose={handleClose}
                    size="md"
                    placement="center"
                    className={`${styles['modal_referral']} ${styles['modal_sm_referral']}`}
                >
                    <ModalContent className={`${styles['modal_feedback_content']}`}>
                        <div className={`${styles['modal_feedback_content__inner']}`}>
                            <p className={`${styles['modal_feedback_p']}`}>Opps, you&apos;ve run out of credits.</p>
                            <p className={`${styles['modal_feedback_p']}`}>Get even more free credits sharing link with your friends to get unlimited generation.</p>
                            <Button
                                className="text-md text-white bg-[#5858e6]"
                                radius='sm'
                                color='success'
                                size='sm'
                                onClick={() => {
                                    trackEvent('header_invite_friends');
                                    handleNavigation('/referrals');
                                }}
                                endContent={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins "><circle cx="8" cy="8" r="6"></circle><path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path><path d="M7 6h1v4"></path><path d="m16.71 13.88.7.71-2.82 2.82"></path></svg>
                                }
                            >
                                Invite friends & Earn credits
						    </Button>
                        </div>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}