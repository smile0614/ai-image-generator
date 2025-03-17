"use client";
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function PromotionHandler() {
    const router = useRouter();
    const promotionToken = usePathname().split('/').pop();

    useEffect(() => {
        if (promotionToken && promotionToken !== '[promotionToken]') {
            // Set the promotion_tokens cookie
            document.cookie = `promotion_tokens=${promotionToken}; path=/; max-age=31536000; samesite=Lax`;

            // Redirect to the main page or desired route
            router.push('/');
        } else {
            router.push('/');
        }
    }, [promotionToken, router]);

    // Optional: Render nothing or a loading indicator until redirect
    return null;
}