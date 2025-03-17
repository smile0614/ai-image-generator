import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import MobileNavigation from "@/components/MobileNavigation";
import { Link } from "@nextui-org/link";
import Head from "next/head";
import clsx from "clsx";
import Footer from "@/components/footer";
import { Suspense } from "react";
import Analytics from "./Analytics";
import ogImage from './og-picture.jpg';

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "AI Image Generator Free: Create and Edit images with AI",
	description: "With our free AI image generator, creating and editing images has never been easier. Harness the potential of AI to effortlessly generate and customize visuals according to your vision. Start creating today!",
	robots: {
		index: true,
		follow: true,
	},
	metadataBase: new URL('https://mixart.ai'),
	openGraph: {
		images: [
			{
				url: ogImage.src,
			}
		],
		locale: 'en_US',
		type: 'website',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	
	return (
		<html lang="en" suppressHydrationWarning>
			<Head>
				<meta name="robots" content="index, follow"/>
                <link rel="canonical" href="https://mixart.ai" />
            </Head>
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Suspense>
					<Analytics />
				</Suspense>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<main className="flex-grow">
							{children}
						</main>
						<MobileNavigation />
					</div>
				</Providers>
			</body>
		</html>
	);
}
