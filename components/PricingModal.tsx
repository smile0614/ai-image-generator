"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input, Checkbox, Spinner } from "@nextui-org/react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import styles from "@/styles/PricingPopup.module.css";

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {

    const socialVisitReward = 25;

    const { data: session, update, status  } = useSession();

    const [visitedSocials, setVisitedSocials] = useState(session?.user?.visitedSocials || []);

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
                // console.log('data.user.visitedSocials', data.user.visitedSocials)
                const newVisitedSocials = data.user.visitedSocials;
                setVisitedSocials(newVisitedSocials);
                
                // console.log('fetchUpdatedUserData visitedSocials', visitedSocials)
                update({
                    user: {
                        ...session?.user,
                        credits: data.user.credits,
                        visitedSocials: data.user.visitedSocials,
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

    const updateCredits = async (socialName: string) => {
        const addResponse = await fetch('/api/user/tokens/add', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session?.user?.email, tokensToAdd: socialVisitReward }),
        });
        const addData = await addResponse.json();
        if (addData.message === 'User credits updated successfully') {
            // update({ user: { ...session?.user, credits: addData.newTokenCount } });
            // const currentSession = await getSession();
            // update(currentSession);
            // console.log('currentSession TOKEN', currentSession)
            // console.log(`25 credits added for visiting ${socialName}!`);
        } else {
            console.log(`Error adding credits for visiting ${socialName}!`, addData.message);
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

    const handleSocialClick = async (socialName: string) => {
        if (!session) return;
        try { 
            if (!visitedSocials.includes(socialName)) {
                const response = await fetch(`/api/user/update/socials`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: session?.user?.id, social: socialName }),
                });
                const data = await response.json();
                if (data.message === 'Visited socials updated successfully') {
                    // const newVisitedSocials = [...visitedSocials, socialName];
                    await updateCredits(socialName);
                    // update({ user: { ...session?.user, visitedSocials: newVisitedSocials } });
                    // setVisitedSocials(newVisitedSocials);
                    fetchUpdatedUserData();
                } else {
                    console.log(`Error updating data for ${socialName}!`, data.message);
                }
            }
          } catch (error: unknown) {
            console.error('Error updating user socials data: ', error);
        }
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

    return (
        <div className={`${styles['image__overlay']} ${!isOpen ? 'hidden' : ''}`}>
            <div className={styles['pricing__modal']}>
                <Modal 
                    backdrop="blur" 
                    isOpen={isOpen} 
                    onClose={handleClose}
                    size="md"
                    placement="center"
                    className={`${styles['modal_pricing']} ${styles['modal_sm_pricing']}`}
                >
                    <ModalContent className={`${styles['modal_pricing_content']}`}>
                        <div className={`${styles['modal_pricing_content__inner']}`}>
                            <p className={`${styles['modal_pricing_p']}`}>We are glad that you have chosen our service.</p>
                            <p className={`${styles['modal_pricing_p']}`}>Unfortunately, these tariffs are currently not available. However, you can subscribe to our social media platforms and receive 25 free credits with each subscription.</p>
                            <ul className={`${styles['modal_pricing_socials_list']}`}>
                                {[
                                    { name: "TikTok", url: "https://www.tiktok.com/@mixart.ai" },
                                    { name: "YouTube", url: "https://www.youtube.com/@mixart_ai" },
                                    { name: "Twitter", url: "https://x.com/MixArt_AI" },
                                ].map(social => (
                                    <li key={social.name}>
                                        <Checkbox 
                                            isSelected={visitedSocials.includes(social.name)}
                                            color="success"
                                            size="md"
                                            radius="full"
                                        />
                                        <a 
                                            href={social.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            onClick={() => {
                                                if (social.name === "Twitter") {
                                                    trackEvent('plan_chose_twitter');
                                                } else if (social.name === "YouTube") {
                                                    trackEvent('plan_chose_youtube');
                                                } else if (social.name === "TikTok") {
                                                    trackEvent('plan_chose_tiktok');
                                                }
                                                handleSocialClick(social.name);
                                            }}
                                        >
                                            {social.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <p className={`${styles['modal_pricing_p']}`}>Additionally, you can take advantage of our referral program and you and a friend will each get 50 free credits.</p>
                            <Button
                                as={Link}
                                className="mt-6 mb-4 text-md text-white bg-[#5858e6]"
                                href={'/referrals'}
                                radius='sm'
                                color='success'
                                size='sm'
                                endContent={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins "><circle cx="8" cy="8" r="6"></circle><path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path><path d="M7 6h1v4"></path><path d="m16.71 13.88.7.71-2.82 2.82"></path></svg>
                                }
                                onPress={() => {
                                    trackEvent('plan_invite_friends');
                                }}
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