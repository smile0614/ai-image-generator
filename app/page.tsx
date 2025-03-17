"use client";
import { useState, useEffect } from 'react';
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Card, CardFooter, CardHeader, Button, CardBody, Divider } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Image } from "@nextui-org/react";
import LoginModal from "@/components/loginModal";
import Footer from "@/components/footer";
import aiAnimeImg from "../assets/images/ai-anime.webp";
import aiArtImg from "../assets/images/ai-art.webp";
import aiHeadshotImg from "../assets/images/ai-headshot.webp";
import aiPhotoImg from "../assets/images/ai-photorealism.webp";
import aiStockImg from "../assets/images/ai-stock.webp";
import aiTxtImg from "../assets/images/ai-textimage.webp";
import aiImageGrid from "../assets/images/ai-images-grid.webp"
import aiIcon from "../assets/images/ai-icon.jpeg"
import aiFashionCard from "../assets/images/ai-fashion-card.webp";
import aiDesignCard from "../assets/images/ai-design-card.webp";
import aiArtCard from "../assets/images/ai-art-card.webp";
import aiAnimeCard from "../assets/images/ai-anime-card.webp";
import aiStockCard from "../assets/images/ai-stock-card.webp";
import aiHeadshotCard from "../assets/images/ai-headshots-card.webp";
import aiAvatarsCard from "../assets/images/ai-avatars-card.webp";
import aiWallpapersCard from "../assets/images/ai-wallpapers-card.webp";
import aiBlogCard from "../assets/images/ai-blog-card.webp";
import aiProductCard from "../assets/images/ai-product-card.webp";
import aiCharacterCard from "../assets/images/ai-character-card.webp";
import aiLogoCard from "../assets/images/ai-logo-card.webp";
import aiSocialsCard from "../assets/images/ai-socials-card.webp";
import aiGameCard from "../assets/images/ai-game-card.webp";
import aiMarketingCard from "../assets/images/ai-marketing-card.webp";

import styles from '@/styles/Main.module.css';

const NEXT_PUBLIC_FREE_PLAN_CREDITS = parseInt(process.env.NEXT_PUBLIC_FREE_PLAN_CREDITS!);

export default function Home() {

	const { data: session, update, status  } = useSession();

	const router = useRouter();

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
            setShouldFetchData(false); // Reset the fetch control variable
        }
    }, [session, shouldFetchData]);

	const headerCards = [
		{
			title: 'AI Anime',
			alt: 'AI Anime',
			imgSrc: aiAnimeImg.src,
		},
		{
			title: 'Headshots',
			alt: 'Headshots',
			imgSrc: aiHeadshotImg.src,
		},
		{
			title: 'Photorealism',
			alt: 'Photorealism',
			imgSrc: aiPhotoImg.src,
		},
		{
		  title: 'AI Art',
		  alt: 'AI Art',
		  imgSrc: aiArtImg.src,
		},
		{
		  title: 'AI Stock Images',
		  alt: 'AI Stock Images',
		  imgSrc: aiStockImg.src,
		},
		{
		  title: 'Text to Image',
		  alt: 'Text to Image',
		  imgSrc: aiTxtImg.src,
		},
	  ];

	const cards = [
		{
		  title: 'AI Art',
		  description: 'Effortlessly create unique artworks by bringing together your imagination and the power of generative AI.',
		  imgSrc: aiArtCard.src,
		},
		{
		  title: 'Anime Art',
		  description: 'Easily create exceptional anime art online with the joint power of AI and your imagination.',
		  imgSrc: aiAnimeCard.src,
		},
		{
		  title: 'Stock photos',
		  description: 'Generate your own license-free stock photos using our powerful photo-realistic AI models.',
		  imgSrc: aiStockCard.src,
		},
		{
		  title: 'Headshots',
		  description: 'Make perfect headshots for your CV, Tinder, or other documents based on your own photographs.',
		  imgSrc: aiHeadshotCard.src,
		},
		{
		  title: 'AI Avatars',
		  description: 'Use our powerful AI tools to create a one-of-a-kind illustrated persona for yourself or your brand.',
		  imgSrc: aiAvatarsCard.src,
		},
		{
		  title: 'Wallpapers',
		  description: 'Use the joint power of your imagination and generative AI to easily make your own unique wallpapers.',
		  imgSrc: aiWallpapersCard.src,
		},
		{
		  title: 'Blog images',
		  description: 'Quickly and easily create multiple license-free images matching the style of your blog with the help of generative AI.',
		  imgSrc: aiBlogCard.src,
		},
		{
		  title: 'Product Photography',
		  description: 'Use the AI DreamBooth model to make a perfect photo shoot for your products without hiring a professional photographer.',
		  imgSrc: aiProductCard.src,
		},
		{
		  title: 'Character Design',
		  description: 'Create fictional characters for your games, books, or marketing campaigns.',
		  imgSrc: aiCharacterCard.src,
		},
		{
		  title: 'Logo Design',
		  description: 'Generate unique logo ideas for your product or company within seconds.',
		  imgSrc: aiLogoCard.src,
		},
		{
		  title: 'Fashion',
		  description: 'Change the look of your models with Image Editor or design new apparel with the power of AI.',
		  imgSrc: aiFashionCard.src,
		},
		{
		  title: 'Interior Design',
		  description: 'Use AI to create inspirational designs for interiors or quickly render realistic images from sketches with ControlNet.',
		  imgSrc: aiDesignCard.src,
		},
		{
		  title: 'Social Media Assets',
		  description: 'Post exclusive content on your social media, use AI to generate pictures of you or your product in various setups and stunning locations.',
		  imgSrc: aiSocialsCard.src,
		},
		{
		  title: '2D Game Assets',
		  description: 'Generate original concept art and game assets to reduce time-to-market or offer personalized experiences.',
		  imgSrc: aiGameCard.src,
		},
		{
		  title: 'Marketing',
		  description: 'Use AI to create stunning content for your marketing campaigns, generate inspiring ideas, or easily edit your product pictures.',
		  imgSrc: aiMarketingCard.src,
		},
	  ];

	const {
		isOpen: isLoginModalOpen,
		onOpen: openLoginModal,
		onClose: toggleLoginModal,
	} = useDisclosure();

	const handleMenuClick = () => {
		if (!session?.user?.id) {
			openLoginModal();
		} else {
			router.push('/ai-generator');
		}
	};

	const handleOpenGalleryClick = () => {
		router.push('/discover');
	};
	
	const handlePricingClick = () => {
		if (!session?.user?.id) {
			openLoginModal();
		} else {
			router.push('/pricing');
		}
	};

	interface ContentStructure {
		title: string;
		description: string;
		buttonText: string;
	}
	
	const content: { [key: string]: ContentStructure } = {
		Free: {
			title: "Ready to get started?",
			description: "Start creating with our free tools.",
			buttonText: "Get started for free"
		},
		Pro: {
			title: "Enhance Your Creativity",
			description: "Upgrade your account to access more advanced features and increase your limits.",
			buttonText: "Upgrade"
		},
		Max: {
			title: "Maximize Your Potential",
			description: "Buy additional credits to continue creating amazing content without interruption.",
			buttonText: "Buy More Credits"
		}
	};

	const subscriptionType: string = session?.user?.subscription || 'Free';

	const currentContent: ContentStructure = content[subscriptionType] || content.Free;

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
    <div className="flex flex-col min-h-screen">
		<div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={styles['main_head_text']}>
					Create and edit <span className={styles['main_head_text_span']}>images </span>
					with the power of <span className={styles['main_head_text_span']}>AI</span>
				</h1>
				<h2 className={styles['main_head_subtitile_text']}>
					Easily generate images from text, edit photos with words, expand pictures beyond their borders, train custom AI models and much more.
				</h2>
			</div>

				<div className="flex flex-col gap-3">
				<Button
					onClick={(e) => {
						e.preventDefault();
						trackEvent('get_started_for_free_up');
						handleMenuClick();
					}}
					className={`${buttonStyles({ color: "secondary", variant: "shadow" })} text-lg`}
				>
					{session?.user ? 
						<>
							Start creating <ArrowRightIcon className="h-4 w-4 inline transition-transform group-hover:translate-x-0.5" />
						</>
						:
						<>
							Start creating for free <ArrowRightIcon className="h-4 w-4 inline transition-transform group-hover:translate-x-0.5" />
						</>
					}
				</Button>
				<span className="inline-block max-w-lg text-center justify-center">{NEXT_PUBLIC_FREE_PLAN_CREDITS}/mo images for free · No credit card required</span>
				</div>
			</section>

			<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
				{headerCards.map((card, index) => (
				<Link 
					key={index} 
					className="w-full h-full"
					onClick={(e) => {
						e.preventDefault();
						handleMenuClick();
					}}
				>
				<Card className="w-full h-full">
					<Image
					removeWrapper
					alt={card.alt}
					className="h-80 object-cover"
					src={card.imgSrc}
					/>
					<CardFooter className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
					<p className="text-white font-bold text-md text-center">{card.title}</p>
					</CardFooter>
				</Card>
				</Link>
				))}
			</div>

			<div className="mt-8 py-8">
				<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-white-900">Image generation superpowers.</h2>
						<p className="text-white-600">Ready to use today for infinite use cases.</p>
				</div>
				<div className="grid mt-8 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 mx-auto">
					<Link 
						key={"ready-to-use"} 
						className="w-[100%] h-[100%]" 
						onClick={(e) => {
							e.preventDefault();
							trackEvent('chose_image_gen');
							handleOpenGalleryClick();
						}}
					>
						<Card isHoverable className="w-full h-[300px] col-span-12 sm:col-span-12 transform transition duration-500 hover:scale-105 hover:border-primary-500 hover:shadow-lg">
							<CardHeader className="absolute bg-black/30 z-10 flex-col items-start flex flex-row justify-between">
								<h4 className="text-white/100 font-medium text-xl">AI Generator</h4>
								<Button 
									onClick={(e) => {
										e.preventDefault();
										handleOpenGalleryClick();
									}} 
									size="md" 
									className="bg-primary-400 text-white/100 text-large"
								>
									Open
								</Button>
							</CardHeader>
							<Image
								removeWrapper
								alt="Relaxing app background"
								className="z-0 w-full h-full object-cover duration-200 ease-in-out group-hover:opacity-90"
								src={aiImageGrid.src}
							/>
							<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
								<div className="flex flex-grow gap-2 items-center">
								<p className="text-xl text-white/100">Turn text into amazing images. Unleash your imagination and create anything.</p>
								</div>
							</CardFooter>
						</Card>
					</Link>
				</div>
			</div>

			<div className="mt-8 py-8">

				<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-white-900">Variety of models.</h2>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{cards.map((card, index) => (
						<Link 
							key={index} 
							onClick={(e) => {
								e.preventDefault();
								trackEvent('chose_card');
								handleMenuClick();
							}}
							className="w-full h-full">
						<Card isHoverable className="w-full h-full">
							<CardBody>
							<Image
								className="z-0 w-full h-full object-cover"
								src={card.imgSrc}
								alt={card.title}
								width="100%"
								height="100%"
							/>
							</CardBody>
							<CardFooter className="flex flex-col items-start justify-between">
							<div className="p-4"> {/* Added Tailwind CSS padding */}
								<div className="text-lg font-semibold text-white-900">{card.title}</div> {/* Added Tailwind CSS classes */}
								<div className="text-sm text-white-600">{card.description}</div> {/* Added Tailwind CSS classes */}
							</div>
							</CardFooter>
						</Card>
					</Link>
					))}
				</div>
			</div>
			<div className="mt-8 bg-[#0f1114] rounded-lg p-10 my-10 text-center text-white">
				<h2 className="text-3xl font-bold mb-2">{currentContent.title}</h2>
				<p className="mb-6">{currentContent.description}</p>
				<Button
					onClick={(e) => {
						e.preventDefault();
						trackEvent('get_started_for_free_down');
						handlePricingClick();
					}}
					color="primary"
					className="text-white bg-[#7f5af0] hover:bg-[#9561e2] py-3 px-8 rounded-lg"
				>
					{currentContent.buttonText}
				</Button>
			</div>
			<LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} order="reverse"/>
		</div>
		<Footer />
    </div>
  );
}