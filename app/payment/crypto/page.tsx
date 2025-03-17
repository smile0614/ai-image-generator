'use client';

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Footer from "@/components/footer";
import styles from "@/styles/SubscriptionActivation.module.css";
import { Spinner } from "@nextui-org/react";

const CryptoActivationStatus = () => {
    const router = useRouter();
    const { data: session, update, status  } = useSession();
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [paymentId, setPaymentId] = useState('');
    const [paymentDbId, setPaymentDbId] = useState('');
    const [paymentValue, setPaymentValue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/');
        } else if (status === "authenticated" && session?.user?.id) {
            checkPaymentStatus(session.user.id);
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
            checkPaymentStatus(session.user.id).then(() => {
                setShouldFetchData(false); // Reset the fetch control variable
            });
        }
    }, [session, shouldFetchData]);

    const checkPaymentStatus = async (userId: string) => {
        try {
            const response = await fetch(`/api/payment/confirmCryptoPayment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
            const data = await response.json();
            if (response.ok) {
                // console.log('data.completed', data.completed)
                // console.log('data.completed', data.paymentId)
                // console.log('data.completed', data.id)
                // console.log('data.completed', data.amount)
                setPaymentStatus(data.completed);
                setPaymentId(data.paymentId);
                setPaymentDbId(data.id);
                setPaymentValue(data.amount);
            } else {
                console.error('Failed to check payment status:', data.message);
                setPaymentStatus(false);
                setPaymentId(data.paymentId || '');
                setPaymentDbId(data.id || '');
                setPaymentValue(data.amount || 0);
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
            setPaymentStatus(false);
        } finally {
            setLoading(false);
        }
    };

    const redirectToHome = () => {
        router.push('/');
    };

    const redirectToCreating = () => {
        router.push('/ai-generator');
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className={`${styles['activation_wrapper_spinner']}`}>
                    <Spinner color="secondary" />
                </div>
            )
        }

        if (paymentStatus) {
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
        } else {
            return (
                <div className={`${styles['activation_wrapper']}`}>
                    <h1>There was an issue with your payment</h1>
                    <p>Please contact support at hi@mixart.ai. Kindly provide Payment ID: {paymentDbId} and transaction ID: {paymentId}</p>
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

export default CryptoActivationStatus;