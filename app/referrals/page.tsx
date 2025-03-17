"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession, getSession } from 'next-auth/react';
import styles from '@/styles/Referrals.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/footer";
import { Input } from "@nextui-org/react";

const USER_REF_URL = process.env.NEXT_PUBLIC_USER_REF_URL!;

export default function Settings() {

    const { data: session, update, status  } = useSession();

	const router = useRouter();

    const [referralLink, setReferralLink] = useState('');


    useEffect(() => {
        // Redirect to home if not authenticated
        if (status === "unauthenticated") {
            router.replace('/');
        } else if (session?.user?.referralCode) {
            setReferralLink(`${USER_REF_URL}${session.user.referralCode}`);
        }
    }, [status, session, router]);

    const copyToClipboard = async (text: string) => {	  
		try {
		  await navigator.clipboard.writeText(text);
		  toast.success('Prompt copied to clipboard!');
		} catch (err) {
		  toast.error('Failed to copy prompt.');
		}
	};

    const useWindowSize = () => {
        const [windowSize, setWindowSize] = useState({
          width: 0,
          height: 0,
        });
      
        useEffect(() => {
          // Handler to call on window resize
          function handleResize() {
            // Set window width/height to state
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
          }
      
          // Add event listener
          window.addEventListener("resize", handleResize);
      
          // Call handler right away so state gets updated with initial window size
          handleResize();
      
          // Remove event listener on cleanup
          return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
      
        return windowSize;
      };

    const windowSize = useWindowSize();
    const isMobile = windowSize.width <= 768;

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
        <ToastContainer
			position="top-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="light"
		/>
		<div className="flex flex-col min-h-screen">
            <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                <div className={`${styles['container']}`}>
                    <div className={styles['referral_container']}>
                        <div className={styles['referral_container_inner']}>
                            <div className={styles['hero']}>
                                <h1 className={styles['h3']}>
                                    Invite friends. Earn free image credits.
                                </h1>
                                <div className={styles['p3']}>
                                    Get more credits by sharing mixart.ai with friends.
                                </div>
                            </div>
                            <div>
                                <h2 className={styles['h4']}>
                                    Give 50 credits, Get 50 credits.
                                </h2>
                                <p className={styles['p3']}>
                                    Everyone you refer gets 50 image credits. Once they create an account with us, you&apos;ll get 50 credits too. Credits earned through referrals do not expire, and there is no limit to the amount you can earn.
                                </p>
                                <p className={styles['p3']}>
                                    Copy your personal referral link and share it with your friends and followers.
                                </p>
                                <div className={styles['referral_form_input_row']}>
                                    <div className={styles['referral_input']}>
                                        <div className={styles['referral_input_input']}>
                                        <Input
                                            className={`${styles['reset_input']}`}
                                            size={isMobile ? "lg" : "md"}
                                            type="text"
                                            // placeholder="Enter your email address..."
                                            label="Referral Link"
                                            labelPlacement="outside"
                                            isReadOnly={true}
                                            value={referralLink}
                                        />
                                        </div>
                                    </div>
                                    <div className={styles['referral_button_wrapper']}>
                                        <div className={styles['referral_button_inner_wrapper']}>
                                            <button 
                                                className={styles['referral_button']}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    trackEvent('copy_link_for_invite_friends');
                                                    copyToClipboard(referralLink);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy "><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
		</div>
		</>
	);
}