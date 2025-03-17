'use client';

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from 'next/navigation';
import Footer from "@/components/footer";

import styles from "@/styles/SubscriptionActivation.module.css";

const ActivationStatus = () => {
    const router = useRouter();
    const { data: session, status, update } = useSession();
    const pathname = usePathname();
    const segments = pathname.split('/');
    const referenceId = segments[segments.length - 3];
    const id = segments[segments.length - 2];
    const state = segments[segments.length - 1];

    useEffect(() => {
		if (status === "unauthenticated") {
		//   console.log("No user session");
		  router.push('/');
		}
	}, [status, router, session]);

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
            setShouldFetchData(false);
        }
    }, [session, shouldFetchData]);

    const redirectToHome = () => {
        router.push('/');
    };

    const redirectToCreating = () => {
        router.push('/ai-generator');
    };

    const renderContent = () => {
        switch (state) {
            case 'completed':
                return (
                    <div className={`${styles['activation_wrapper']}`}>
                        <h1>Congratulations on your subscription!</h1>
                        <p>Your payment has been completed, we hope you will enjoy creating with our service!</p>
                        <button 
                            className={`${styles['activation_button']}`}
                            onClick={redirectToCreating}
                        >
                            Start creating!
                        </button>
                    </div>
                );
            default:
                return (
                    <div className={`${styles['activation_wrapper']}`}>
                        <h1>There was an issue with your payment</h1>
                        <p>Please contact support at hi@mixart.ai. Kindly provide Reference ID: {referenceId} and ID: {id}</p>
                        <button 
                            className={`${styles['activation_button']}`}
                            onClick={redirectToHome}
                        >
                            Return to Home
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {renderContent()}
            </div>
            <Footer />
        </div>
    );
};

export default ActivationStatus;