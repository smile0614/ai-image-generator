"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ReferralHandler() {

    const router = useRouter();
    const { data: session, update, status  } = useSession();

    const referralCode = usePathname().split('/').pop();

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
                        subscription: data.user.subscription,
                        name: data.user.name,
                        email: data.user.email,
                        credits: data.user.credits,
                    },
                });
                // console.log("updated test", data.user.credits);
                // console.log("updated usersession", session?.user);
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
            setShouldFetchData(false); // Reset the fetch control variable
        }
    }, [session, shouldFetchData]);

    useEffect(() => {
        // Extract the last segment of the URL which is the referral code

        if (referralCode && referralCode !== '[referralCode]') {
            // Set the referral code to localStorage
            localStorage.setItem('mixart_refcode', referralCode);

            // Optionally, set a cookie if server-side handling is needed
            document.cookie = `mixart_refcode=${referralCode}; path=/; max-age=31536000; samesite=Lax`;

            // Redirect to the main page or where you want users to go next
            router.replace('/'); // Redirect to home or another page
        } else {
            router.replace('/');
        }
    }, [router]);

    // Optional: Render nothing or a loading indicator until redirect
    return null; // or loading component if you wish
};