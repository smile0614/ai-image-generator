"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client"; 
import { title } from "@/components/primitives";
import styles from '@/styles/Creating.module.css';
import GeneratedImage from "@/components/GeneratedImage";
import CollectionCard from "@/components/CollectionCard";
import {Textarea, Divider, Breadcrumbs, BreadcrumbItem, Accordion, AccordionItem, Slider, Tooltip, Button, Link, Input, Checkbox} from "@nextui-org/react";
import {Tabs, Tab} from "@nextui-org/tabs";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import {Selection} from "@react-types/shared";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import { signIn, signOut, useSession } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from "@/components/loginModal";
import aiAnimeImg from '@/assets/images/ai-anime.jpeg';
import aiPhotoImg from '@/assets/images/ai-photorealism.jpeg';
import aiHeadImg from '@/assets/images/ai-headshot.jpeg';
import aiStockImg from '@/assets/images/ai-stock.jpg';

import modelImg_Photorealism from '@/assets/models/Photorealism.png';
import modelImg_animagineXL_v31 from '@/assets/models/animagineXL_v31.jpeg';
import modelImg_animexl from '@/assets/models/animexl.jpeg';
import modelImg_AnythingXL_xl from '@/assets/models/AnythingXL_xl.jpeg';
import modelImg_copaxtimeless from '@/assets/models/copaxTimeless.jpeg';
import modelImg_counterfeitxl_v25 from '@/assets/models/counterfeitxl_v25.jpeg';
import modelImg_CrystalClearXL from '@/assets/models/Crystal Clear XL.jpeg';
import modelImg_dreamshaperXL_v21 from '@/assets/models/dreamshaperXL_v21.jpeg';
import modelImg_dynavisionXLA from '@/assets/models/dynavisionXLA.jpeg';
import modelImg_hassakuXLV06 from '@/assets/models/hassakuXLV06.jpeg';
import modelImg_infinianimeXL_v16 from '@/assets/models/infinianimexl_v16.jpeg';
import modelImg_jibMix from '@/assets/models/jibMix.jpeg';
import modelImg_leosamsXL_70 from '@/assets/models/leosamsXL_70.jpeg';
import modelImg_mkIanRealistic from '@/assets/models/mklanRealistic.jpeg';
import modelImg_MysteriousSDXL from '@/assets/models/MysteriousSDXL.jpeg';
import modelImg_NewrealityXL_v40 from '@/assets/models/Newrealityxl_XL40.jpeg';
import modelImg_Nijijstyle from '@/assets/models/Nijistyle.jpeg';
import modelImg_photoVisionXL_v10 from '@/assets/models/photoVisionXL_v10.jpeg';
import modelImg_realcartoonXL_v6 from '@/assets/models/realcartoonXL_v6.jpeg';
import modelImg_realDream_sdx1 from '@/assets/models/realDream_sdxl1.jpeg';
import modelImg_realvisXL_v40 from '@/assets/models/realvisxlV40.jpeg';
import modelImg_reproductionSDXL_2v12 from '@/assets/models/reproductionSDXL_2v12.jpeg';
import modelImg_samaritan3dCartoon from '@/assets/models/samaritan3dCartoon.jpeg';
import modelImg_sdXL from '@/assets/models/sdXL.jpeg';
import modelImg_sdXLNuclear from '@/assets/models/sdxlNuclear.jpeg';
import modelImg_sdXLYamersAnime from '@/assets/models/sdxlYamersAnime.jpeg';
import modelImg_starlightXL from '@/assets/models/starlightXL.jpeg';
import modelImg_thinkdiffusionXL_v10 from '@/assets/models/thinkdiffusionxl_v10.jpeg';
import modelImg_wildcardxXL from '@/assets/models/wildcardxXL.jpeg';
import modelImg_wildcardxXLAnimation from '@/assets/models/wildcardxXLANIMATION.jpeg';
import modelImg_YamersRealisticv5 from '@/assets/models/YamersRealisticv5.jpeg';

import beachStyleMaleImg from '@/assets/collections/beachStyleMaleImg.png';
import beachStyleFemaleImg from '@/assets/collections/beachStyleFemaleImg.png';
import eveningWearMaleImg from '@/assets/collections/eveningWearMaleImg.png';
import eveningWearFemaleImg from '@/assets/collections/eveningWearFemaleImg.png';
import latexMaleImg from '@/assets/collections/latexMaleImg.png';
import latexFemaleImg from '@/assets/collections/latexFemaleImg.png';
import american80sStyleMaleImg from '@/assets/collections/american80sStyleMaleImg.png';
import american80sStyleFemaleImg from '@/assets/collections/american80sStyleFemaleImg.png';
import urbanStyleMaleImg from '@/assets/collections/urbanStyleMaleImg.png';
import urbanStyleFemaleImg from '@/assets/collections/urbanStyleFemaleImg.png';
import fitnessSportMaleImg from '@/assets/collections/fitnessSportMaleImg.png';
import fitnessSportFemaleImg from '@/assets/collections/fitnessSportFemaleImg.png';
import traditionalOutfitsMaleImg from '@/assets/collections/traditionalOutfitsMaleImg.png';
import traditionalOutfitsFemaleImg from '@/assets/collections/traditionalOutfitsFemaleImg.png';
import weddingStyleMaleImg from '@/assets/collections/weddingStyleMaleImg.png';
import weddingStyleFemaleImg from '@/assets/collections/weddingStyleFemaleImg.png';
import vampireMaleImg from '@/assets/collections/vampireMaleImg.png';
import vampireFemaleImg from '@/assets/collections/vampireFemaleImg.png';
import doctorMaleImg from '@/assets/collections/doctorMaleImg.png';
import doctorFemaleImg from '@/assets/collections/doctorFemaleImg.png';


import { useImageContext, ImageData } from "@/context/page";
import { useActionContext, ActionState } from "@/context/page";
import { useRouter } from 'next/navigation'
import FeedbackModal from "@/components/FeedbackModal";
import ReferralModal from "@/components/ReferralsModal";
import PricingPopupModal from "@/components/PricingPopupModal";
import {Spinner} from "@nextui-org/react";

import Canvas from "@/components/Canvas";

const USER_IMAGES_URL = process.env.NEXT_PUBLIC_USER_IMAGES_URL!;
const USER_IMAGES_URL_DOWNLOAD = process.env.NEXT_PUBLIC_USER_IMAGES_URL_DOWNLOAD!;

const NEXT_PUBLIC_FREE_PLAN_IMAGES = parseInt(process.env.NEXT_PUBLIC_FREE_PLAN_IMAGES!);
const NEXT_PUBLIC_PRO_PLAN_IMAGES = parseInt(process.env.NEXT_PUBLIC_PRO_PLAN_IMAGES!);
const NEXT_PUBLIC_MAX_PLAN_IMAGES = parseInt(process.env.NEXT_PUBLIC_MAX_PLAN_IMAGES!);

// console.log('USER_IMAGES_URL', USER_IMAGES_URL);

interface Resolution {
    [key: string]: string;
}

export default function CanvasPage() {
	const { data: session, status, update } = useSession();
	const router = useRouter();
	const actionHandledRef = useRef(false);

	useEffect(() => {
		if (status === "unauthenticated") {
		//   console.log("No user session");
		  router.push('/');
		}
	}, [status, router]);

	const { userImages, setUserImages } = useImageContext();
	const [hasMoreImages, setHasMoreImages] = useState(true);
	const { userAction, setUserAction } = useActionContext();

	const [favoriteModels, setFavoriteModels] = useState<string[]>(session?.user?.favoriteModels || []);
	// console.log('userAction', userAction);

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
				setFavoriteModels(data.user.favoriteModels); // Update local state
			} else {
				console.error('Failed to fetch updated user data:', data.message);
			}
		} catch (error) {
			console.error('Error fetching updated user data:', error);
		}
	};

	const clearReferralCode = () => {
		if (status !== "unauthenticated") {
			try {   
				// Check if the referral code is present in cookies
				const referralCodeCookie = document.cookie.split('; ').find(row => row.startsWith('mixart_refcode='));
			
				if (referralCodeCookie) {
					// Clear from localStorage
					localStorage.removeItem('mixart_refcode');
			
					// Clear the cookie
					document.cookie = 'mixart_refcode=; path=/; max-age=0; samesite=Lax';
				}
			} catch (error) {
				console.error('Error clearing user cookies:', error);
			}
		}
	};

    useEffect(() => {
        if (session?.user?.id && shouldFetchData) {
            fetchUpdatedUserData();
			clearReferralCode();
            setShouldFetchData(false); // Reset the fetch control variable
        }
    }, [session, shouldFetchData]);

	useEffect(() => {
        if (userAction.functionName === 'generateSimilar' && !actionHandledRef.current) {
			const imageToUse = userImages.find(image => image._id === userAction.imageId);
            
			if (imageToUse) {
				// console.log('Found image:', imageToUse);
				handleGenerateSimilar(imageToUse);
				updateImageContext()
				// console.log('generateSimilar function called');
			} else {
				console.error('Image not found');
			}
	
            actionHandledRef.current = true;  // Mark as handled

            // After handling, reset actionHandledRef for next potential action
            setTimeout(() => {
                actionHandledRef.current = false;
                setUserAction({ functionName: '', imageId: '' });  // Reset userAction to prevent repeating
            }, 0);
        } else if (userAction.functionName === 'reuseImage' && !actionHandledRef.current) {
			const imageToReuse = userImages.find(image => image._id === userAction.imageId);
	
			if (imageToReuse) {
				// console.log('Found image to reuse:', imageToReuse);
				handleReuseImage(imageToReuse);
				// console.log('reuseImage function called');
			} else {
				console.error('Image not found for reuse');
			}
	
			actionHandledRef.current = true;  // Mark as handled
		}
	
		// After handling, reset actionHandledRef for next potential action
		if (actionHandledRef.current) {
			setTimeout(() => {
				actionHandledRef.current = false;
				setUserAction({ functionName: '', imageId: '' });  // Reset userAction to prevent repeating
			}, 0);
		}
    }, [userAction, setUserAction]);

	// useEffect(() => {
	// 	fetchImages()
	// }, [session, setUserImages]);

	// const fetchImages = async (): Promise<ImageData[]> => {
	// 	try {
	// 		const userId = session?.user?.id;
	// 		if (userId) {
	// 			const response = await fetch('/api/user/images', {
	// 				method: 'POST',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 				},
	// 				body: JSON.stringify({ userId: session.user.id })
	// 			});
	
	// 			const responseData = await response.json();
	// 			if (responseData.message === 'Images found successfully') {
	// 				return responseData.images.sort((a: ImageData, b: ImageData) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	// 			} else {
	// 				console.error('Failed to fetch user images:', responseData.message);
	// 				return [];
	// 				throw new Error(responseData.message);
	// 			}
	// 		} else {
	// 			console.error('User ID is undefined');
	// 			return [];
	// 		}
	// 	} catch (error: any) {
	// 		console.error('Error fetching user images:', error);
	// 		return [];
	// 		throw new Error(error);
	// 	}
	// };

	const fetchImages = async (imageLength: number): Promise<ImageData[]> => {
		try {
			const userId = session?.user?.id;
			if (userId) {
				const response = await fetch('/api/user/images/v2/get', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ userId: session.user.id, imageLength })
				});
	
				const responseData = await response.json();
				if (responseData.message === 'Images found successfully') {

					const sortedImages = responseData.images.sort((a: ImageData, b: ImageData) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

					if (sortedImages.length <= userImages.length) {
                        setHasMoreImages(false);
                    }

					return sortedImages;
				} else {
					console.error('Failed to fetch user images:', responseData.message);
					return []; // Return an empty array on failure
				}
			} else {
				console.error('User ID is undefined');
				return []; // Return an empty array if user ID is not defined
			}
		} catch (error: any) {
			console.error('Error fetching user images:', error);
			return []; // Return an empty array on error
		}
	};

	useEffect(() => {
		fetchImages(userImages.length).then(fetchedImages => {
			// console.log('fetchedImages', fetchedImages)
			setUserImages(fetchedImages);
		}).catch(error => {
			console.error('Error fetching user images:', error);
		});
	}, [session?.user.id]);

	let fetchTimeoutId: number | null = null;

	const updateImageContext = async () => {
		const fetchedImages = await fetchImages(userImages.length);
		setUserImages(fetchedImages);
		// console.log("Images updated", userImages);
	}

	const startImageFetcher = async () => {
		const fetchedImages = await fetchImages(userImages.length);
		// console.log("isFeedbackModalShown before set:", feedbackModalShownRef.current);
		
		if (!feedbackModalShownRef.current) {
			setIsFeedbackModalShown(true);
			// console.log("isFeedbackModalShown after set:", feedbackModalShownRef.current);
		}
		setIsFeedbackModalShown(true);
		// console.log("isFeedbackModalShown", isFeedbackModalShown);
		// console.log('fetchedImages.length', fetchedImages.length)
		
		if (fetchedImages && fetchedImages.length === 5) {
			// console.log('session?.user?.feedbackSubmitted', session?.user?.feedbackSubmitted);
			if (session?.user?.feedbackSubmitted === false && !feedbackModalShownRef.current) {
				checkFeedbackModalOpenCase();
			}
		}
		
		// if (fetchedImages.every(img => img.res_image !== null)) {
		// 	// All images are loaded, no null found, stop fetching
		// 	setIsSubmitting(false);
		// 	stopImageFetcher();
		// } else {
		// 	// If there are still images with null, schedule the next check
		// 	setIsSubmitting(true);
		// 	scheduleNextFetch();
		// }

		const now = new Date();
		const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000); 

		let remainingImages = [...fetchedImages];

		for (const img of fetchedImages) {
			if (img.res_image === null && new Date(img.createdAt) < fiveMinutesAgo) {
				if (session) {
					try {
						// console.log('img.cost', img.cost)

						remainingImages = remainingImages.filter(image => image._id !== img._id);
                    	setUserImages(remainingImages);

						if (img._id) {
							const deleteResponse = await fetch('/api/image/delete', {
								method: 'DELETE',
								headers: {'Content-Type': 'application/json'},
								body: JSON.stringify({ imageId: img._id })
							});

							const deleteResult = await deleteResponse.json();
							if (deleteResult.message === 'Image deleted successfully') {
								
								const addResponse = await fetch('/api/user/tokens/add', {
									method: 'PUT',
									headers: {
									'Content-Type': 'application/json',
									},
									body: JSON.stringify({ email: session.user.email, tokensToAdd: img.cost }),
								});

								const addData = await addResponse.json();
								// console.log('addData', addData);
							
								if (addData.message !== 'User credits updated successfully') throw new Error(addData.message);
							
								// Update session with new token count
								await update({ user: { ...session?.user, credits: addData.newTokenCount } });

							} else {
								throw new Error(deleteResult.message);
							}
						}

					} catch (error: any) {
						console.log(error)
					}
				}
			}
		}

		remainingImages = remainingImages.filter(img => new Date(img.createdAt) >= fiveMinutesAgo || img.res_image !== null);

		if (remainingImages.every(img => img.res_image !== null)) {
			// All images are loaded, no null found, stop fetching
			setIsSubmitting(false);
			stopImageFetcher();
		} else {
			// If there are still images with null, schedule the next check
			setIsSubmitting(true);
			scheduleNextFetch();
		}

		// setUserImages(fetchedImages);
		setUserImages(remainingImages);
	};

	useEffect(() => {
		startImageFetcher();
	  }, [status]);
	  
	const scheduleNextFetch = () => {
		if (fetchTimeoutId !== null) {
			clearTimeout(fetchTimeoutId);
		}
		fetchTimeoutId = window.setTimeout(startImageFetcher, 10000);
	};

	const stopImageFetcher = () => {
		if (fetchTimeoutId !== null) {
			clearTimeout(fetchTimeoutId); // Stop the scheduled timeout
			fetchTimeoutId = null;
			// console.log("Fetching stopped.");
		}
	};

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// const imageAssets = [modelImg1_1.src]; ["instant", "faceswap", "full"];

	const modelData = [
		{ name: "Photorealism", image: modelImg_Photorealism.src, apiName: "realism", modelFacelockType: "faceswap" },
		{ name: "AnimagineXL v3.1", image: modelImg_animagineXL_v31.src, apiName: "animagineXL_v31", modelFacelockType: "faceswap" },
		{ name: "Animexl", image: modelImg_animexl.src, apiName: "animexl", modelFacelockType: "full" },
		{ name: "AnythingXL xl", image: modelImg_AnythingXL_xl.src, apiName: "AnythingXL_xl", modelFacelockType: "full" },
		{ name: "Copax Timeless", image: modelImg_copaxtimeless.src, apiName: "copaxTimeless", modelFacelockType: "faceswap" },
		{ name: "CounterfeitXL v25", image: modelImg_counterfeitxl_v25.src, apiName: "counterfeitxl_v25", modelFacelockType: "full" },
		{ name: "Crystal Clear XL", image: modelImg_CrystalClearXL.src, apiName: "crystalClearXL_ccxl", modelFacelockType: "faceswap" },
		// { name: "DreamshaperXL v21", image: modelImg_dreamshaperXL_v21.src, apiName: "dreamshaperXL_v21", modelFacelockType: "faceswap" },
		{ name: "DynavisionXLA", image: modelImg_dynavisionXLA.src, apiName: "dynavisionXLA", modelFacelockType: "faceswap" },
		{ name: "HassakuXL V06", image: modelImg_hassakuXLV06.src, apiName: "hassakuXLV06", modelFacelockType: "full" },
		{ name: "InfinianimeXL v16", image: modelImg_infinianimeXL_v16.src, apiName: "infinianimexl_v16", modelFacelockType: "full" },
		{ name: "JibMix", image: modelImg_jibMix.src, apiName: "jibMix", modelFacelockType: "faceswap" },
		{ name: "LeosamsXL 70", image: modelImg_leosamsXL_70.src, apiName: "leosamsXL_70", modelFacelockType: "faceswap" },
		{ name: "MkIan Realistic", image: modelImg_mkIanRealistic.src, apiName: "mklanRealistic", modelFacelockType: "faceswap" },
		{ name: "MysteriousSDXL", image: modelImg_MysteriousSDXL.src, apiName: "MysteriousSDXL", modelFacelockType: "faceswap" },
		{ name: "NewrealityXL v40", image: modelImg_NewrealityXL_v40.src, apiName: "Newrealityxl_XL40", modelFacelockType: "faceswap" },
		{ name: "Nijijstyle", image: modelImg_Nijijstyle.src, apiName: "Nijistyle", modelFacelockType: "faceswap" },
		{ name: "PhotoVisionXL v10", image: modelImg_photoVisionXL_v10.src, apiName: "photoVisionXL_v10", modelFacelockType: "faceswap" },
		{ name: "RealCartoonXL v6", image: modelImg_realcartoonXL_v6.src, apiName: "realcartoonXL_v6", modelFacelockType: "faceswap" },
		{ name: "RealDream sdx1", image: modelImg_realDream_sdx1.src, apiName: "realDream_sdxl1", modelFacelockType: "faceswap" },
		{ name: "RealvisXL v40", image: modelImg_realvisXL_v40.src, apiName: "realvisxlV40", modelFacelockType: "faceswap" },
		{ name: "ReproductionSDXL 2v12", image: modelImg_reproductionSDXL_2v12.src, apiName: "reproductionSDXL_2v12", modelFacelockType: "full" },
		{ name: "Samaritan3dCartoon", image: modelImg_samaritan3dCartoon.src, apiName: "samaritan3dCartoon", modelFacelockType: "faceswap" },
		{ name: "SdXL", image: modelImg_sdXL.src, apiName: "sdXL", modelFacelockType: "faceswap" },
		{ name: "SdXLNuclear", image: modelImg_sdXLNuclear.src, apiName: "sdxlNuclear", modelFacelockType: "faceswap" },
		{ name: "SdXLYamersAnime", image: modelImg_sdXLYamersAnime.src, apiName: "sdxlYamersAnime", modelFacelockType: "faceswap" },
		{ name: "StarlightXL", image: modelImg_starlightXL.src, apiName: "starlightXL_v3", modelFacelockType: "faceswap" },
		{ name: "ThinkdiffusionXL v10", image: modelImg_thinkdiffusionXL_v10.src, apiName: "thinkdiffusionxl_v10", modelFacelockType: "faceswap" },
		{ name: "WildcardxXL", image: modelImg_wildcardxXL.src, apiName: "wildcardxXL", modelFacelockType: "faceswap" },
		{ name: "WildcardxXLAnimation", image: modelImg_wildcardxXLAnimation.src, apiName: "wildcardxXLANIMATION", modelFacelockType: "faceswap" },
		{ name: "YamersRealisticv5", image: modelImg_YamersRealisticv5.src, apiName: "YamersRealisticv5", modelFacelockType: "faceswap" }
	  ];

	  interface Collection {
		name: string;
		maleImage: string;
		femaleImage: string;
		description: string;
		malePrompt1: string;
		femalePrompt1: string;
		malePrompt2: string;
		femalePrompt2: string;
		malePrompt3: string;
		femalePrompt3: string;
		malePrompt4: string;
		femalePrompt4: string;
		malePrompt5: string;
		femalePrompt5: string;
		malePrompt6: string;
		femalePrompt6: string;
		malePrompt7: string;
		femalePrompt7: string;
		malePrompt8: string;
		femalePrompt8: string;
		malePrompt9: string;
		femalePrompt9: string;
		malePrompt10: string;
		femalePrompt10: string;
	  }

	  const collectionData = [
		{
		  name: "Beach Style",
		  maleImage: beachStyleMaleImg.src,
		  femaleImage: beachStyleFemaleImg.src,
		  description: "Imagine a bright sunny day, a sandy beach and calm waves in the background. Dress in light beachwear such as swimming costumes, shorts, pareos, sunglasses and hats. This style conveys an atmosphere of relaxation and summer mood suitable for holidays by the sea.",
		  malePrompt1: "A guy standing on the beach with the sea in the background. The scene includes clear skies, golden sand, and the ocean waves. The guy is smiling, creating a vibrant and summery atmosphere.",
		  femalePrompt1: "A girl in a vibrant swimsuit lounging on a sunbed at the beach. The scene includes golden sand, clear blue water, and a bright, sunny sky. She looks relaxed and happy, enjoying her day by the sea.",
		  malePrompt2: "A guy in beach shorts and a t-shirt jogging along the seashore. The waves gently crash on the sand, and the early morning sun casts a warm glow over the scene. He looks fit and energetic, enjoying his run by the ocean.",
		  femalePrompt2: "Opposite us is a girl on the beach in a beautiful bikini. The scene includes clear blue skies, golden sand and the ocean in the background. The atmosphere is bright and summery.",
		  malePrompt3: "A guy in swim trunks and a sun hat standing on a surfboard in the water. The scene is dynamic with waves, the deep blue ocean, and the excitement of surfing. He looks focused and ready for the next wave.",
		  femalePrompt3: "A girl standing halfway in the sea, facing us. The water is clear and blue, gently touching the shore. The girl has a joyful expression, with waves softly splashing around her.",
		  malePrompt4: "A guy in a stylish shirt and swim trunks posing for a photo with palm trees and the ocean in the background. The setting is tropical and picturesque, capturing the essence of a perfect beach day.",
		  femalePrompt4: "A girl in a stylish beach outfit posing for a photo against a rocky coastline. The dramatic cliffs and turquoise water create a stunning natural backdrop, highlighting her fashionable and adventurous spirit.",
		  malePrompt5: "A guy in beach shorts and a t-shirt sits on a lounge chair by the pool, looking at us with a relaxed expression. The pool area is surrounded by tropical plants and a view of the beach in the distance.",
		  femalePrompt5: "A girl in a swimsuit and sarong stands on a wooden pier, looking at us with a playful smile. Behind her, yachts and boats are anchored, and the ocean stretches out to the horizon.",
		  malePrompt6: "A guy in swim trunks stands on a wooden pier, looking at us with a friendly smile. Behind him, yachts and boats are anchored, and the ocean stretches out to the horizon.",
		  femalePrompt6: "A girl in a swimsuit and sunglasses sits on the sand, looking at us with a cheerful expression. Beach umbrellas and people enjoying the sun are visible in the background.",
		  malePrompt7: "A guy in a beach shirt and shorts stands at the water's edge, looking at us with a serene smile. The setting sun casts a warm glow, reflecting off the gentle waves.",
		  femalePrompt7: "A girl in a bright swimsuit sits on a swing under a palm tree, looking at us with a joyful expression. The ocean is visible in the background, with waves gently rolling in.",
		  malePrompt8: "A guy in bright swim trunks sits on a swing under a palm tree, looking at us with a joyful expression. The ocean is visible in the background, with waves gently rolling in.",
		  femalePrompt8: "A girl in a swimsuit and beach hat stands by a beach bar, looking at us with a smile. She holds a cocktail in her hand, and the sea is visible behind her, adding to the tropical vibe.",
		  malePrompt9: "A guy in swim trunks and a beach hat stands by a beach bar, looking at us with a smile. He holds a cocktail in his hand, and the sea is visible behind him, adding to the tropical vibe.",
		  femalePrompt9: "A girl in a swimsuit and shorts sits on a rock, looking at us with an adventurous smile. Behind her, a blue lagoon stretches out, surrounded by lush greenery.",
		  malePrompt10: "A guy in swim trunks and flip-flops sits on a rock, looking at us with an adventurous smile. Behind him, a blue lagoon stretches out, surrounded by lush greenery.",
		  femalePrompt10: "A girl in a swimsuit and sarong walks along the shore, looking at us with a content smile. The sunset paints the sky in warm tones of orange and pink, casting a golden glow over the beach.",
		},
		{
		  name: "Evening Wear",
		  maleImage: eveningWearMaleImg.src,
		  femaleImage: eveningWearFemaleImg.src,
		  description: "This theme offers elegant and sophisticated looks for evening events. Be the centre of attention in chic dresses, dinner jackets, with luxurious accessories and hairstyles. The background can be evening receptions, cityscapes with lights or light-filled halls, creating an atmosphere of glamour and sophistication.",
		  malePrompt1: "A guy in an evening suit and tie stands on a balcony, facing us, with a nighttime city view behind him. The city lights twinkle in the background, adding to the luxurious and enchanting setting.",
		  femalePrompt1: "A girl in an evening gown standing in the middle of a nighttime city. The city lights are sparkling around her, creating a vibrant and elegant atmosphere. She looks confident and glamorous, with skyscrapers and busy streets in the background.",
		  malePrompt2: "A guy in an evening suit standing in the middle of a banquet hall. The hall is decorated with chandeliers, elegant tables, and lavish decorations. He looks graceful and stylish, blending perfectly with the luxurious surroundings.",
		  femalePrompt2: "A girl in an evening gown standing in the middle of a banquet hall. The hall is decorated with chandeliers, elegant tables, and lavish decorations. She looks graceful and stylish, blending perfectly with the luxurious surroundings.",
		  malePrompt3: "A guy in an evening suit sitting on a beautiful armchair. The room is tastefully decorated with elegant furnishings and soft lighting. He looks relaxed and sophisticated, exuding charm and elegance.",
		  femalePrompt3: "A girl in an evening gown sitting on a beautiful sofa. The room is tastefully decorated with elegant furnishings and soft lighting. She looks relaxed and sophisticated, exuding charm and elegance.",
		  malePrompt4: "A guy in an evening suit standing by a beautiful river in a nighttime city. The city lights reflect on the water, creating a magical and romantic atmosphere. He looks serene and elegant, enjoying the peaceful surroundings.",
		  femalePrompt4: "A girl in an evening gown sitting on a boat in a nighttime city. The city lights reflect on the water, creating a magical and romantic atmosphere. She looks serene and elegant, enjoying the peaceful ride.",
		  malePrompt5: "A guy in an evening suit and classic shoes stands at the entrance of an opera house, facing us. The grand entrance is adorned with columns and ornate details, creating a majestic and elegant setting.",
		  femalePrompt5: "A girl in an evening gown and jewelry stands on a balcony, facing us, with a nighttime city view behind her. The city lights twinkle in the background, adding to the luxurious and enchanting setting.",
		  malePrompt6: "A guy in a sparkling evening suit stands at the foot of a grand staircase, facing us. The staircase is adorned with elegant decorations and soft lighting, creating a glamorous and sophisticated atmosphere.",
		  femalePrompt6: "A girl in a long evening gown with evening makeup stands in front of a beautiful fountain, facing us. The fountain is illuminated with soft lights, and the surrounding garden adds to the romantic and elegant ambiance.",
		  malePrompt7: "A guy in a luxurious evening suit stands on a terrace, facing us, with a view of the nighttime sea behind him. The moonlight reflects off the water, creating a serene and romantic scene.",
		  femalePrompt7: "A girl in an evening gown and high heels stands at the entrance of an opera house, facing us. The grand entrance is adorned with columns and ornate details, creating a majestic and elegant setting.",
		  malePrompt8: "A guy in an exquisite evening suit and overcoat stands in front of a vintage car, facing us. The car is parked under soft street lights, creating a nostalgic and glamorous atmosphere.",
		  femalePrompt8: "A girl in a sparkling evening gown stands at the foot of a grand staircase, facing us. The staircase is adorned with elegant decorations and soft lighting, creating a glamorous and sophisticated atmosphere.",
		  malePrompt9: "A guy in an elegant evening suit stands in a garden, facing us, with blooming roses in the background. The garden is beautifully lit with fairy lights, adding to the enchanting and romantic setting.",
		  femalePrompt9: "A girl in an exquisite evening gown and a fur stole stands in front of a vintage car, facing us. The car is parked under soft street lights, creating a nostalgic and glamorous atmosphere.",
		  malePrompt10: "A guy in an evening suit and expensive watch stands frontally at the grand entrance of a large mansion, looking directly at us. The entrance is illuminated with ornate lanterns, and the mansion's architecture exudes opulence and sophistication.",
		  femalePrompt10: "A girl in an elegant evening gown stands in a garden, facing us, with blooming roses in the background. The garden is beautifully lit with fairy lights, adding to the enchanting and romantic setting.",
		},
		{
		  name: "Latex",
		  maleImage: latexMaleImg.src,
		  femaleImage: latexFemaleImg.src,
		  description: "The latex theme is associated with bold, daring and sexy images. Latex clothing fits tightly around the body, emphasising its shape. Such images can include suits, dresses, gloves and boots, creating an impression of strength and mystery. The background can be industrial, nocturnal or with a futuristic touch.",
		  malePrompt1: "A guy dressed in latex standing next to a beautiful car. The car is sleek and polished, and the setting includes city lights reflecting off its surface. The guy looks confident and stylish, exuding a bold and edgy vibe.",
		  femalePrompt1: "A girl dressed in latex standing next to a beautiful car. The car is sleek and polished, and the setting includes city lights reflecting off its surface. The girl looks confident and stylish, exuding a bold and edgy vibe.",
		  malePrompt2: "A guy dressed in latex walking along a road in a nighttime city. The street is illuminated by neon lights and bustling with energy. He looks confident and edgy, perfectly fitting into the vibrant urban environment.",
		  femalePrompt2: "A girl dressed in latex standing against the backdrop of a city. The cityscape is modern and illuminated with bright lights, creating a dynamic and urban atmosphere. The girl looks powerful and confident, blending seamlessly with the vibrant city scene.",
		  malePrompt3: "A guy in a black latex outfit sits on a high stool in a modern bar. The bar is stylishly decorated with sleek furniture and ambient lighting, emphasizing his striking and edgy appearance.",
		  femalePrompt3: "A girl dressed in latex standing inside a nighttime bar. The bar is dimly lit with colorful neon lights and a lively atmosphere. She looks alluring and stylish, perfectly fitting into the trendy and energetic environment.",
		  malePrompt4: "A guy in a red latex outfit stands by a sports car, looking directly at us. The shiny surface of both the car and his outfit creates a dynamic and high-fashion image.",
		  femalePrompt4: "A girl dressed in latex standing in a seductive pose. The setting is bold and provocative, with dramatic lighting accentuating her curves. She exudes confidence and allure, creating a striking and powerful image.",
		  malePrompt5: "A guy in a latex jumpsuit stands on the rooftop of a building, with the nighttime cityscape in the background. The lights of the city create a dramatic and powerful atmosphere.",
		  femalePrompt5: "A girl dressed in latex standing next to a beautiful motorcycle. The motorcycle is sleek and shiny, with the city lights reflecting off its surface. The girl looks fierce and stylish, ready for an exciting ride.",
		  malePrompt6: "A guy in latex pants and a jacket sits on a leather sofa in a luxurious room. The opulent surroundings, combined with his sleek outfit, create an elegant and provocative scene.",
		  femalePrompt6: "A girl in a tight latex outfit stands against the backdrop of neon lights in a nighttime city. The vibrant colors of the city lights reflect off the shiny latex, creating a bold and futuristic look.",
		  malePrompt7: "A guy in a shiny latex outfit stands on a staircase, facing us, with neon lights surrounding him. The glowing lights reflect off the latex, adding a futuristic and stylish vibe to the scene.",
		  femalePrompt7: "A girl in a red latex dress sits on a high stool in a modern bar. The bar is stylishly decorated with sleek furniture and ambient lighting, emphasizing her glamorous and daring appearance.",
		  malePrompt8: "A guy in a red latex outfit stands by a motorcycle, looking directly at us, with a city street in the background. The powerful and stylish image captures the essence of urban adventure and fashion.",
		  femalePrompt8: "A girl in a latex skirt and top sits on a leather sofa in a luxurious room. The opulent surroundings, combined with her sleek outfit, create an elegant and provocative scene.",
		  malePrompt9: "A guy in a latex outfit stands in a garage with sports cars, looking directly at us. The sleek and powerful cars enhance the bold and high-energy scene.",
		  femalePrompt9: "A girl in a shiny latex outfit stands against a city street backdrop with graffiti, looking directly at us. The urban environment contrasts with her sleek and glossy appearance, creating a vibrant and edgy scene.",
		  malePrompt10: "A guy in a black latex outfit stands in an abandoned factory, facing us. The industrial background with rusty machinery and concrete walls creates a stark and edgy contrast to his sleek appearance.",
		  femalePrompt10: "A girl in a latex dress stands on a staircase, facing us, with neon lights surrounding her. The glowing lights reflect off the latex, adding a futuristic and stylish vibe to the scene.",
		},
		{
		  name: "80s Style (America)",
		  maleImage: american80sStyleMaleImg.src,
		  femaleImage: american80sStyleFemaleImg.src,
		  description: "This theme dives into the atmosphere of the colourful and unforgettable 80's. You can dress up in denim jackets in bright neon colours, retro trainers and accessories and much more. The background can include city streets, discos, old cars and classic 80s-inspired parties, reminding you of the culture of the time.",
		  malePrompt1: "A guy dressed in 80s style sitting in a bus, observing beautiful views with us. He is wearing retro clothing typical of the 1980s, with a neon jacket, headband, and classic sneakers. The bus interior has a vintage feel, and the scenery outside is picturesque.",
		  femalePrompt1: "A girl dressed in 80s style sitting in a bus, observing beautiful views with us. She is wearing colorful, retro clothing typical of the 1980s, with big hair and bold accessories. The bus interior has a vintage feel, and the scenery outside is picturesque.",
		  malePrompt2: "A guy dressed in 80s style walking down the street. He is wearing vibrant, retro clothing with a leather jacket, ripped jeans, and high-top sneakers. The street has an urban feel, with graffiti, old storefronts, and a lively atmosphere.",
		  femalePrompt2: "A girl dressed in 80s style walking down the street. She is wearing vibrant, retro clothing with leg warmers, a neon jacket, and big hair. The street has an urban feel, with graffiti, old storefronts, and a lively atmosphere.",
		  malePrompt3: "A guy dressed in 80s style walking along the beach. He is wearing a colorful tank top, shorts, and retro sunglasses. The beach is sunny and lively, with palm trees and vintage beachgoers in the background.",
		  femalePrompt3: "A girl dressed in 80s style walking along the beach. She is wearing a colorful swimsuit with high-waisted bottoms, neon sunglasses, and big hair. The beach is sunny and lively, with palm trees and vintage beachgoers in the background.",
		  malePrompt4: "A guy dressed in 80s style standing in front of a car from the 1980s. He is wearing bold, retro clothing with a leather jacket, big hair, and classic sneakers. The car is a classic 80s model, and the setting includes an urban backdrop with vibrant street art.",
		  femalePrompt4: "A girl dressed in 80s style standing in front of a car from the 1980s. She is wearing bold, retro clothing with big hair and colorful accessories. The car is a classic 80s model, and the setting includes an urban backdrop with vibrant street art.",
		  malePrompt5: "A guy dressed in 80s style walking through a city with large palm trees. He is wearing bright, retro clothing with a colorful shirt, big hair, and bold accessories. The city has an 80s vibe, with vintage storefronts, colorful buildings, and a sunny, lively atmosphere.",
		  femalePrompt5: "A girl dressed in 80s style walking through a city with large palm trees. She is wearing bright, retro clothing with big hair and bold accessories. The city has an 80s vibe, with vintage storefronts, colorful buildings, and a sunny, lively atmosphere.",
		  malePrompt6: "A guy in a bright tracksuit and sneakers walking down the streets of New York with a boombox on his shoulder. The urban background is filled with retro graffiti and lively street art.",
		  femalePrompt6: "A girl in a glittery mini dress and large earrings posing next to a vintage boombox against a graffiti-covered wall on an American street. The vibrant background highlights her bold and stylish outfit.",
		  malePrompt7: "A guy in a tracksuit with broad shoulders and a headband jogging down the streets of San Francisco. The urban setting and retro storefronts capture the fitness craze of the 80s.",
		  femalePrompt7: "A girl in a bright sweater and a short skirt standing by an arcade machine in an American game hall. The scene is filled with flashing lights and the sounds of retro video games.",
		  malePrompt8: "A guy in a leather jacket and sunglasses standing next to a motorcycle on the streets of Los Angeles, looking at us. The cool and rebellious vibe of the 80s is emphasized by his confident stance.",
		  femalePrompt8: "A girl in a neon tank top and shorts walking down the streets of Los Angeles, looking at us. The urban background includes palm trees and iconic LA sights, emphasizing her fun and energetic style.",
		  malePrompt9: "A guy in a bright shirt and jeans sitting on the hood of a classic car on a Chicago street, looking directly at us. The nostalgic scene captures the laid-back and stylish essence of the 80s.",
		  femalePrompt9: "A girl in a glittery blouse and a denim skirt walking through the streets of Chicago with a cassette player in her hands. The urban setting and retro fashion capture the music culture of the 80s.",
		  malePrompt10: "A guy in a neon t-shirt and track pants sitting on the steps in Brooklyn, looking at us, with graffiti-covered walls behind him. The setting emphasizes the vibrant street culture of the 80s.",
		  femalePrompt10: "A girl in a bright hoodie and leggings standing next to an American diner with neon signs. The scene captures the nostalgic charm of 80s American culture.",
		},
		{
		  name: "Urban Style",
		  maleImage: urbanStyleMaleImg.src,
		  femaleImage: urbanStyleFemaleImg.src,
		  description: "Urban style is a dynamic look for life in the metropolis. Dress in trendy casual outfits such as jeans, leather jackets, trainers, and stylish accessories. The background can be city streets, fashion boutiques, cafes or urban landscapes reflecting the energetic rhythm of life.",
		  malePrompt1: "A guy dressed in urban fashion walking down a beautiful street. He is wearing trendy clothes with a stylish jacket and shoes. The street is lined with elegant buildings, trees, and cafes, creating a chic and sophisticated atmosphere.",
		  femalePrompt1: "A girl dressed in urban fashion walking down a beautiful street. She is wearing trendy clothes with a stylish handbag and sunglasses. The street is lined with elegant buildings, trees, and cafes, creating a chic and sophisticated atmosphere.",
		  malePrompt2: "A guy dressed in urban fashion standing next to a beautiful car. He is wearing fashionable clothes with a designer watch and stylish shoes. The car is sleek and luxurious, and the setting includes an upscale urban backdrop.",
		  femalePrompt2: "A girl dressed in urban fashion standing next to a beautiful car. She is wearing fashionable clothes with a designer handbag and stylish shoes. The car is sleek and luxurious, and the setting includes an upscale urban backdrop.",
		  malePrompt3: "A guy dressed in urban fashion standing in front of the Eiffel Tower. He is wearing chic clothes with stylish accessories. The iconic Parisian landmark is beautifully illuminated, creating a romantic and fashionable atmosphere.",
		  femalePrompt3: "A girl dressed in urban fashion standing in front of the Eiffel Tower. She is wearing chic clothes with a stylish hat and accessories. The iconic Parisian landmark is beautifully illuminated, creating a romantic and fashionable atmosphere.",
		  malePrompt4: "A guy dressed in urban fashion standing on a beautiful bridge overlooking a river in a nighttime city. He is wearing stylish clothes with elegant accessories. The city lights reflect on the water, creating a magical and sophisticated scene.",
		  femalePrompt4: "A girl dressed in urban fashion standing on a beautiful bridge overlooking a river in a nighttime city. She is wearing stylish clothes with elegant accessories. The city lights reflect on the water, creating a magical and sophisticated scene.",
		  malePrompt5: "A guy in a fashionable coat and scarf standing at the entrance of a modern restaurant, looking at us. The scene features sleek design elements and a vibrant city atmosphere.",
		  femalePrompt5: "A girl in a fashionable trench coat and hat standing at the entrance of a modern café, looking at us. The scene features sleek design elements and a vibrant city atmosphere.",
		  malePrompt6: "A guy in a bright blazer and jeans standing at a street corner in the city center, looking at us. The background includes busy traffic, skyscrapers, and a lively urban environment.",
		  femalePrompt6: "A girl in a leather jacket and ripped jeans sitting on the steps of a city building, looking at us. The background includes urban architecture and bustling street life.",
		  malePrompt7: "A guy in a fashionable t-shirt and sneakers walking along the waterfront, looking at the city skyline. The background includes iconic urban landmarks and a river.",
		  femalePrompt7: "A girl in a bright blazer and jeans standing at a crosswalk in the city center. The background includes busy traffic, skyscrapers, and a lively urban environment.",
		  malePrompt8: "A guy in a bright shirt and jeans standing by a city sculpture, looking at us. The urban park setting features modern art and a vibrant cityscape.",
		  femalePrompt8: "A girl in a stylish skirt and blouse standing by a city sculpture, looking at us. The urban park setting features modern art and a vibrant cityscape.",
		  malePrompt9: "A guy in a fashionable jacket and sunglasses walking across a bridge with a view of the city skyline. The background includes iconic urban landmarks and a river.",
		  femalePrompt9: "A girl in a fashionable jacket and sunglasses walking across a bridge with a view of the city skyline. The background includes iconic urban landmarks and a river.",
		  malePrompt10: "A guy in a stylish sweater and trousers sitting on a bench in a city park, looking at us. The background includes green trees, park paths, and an urban skyline.",
		  femalePrompt10: "A girl in casual clothes and sneakers sitting on a bench in a city park, looking at us. The background includes green trees, park paths, and an urban skyline.",
		},
		{
		  name: "Fitness/Sport",
		  maleImage: fitnessSportMaleImg.src,
		  femaleImage: fitnessSportFemaleImg.src,
		  description: "This topic is dedicated to an active lifestyle. Dress up in sportswear such as: shorts, T-shirts, tracksuits, trainers. Engage in a variety of sports, from running and yoga to strength training and team games. The background can be either outdoors or in a gym or sports studio.",
		  malePrompt1: "A guy dressed in athletic wear inside a gym. He is surrounded by fitness equipment like weights, treadmills, and exercise machines. He looks focused and determined, working out in a modern, well-lit gym environment.",
		  femalePrompt1: "A girl dressed in athletic wear inside a gym. She is surrounded by fitness equipment like weights, treadmills, and exercise machines. She looks focused and determined, working out in a modern, well-lit gym environment.",
		  malePrompt2: "A guy dressed in athletic wear jogging along an autumn trail. The path is surrounded by colorful fall foliage, and he looks energetic and refreshed, enjoying his run in the crisp autumn air.",
		  femalePrompt2: "A girl dressed in athletic wear jogging along an autumn trail. The path is surrounded by colorful fall foliage, and she looks energetic and refreshed, enjoying her run in the crisp autumn air.",
		  malePrompt3: "A guy dressed in athletic wear standing next to a car. He looks ready for a workout, with a gym bag in hand and a confident expression. The car is parked in a city environment, suggesting he is about to head to the gym or a fitness class.",
		  femalePrompt3: "A girl dressed in athletic wear jogging near a stadium. The stadium looms in the background, and she looks focused and determined, enjoying her run as part of her fitness routine.",
		  malePrompt4: "A guy dressed in athletic wear jogging near a stadium. The stadium looms in the background, and he looks focused and determined, enjoying his run as part of his fitness routine.",
		  femalePrompt4: "A girl in a sports outfit boxing in a training ring. The gym environment is equipped with punching bags, gloves, and a dedicated coach, highlighting her focus and strength.",
		  malePrompt5: "A guy in a sports outfit boxing in a training ring. The gym environment is equipped with punching bags, gloves, and a dedicated coach, highlighting his focus and strength.",
		  femalePrompt5: "A girl in athletic wear and headphones jogging along a forest trail with a backpack. The natural setting includes tall trees, sunlight filtering through leaves, and the sound of nature, creating a peaceful and invigorating workout.",
		  malePrompt6: "A guy in athletic wear and headphones jogging along a forest trail with a backpack. The natural setting includes tall trees, sunlight filtering through leaves, and the sound of nature, creating a peaceful and invigorating workout.",
		  femalePrompt6: "A girl in athletic wear and headphones hiking along a mountain trail. The background includes rugged terrain, scenic views, and the sense of adventure and exploration.",
		  malePrompt7: "A guy in athletic wear and headphones hiking along a mountain trail. The background includes rugged terrain, scenic views, and the sense of adventure and exploration.",
		  femalePrompt7: "A girl in athletic wear sitting on a yoga mat and meditating by a lake. The serene background includes calm water, lush greenery, and a peaceful atmosphere, emphasizing relaxation and mindfulness.",
		  malePrompt8: "A guy in athletic wear sitting on a yoga mat and meditating by a lake. The serene background includes calm water, lush greenery, and a peaceful atmosphere, emphasizing relaxation and mindfulness.",
		  femalePrompt8: "A girl in running shorts and a sports bra warming up on a track at a stadium. The scene captures the athletic preparation with track lanes and stadium seats in the background.",
		  malePrompt9: "A guy in running shorts and a tank top warming up on a track at a stadium. The scene captures the athletic preparation with track lanes and stadium seats in the background.",
		  femalePrompt9: "A girl in athletic wear and a helmet cycling through city streets. The urban background includes bike lanes, buildings, and morning sunlight, creating a vibrant workout atmosphere.",
		  malePrompt10: "A guy in athletic wear and a helmet cycling through city streets. The urban background includes bike lanes, buildings, and morning sunlight, creating a vibrant workout atmosphere.",
		  femalePrompt10: "A girl dressed in athletic wear standing next to a car. She looks ready for a workout, with a gym bag in hand and a confident expression. The car is parked in a city environment, suggesting she is about to head to the gym or a fitness class.",
		},
		{
		  name: "Traditional Outfits",
		  maleImage: traditionalOutfitsMaleImg.src,
		  femaleImage: traditionalOutfitsFemaleImg.src,
		  description: "Cultural and national costumes from different countries and eras are on display here. Dress up in traditional clothes, be it kimono, sari, hanbok or European historical outfits. The backgrounds emphasise the atmosphere of antiquity and culture: old castles, temples, villages and nature associated with the respective traditions.",
		  malePrompt1: "A man wearing a traditional Japanese kimono standing in a Japanese garden. The garden features elements like a koi pond, stone lanterns, and blooming cherry blossoms, creating a serene and cultural atmosphere.",
		  femalePrompt1: "A girl wearing a traditional kimono standing in a Japanese garden. The garden features elements like a koi pond, stone lanterns, and blooming cherry blossoms, creating a serene and cultural atmosphere.",
		  malePrompt2: "A man wearing a traditional hanbok standing in front of an ancient Korean palace. The palace is majestic with intricate architecture and traditional Korean gardens in the background.",
		  femalePrompt2: "A girl in a traditional Indian sari dances. The stage is filled with bright decorations and lights.",
		  malePrompt3: "A man wearing traditional Bavarian trachten standing against an Alpine landscape. The scene features lush green meadows, snow-capped mountains, and traditional Bavarian chalets.",
		  femalePrompt3: "A girl wearing a traditional hanbok standing in front of an ancient Korean palace. The palace is majestic with intricate architecture and traditional Korean gardens in the background.",
		  malePrompt4: "A man wearing traditional Chinese hanfu standing on a bridge over a river adorned with lanterns. The setting is romantic and cultural, with lanterns reflecting on the water.",
		  femalePrompt4: "A girl wearing a traditional Bavarian dirndl standing against an Alpine landscape. The scene features lush green meadows, snow-capped mountains, and traditional Bavarian chalets.",
		  malePrompt5: "A man wearing a traditional Russian kosovorotka and boots standing in a field with birch trees. The scene is pastoral and serene, with wildflowers and a clear blue sky.",
		  femalePrompt5: "A girl wearing a traditional Chinese qipao standing on a bridge over a river adorned with lanterns. The setting is romantic and cultural, with lanterns reflecting on the water.",
		  malePrompt6: "A man wearing a traditional Mexican guayabera standing against the backdrop of colorful buildings in a small town. The setting includes festive decorations and vibrant street life.",
		  femalePrompt6: "A girl wearing a traditional Russian kokoshnik and sarafan standing in a field with birch trees. The scene is pastoral and serene, with wildflowers and a clear blue sky.",
		  malePrompt7: "A man wearing a traditional Moroccan djellaba sitting on a carpet in a traditional courtyard. The courtyard features intricate tile work, fountains, and lush plants.",
		  femalePrompt7: "A girl wearing a traditional Mexican dress standing against the backdrop of colorful buildings in a small town. The setting includes festive decorations and vibrant street life.",
		  malePrompt8: "A man wearing a traditional Romanian folk costume standing against the backdrop of mountains and village houses. He is dressed in an embroidered shirt, a colorful belt, and traditional pants. The scene captures the rustic charm and cultural heritage of the Romanian countryside.",
		  femalePrompt8: "A girl wearing a traditional Moroccan caftan sitting on a carpet in a traditional courtyard. The courtyard features intricate tile work, fountains, and lush plants.",
		  malePrompt9: "A man wearing a traditional Greek chiton standing against the backdrop of ancient ruins. The scene includes iconic Greek columns and statues, creating a historical and classical atmosphere that highlights the rich heritage of ancient Greece.",
		  femalePrompt9: "A girl wearing a traditional Greek chiton standing frontally towards us, holding a laurel wreath. The setting includes ancient Greek columns and statues, creating a historical and classical atmosphere.",
		  malePrompt10: "A man wearing a traditional Mongolian deel standing against the backdrop of the vast steppes. The scene features rolling grassy plains, a clear blue sky, and traditional Mongolian yurts in the distance, capturing the nomadic heritage and natural beauty of Mongolia.",
		  femalePrompt10: "A girl wearing a traditional Romanian folk costume standing against the backdrop of mountains and village houses. She is dressed in an embroidered blouse, a colorful skirt, and a headscarf. The scene captures the rustic charm and cultural heritage of the Romanian countryside.",
		},
		{
		  name: "Wedding Style",
		  maleImage: weddingStyleMaleImg.src,
		  femaleImage: weddingStyleFemaleImg.src,
		  description: "This theme reflects the beauty and solemnity of the wedding day. Dress up in gorgeous wedding dresses and suits. Backgrounds can include wedding halls decorated for the wedding, flowering gardens, romantic beaches or luxurious castles, creating an atmosphere of joy, love and unity.",
		  malePrompt1: "A guy in a wedding suit standing in an elegant restaurant decorated for a wedding. The scene includes beautifully set tables, candlelight, and stunning centerpieces.",
		  femalePrompt1: "A girl in a wedding dress standing inside a beautifully decorated wedding venue, looking at us. The setting includes elegant floral arrangements, twinkling lights, and a grand staircase, highlighting the romantic atmosphere.",
		  malePrompt2: "A guy in a wedding suit standing in front of the Eiffel Tower. The romantic Parisian backdrop includes the iconic tower, twilight sky, and city lights.",
		  femalePrompt2: "A girl in a wedding dress standing in a beautiful garden decorated for a wedding. The garden is filled with blooming flowers, arches, and fairy lights, creating a picturesque and enchanting scene.",
		  malePrompt3: "A guy in a wedding suit standing inside an ancient castle decorated for a wedding. The setting includes historic architecture, candlelight, and elegant decorations, creating a magical atmosphere.",
		  femalePrompt3: "A girl in a wedding dress standing inside a beautiful house. The house is elegantly decorated, with stylish furniture and a warm, inviting atmosphere, perfect for a wedding celebration.",
		  malePrompt4: "A guy in a wedding suit standing against the backdrop of the Alpine mountains. The breathtaking scenery includes snow-capped peaks, lush greenery, and a clear blue sky.",
		  femalePrompt4: "A girl in a wedding dress standing in a restaurant decorated for a wedding. The restaurant features elegant table settings, floral arrangements, and romantic lighting, creating a sophisticated and festive ambiance.",
		  malePrompt5: "A guy in a wedding suit standing on the terrace of a villa overlooking the sea. The luxurious setting includes a stunning ocean view, elegant terrace furniture, and soft evening light.",
		  femalePrompt5: "A girl in a wedding dress standing in front of the Eiffel Tower. The romantic Parisian backdrop includes the iconic tower, twilight sky, and city lights.",
		  malePrompt6: "A guy in a wedding suit walking through a flower arch decorated for a wedding. The scene features vibrant flowers, green leaves, and a picturesque garden setting.",
		  femalePrompt6: "A girl in a wedding dress standing on a beach, looking at us. The serene scene includes soft sand, gentle waves, and the setting sun casting a warm glow.",
		  malePrompt7: "A guy in a wedding suit standing on a bridge in a park decorated for a wedding. The setting includes elegant floral arrangements, soft lighting, and a peaceful pond.",
		  femalePrompt7: "A girl in a wedding dress standing inside an ancient castle decorated for a wedding. The setting includes historic architecture, candlelight, and elegant decorations, creating a magical atmosphere.",
		  malePrompt8: "A guy in a wedding suit sitting in a carriage decorated for a wedding, looking at us. The carriage is adorned with flowers and ribbons, creating a fairytale-like scene.",
		  femalePrompt8: "A girl in a wedding dress standing against the backdrop of the Alpine mountains. The breathtaking scenery includes snow-capped peaks, lush greenery, and a clear blue sky.",
		  malePrompt9: "A guy in a wedding suit standing on a balcony of a castle decorated for a wedding, looking at us. The backdrop includes elegant decorations, soft lighting, and a view of the castle grounds.",
		  femalePrompt9: "A girl in a wedding dress sitting in a carriage decorated for a wedding, looking at us. The carriage is adorned with flowers and ribbons, creating a fairytale-like scene.",
		  malePrompt10: "A guy in a wedding suit standing at an altar decorated for a wedding, looking at us. The scene includes a stunning sunset backdrop, elegant floral arrangements, and soft candlelight, creating a romantic and serene atmosphere.",
		  femalePrompt10: "A girl in a revealing wedding corset and long skirt sitting on a bed in a luxurious bedroom decorated for a wedding. The outfit highlights her curves and features delicate lace and satin. The bedroom is lavishly decorated with soft lighting, flower petals, and elegant furnishings, creating an intimate and romantic atmosphere.",
		},
		{
		  name: "Vampire",
		  maleImage: vampireMaleImg.src,
		  femaleImage: vampireFemaleImg.src,
		  description: "A dark and mysterious theme in which you can be represented as vampires. This includes images such as: gothic outfits, cloaks, sharp fangs and glowing eyes. Backgrounds can be dark and mysterious - abandoned castles, night forests, graveyards and foggy streets, creating an atmosphere of mysticism and the supernatural.",
		  malePrompt1: "A male vampire in a gothic suit standing against the backdrop of an ancient castle, looking at us with a piercing gaze. The moonlight casts eerie shadows, and bats fly overhead, enhancing the dark atmosphere.",
		  femalePrompt1: "A female vampire in a gothic dress standing against the backdrop of an ancient castle, looking at us with a piercing gaze. The moonlight casts eerie shadows, and bats fly overhead, enhancing the dark atmosphere.",
		  malePrompt2: "A male vampire in a black cloak sitting on a throne in a sinister castle, holding a goblet of blood. The dimly lit room is filled with ancient artifacts and an aura of dark elegance.",
		  femalePrompt2: "A female vampire in a red silk dress sitting on a throne in a sinister castle, holding a goblet of blood. The dimly lit room is filled with ancient artifacts and an aura of dark elegance.",
		  malePrompt3: "A male vampire in a leather jacket standing on a rooftop, looking over the nighttime city. The city lights below contrast with the dark, mysterious figure above.",
		  femalePrompt3: "A female vampire in a black leather outfit standing on a rooftop, looking over the nighttime city. The city lights below contrast with the dark, mysterious figure above.",
		  malePrompt4: "A male vampire with long fangs and blood-red eyes walking through a dark forest. The moonlight filters through the trees, casting a haunting glow on his path.",
		  femalePrompt4: "A female vampire with long fangs and blood-red eyes walking through a dark forest. The moonlight filters through the trees, casting a haunting glow on her path.",
		  malePrompt5: "A male vampire in a silk robe sitting by the fireplace in a luxurious library, holding a book of spells. The room is filled with ancient books, dark wood, and an air of mystery.",
		  femalePrompt5: "A female vampire in an antique Victorian dress standing by a window, looking at us with the moon in the background. The setting is rich with historical details and a sense of timeless elegance.",
		  malePrompt6: "A male vampire in a black cloak walking through a cemetery, looking at us with a mysterious smile. The tombstones and fog create a chilling and atmospheric scene.",
		  femalePrompt6: "A female vampire in a silk robe sitting by the fireplace in a luxurious library, holding a book of spells. The room is filled with ancient books, dark wood, and an air of mystery.",
		  malePrompt7: "A male vampire in a long black coat standing on top of a hill, looking at us with a piercing gaze. The full moon illuminates the dark landscape, casting an eerie glow.",
		  femalePrompt7: "A female vampire in a gothic corset and skirt standing by the altar in an abandoned church. The decaying interior and broken stained glass windows add to the eerie and haunting ambiance.",
		  malePrompt8: "A male vampire in a leather coat walking through a nighttime city, looking at us with a mysterious smile. The city lights and dark alleys add to the urban gothic atmosphere.",
		  femalePrompt8: "A female vampire in a long black dress sitting on a marble tombstone, looking at us with a piercing gaze. The graveyard is shrouded in mist, with ancient tombstones and eerie silence enhancing the chilling atmosphere.",
		  malePrompt9: "A male vampire with long black hair and fangs sitting on a throne in a castle hall, surrounded by candles. The flickering flames cast eerie shadows, highlighting his regal and ominous presence.",
		  femalePrompt9: "A female vampire with long fangs and blood-red lips sitting in an armchair in an old library. The room is filled with ancient books, dark wood, and a sense of timeless knowledge and power.",
		  malePrompt10: "A male vampire in a velvet cloak and tall boots standing on a bridge over a raging river, his gaze filled with power and determination. The turbulent water and moonlit sky enhance the dramatic and intense scene.",
		  femalePrompt10: "A female vampire in a long black veil standing on a bridge on a foggy night, gazing at the river below. The mist and dim streetlights create a hauntingly beautiful scene.",
		},
		{
		  name: "Doctor",
		  maleImage: doctorMaleImg.src,
		  femaleImage: doctorFemaleImg.src,
		  description: "This theme focuses on medical professionals, heroes in white coats and medical uniforms. You can be featured in working environments such as hospitals, operating theatres, and diagnostic rooms. The backgrounds include sterile and organised medical spaces, conveying an atmosphere of responsibility, care and science.",
		  malePrompt1: "A male nurse in a white medical coat standing by a hospital window, holding a medical chart and looking at us with a focused expression. The setting is serene with sunlight streaming in.",
		  femalePrompt1: "A female nurse in a white medical coat standing by a hospital window, holding a medical chart and looking at us with a warm smile. The setting is serene with sunlight streaming in.",
		  malePrompt2: "A male nurse in uniform sitting at a desk in a medical office, filling out medical records. The scene is calm, with various medical instruments and documents around him.",
		  femalePrompt2: "A female nurse in uniform sitting at a desk in a medical office, filling out medical records. The scene is calm, with various medical instruments and documents around her.",
		  malePrompt3: "A male doctor in a white coat holding a stethoscope, ready to examine a patient. The room is well-lit, with medical posters and diagrams on the walls.",
		  femalePrompt3: "A female doctor in a white coat holding a stethoscope, ready to examine a patient. The room is well-lit, with medical posters and diagrams on the walls.",
		  malePrompt4: "A male nurse with a stethoscope around his neck walking down a hospital corridor, heading to his next patient. The corridor is bright and clean, with signs indicating different wards.",
		  femalePrompt4: "A female nurse with a stethoscope around her neck walking down a hospital corridor, heading to her next patient. The corridor is bright and clean, with signs indicating different wards.",
		  malePrompt5: "A male doctor wearing glasses examining an X-ray on a lightbox in a diagnostic room. The setting includes various medical devices and a focused atmosphere.",
		  femalePrompt5: "A female doctor wearing glasses examining an X-ray on a lightbox in a diagnostic room. The setting includes various medical devices and a focused atmosphere.",
		  malePrompt6: "A male doctor in lab attire conducting tests in a medical laboratory, carefully analyzing the results. The lab is equipped with advanced technology and various samples.",
		  femalePrompt6: "A female doctor in lab attire conducting tests in a medical laboratory, carefully analyzing the results. The lab is equipped with advanced technology and various samples.",
		  malePrompt7: "A male doctor in a white coat taking notes in a notebook while standing by his desk in his office. The office is filled with books, medical journals, and certificates on the walls.",
		  femalePrompt7: "A female nurse in uniform sitting on a stool, ready to administer an injection, holding a syringe in her hands. The room is sterile and well-organized, with medical supplies neatly arranged.",
		  malePrompt8: "A male doctor in a white coat with a serious expression standing in front of a board filled with medical diagrams, making notes. The room is well-organized with charts and reference materials around.",
		  femalePrompt8: "A female doctor in a white coat taking notes in a notebook while standing by her desk in her office. The office is filled with books, medical journals, and certificates on the walls.",
		  malePrompt9: "A male nurse in uniform standing in a hospital pharmacy, gathering necessary medications for a patient. The background includes shelves filled with medicines and labeled containers.",
		  femalePrompt9: "A female nurse in uniform holding a first aid bag, preparing to respond to an emergency call in an ambulance. The scene is urgent, with the ambulance's lights flashing and the doors ready to be closed.",
		  malePrompt10: "A male nurse in uniform holding a first aid bag, preparing to respond to an emergency call in an ambulance. The scene is urgent, with the ambulance's lights flashing and the doors ready to be closed.",
		  femalePrompt10: "A female nurse with a tablet in hand sitting in a break room, taking a moment to relax between shifts. The room is cozy, with a few personal touches like a coffee mug and a soft chair.",
		}
	  ];

	  const toggleFavoriteModel = async (model: string) => {
		try {
			// Optimistically update the UI
			setFavoriteModels(prevFavorites => {
				if (prevFavorites.includes(model)) {
					return prevFavorites.filter(favModel => favModel !== model);
				} else {
					return [...prevFavorites, model];
				}
			});
	
			// Perform the fetch operation to update the server
			const toggleFavoriteResponse = await fetch('/api/models/favorites/toggle', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					userId: session?.user?.id,
					model,
				})
			});
	
			const toggleData = await toggleFavoriteResponse.json();
			if (toggleData.message !== 'Favorite models updated successfully') throw new Error(toggleData.message);
	
			// Update session user favoriteModels
			await fetchUpdatedUserData();
		} catch (error) {
			console.error('Error updating user favorite models:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const getFavoriteModels = () => {
		if (!favoriteModels) return [];
		return favoriteModels.map(favModel => modelData.find(model => model.name === favModel));
	};

	const [essentialSelectedKeys, setEssentialSelectedKeys] = React.useState<Set<React.Key>>(new Set([""]));
	const [advancedSelectedKeys, setAdvancedSelectedKeys] = React.useState<Set<React.Key>>(new Set([""]));
	const [collectionSelectedKeys, setCollectionSelectedKeys] = React.useState<Set<React.Key>>(new Set(["1"]));

    const defaultNegativePrompt = "ugly, deformed, noisy, blurry, low contrast, bad anatomy, watermark, text";
	const [userPrompt, setUserPrompt] = useState<string>("");
	const [userAdvancedPrompt, setUserAdvancedPrompt] = useState<string>("");
	const [userNegativePrompt, setUserNegativePrompt] = useState<string>(defaultNegativePrompt);
	const [userMaskPrompt, setUserMaskPrompt] = useState<string>("");
	const [imagesAdvancedNumber, setImagesAdvancedNumber] = useState<number>(2);

	const [currentStyle, setCurrentStyle] = useState("Photorealism");	
	const [currentStyleAdvanced, setCurrentStyleAdvanced] = useState("Photorealism");	
	const [selectedResolution, setSelectedResolution] = useState("2:3");
	const [selectedAdvancedResolution, setSelectedAdvancedResolution] = useState("2:3");
	const [imagesNumber, setImagesNumber] = useState<number>(2);
	const [imagesStepsNumber, setImagesStepsNumber] = useState<number>(30);
	const [imagesGuidanceNumber, setImagesGuidanceNumber] = useState<number>(9);
	const [imageStrengthNumber, setImageStrengthNumber] = useState<number>(0.4);
	const [selectedSimilarity, setSelectedSimilarity] = useState<number>(3);
	const [advancedSelectedSimilarity, setAdvancedSelectedSimilarity] = useState<number>(3);

	const [imagesResolutionParam, setImagesResolutionParam] = useState<ResolutionLabel>("HD");
	const [imagesUpscaleParam, setImagesUpscaleParam] = useState<UpscaleLabel>("2x");
	const [imagesUpscaleParamAdvanced, setImagesUpscaleParamAdvanced] = useState<UpscaleLabel>("2x");
	
	const [selectedSampler, setSelectedSampler] = useState<string>("");

	const [selectedModelId, setSelectedModelId] = useState<number>(0);
	const [selectedWeightsInterpretatorId, setSelectedWeightsInterpretatorId] = useState<number>(1);

    const [stepsAdvancedNumber, setStepsAdvancedNumber] = useState<number>(30);

    const [cfgAdvancedNumber, setCfgAdvancedNumber] = useState<number>(4);
	const [denoiseEssentialNumber, setDenoiseEssentialNumber] = useState<number>(1);
	const [denoiseAdvancedNumber, setDenoiseAdvancedNumber] = useState<number>(1);
	const [facelockWeightNumber, setFacelockWeightNumber] = useState<number>(1);
	const [facelockWeightNumberAdvanced, setFacelockWeightNumberAdvanced] = useState<number>(1);
	const [poseAdvancedNumber, setPoseAdvancedNumber] = useState<number>(1);


	const [imageName, setImageName] = useState<string>("");
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [uploadedFacelockImage, setUploadedFacelockImage] = useState<string | null>(null);
	const [advancedUploadedImage, setAdvancedUploadedImage] = useState<string | null>(null);
	const [advancedPoseImage, setAdvancedPoseImage] = useState<string | null>(null);
	const [advancedMaskImage, setAdvancedMaskImage] = useState<string | null>(null);
	const [advancedMaskBaseImage, setAdvancedMaskBaseImage] = useState<string | null>(null);
    const [advancedFacelockUploadedImage, setAdvancedFacelockUploadedImage] = useState<string | null>(null);

	const [isFeedbackModalShown, setIsFeedbackModalShown] = useState(false);
	const feedbackModalShownRef = useRef(false);

	useEffect(() => {
		feedbackModalShownRef.current = isFeedbackModalShown;
	}, [isFeedbackModalShown]);
	
	const [displayedImages, setDisplayedImages] = useState<string[]>([]);
	const [isSeedOpen, setIsSeedOpen] = useState(false);
	const [isPromptOpen, setIsPromptOpen] = useState(false);
	const [isMaskPromptOpen, setIsMaskPromptOpen] = useState(false);
	const [isSamplerOpen, setIsSamplerOpen] = useState(false);
	const [isImageNumberOpen, setIsImageNumberOpen] = useState(false);
    const [isImageStepsOpen, setIsImageStepsOpen] = useState(false);
	const [isFacelockWeightOpen, setIsFacelockWeightOpen] = useState(false);
	const [isFacelockWeightOpenAdvanced, setIsFacelockWeightOpenAdvanced] = useState(false);
	const [isFacelockWeightOpenCollection, setIsFacelockWeightOpenCollection] = useState(false);
    const [isImageCfgOpen, setIsImageCfgOpen] = useState(false);
	const [isWeightsInterpretatorOpen, setIsWeightsInterpretatorOpen] = useState(false);
	const [isMaskImageOpen, setIsMaskImageOpen] = useState(false);
	const [isMaskImageBaseOpen, setIsMaskImageBaseOpen] = useState(false);
	const [isImageDenoiseOpen, setIsImageDenoiseOpen] = useState(false);
	const [isImageDenoiseOpenAdvanced, setIsImageDenoiseOpenAdvanced] = useState(false);
	const [isImagePoseOpen, setIsImagePoseOpen] = useState(false);
	const [isAdvancedStepsOpen, setIsAdvancedStepsOpen] = useState(false);
	const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);
	const [isStrengthOpen, setIsStrengthOpen] = useState(false);
	const [isHighResSelected, setIsHighResSelected] = useState(false);

	const [isNegativePromptOpen, setIsNegativePromptOpen] = useState(false);
	const [seed, setSeed] = useState('1');
	const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);

	const [showUpgradeLink, setShowUpgradeLink] = useState(false);
	const [showAdvancedUpgradeLink, setAdvancedShowUpgradeLink] = useState(false);
	const [advancedResolutionShowUpgradeLink, setAdvancedResolutionShowUpgradeLink] = useState(false);

	const {
        isOpen: isImagetModalOpen,
        onOpen: openImageModal,
        onClose: closeModal
    } = useDisclosure();

    const {
        isOpen: isModelModalOpen,
        onOpen: openModelModal,
        onClose: closeModelModal
    } = useDisclosure();

	const {
        isOpen: isCanvasModalOpen,
        onOpen: openCanvasModal,
        onClose: closeCanvasModal
    } = useDisclosure();

	// const { isOpen, onOpen, onClose } = useDisclosure();

	const [activeTab, setActiveTab] = useState<string>("inpaint");
	const [activeTabCanvas, setActiveTabCanvas] = useState<string>("canvas");
	const [activeTabInpaint, setActiveTabInpaint] = useState<string>("canvas");


	const [activeModelTab, setActiveModelTab] = useState<string>("models");

	const handleEssentialSelectionChange = (keys: "all" | Set<React.Key>) => {
		if (keys === "all") {
		  // Handle the "all" case if necessary
		} else {
			setEssentialSelectedKeys(keys);
		}
	};

	const handleCollectionSelectionChange = (keys: "all" | Set<React.Key>) => {
		if (keys === "all") {
		  // Handle the "all" case if necessary
		} else {
			setCollectionSelectedKeys(keys);
		}
	};

	  const handleFaceLockSelectionChangeButton = () => {
		if (activeTab === 'essential') {
			setEssentialSelectedKeys(prevKeys => {
				const newKeys = new Set(prevKeys);
				const facelockKey = '2';
				if (newKeys.has(facelockKey)) {
				  	// console.log('Reuse iamge');
					// newKeys.delete(facelockKey);  // If already open, close it
				} else {
				  newKeys.add(facelockKey);    // Otherwise, open it
				}
				return newKeys;
			  });
		} else if (activeTab === 'advanced') {
			setAdvancedSelectedKeys(prevKeys => {
				const newKeys = new Set(prevKeys);
				const facelockKey = '2';
				if (newKeys.has(facelockKey)) {
					// console.log('Reuse iamge');
				  	// newKeys.delete(facelockKey);  // If already open, close it
				} else {
				  newKeys.add(facelockKey);    // Otherwise, open it
				}
				return newKeys;
			  });
		}
		
	  };

	const handleAdvancedSelectionChange = (keys: "all" | Set<React.Key>) => {
		if (keys === "all") {
		  // Handle the "all" case if necessary
		} else {
			setAdvancedSelectedKeys(keys);
		}
	  };

	const removeKeyZero = () => {
		if (advancedSelectedKeys.has("0")) {
		  const newKeys = new Set(advancedSelectedKeys);
		  newKeys.delete("0");
		  setAdvancedSelectedKeys(newKeys);
		}
	};

	const closeModelModalAndSimulateClick = () => {
		closeModelModal(); // Close the modal
		removeKeyZero(); // Remove key "0" from advancedSelectedKeys
	  };

	const closeCanvasModalAndSimulateClick = () => {
		closeCanvasModal();
	};
	
	const resetEssentialDefaults = () => {
		setUserPrompt("");
		setCurrentStyle("Photorealism");
		setSelectedResolution("2:3");
		setImagesNumber(2);
		setIsHighResSelected(false);
		clearImage();
        clearFacelockImage();
		setDenoiseEssentialNumber(1);
		setFacelockWeightNumber(1);
		setSelectedFacelockType(new Set(["faceswap"]));
		setSelectedReferenceType(new Set(["Character / FaceLock"]));
		setImagesUpscaleParam("2x");

		setSelectedGenderType(new Set(["Woman"]));
		setSelectedHairType(new Set(["Blonde"]));
		setSelectedEthnicityType(new Set(["European"]))

		setUserAdvancedPrompt("");
		setUserNegativePrompt(defaultNegativePrompt);
		setImagesStepsNumber(30);
		setImagesGuidanceNumber(9);
		setImageStrengthNumber(0.4);
		setSelectedSimilarity(3);
		setSelectedSampler("");
		setSeed('');
		clearAdvancedImage();
		clearAdvancedFacelockImage();
		clearAdvancedPoseImage();
		clearAdvancedMaskImage();
		clearAdvancedMaskBaseImage();
        setStepsAdvancedNumber(30);
		setCfgAdvancedNumber(4);
		setAdvancedSelectedSimilarity(3);
		setDenoiseAdvancedNumber(1);
		setPoseAdvancedNumber(1);
		setFacelockWeightNumberAdvanced(1);
		setSelectedAdvancedResolution("2:3");
		setSelectedModel(new Set(["realism_inpaint"]));
		setCurrentStyleAdvanced("Photorealism");
		setSelectedWeightsInterpretator(new Set(["Lite"]));
		setSelectedFacelockTypeAdvanced(new Set(["faceswap"]));
		setSelectedReferenceTypeAdvanced(new Set(["Character / FaceLock"]));
		setImagesUpscaleParamAdvanced("2x");
		setImagesAdvancedNumber(2);
		setImagesResolutionParam('HD');
		setSelectedModelId(0);
	};
	
	const resetAdvancedDefaults = () => {
		setUserPrompt("");
		setCurrentStyle("Photorealism");
		setSelectedResolution("2:3");
		setImagesNumber(2);
		setIsHighResSelected(false);
		clearImage();
        clearFacelockImage();
		setDenoiseEssentialNumber(1);
		setFacelockWeightNumber(1);
		setSelectedFacelockType(new Set(["faceswap"]));
		setSelectedReferenceType(new Set(["Character / FaceLock"]));
		setImagesUpscaleParam("2x");

		setUserAdvancedPrompt("");
		setUserNegativePrompt(defaultNegativePrompt);
		setImagesStepsNumber(30);
		setImagesGuidanceNumber(9);
		setImageStrengthNumber(0.4);
		setSelectedSimilarity(3);
		setSelectedSampler("");
		setSeed('');
		clearAdvancedImage();
		clearAdvancedFacelockImage();
		clearAdvancedPoseImage();
		clearAdvancedMaskImage();
		clearAdvancedMaskBaseImage();
        setStepsAdvancedNumber(30);
		setCfgAdvancedNumber(4);
		setAdvancedSelectedSimilarity(3);
		setDenoiseAdvancedNumber(1);
		setPoseAdvancedNumber(1);
		setFacelockWeightNumberAdvanced(1);
		setSelectedAdvancedResolution("2:3");
		setSelectedModel(new Set(["realism_inpaint"]));
		setCurrentStyleAdvanced("Photorealism");
		setSelectedWeightsInterpretator(new Set(["Lite"]));
		setSelectedFacelockTypeAdvanced(new Set(["faceswap"]));
		setSelectedReferenceTypeAdvanced(new Set(["Character / FaceLock"]));
		setImagesUpscaleParamAdvanced("2x");
		setImagesAdvancedNumber(2);
		setImagesResolutionParam('HD');
		setSelectedModelId(0);
	};

	const handlePromptChange = (value: string) => {
		setUserPrompt(value);
		if (value.length === 1000) {
		  // Alert the user
		  toast.warn('You have reached the maximum character limit of 1000.', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		  });
		}
	};

	const handleAdvancedPromptChange = (value: string) => {
		setUserAdvancedPrompt(value);
		if (value.length === 1000) {
		  // Alert the user
		  toast.warn('You have reached the maximum character limit of 1000.', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		  });
		}
	};

	const handleNegativePromptChange = (value: string) => {
		setUserNegativePrompt(value);
		if (value.length === 500) {
		  // Alert the user
		  toast.warn('You have reached the maximum character limit of 500.', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		  });
		}
	};

	const handleAdvancedMaskPromptChange = (value: string) => {
		setUserMaskPrompt(value);
		if (value.length === 1000) {
		  // Alert the user
		  toast.warn('You have reached the maximum character limit of 1000.', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		  });
		}
	};

	const handleSamplerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSampler(e.target.value);
	};

	const openModalWithImage = (image: ImageData) => {
		const index = userImages.findIndex(img => img._id === image._id);
		setSelectedImage(image);
		setCurrentIndex(index);
		openImageModal();
	};

	const closeImageModal = () => {
		closeModal();
		setSelectedImage(null);
		setCurrentIndex(null);
	};

	const showPreviousImage = () => {
		// console.log("showPreviousImage")
		if (currentIndex !== null && currentIndex > 0) {
			const newIndex = currentIndex - 1;
			setSelectedImage(userImages[newIndex]);
			setCurrentIndex(newIndex);
		}
	};
	
	const showNextImage = () => {
		// console.log("showNextImage")
		if (currentIndex !== null && currentIndex < userImages.length - 1) {
			const newIndex = currentIndex + 1;
			setSelectedImage(userImages[newIndex]);
			setCurrentIndex(newIndex);
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (isImagetModalOpen) {
				if (event.key === 'ArrowLeft') {
					showPreviousImage();
				} else if (event.key === 'ArrowRight') {
					showNextImage();
				}
			}
		};
	
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [currentIndex, userImages, isImagetModalOpen]);

	// const [startX, setStartX] = useState(0);
	// const [startY, setStartY] = useState(0);
	// const [endX, setEndX] = useState(0);
	// const [endY, setEndY] = useState(0);

	// const handleTouchStart = (e: React.TouchEvent) => {
	// 	setStartX(e.touches[0].clientX);
	// 	setStartY(e.touches[0].clientY);
	//   };
	
	//   const handleTouchMove = (e: React.TouchEvent) => {
	// 	setEndX(e.touches[0].clientX);
	// 	setEndY(e.touches[0].clientY);
	//   };
	
	//   const handleTouchEnd = () => {
	// 	const deltaX = startX - endX;
	// 	const deltaY = startY - endY;
	
	// 	if (Math.abs(deltaX) > Math.abs(deltaY)) {
	// 	  if (deltaX > 50) {
	// 		showNextImage();
	// 	  } else if (deltaX < -50) {
	// 		showPreviousImage();
	// 	  }
	// 	}
	
	// 	setStartX(0);
	// 	setStartY(0);
	// 	setEndX(0);
	// 	setEndY(0);
	//   };

	const openModalWithModels = () => {
		openModelModal();
	};

	const openModalWithCanvas = () => {
		openCanvasModal();
	};

	const handleSelectModel = (modelId: number) => {
		setSelectedModelId(modelId);
	};

	const handleSelectModelByName = (modelName: string) => {
		const modelIndex = modelData.findIndex(model => model.name === modelName);
		if (modelIndex !== -1) {
			setSelectedModelId(modelIndex);
		} else {
			console.error(`Model with name ${modelName} not found in modelData`);
		}
	};
	
	const handleSelectWeightsInterpretator = (weightsInterpretatorId: number) => {
		setSelectedWeightsInterpretatorId(weightsInterpretatorId);
	};

	const imageUrls = [
		aiAnimeImg.src,
		aiHeadImg.src,
		aiPhotoImg.src,
		aiStockImg.src,
	  ];

	const now = new Date();
	const formattedDate = now.toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});

    // Define resolutions
    const resolutions: Resolution = {
        "1:1": "1280x1280",
        "4:5": "1024x1280",
        "2:3": "856x1280",
        "4:7": "736x1280",
        "5:4": "1280x1024",
        "3:2": "1280x856",
        "7:4": "1280x736",
    };

	const samplers: string[] = [
		"Euler Ancestral",
		"Euler",
		"LMS",
		"LMS Karras",
		"DPM-Solver++",
		"DPM-Solver++ Karras",
		"DPM++ 2M SDE",
		"DPM++ 2M SDE Karras",
		"PLMS",
		"DDIM",
		"KDPM",
		"KDPM Ancestral",
		"Heun",
		"UniPC",
		"DEIS",
		"KDPM Karras",
		"KDPM Karras Ancestral"
	  ];


	const [isSubmitting, setIsSubmitting] = useState(false);
    
    const generationModels = ["realism", "realism_inpaint"];
    const [selectedModel, setSelectedModel] = useState<Selection>(new Set(["realism_inpaint"]));
    const selectedModelString = Array.from(selectedModel).length ? Array.from(selectedModel)[0].toString() : "realism_inpaint";

	const weightsInterpretators = ["Lite", "Pro"];
	const [selectedWeightsInterpretator, setSelectedWeightsInterpretator] = useState<Selection>(new Set(["Lite"]));
	const selectedWeightsInterpretatorString = Array.from(selectedWeightsInterpretator).length ? Array.from(selectedWeightsInterpretator)[0].toString() : "Lite";

	const facelockTypes = ["instant", "faceswap", "full"];
	const [selectedFacelockType, setSelectedFacelockType] = useState<Selection>(new Set(["faceswap"]));
	const selectedFacelockTypeString = Array.from(selectedFacelockType).length ? Array.from(selectedFacelockType)[0].toString() : "faceswap";

	const facelockTypesAdvanced = ["instant", "faceswap", "full"];
	const [selectedFacelockTypeAdvanced, setSelectedFacelockTypeAdvanced] = useState<Selection>(new Set(["faceswap"]));
	const selectedFacelockTypeStringAdvanced = Array.from(selectedFacelockTypeAdvanced).length ? Array.from(selectedFacelockTypeAdvanced)[0].toString() : "faceswap";
	
	const referenceTypes = ["Character / FaceLock", "Image to Image", "Image Upscale"];
	const [selectedReferenceType, setSelectedReferenceType] = useState<Selection>(new Set(["Character / FaceLock"]));
	const selectedReferenceTypeString = Array.from(selectedReferenceType).length ? Array.from(selectedReferenceType)[0].toString() : "Character / FaceLock";

	const referenceTypesAdvanced = ["Character / FaceLock", "Image to Image", "Image Upscale"];
	const [selectedReferenceTypeAdvanced, setSelectedReferenceTypeAdvanced] = useState<Selection>(new Set(["Character / FaceLock"]));
	const selectedReferenceTypeStringAdvanced = Array.from(selectedReferenceTypeAdvanced).length ? Array.from(selectedReferenceTypeAdvanced)[0].toString() : "Character / FaceLock";

	// Variables for collection
	const [imagesNumberCollection, setImagesNumberCollection] = useState<number>(30);
	const [imagesNumberPerCollectionPrompt, setImagesNumberPerCollectionPrompt] = useState<number>(3);

	const genderTypes = ["Woman", "Man"];
	const [selectedGenderType, setSelectedGenderType] = useState<Selection>(new Set(["Woman"]));
	const selectedGenderTypeString = Array.from(selectedGenderType).length ? Array.from(selectedGenderType)[0].toString() : "Woman";

	const hairTypes = ["Blonde", "Brunette", "Red", "Gray"];
	const [selectedHairType, setSelectedHairType] = useState<Selection>(new Set(["Blonde"]));
	const selectedHairTypeString = Array.from(selectedHairType).length ? Array.from(selectedHairType)[0].toString() : "Blonde";

	const ethnicityTypes = ["European", "Asian", "African", "Latino"];
	const [selectedEthnicityType, setSelectedEthnicityType] = useState<Selection>(new Set(["European"]));
	const selectedEthnicityTypeString = Array.from(selectedEthnicityType).length ? Array.from(selectedEthnicityType)[0].toString() : "European";

	const [selectedCollectionId, setSelectedCollectionId] = useState<number>(0);

	const handleSelectCollection = (collectionId: number) => {
		setSelectedCollectionId(collectionId);
	};

	const handleCollectionByName = (collectionName: string) => {
		const collectionIndex = collectionData.findIndex(collection => collection.name === collectionName);
		if (collectionIndex !== -1) {
			setSelectedCollectionId(collectionIndex);
		} else {
			console.error(`Model with name ${collectionName} not found in modelData`);
		}
	};


	const {
		isOpen: isLoginModalOpen,
		onOpen: openLoginModal,
		onClose: toggleLoginModal,
	} = useDisclosure();


	// Function to handle resolution selection
    const handleResolutionSelect = (resolution: string) => {
        setSelectedResolution(resolution);
    };

	const handleAdvancedResolutionSelect = (resolution: string) => {
        setSelectedAdvancedResolution(resolution);
    };


	// Function to handle slider value change
	const handleSliderChange = (value: number | number[]) => {
		let newValue = Array.isArray(value) ? value[0] : value;

		let maxImages;
		switch (session?.user?.subscription) {
			case "Max":
				maxImages = NEXT_PUBLIC_MAX_PLAN_IMAGES;
				break;
			case "Pro":
				maxImages = NEXT_PUBLIC_PRO_PLAN_IMAGES;
				break;
			case "Free":
			default:
				maxImages = NEXT_PUBLIC_FREE_PLAN_IMAGES;
				break;
		}

		if (newValue > maxImages) {
		  // This condition will check if the slider value is more than 2
		  newValue = maxImages;
		  setShowUpgradeLink(true); // This state will control the display of the link
		} else {
		  setImagesNumber(newValue);
		  setShowUpgradeLink(false);
		}
		setImagesNumber(newValue);
		// console.log(imagesNumber);
	};

	const handleAdvancedSliderChange = (value: number | number[]) => {
		let newValue = Array.isArray(value) ? value[0] : value;

		let maxImages;
		switch (session?.user?.subscription) {
			case "Max":
				maxImages = NEXT_PUBLIC_MAX_PLAN_IMAGES;
				break;
			case "Pro":
				maxImages = NEXT_PUBLIC_PRO_PLAN_IMAGES;
				break;
			case "Free":
			default:
				maxImages = NEXT_PUBLIC_FREE_PLAN_IMAGES;
				break;
		}

		if (newValue > maxImages) {
		  // This condition will check if the slider value is more than 2
		  newValue = maxImages;
		  setAdvancedShowUpgradeLink(true); // This state will control the display of the link
		} else {
		  setImagesAdvancedNumber(newValue);
		  setAdvancedShowUpgradeLink(false);
		}
		setImagesAdvancedNumber(newValue);
		// console.log(imagesNumber);
	};

	// Function to handle slider value change
	const handleSimilaritySliderChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
			setSelectedSimilarity(value[0]);
		} else {
			setSelectedSimilarity(value);
		}
	};

	const handleAdvancedSimilaritySliderChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
			setAdvancedSelectedSimilarity(value[0]);
		} else {
			setAdvancedSelectedSimilarity(value);
		}
	};

	interface ResolutionLabels {
		[key: number]: string;
	}

	type ResolutionLabel = 'HD' | '2K' | '4K';

	const resolutionPrices: Record<ResolutionLabel, number> = {
		"HD": 1,
		"2K": 2,
		"4K": 4
	};

	const resolutionValueMap: { [key in ResolutionLabel]: number } = {
		"HD": 1,
		"2K": 2,
		"4K": 3
	};

	const handleImageResolutionSliderChange = (value: number | number[]) => {
		const resolutionLabels: { [key: number]: ResolutionLabel } = {
			1: "HD",
			2: "2K",
			3: "4K"
		};

		let resolutionValue = Array.isArray(value) ? value[0] : value;

		let maxResolutionLevel;
		switch (session?.user?.subscription) {
			case "Max":
			maxResolutionLevel = 3;
			break;
			case "Pro":
			maxResolutionLevel = 2;
			break;
			case "Free":
			default:
			maxResolutionLevel = 1;
			break;
		}

		if (resolutionValue > maxResolutionLevel) {
			resolutionValue = maxResolutionLevel;
			setAdvancedResolutionShowUpgradeLink(true);
		  } else {
			setAdvancedResolutionShowUpgradeLink(false);
		  }

		const resolutionLabel = resolutionLabels[resolutionValue];
		setImagesResolutionParam(resolutionLabel);
	};

	interface UpscaleLabels {
		[key: number]: string;
	}

	type UpscaleLabel = '2x' | '4x';

	const upscaleValueMap: { [key in UpscaleLabel]: number } = {
		"2x": 1,
		"4x": 2
	};

	const handleImageUpscaleSliderChange = (value: number | number[]) => {
		const UpscaleLabels: { [key: number]: UpscaleLabel } = {
			1: "2x",
			2: "4x"
		};

		let upscaleValue = Array.isArray(value) ? value[0] : value;

		const resolutionLabel = UpscaleLabels[upscaleValue];
		setImagesUpscaleParam(resolutionLabel);
	};

	type UpscaleLabelAdvanced = '2x' | '4x';

	const upscaleValueMapAdvanced: { [key in UpscaleLabel]: number } = {
		"2x": 1,
		"4x": 2
	};
	
	const handleImageUpscaleSliderChangeAdvanced = (value: number | number[]) => {
		const UpscaleLabelAdvanceds: { [key: number]: UpscaleLabelAdvanced } = {
			1: "2x",
			2: "4x"
		};

		let upscaleValue = Array.isArray(value) ? value[0] : value;

		const resolutionLabel = UpscaleLabelAdvanceds[upscaleValue];
		setImagesUpscaleParamAdvanced(resolutionLabel);
	};

	const handleSliderStepsChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
		  setImagesStepsNumber(value[0]);
		} else {
			setImagesStepsNumber(value);
		}
	};

    const handleAdvancedStepsSliderChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
		  setStepsAdvancedNumber(value[0]);
		} else {
			setStepsAdvancedNumber(value);
		}
	};

	const handleEssentialFacelockWeightSliderChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
			setFacelockWeightNumber(value[0]);
		} else {
			setFacelockWeightNumber(value);
		}
	};

	const handleAdvancedFacelockWeightSliderChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
			setFacelockWeightNumberAdvanced(value[0]);
		} else {
			setFacelockWeightNumberAdvanced(value);
		}
	};

    const handleAdvancedCfgSliderChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
		  setCfgAdvancedNumber(value[0]);
		} else {
			setCfgAdvancedNumber(value);
		}
	};

	const handleEssentialDenoiseSliderChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
			setDenoiseEssentialNumber(value[0]);
		} else {
			setDenoiseEssentialNumber(value);
		}
	};

	const handleAdvancedDenoiseSliderChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
			setDenoiseAdvancedNumber(value[0]);
		} else {
			setDenoiseAdvancedNumber(value);
		}
	};

	const handleAdvancedPoseSliderChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
			setPoseAdvancedNumber(value[0]);
		} else {
			setPoseAdvancedNumber(value);
		}
	};


	const handleGuidanceChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
		  setImagesGuidanceNumber(value[0]);
		} else {
			setImagesGuidanceNumber(value);
		}
	};

    const handleImageStepsSliderChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
		  setImagesGuidanceNumber(value[0]);
		} else {
			setImagesGuidanceNumber(value);
		}
	};

	const handleStrengthChange = (value: number | number[]) => {
		if (Array.isArray(value)) {
			setImageStrengthNumber(value[0]);
		} else {
			setImageStrengthNumber(value);
		}
	};

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
		    setUploadedImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

    const handleFacelockImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
		    setUploadedFacelockImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

	const handleAdvancedImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
		    setAdvancedUploadedImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

	const handleAdvancedPoseImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!poseAllowed) return;
		const file = event.target.files && event.target.files[0];
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
		    setAdvancedPoseImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

	const handleAdvancedMaskImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
		    setAdvancedMaskImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		  openModalWithCanvas();
		}
	};

	const handleAdvancedMaskBaseImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
		    setAdvancedMaskBaseImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

    const handleAdvancedFacelockImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
		    setAdvancedFacelockUploadedImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

	const handleCreateAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();  // Prevent the default form submission or navigation
		openLoginModal();  // Set the state to show the registration form
	};

	  async function deleteImage(imageId: string) {
		try {
			if (!imageId) {
				console.error("No image ID provided for deletion.");
				return;
			}
	
			setUserImages((prevImages) => prevImages.filter(image => image._id !== imageId));

			const deleteResponse = await fetch(`/api/image/delete`, {
				method: 'DELETE',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ imageId })
			});
	
			const deleteResult = await deleteResponse.json();
	
			if (deleteResult.message !== 'Image deleted successfully') throw new Error(deleteResult.message);

			if (!deleteResponse.ok) {
				throw new Error(deleteResult.message || "Failed to delete the image.");
			}
	
			// console.log("Image deleted successfully:", deleteResult);
			return deleteResult;  // Optional: return result for further processing if needed
		} catch (error) {
			console.error("Failed to delete image:", error);
			// Optional: handle errors further if necessary
		}
	}

	const toggleFavoriteImage = async (imageId: string, userId: string, res_image: string) => {
        try {
			// Optimistically update the state to toggle the favorite status
			setUserImages((prevImages) => 
				prevImages.map(image => 
					image._id === imageId ? { ...image, favorite: !image.favorite } : image
				)
			);
			
            const toggleFavoriteResponse = await fetch('/api/image/favorites/toggle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    imageId,
                    userId,
                    res_image
                })
            });
            const toggleData = await toggleFavoriteResponse.json();
            if (toggleData.message !== 'Favorites updated successfully') throw new Error(toggleData.message);
        } catch (error) {
            console.error('Error updating user favorites:', error);
        }
    }

	const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

    const toggleFeedbackModal = () => {
		// console.log(isPricingModalOpen);
		setFeedbackModalOpen(false);
	};

    const checkFeedbackModalOpenCase = () => {
        if (!session) return;
        if (session?.user?.feedbackSubmitted) return;

		if (session?.user?.feedbackSubmitted === false) {
			// console.log('Opening feedback modal')
			update({
				user: {
					...session?.user,
					feedbackSubmitted: true,
				},
			});
			setFeedbackModalOpen(true);
		}
    }

	const [isReferralModalOpen, setReferralModalOpen] = useState(false);

    const toggleReferralModal = () => {
		// console.log(isPricingModalOpen);
		setReferralModalOpen(!isReferralModalOpen);
	};

    const checkReferralModalOpenCase = () => {
        if (!session) return;
        if (session?.user?.credits !== 0) return;
        setReferralModalOpen(true);
    }

	const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

    const togglePricingModal = () => {
		setIsPricingModalOpen(!isPricingModalOpen);
	};

    const checkPricingModalOpenCase = () => {
        if (!session) return;
        if (session?.user?.credits !== 0) return;
        setIsPricingModalOpen(true);
    }

	const openPricingModalForCollection = () => {
        if (!session) return;
        setIsPricingModalOpen(true);
    }

const type_user = session?.user?.subscription === "Free" ? "free" : "vip";
const poseAllowed = session?.user?.subscription === "Free" ? false : true;

const handleFormSubmit = async (event: React.FormEvent) => {
	event.preventDefault();
		if (isSubmitting === true) {
			return;
		}

		handleFormSubmitGeneration(event);
}

const handleFormSubmitGeneration = async (event: React.FormEvent) => {

		event.preventDefault();
		if (isSubmitting === true) {
			return;
		}
		setIsSubmitting(true);

		// if (session?.user?.credits == 10) {
		// 	checkFeedbackModalOpenCase();
		// }

		if (session?.user?.credits === 0) {
			// checkReferralModalOpenCase();
			checkPricingModalOpenCase();
		}

		if (session?.user?.credits === 0) {
			// checkFeedbackModalOpenCase();
			toast.error('You do not have enough tokens to generate these images.', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			  });
			setIsSubmitting(false);
			return;
		}

		if (session?.user?.emailVerified !== true) {
			// checkFeedbackModalOpenCase();
			toast.error('Please verify your email to generate images.', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			  });
			setIsSubmitting(false);
			return;
		}

		// if ((activeTab === 'advanced' && (advancedMaskImage !== null || userMaskPrompt !== '')) && advancedUploadedImage === null ) {
		// if ((activeTab === 'inpaint' && (advancedMaskImage !== null || userMaskPrompt !== '')) && advancedMaskBaseImage === null ) {
        if ((activeTab === 'inpaint' && (advancedMaskBaseImage === null))) {
			toast.error('Please provide a base Image.', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			  });
			setIsSubmitting(false);
			return;
		}

        if ((activeTab === 'inpaint' && (advancedMaskImage == null))) {
			toast.error('Please draw and save Mask.', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			  });
			setIsSubmitting(false);
			return;
		}

		// Capture the initial number of images to generate
		// const initialImagesNumber = activeTab === 'essential' ? imagesNumber : imagesAdvancedNumber;
		const initialImagesNumber = imagesNumber;

		// Determine the current prompt based on the active tab
		// let currentPrompt = activeTab === 'essential' ? userPrompt : userAdvancedPrompt;
		let currentPrompt = userPrompt;
        
        if (activeTab === 'inpaint' && !currentPrompt) {
			toast.warn('Please provide a prompt for the generation.', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			  });
			  setIsSubmitting(false);
			  return; // Prevent the form from submitting if no prompt is provided
		} 

        setActiveTabCanvas('gallery');

		const currentNegativePrompt = userNegativePrompt && userNegativePrompt.trim() !== "" ? userNegativePrompt : "none";
		// const currentImage = activeTab === 'essential' ? uploadedImage : advancedUploadedImage;
		const currentImage = uploadedImage;

        const currentFacelockImage = activeTab === 'essential' ? uploadedFacelockImage : advancedFacelockUploadedImage;
		// const resolution = activeTab === 'essential' ? resolutions[selectedResolution] : resolutions[selectedAdvancedResolution];
		const resolution = resolutions[selectedResolution]
		const loras = 'None';

		let type_gen = "img2inpaint";

		if (!session) {
			toast.info('You need to be logged in to generate images.', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			setIsSubmitting(false);
			return;
		}

		// Check if the user has enough tokens
		let requiredTokens = initialImagesNumber; // 2 tokens per image
		let tokensPerImage = requiredTokens / initialImagesNumber;
		if (imagesResolutionParam === "2K" || imagesResolutionParam === '4K') {
			tokensPerImage = tokensPerImage * resolutionPrices[imagesResolutionParam] 
		}
		if ((session?.user?.credits ?? 0) < requiredTokens) {
		  toast.error('You do not have enough tokens to generate these images.', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		  });
		  setIsSubmitting(false);
		  return;
		}

		for (let i = 0; i < initialImagesNumber; i++) {
			// if (userImages && (userImages.length >= 5 && userImages.length <= 8)) {
			// 	checkFeedbackModalOpenCase();
			// }
            // console.log(`Generating image ${i + 1} of ${initialImagesNumber}`);
            let imageId = null;

			try {
				const deductionResponse = await fetch('/api/user/tokens/subtract', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: session.user.email, tokensToDeduct: tokensPerImage }),
				});
			
				const deductionData = await deductionResponse.json();
				// console.log('deductionData', deductionData);
				if (deductionData.message !== 'User credits updated successfully') throw new Error(deductionData.message);
				// if (!deductionResponse.ok) throw new Error(deductionData.message);
			
				// Update session with new token count
				await update({ user: { ...session?.user, credits: deductionData.newTokenCount } });
				// console.log('deductionData.newTokenCount', deductionData.newTokenCount);
				// console.log('session', session);
				// Proceed with image generation
				// handleGenerateImages(); // Your existing logic to generate images

				// console.log('session.user.id', session.user.id);

				let facelock_type;
				if (activeTab === 'essential' && uploadedImage !== null && selectedReferenceTypeString === "Character / FaceLock") {
					facelock_type = selectedFacelockTypeString;
				} 
				// else if (activeTab === 'advanced' && advancedUploadedImage !== null && selectedReferenceTypeStringAdvanced === "Character / FaceLock") 
				else if (activeTab === 'advanced' && uploadedImage !== null && selectedReferenceTypeString === "Character / FaceLock") 
				{
					// facelock_type = selectedFacelockTypeStringAdvanced;
					facelock_type = selectedFacelockTypeString;
					if (selectedModelId !== null) {
						facelock_type = modelData[selectedModelId].modelFacelockType.toString();
					}
				} else {
					facelock_type = 'None';
				}

				let model = 'realism_inpaint';

				let steps = activeTab === 'essential' ? 30 : stepsAdvancedNumber;
				let cfg = activeTab === 'essential' ? 4 : cfgAdvancedNumber;
				let denoise;
				if (type_gen === 'txt2img') {
					denoise = 1;
				} else if (activeTab === 'essential' && uploadedImage && selectedReferenceTypeString === "Image to Image") {
					denoise = denoiseEssentialNumber;
				} 
				// else if (activeTab === 'advanced' && advancedUploadedImage && selectedReferenceTypeStringAdvanced === "Image to Image") 
				else if (activeTab === 'advanced' && uploadedImage && selectedReferenceTypeString === "Image to Image") 
				{
					denoise = denoiseAdvancedNumber;
				} else {
					denoise = 1;
				}

				let weights_interpretator = activeTab === 'essential' ? 'Lite' : selectedWeightsInterpretatorString;
				let loras = 'None';
				let upscale;
				if (activeTab === 'essential' && uploadedImage && selectedReferenceTypeString === "Image Upscale") {
					upscale = imagesUpscaleParam;
				} 
				// else if (activeTab === 'advanced' && advancedUploadedImage && selectedReferenceTypeStringAdvanced === "Image Upscale") 
				else if (activeTab === 'advanced' && uploadedImage && selectedReferenceTypeString === "Image Upscale") 
				{
					// upscale = imagesUpscaleParamAdvanced;
					upscale = imagesUpscaleParam;
				} else {
					upscale = 'None';
				}

				// if (activeTab === 'advanced' && selectedReferenceTypeStringAdvanced !== "Image Upscale" && (imagesResolutionParam === "2K" || imagesResolutionParam === '4K')) 
				if (activeTab === 'advanced' && selectedReferenceTypeString !== "Image Upscale" && (imagesResolutionParam === "2K" || imagesResolutionParam === '4K'))
				{
					if (imagesResolutionParam === "2K") {
						upscale = '2x';
					} else if (imagesResolutionParam === '4K') {
						upscale = '4x';
					}
				}

				// let fixedToResolutionUpscale;
				// if (activeTab === 'advanced' && imagesResolutionParam === "2K") {
				// 	fixedToResolutionUpscale = "2x";
				// } else if (activeTab === 'advanced' && imagesResolutionParam === "4K") {
				// 	fixedToResolutionUpscale = "4x";
				// } else {
				// 	fixedToResolutionUpscale = upscale;
				// }

				let facelock_weight = activeTab === 'essential' ? 1 : facelockWeightNumber;
				if (activeTab === 'essential' && uploadedImage && selectedReferenceTypeString === "Character / FaceLock") {
					facelock_weight = facelockWeightNumber;
				} 
				// else if (activeTab === 'advanced' && advancedUploadedImage && selectedReferenceTypeStringAdvanced === "Character / FaceLock") 
				else if (activeTab === 'advanced' && uploadedImage && selectedReferenceTypeString === "Character / FaceLock") 
				{
					// facelock_weight = facelockWeightNumberAdvanced;
					facelock_weight = facelockWeightNumber;
				} else {
					facelock_weight = 1;
				}

				let pose_weight = activeTab === 'essential' ? 1 : poseAdvancedNumber;
                console.log(model, userMaskPrompt)
				let inpaint_what = model === 'realism_inpaint' ? userMaskPrompt ? userMaskPrompt : 'None' : 'None'
				
				// Create new image document and get its ID
				const createImageResponse = await fetch('/api/image/add', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						userId: session?.user?.id, 
						type_gen, 
						prompt: currentPrompt,
						model,
						steps,
						cfg,
						denoise,
						weights_interpretator,
						upscale,
						facelock_weight,
						facelock_type,
						pose_weight,
						inpaint_what,
						size: resolution, 
						seed, 
						style: activeTab === 'essential' ? currentStyle : activeTab === 'advanced' ? currentStyleAdvanced : 'null', 
						tool: 'Creating',
						neg_prompt: currentNegativePrompt,
						pipeline: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
						loras,
						favorite: false,
						cost: tokensPerImage,
					})
				});
				const imageData = await createImageResponse.json();
				// console.log('imageData', imageData);
				if (imageData.message !== 'Image document added successfully') throw new Error(imageData.message);
				imageId = imageData.imageId;

				try {

					const formData = new FormData();
					if (currentImage !== null && activeTab === 'essential' && selectedReferenceTypeString === "Image to Image") {
						// console.log("currentImage", currentImage)
						const base64Response = base64ToArrayBuffer(currentImage);
						const blob = new Blob([base64Response], { type: 'image/jpeg' });
						formData.append('image', blob);
						// console.log('blob', blob)
					} else if (currentImage !== null && activeTab === 'essential' && selectedReferenceTypeString === "Image Upscale") {
						// console.log("currentImage", currentImage)
						const base64Response = base64ToArrayBuffer(currentImage);
						const blob = new Blob([base64Response], { type: 'image/jpeg' });
						formData.append('image', blob);
						// console.log('blob', blob)
					} 
					// else if (currentImage !== null && activeTab === 'advanced' && selectedReferenceTypeStringAdvanced === "Image to Image") 
					else if (currentImage !== null && activeTab === 'advanced' && selectedReferenceTypeString === "Image to Image") 
					{
						// console.log("currentImage", currentImage)
						const base64Response = base64ToArrayBuffer(currentImage);
						const blob = new Blob([base64Response], { type: 'image/jpeg' });
						formData.append('image', blob);
						// console.log('blob', blob)
					} 
					// else if (currentImage !== null && activeTab === 'advanced' && selectedReferenceTypeStringAdvanced === "Image Upscale") 
					else if (currentImage !== null && activeTab === 'advanced' && selectedReferenceTypeString === "Image Upscale") 
					{
						// console.log("currentImage", currentImage)
						const base64Response = base64ToArrayBuffer(currentImage);
						const blob = new Blob([base64Response], { type: 'image/jpeg' });
						formData.append('image', blob);
						// console.log('blob', blob)
					}

					if (currentImage !== null && activeTab === 'essential' && selectedReferenceTypeString === "Character / FaceLock") {
						// console.log("currentImage", currentImage)
						const base64Response = base64ToArrayBuffer(currentImage);
						const blob = new Blob([base64Response], { type: 'image/jpeg' });
						formData.append('facelock', blob);
						// console.log('blob', blob)
					} 
					// else if (currentImage !== null && activeTab === 'advanced' && selectedReferenceTypeStringAdvanced === "Character / FaceLock") 
					else if (currentImage !== null && activeTab === 'advanced' && selectedReferenceTypeString === "Character / FaceLock") 
					{
						// console.log("currentImage", currentImage)
						const base64Response = base64ToArrayBuffer(currentImage);
						const blob = new Blob([base64Response], { type: 'image/jpeg' });
						formData.append('facelock', blob);
						// console.log('blob', blob)
					}

                    // if (currentFacelockImage !== null) {
                    //     const base64Response = base64ToArrayBuffer(currentFacelockImage);
                    //     const blob = new Blob([base64Response], { type: 'image/jpeg' });
                    //     formData.append('facelock', blob);
                    // }

                    if (advancedMaskBaseImage !== null && activeTab === 'advanced' && userMaskPrompt !== '') {
                        const base64Response = base64ToArrayBuffer(advancedMaskBaseImage);
                        const blob = new Blob([base64Response], { type: 'image/jpeg' });
                        formData.append('image', blob);
                    }

					if (advancedMaskBaseImage !== null && activeTab === 'inpaint') {
                        const base64Response = base64ToArrayBuffer(advancedMaskBaseImage);
                        const blob = new Blob([base64Response], { type: 'image/jpeg' });
                        formData.append('image', blob);
                    }

                    if (advancedMaskBaseImage !== null && advancedMaskImage !== null && activeTab === 'inpaint') {
                        const base64Response = base64ToArrayBuffer(advancedMaskImage);
                        const blob = new Blob([base64Response], { type: 'image/jpeg' });
                        formData.append('mask', blob);
                    }

					if (advancedPoseImage !== null && activeTab === 'advanced') {
						// console.log("currentImage", currentImage)
						const base64Response = base64ToArrayBuffer(advancedPoseImage);
						const blob = new Blob([base64Response], { type: 'image/jpeg' });
						formData.append('pose', blob);
						// console.log('blob', blob)
					}

                    // Create JSON object for the params
                    const params = {
                        model,
                        resolution,
                        steps,
                        cfg,
                        denoise,
                        weights_interpretator,
                        loras,
						upscale,
                        // upscale: fixedToResolutionUpscale,
                        facelock_weight,
                        facelock_type,
                        pose_weight,
						inpaint_what,
                        prompt: activeTab === 'essential' ? `${currentPrompt}. ${currentStyle} style` : currentPrompt,
                        negprompt: currentNegativePrompt
                    };

                    let JSONparams = JSON.stringify(params).toString();

					// const upscaleParams = {
					// 	upscale,
					// }

					// let JSONparamsUpscale = JSON.stringify(upscaleParams).toString();

                    // console.log('params', params)
                    // console.log('JSONparams', JSONparams)

                    // Convert params to JSON and append to formData
					
					// formData.append('params', JSONparams);
					// console.log('type_gen pre ', type_gen);

					formData.append('params', JSONparams);

					// console.log('type_gen post', type_gen);
					formData.append('type_gen', type_gen);
					formData.append('type_user', type_user);
					formData.append('id_gen', imageId);

					try {
						// console.log('Trying to submit formdata:', formData);
						// let endpoint;
						// if (currentImage === null && activeTab === 'essential') {
						// 	endpoint = '/api/gen/v2/image/text-instant';
						// } else if (advancedUploadedImage === null && activeTab === 'advanced') {
						// 	endpoint = '/api/gen/v2/image/text-instant';
						// } else {
						// 	endpoint = '/api/gen/v2/image/image-instant';
						// }

						let endpoint = '/api/gen/v2/image/image-inpaint';;

						// console.log('type_gen', type_gen)

						// console.log('endpoint', endpoint)
						const response = await fetch(endpoint, {
							method: 'POST',
							body: formData,
						});
						// console.log('Response from api method img api:', response);
						const result = await response.json();
						// console.log('result.message:', result.message);
						if (endpoint === '/api/gen/v2/image/image-instant' && result.message !== 'Image processed successfully') throw new Error(result.message);
						if (endpoint === '/api/gen/v2/image/text-instant' && result.message !== 'Text processed successfully') throw new Error(result.message);
						if (endpoint === '/api/gen/v2/image/image-inpaint' && result.message !== 'Image processed successfully') throw new Error(result.message);
						if (endpoint === '/api/gen/v2/image/image-upscale' && result.message !== 'Image processed successfully') throw new Error(result.message);
						// Change to image

						// console.log('result.imageProcessingResponse.queue_time', result.ProcessingResponse.queue_time)
						const queueTimeSeconds = parseInt(result.ProcessingResponse.queue_time);
						let queueTimeMessage;

						if (queueTimeSeconds < 60) {
							queueTimeMessage = `${queueTimeSeconds} second${queueTimeSeconds !== 1 ? 's' : ''}`;
						} else {
							const queueTimeMinutes = Math.round(queueTimeSeconds / 60);
							queueTimeMessage = `${queueTimeMinutes} minute${queueTimeMinutes !== 1 ? 's' : ''}`;
						}

						toast.success(`Approximate time to generate image: ${queueTimeMessage}.`, {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "light", // Set theme to light for green toast
						});

						// setSelectedModelId(0);
						startImageFetcher();
					} catch (error: any) {
						console.error('Error:', error);
						alert('Error submitting form.');
						throw new Error(error);
					}
					
				} catch (error: any) {

					try {
						const addResponse = await fetch('/api/user/tokens/add', {
							method: 'PUT',
							headers: {
							'Content-Type': 'application/json',
							},
							body: JSON.stringify({ email: session.user.email, tokensToAdd: tokensPerImage }),
						});

						const addData = await addResponse.json();
						// console.log('addData', addData);
					
						if (addData.message !== 'User credits updated successfully') throw new Error(addData.message);
					
						// Update session with new token count
						await update({ user: { ...session?.user, credits: addData.newTokenCount } });
						// console.log('addData.newTokenCount', addData.newTokenCount);
						// console.log('session', session);

						if (imageId) {
							const deleteResponse = await fetch('/api/image/delete', {
								method: 'DELETE',
								headers: {'Content-Type': 'application/json'},
								body: JSON.stringify({imageId})
							});

							const deleteResult = await deleteResponse.json();
							if (deleteResult.message !== 'Image deleted successfully') throw new Error(deleteResult.message);
						}

					} catch (error: any) {
						toast.error(`Failed to return tokens, please contact support: ${error.message}`, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
						});
					}

					toast.error(`Failed to generate image: ${error.message}`, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
					});
					setIsSubmitting(false);
				}
				
			} catch (error: any) {
				toast.error(`Failed to deduct tokens: ${error.message}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				});
				setIsSubmitting(false);
			}
        }

		// setIsSubmitting(false);
		// Continue with image generation if the prompt is not empty
		// handleGenerateImages();
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const handleGenerateSimilar = async (image: ImageData) => {
	if (isSubmitting === true) {
		return;
	}
	setIsSubmitting(true);
  
	// Determine the current prompt based on the active tab
	const currentPrompt = image.prompt;
	const currentNegativePrompt = image.neg_prompt;
	// const currentImage = image.res_image;
	const resolution = image.size;
	const loras = 'None';
	const type_gen = image.type_gen;
	const cost = image.cost;
	const imageUrl = image.type_gen === 'img2img' || 'img2inpaint' ? `${USER_IMAGES_URL_DOWNLOAD}${image.res_image}` : null;

	// ADD IMAGE ID

	if (!session) {
		toast.info('You need to be logged in to generate images.', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
		setIsSubmitting(false);
		return;
	}

	// if (session?.user?.credits === 10) {
	// 	checkFeedbackModalOpenCase();
	// }

	if (session?.user?.credits === 0) {
		// checkReferralModalOpenCase();
		checkPricingModalOpenCase();
		setIsSubmitting(false);
		return;
	}

	// Check if the user has enough tokens
	const requiredTokens = cost; // 1 token per image
	if ((session?.user?.credits ?? 0) < requiredTokens) {
	  toast.error('You do not have enough tokens to generate these images.', {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	  });
	  setIsSubmitting(false);
	  return;
	}

	let imageId = null;

	try {
		const deductionResponse = await fetch('/api/user/tokens/subtract', {
		  method: 'PUT',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ email: session.user.email, tokensToDeduct: requiredTokens }),
		});
	
		const deductionData = await deductionResponse.json();
		// console.log('deductionData', deductionData);
		if (deductionData.message !== 'User credits updated successfully') throw new Error(deductionData.message);
		// if (!deductionResponse.ok) throw new Error(deductionData.message);
	
		// Update session with new token count
		await update({ user: { ...session?.user, credits: deductionData.newTokenCount } });
		// console.log('deductionData.newTokenCount', deductionData.newTokenCount);
		// console.log('session', session);
		// Proceed with image generation
		// handleGenerateImages(); // Your existing logic to generate images

		// console.log('session.user.id', session.user.id);
		// Create new image document and get its ID
		const createImageResponse = await fetch('/api/image/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 
				userId: session?.user?.id, 
				type_gen,
				model: 'realism',
				steps: 30,
				cfg: 4,
				denoise: 1,
				weights_interpretator: 'Lite',
				upscale: 'None',
				facelock_weight: 1,
				facelock_type: 'None',
				pose_weight: 1,
				inpaint_what: 'None',
				prompt: currentPrompt,
				size: resolution, 
				style: image.style, 
				tool: 'Creating',
				neg_prompt: currentNegativePrompt,
				pipeline: image.pipeline, 
				loras,
				favorite: false,
				cost: requiredTokens,
			})
		});
		const imageData = await createImageResponse.json();
		// console.log('imageData', imageData);
		if (imageData.message !== 'Image document added successfully') throw new Error(imageData.message);
		imageId = imageData.imageId;

		try {
			let blob = null;
			if (imageUrl) {
				const response = await fetch(imageUrl);
				blob = await response.blob();
				// console.log("blob", blob)
			}

			const formData = new FormData();

			if (blob) {
				formData.append('image', blob);
			}

			const params = {
				model: 'realism',
				resolution,
				steps: 30,
				cfg: 4,
				denoise: 1,
				weights_interpretator: 'Lite',
				upscale: 'None',
				facelock_weight: 1,
				facelock_type: 'None',
				pose_weight: 1,
				inpaint_what: 'None',
				loras,
				prompt: currentPrompt,
				negprompt: currentNegativePrompt
			};

			let JSONparams = JSON.stringify(params).toString();
			formData.append('params', JSONparams);

			formData.append('type_gen', type_gen);
			formData.append('type_user', type_user);
			formData.append('id_gen', imageId);

			try {
				// console.log('Trying to submit formdata:', formData);
				let endpoint;
				if (type_gen === 'txt2img') {
					endpoint = '/api/gen/v2/image/text-instant';
				} else if (type_gen === 'img2img') {
					endpoint = '/api/gen/v2/image/image-instant';
				} else if (type_gen === 'img2inpaint') {
					endpoint = '/api/gen/v2/image/image-inpaint';
				} else {
					endpoint = '/api/gen/v2/image/text-instant';
				}
				// console.log('endpoint', endpoint)
				const response = await fetch(endpoint, {
					method: 'POST',
					body: formData,
				});
				// console.log('Response from api method img api:', response);
				const result = await response.json();
				// console.log('result.message:', result.message);
				if (endpoint === '/api/gen/v2/image/image-instant' && result.message !== 'Image processed successfully') throw new Error(result.message);
				if (endpoint === '/api/gen/v2/image/text-instant' && result.message !== 'Text processed successfully') throw new Error(result.message);
				if (endpoint === '/api/gen/v2/image/image-inpaint' && result.message !== 'Image processed successfully') throw new Error(result.message);
				// Change to image

				// console.log('result.imageProcessingResponse.queue_time', result.ProcessingResponse.queue_time)
				const queueTimeSeconds = parseInt(result.ProcessingResponse.queue_time);
				let queueTimeMessage;

				if (queueTimeSeconds < 60) {
					queueTimeMessage = `${queueTimeSeconds} second${queueTimeSeconds !== 1 ? 's' : ''}`;
				} else {
					const queueTimeMinutes = Math.round(queueTimeSeconds / 60);
					queueTimeMessage = `${queueTimeMinutes} minute${queueTimeMinutes !== 1 ? 's' : ''}`;
				}

				toast.success(`Approximate time to generate image: ${queueTimeMessage}.`, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light", // Set theme to light for green toast
				});

				startImageFetcher();
			} catch (error: any) {
				console.error('Error:', error);
				alert('Error submitting form.');
				throw new Error(error);
			}
			
		} catch (error: any) {

			try {
				const addResponse = await fetch('/api/user/tokens/add', {
					method: 'PUT',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: session.user.email, tokensToAdd: requiredTokens }),
				  });

				const addData = await addResponse.json();
				// console.log('addData', addData);
			
				if (addData.message !== 'User credits updated successfully') throw new Error(addData.message);
			  
				// Update session with new token count
				await update({ user: { ...session?.user, credits: addData.newTokenCount } });
				// console.log('addData.newTokenCount', addData.newTokenCount);
				// console.log('session', session);

				if (imageId) {
					const deleteResponse = await fetch('/api/image/delete', {
						method: 'DELETE',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({imageId})
					});

					const deleteResult = await deleteResponse.json();
					if (deleteResult.message !== 'Image deleted successfully') throw new Error(deleteResult.message);
				}

			} catch (error: any) {
				toast.error(`Failed to return tokens, please contact support: ${error.message}`, {
				  position: "top-right",
				  autoClose: 5000,
				  hideProgressBar: false,
				  closeOnClick: true,
				  pauseOnHover: true,
				  draggable: true,
				  progress: undefined,
				  theme: "dark",
				});

				if (imageId) {
					const deleteResponse = await fetch('/api/image/delete', {
						method: 'DELETE',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({imageId})
					});

					const deleteResult = await deleteResponse.json();
					if (deleteResult.message !== 'Image deleted successfully') throw new Error(deleteResult.message);
				}
			}

			toast.error(`Failed to generate image: ${error.message}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			setIsSubmitting(false);
		}
		
	} catch (error: any) {
		toast.error(`Failed to deduct tokens: ${error.message}`, {
		  position: "top-right",
		  autoClose: 5000,
		  hideProgressBar: false,
		  closeOnClick: true,
		  pauseOnHover: true,
		  draggable: true,
		  progress: undefined,
		  theme: "dark",
		});
		setIsSubmitting(false);
	}
  
	// setIsSubmitting(false);
	// Continue with image generation if the prompt is not empty
	// handleGenerateImages();
};

const handleReuseImage = async (image: ImageData) => {
    try {
        // Fetch the image from the server
        const response = await fetch(`${USER_IMAGES_URL}${image.res_image}`);
        if (!response.ok) {
            throw new Error('Failed to fetch image from server');
        }
        const imageBlob = await response.blob();

        // Create a FileReader to convert the Blob into a base64 string
        const reader = new FileReader();
        reader.onload = (e) => {
            if (activeTab === 'essential') {
                setUploadedImage(e.target?.result as string);
            } else if (activeTab === 'advanced') {
                setAdvancedUploadedImage(e.target?.result as string);
            }
        };
        reader.readAsDataURL(imageBlob);
    } catch (error) {
        console.error('Error reusing image:', error);
    }
};

	const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0]; // Get the dropped file
	  
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
			setUploadedImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

    const handleFacelockFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0]; // Get the dropped file
	  
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
			setUploadedFacelockImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

	const handleAdvancedFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0]; // Get the dropped file
	  
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
			setAdvancedUploadedImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

	const handleAdvancedPoseDrop = (event: React.DragEvent<HTMLDivElement>) => {
		if (!poseAllowed) return;
		event.preventDefault();
		const file = event.dataTransfer.files[0]; // Get the dropped file
	  
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
			setAdvancedPoseImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

	const handleAdvancedMaskDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0]; // Get the dropped file
	  
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
			setAdvancedMaskImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		  openModalWithCanvas();
		}
	};

	const handleAdvancedMaskBaseDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0]; // Get the dropped file
	  
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
			setAdvancedMaskBaseImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

	const handleSaveAdvancedMask = (data: string) => {
		setAdvancedMaskImage(data); // Set the drawn mask image
		closeCanvasModalAndSimulateClick(); // Optional: Close modal after saving
	};

    const handleAdvancedFacelockFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0]; // Get the dropped file
	  
		if (file) {
		  const reader = new FileReader();
		  reader.onload = (e) => {
			setAdvancedUploadedImage(e.target?.result as string);
		  };
		  reader.readAsDataURL(file);
		}
	};

	const clearImage = () => {
		setUploadedImage(null);
	};

    const clearFacelockImage = () => {
		setUploadedFacelockImage(null);
	};

	const clearAdvancedImage = () => {
		setAdvancedUploadedImage(null);
	};

    const clearAdvancedFacelockImage = () => {
		setAdvancedFacelockUploadedImage(null);
	};

	const clearAdvancedPoseImage = () => {
		setAdvancedPoseImage(null);
	};
	
	const clearAdvancedMaskImage = () => {
		setAdvancedMaskImage(null);
	};

	const clearAdvancedMaskBaseImage = () => {
		setAdvancedMaskBaseImage(null);
	};

	const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSeed(event.target.value);
	};

	const copyToClipboard = async (text: string) => {
		if (!text) {
		  toast.warn('Nothing to copy, the prompt is empty.', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		  });
		  return;
		}
	  
		try {
		  await navigator.clipboard.writeText(text);
		  toast.success('Prompt copied to clipboard!', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		  });
		} catch (err) {
		  toast.error('Failed to copy prompt.', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		  });
		}
	  };

	  const handleTabChange = (key: React.Key) => {
		setActiveTab(String(key));
		trackEvent(String(key));
	  };

	  const handleTabChangeCanvas = (key: React.Key) => {
		setActiveTabCanvas(String(key));
		trackEvent(String(key));
	  };

	  const handleTabChangeInpaint = (key: React.Key) => {
		setActiveTabInpaint(String(key));
		trackEvent(String(key));
	  };

	  const handleModelTabChange = (key: React.Key) => {
		setActiveModelTab(String(key));
	  };

	  function base64ToArrayBuffer(base64: string): ArrayBuffer {
		// Strip out the prefix if present
		const base64Cleaned = base64.split(',').pop() || base64;
	
		var binaryString = atob(base64Cleaned); // Decode base64 string
		var bytes = new Uint8Array(binaryString.length);
		for (var i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i); // Convert to byte value
		}
		return bytes.buffer; // Convert to ArrayBuffer
	}

	  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const formData = new FormData();

		if (uploadedImage !== null) {
			const base64Response = base64ToArrayBuffer(uploadedImage);
			const blob = new Blob([base64Response], { type: 'image/jpeg' });
			formData.append('image', blob);
		} else {
			console.error('Uploaded image is null');
		}

		formData.append('prompt', 'anime girl eating pizza');
        formData.append('negprompt', 'nudity');
        formData.append('resolution', '1024x1024');
        formData.append('loras', '0');
        // formData.append('type_gen', 'img2instant');
		formData.append('type_gen', 'txt2img');
        formData.append('type_user', 'vip');
        formData.append('id_gen', '123');

        try {
			// console.log('Trying to submit formdata:', formData);
            const response = await fetch('/api/gen/v2/image/image-instant', {
                method: 'POST',
                body: formData,
            });
			// console.log('Response from api method img api:', response);
            const result = await response.json();
            alert('Success: ' + JSON.stringify(result));
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form.');
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


	  const masonryRef = useRef<HTMLDivElement>(null);
	  const lastImageRef = useRef<HTMLDivElement | null>(null);
	  
	  const [columns, setColumns] = useState<ImageData[][]>([]);
	  const [isLastImageInView, setIsLastImageInView] = useState(false);
	  const columnWidth = masonryRef.current ? masonryRef.current.offsetWidth / columns.length : 0;
	  const lastImageIndex = userImages.length - 1;

	  // Function to determine the number of columns based on screen width
	const getNumberOfColumns = (): number => {
		if (window.innerWidth < 768) {
			return 1;
		} else if (window.innerWidth >= 1600) {
			return 5;
		} else {
			return 3;
		}
	};

	// Function to create columns by distributing images evenly
	const createColumns = (images: ImageData[], numColumns: number): ImageData[][] => {
		const columns: ImageData[][] = Array.from({ length: numColumns }, () => []);
		images.forEach((image, index) => {
			columns[index % numColumns].push(image);
		});
		return columns;
	};

	// Update columns when the component mounts or when userImages change
	useEffect(() => {
		const numColumns = getNumberOfColumns();
		setColumns(createColumns(userImages, numColumns));
	}, [userImages]);

	// Handle screen resize to recalculate columns
	useEffect(() => {
		const handleResize = () => {
			const numColumns = getNumberOfColumns();
			setColumns(createColumns(userImages, numColumns));
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [userImages]);

	// Track whether the last image is in view
	useEffect(() => {
		if (lastImageRef.current) {
			const observer = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					setIsLastImageInView(true);
				} else {
					setIsLastImageInView(false);
				}
			});

			observer.observe(lastImageRef.current);
			return () => observer.disconnect();
		}
	}, [lastImageRef.current]);

	// Fetch new images when the last image is in view
	useEffect(() => {
		if (isLastImageInView && hasMoreImages) {
			// console.log("Fetching more images...");
			fetchImages(userImages.length).then(fetchedImages => {
				if (fetchedImages.length > 0) {
					setUserImages(fetchedImages);  // Replace the entire array with fetched images
					const numColumns = getNumberOfColumns();
					setColumns(createColumns(fetchedImages, numColumns));  // Update columns
				} else {
					setHasMoreImages(false);
				}
			}).catch(error => {
				console.error('Error fetching user images:', error);
			});
		}
	}, [isLastImageInView, hasMoreImages]);  // Trigger on visibility change

	

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

	const [collectionColumns, setCollectionColumns] = useState<Collection[][]>([]);

	// Function to create columns for collections
	const createCollectionColumns = (collections: Collection[], numColumns: number): Collection[][] => {
		const columns: Collection[][] = Array.from({ length: numColumns }, () => []);
		collections.forEach((collection, index) => {
			columns[index % numColumns].push(collection);
		});
		return columns;
	};

	// Effect to update collection columns when the component mounts or when the window is resized
	useEffect(() => {
		const updateColumns = () => {
			const numColumns = getNumberOfColumns();
			const newColumns = createCollectionColumns(collectionData, numColumns);
			setCollectionColumns(newColumns);
		};

		// Initial calculation
		updateColumns();

		// Handle window resize
		const handleResize = () => {
			updateColumns();
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty dependency array to run this effect only once, on mount
	
	const [predictions, setPredictions] = useState([]);
	const [maskImage, setMaskImage] = useState<string | null>(null);

	const handleSaveAdvancedMaskChange = (data: string) => {
		setAdvancedMaskImage(data); // Set the drawn mask image
		setMaskImage(data); // Optional: Close modal after saving
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
		<div className={styles['ai-generator']}>
			<div className={styles['ai-generator__controls__outer']}>
				<div className={styles['ai-generator__controls__inner']}>
					<div className={styles['ai-generator_tabs__outer']}>
						<Tabs className={styles['generator_images_tabs_inner_main']} key={'underlined'} variant={'underlined'} aria-label="Tabs variants" color="primary" onSelectionChange={handleTabChange}>
							<Tab key="inpaint" title="Inpaint">
								<div className={styles['ai-generator_parameters__outer']}>
									<div className={styles['ai-generator_parameters__inner']}>
										<div className={styles['collapse']}>


                                                <div className={`${styles['collapse']}`}>
													<div className={`${styles['input-wrapper']}`}>
														<label htmlFor="seed" className={`${styles['input_input_label']}`}>
															Prompt
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		What do you want to see? You can use a single word or a full sentence.
																	</div>
																}
																isOpen={isPromptOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsPromptOpen(true)}
																	onMouseLeave={() => setIsPromptOpen(false)}
																	onClick={() => setIsPromptOpen(!isPromptOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<Textarea
															id="prompt"
															name="prompt"
															variant="bordered"
															placeholder="Describe something you'd like to see generated. Experiment with different words and styles..."
															disableAnimation
															disableAutosize
															size={isMobile ? "lg" : "md"}
															maxLength={1000}
															// value={userAdvancedPrompt}
															// onValueChange={handleAdvancedPromptChange}
															value={userPrompt}
															onValueChange={handlePromptChange}
															classNames={{
																base: `max-w-full`,
																input: `min-h-[90px] ${styles['textarea-input']}`,
															}}
														/>
													</div>
													{/* <div className={`${styles['input-wrapper']} ${styles['negative-prompt']}`}>
														<label htmlFor="seed" className={`${styles['input_input_label']}`}>
															Negative prompt
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Describe details you don &apos; t want in your image, like color, objects, or scenery.
																	</div>
																}
																isOpen={isNegativePromptOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsNegativePromptOpen(true)}
																	onMouseLeave={() => setIsNegativePromptOpen(false)}
																	onClick={() => setIsNegativePromptOpen(!isNegativePromptOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<Textarea
															id="prompt"
															name="prompt"
															variant="bordered"
															placeholder="Describe what you don't want in your image"
															disableAnimation
															disableAutosize
															size={isMobile ? "lg" : "md"}
															maxLength={1000}
															value={userNegativePrompt}
															onValueChange={handleNegativePromptChange}
															classNames={{
																base: `max-w-full`,
																input: `min-h-[100px] ${styles['textarea-input']}`,
															}}
														/>
													</div> */}
                                                </div>
                                                
                                                {isMobile && (
                                                    <div 
                                                    className={`${styles['onboarding_upgrade']}`}
                                                >
                                                    <div>
                                                        <div 
                                                            className={`${styles['onboarding_upgrade_title']}`}
                                                        >
                                                            <span>Inpaint Mode</span>
                                                        </div>
                                                        <div 
                                                            className={`${styles['onboarding_upgrade_text']}`}
                                                        >
                                                            Inpaint mode allows you to replace objects on image
                                                            <br/>
                                                            <br/>
                                                            <span 
                                                                className={`${styles['onboarding_tag']}`}
                                                            >
                                                                Step 1
                                                            </span> 
                                                            <br/>
                                                            In 
                                                            <span 
                                                                className={`${styles['onboarding_tag_additional']}`}
                                                            >
                                                                Prompt
                                                            </span>  
                                                            field write what you wish to be generated on picture.
                                                            <br/>
                                                            <br/>
                                                            <span 
                                                                className={`${styles['onboarding_tag']}`}
                                                            >
                                                                Step 2
                                                            </span> 
                                                            <br/>
                                                            Provide an Image in 
                                                            <span 
                                                                className={`${styles['onboarding_tag_additional']}`}
                                                            >
                                                                Mask Image
                                                            </span> 
                                                            where you want something to be replaced.
                                                            
                                                            <br/>
                                                            <br/>
                                                            <span 
                                                                className={`${styles['onboarding_tag']}`}
                                                            >
                                                                Step 3
                                                            </span> 
                                                            <br/>
                                                             Paint area for prompt object on
                                                             <span 
                                                                className={`${styles['onboarding_tag_additional']}`}
                                                             >
                                                            Canvas
                                                             </span> 
                                                             , click 
                                                             <span 
                                                                className={`${styles['onboarding_tag_additional']}`}
                                                            >
                                                                Save
                                                            </span> 
                                                            and generate image.
                                                        </div>
                                                    </div>
                                                </div>
                                                )}

													{/* <div className={`${styles['input-wrapper']}`}>
														<label htmlFor="seed" className={`${styles['input_input_label']}`}>
															Mask Prompt
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Mask Prompt specifies what should be changed or added in the masked areas of your image. If you leave this setting as None, no inpainting will occur and you need to provide a mask image.
																	</div>
																}
																isOpen={isMaskPromptOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsMaskPromptOpen(true)}
																	onMouseLeave={() => setIsMaskPromptOpen(false)}
																	onClick={() => setIsMaskPromptOpen(!isMaskPromptOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<Textarea
															id="prompt"
															name="prompt"
															variant="bordered"
															placeholder="Describe something you'd like to see generated. Experiment with different words and styles..."
															disableAnimation
															disableAutosize
															size={isMobile ? "lg" : "md"}
															maxLength={1000}
															value={userMaskPrompt}
															onValueChange={handleAdvancedMaskPromptChange}
															classNames={{
																base: `max-w-full`,
																input: `min-h-[90px] ${styles['textarea-input']}`,
															}}
														/>
													</div> */}

													<label htmlFor="weights" className={`${styles['input_input_label']}`}>
														Mask image
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Mask Image is a base image which is used to determine which parts of initial image to leave the same.
																	</div>
																}
																isOpen={isMaskImageBaseOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsMaskImageBaseOpen(true)}
																	onMouseLeave={() => setIsMaskImageBaseOpen(false)}
																	onClick={() => setIsMaskImageBaseOpen(!isMaskImageBaseOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
												<div className={styles['ai-generator_upload__wrapper']}>
													<div className={styles['ai-generator_dropzone_img']}>
														<div 
															className={styles['ai-generator_dropzone']}
															onDragOver={(e) => e.preventDefault()}
															onDrop={handleAdvancedMaskBaseDrop}
														>
															<button 
																		onClick={clearAdvancedMaskBaseImage}
																		style={{ position: 'absolute', top: '5px', right: '5px' }} // Adjust position as needed
																	>
																		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2">
																			<path d="M3 6h18"></path>
																			<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
																			<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
																			<line x1="10" x2="10" y1="11" y2="17"></line>
																			<line x1="14" x2="14" y1="11" y2="17"></line>
																		</svg>
																	</button>
															{advancedMaskBaseImage ? (
																<>
																	<img src={advancedMaskBaseImage} alt="Uploaded Image" className={styles['uploaded-image']} />
																</>
															) : (
																<>
																	<input
																		id="fileUploadMask"
																		accept="image/png,.png,image/jpeg,.jpeg,.jpg"
																		type="file"
																		onChange={handleAdvancedMaskBaseImageUpload}
																		className={`${styles['input-values-img']}`}
																	/>
																	<label className={`${styles['input-img-label']}`} htmlFor="fileUploadMask">Drag an image here, or click to select one.</label>
																</>
															)}
														</div>
													</div>
												</div>
											    {
													advancedMaskBaseImage && advancedMaskImage && (
														<>
															<label htmlFor="weights" className={`${styles['input_input_label']}`}>
															Mask
																<Tooltip
																	key={'bottom-start'}
																	placement={'bottom-start'}
																	content={
																		<div className={`${styles['seed-information']}`}>
																			Mask is used to specify areas of the input image that you want to modify. Leave blank and provide mask prompt for automatic detection.
																		</div>
																	}
																	isOpen={isMaskImageOpen}
																	className={`${styles['seed-tooltip']}`}
																>
																	<button 
																		className={styles['seed_image_btn']}
																		onMouseEnter={() => setIsMaskImageOpen(true)}
																		onMouseLeave={() => setIsMaskImageOpen(false)}
																		onClick={() => setIsMaskImageOpen(!isMaskImageOpen)}
																	>
																			<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																		</button>
																</Tooltip>
															</label>
															<div className={styles['ai-generator_upload__wrapper']}>
																<div className={styles['ai-generator_dropzone_img']}>
																	<div 
																		className={styles['ai-generator_dropzone']}
																		onDragOver={(e) => e.preventDefault()}
																		onDrop={handleAdvancedMaskDrop}
																	>
																		<button 
																					onClick={clearAdvancedMaskImage}
																					style={{ position: 'absolute', top: '5px', right: '5px' }} // Adjust position as needed
																				>
																					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2">
																						<path d="M3 6h18"></path>
																						<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
																						<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
																						<line x1="10" x2="10" y1="11" y2="17"></line>
																						<line x1="14" x2="14" y1="11" y2="17"></line>
																					</svg>
																				</button>
																		{advancedMaskImage ? (
																			<>
																				<img src={advancedMaskImage} alt="Uploaded Image" className={styles['uploaded-image']} />
																			</>
																		) : (
																			<>
																				<input
																					id="fileUploadMask"
																					accept="image/png,.png,image/jpeg,.jpeg,.jpg"
																					type="file"
																					onChange={handleAdvancedMaskImageUpload}
																					className={`${styles['input-values-img']}`}
																				/>
																				<label className={`${styles['input-img-label']}`} htmlFor="fileUploadMask">Drag an image here, or click to select one.</label>
																			</>
																		)}
																	</div>
																</div>
															</div>
														</>
													)
												}
                                                {!isMobile && (
                                                    <div 
                                                    className={`${styles['onboarding_upgrade']}`}
                                                >
                                                    <div>
                                                        <div 
                                                            className={`${styles['onboarding_upgrade_title']}`}
                                                        >
                                                            <span>Inpaint Mode</span>
                                                        </div>
                                                        <div 
                                                            className={`${styles['onboarding_upgrade_text']}`}
                                                        >
                                                            Inpaint mode allows you to replace objects on image
                                                            <br/>
                                                            <br/>
                                                            <span 
                                                                className={`${styles['onboarding_tag']}`}
                                                            >
                                                                Step 1
                                                            </span> 
                                                            <br/>
                                                            In 
                                                            <span 
                                                                className={`${styles['onboarding_tag_additional']}`}
                                                            >
                                                                Prompt
                                                            </span>  
                                                            field write what you wish to be generated on picture.
                                                            <br/>
                                                            <br/>
                                                            <span 
                                                                className={`${styles['onboarding_tag']}`}
                                                            >
                                                                Step 2
                                                            </span> 
                                                            <br/>
                                                            Provide an Image in 
                                                            <span 
                                                                className={`${styles['onboarding_tag_additional']}`}
                                                            >
                                                                Mask Image
                                                            </span> 
                                                            where you want something to be replaced.
                                                            
                                                            <br/>
                                                            <br/>
                                                            <span 
                                                                className={`${styles['onboarding_tag']}`}
                                                            >
                                                                Step 3
                                                            </span> 
                                                            <br/>
                                                             Paint area for prompt object on
                                                             <span 
                                                                className={`${styles['onboarding_tag_additional']}`}
                                                             >
                                                            Canvas
                                                             </span> 
                                                             , click 
                                                             <span 
                                                                className={`${styles['onboarding_tag_additional']}`}
                                                            >
                                                                Save
                                                            </span> 
                                                            and generate image.
                                                        </div>
                                                    </div>
                                                </div>
                                                )}

										</div>
                                        <div className={`${styles['form_btn']} ${styles['form_right']}`}>
                                            <div className={`${styles['reset_button']}`}>
                                                <button 
                                                    className={`${styles['button_btn']} ${styles['button_default']} ${styles['button_sm']} ${styles['active_button_advanced']}`}
                                                    onClick={() => {
														trackEvent('advanced_style_reset');
														resetAdvancedDefaults();
													}}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-restart "><path d="M21 6H3"></path><path d="M7 12H3"></path><path d="M7 18H3"></path><path d="M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14"></path><path d="M11 10v4h4"></path></svg>
                                                    <span className="ml-3">
                                                        Reset to default
                                                    </span>
                                                </button>
                                            </div>
									    </div>
									</div>
								</div>
							</Tab>
						</Tabs>
					</div>
					<form className={styles['ai-generator_actions']} onSubmit={handleFormSubmit}>
						<small className={`${styles.small}`} style={{ marginBottom: '6px' }}>
							{activeTab === 'collections' ? (
								<span>You need {imagesNumberCollection} credits for this generation.</span>
							) : (
								<span>You need {imagesNumber} credits for this generation.</span>
							)}
						</small>
						<div className={`${styles['button__actions']} ${styles['button__full_width__actions']}`}>
							{!session ? (
								<button
									className={`${styles['button_btn__actions']} ${styles['button_primary__actions']}`}
									onClick={handleCreateAccountClick}
								>
									Create free account
								</button>
							) : (
								<Button
									isDisabled={isSubmitting ? true : false}
									onPress={() => {
										if (activeTab === 'essential') {
											trackEvent('essential_style_generate');
										} else {
											trackEvent('advanced_style_generation');
										}
									}}
									type="submit"
									className={`${styles['button_btn__actions']} ${styles['button_primary__actions']}`}
									endContent={isSubmitting ? <Spinner size='sm' color="default"/> : <></>}
								>
									<>Generate {imagesNumber} {imagesNumber === 1 ? 'image' : 'images'}&nbsp;</>
								</Button>
							)}
						</div>
					</form>
					<LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} order="reverse"/>
				</div>
			</div>

			<div className={styles['ai-generator_images']}>
					<div className={styles['ai_generator_images_tabs_canvas']}>
						<Tabs className={styles['generator_images_tabs_inner']} key={'underlined'} variant={'underlined'} aria-label="Tabs variants" color="primary" selectedKey={activeTabCanvas} onSelectionChange={handleTabChangeCanvas}>
							<Tab className={styles['ai-generator_canvas_tab_wrapper']} key="canvas" title="Canvas">
                                <div className={styles['ai-generator_canvas_wrapper']}>
                                    <div
                                        className={styles['ai-generator_canvas']}
                                    >
                                        <Canvas
                                        userUploadedImage={advancedMaskBaseImage}
                                        predictions={predictions}
                                        onDraw={setMaskImage}
                                        onSave={handleSaveAdvancedMask}
                                        onImageUpload={setAdvancedMaskBaseImage}
                                        />
                                    </div>
                                </div>
							</Tab>
							<Tab key="gallery" title="Gallery">
								<div className={styles['masonry']} ref={masonryRef}>
									{columns.map((column, colIndex) => (
										<div key={colIndex} className={styles['column']}>
											{column.map((image, index) => {
												// Check if this is the last image in the overall userImages array
												const isLastImage = userImages.indexOf(image) === lastImageIndex;
												return (
													<GeneratedImage
														key={index}
														image={image}
														ref={isLastImage ? lastImageRef : null}
														onImageClick={() => openModalWithImage(image)}
														columnWidth={columnWidth}
														deleteImage={() => deleteImage(image._id)}
														toggleFavorite={() => toggleFavoriteImage(image._id, image.userId, image.res_image)}
														updateImages={updateImageContext}
														reusePrompt={() => setUserPrompt(image.prompt)}
														generateSimilar={() => handleGenerateSimilar(image)}
														reuseImage={() => handleReuseImage(image)}
														openFaceLock={() => handleFaceLockSelectionChangeButton()}
													/>
												);
											})}
										</div>
									))}
								</div>
							</Tab>
						</Tabs>
					</div>

					
				</div>

			<div 
				className={`${styles['image__overlay']} ${!isImagetModalOpen ? 'hidden' : ''}`} 
				// onTouchStart={handleTouchStart}
        		// onTouchMove={handleTouchMove}
        		// onTouchEnd={handleTouchEnd}
			>
				<div className={styles['image__modal']}>
					<Modal 
						backdrop="blur" 
						isOpen={isImagetModalOpen} 
						onClose={closeImageModal} 
						size="sm"
						placement="center"
						className={styles['image_modal__inner']}
					>
						<ModalContent>
							{(closeImageModal) => (
								<div className={styles['image_view']}>
									 {!isMobile && currentIndex !== null && currentIndex > 0 && (
									<Button 
										isIconOnly 
										className={`${styles['image_nav_btn_arrow']} ${styles['left_arrow']}`}
										onClick={(e) => {
											e.preventDefault();
											showPreviousImage();
										}}
										>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left ">
											<path d="m12 19-7-7 7-7"></path>
											<path d="M19 12H5"></path>
										</svg>
										</Button>
									)}
									{!isMobile && currentIndex !== null && currentIndex < userImages.length - 1 && (
										<Button 
										isIconOnly 
										className={`${styles['image_nav_btn_arrow']} ${styles['right_arrow']}`}
										onClick={(e) => {
											e.preventDefault();
											showNextImage();
										}}
										>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ">
											<path d="M5 12h14"></path>
											<path d="m12 5 7 7-7 7"></path>
										</svg>
										</Button>
									)}
									<div>
										<div className={styles['image__view_image']}>
											<div className={styles['image_view_image_inner']}>
												{selectedImage && (
													<Image
														shadow="sm"
														radius="lg"
														width="100%"
														alt="Selected Image"
														src={`${USER_IMAGES_URL}${selectedImage.res_image}`}
													/>
												)}
											</div>
											<div className={styles['image_view_buttons']}>
												<a 
													className={styles['image_btn']}
													href={selectedImage?.res_image ? `${USER_IMAGES_URL_DOWNLOAD}${selectedImage?.res_image}` : '#'}
													download={selectedImage?.res_image ? selectedImage?.res_image.split('/').pop() : ''}
													onClick={(e) => {
														e.stopPropagation();
														// console.log('Download button clicked');
													}}
												>
													<Button onClick={(e) => {
														e.stopPropagation();
														// console.log("Download");
														// console.log('${USER_IMAGES_URL_DOWNLOAD}${selectedImage?.res_image}', `${USER_IMAGES_URL_DOWNLOAD}${selectedImage?.res_image}`)
														// console.log('selectedImage?.res_image.split(/).pop()', selectedImage?.res_image.split('/').pop())
													}}>
														Download
													</Button>
												</a>
												
												<Button 
													onClick={() => {
														// console.log("FaceLock");
														if (selectedImage) {
															handleReuseImage(selectedImage);
															handleFaceLockSelectionChangeButton();
															closeImageModal();
														} else {
														  console.error("No image selected");
														}
													  }}
												>
													Reuse Image
												</Button>
												<Button 
													onClick={async () => {
														// console.log("Generate Similar");
														if (selectedImage) {
														  await handleGenerateSimilar(selectedImage);
														  await updateImageContext();
														} else {
														  console.error("No image selected");
														}
													  }}
												>
													Generate similar
												</Button>
											</div>
											
										</div>
									</div>
									<div className={styles['image_content']}>
										<div>
											<h1 className={styles['image_title']}>
												Image
											</h1>
										</div>
										<div className={styles['image_prompt']}>
											<div className={styles['modal_content_button']}>
												<label className={styles['image_label']}>
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-plus "><path d="M11 12H3"></path><path d="M16 6H3"></path><path d="M16 18H3"></path><path d="M18 9v6"></path><path d="M21 12h-6"></path></svg>
													Prompt
												</label>
												<button 
													className={`${styles['button_btn']} ${styles['button_default']} ${styles['button_sm']}`}
													onClick={() => {
														if (selectedImage?.prompt) {
															copyToClipboard(selectedImage.prompt);
														}
													}}
												>
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy "><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
													Copy Prompt
												</button>
											</div>
											<div className={styles['modal-prompt-text']}>{selectedImage?.prompt}</div>
											{selectedImage?.pipeline === 'Advanced' && (
												<>
													<label className={`${styles['image_label']} ${styles['negative-prompt-modal']}`}>
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-plus "><path d="M11 12H3"></path><path d="M16 6H3"></path><path d="M16 18H3"></path><path d="M18 9v6"></path><path d="M21 12h-6"></path></svg>
														Negative prompt
													</label>
													<div className={styles['modal-prompt-text']}>{selectedImage?.neg_prompt}</div>
												</>
											)}
											
										</div>
										<ul className={styles['image_params']}>
											<li className={styles['image_param']}>
												<b className={styles['image_label']}>
													{/* svg */}
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scaling "><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M14 15H9v-5"></path><path d="M16 3h5v5"></path><path d="M21 3 9 15"></path></svg>
													{/* text */}
													Size
												</b>
												<p className={styles['image_value']}>
													{/* value from state var */}
													{selectedImage?.size}
												</p>
											</li>
											{/* <li className={styles['image_param']}>
												<b className={styles['image_label']}>
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dices "><rect width="12" height="12" x="2" y="10" rx="2" ry="2"></rect><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"></path><path d="M6 18h.01"></path><path d="M10 14h.01"></path><path d="M15 6h.01"></path><path d="M18 9h.01"></path></svg>
													Seed
												</b>
												<p className={styles['image_value']}>
													{Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}
												</p>
											</li> */}
											<li className={styles['image_param']}>
												<b className={styles['image_label']}>
													{/* svg */}
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit "><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"></path><path d="M16 8V5c0-1.1.9-2 2-2"></path><path d="M12 13h4"></path><path d="M12 18h6a2 2 0 0 1 2 2v1"></path><path d="M12 8h8"></path><path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path></svg>
													{/* text */}
													Pipeline
												</b>
												<p className={styles['image_value']}>
													{/* value from state var */}
													{selectedImage?.pipeline}
												</p>
											</li>
											{selectedImage?.pipeline === 'Essential' && (
												<li className={styles['image_param']}>
													<b className={styles['image_label']}>
														{/* svg */}
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paintbrush "><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"></path><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"></path><path d="M14.5 17.5 4.5 15"></path></svg>
														{/* text */}
														Style
													</b>
													<p className={styles['image_value']}>
														{/* value from state var */}
														{selectedImage?.style}
													</p>
												</li>
											)}
											{/* {activeTab === 'advanced' && (
												<>
													<li className={styles['image_param']}>
														<b className={styles['image_label']}>
															<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-horizontal-justify-start "><rect width="6" height="14" x="6" y="5" rx="2"></rect><rect width="6" height="10" x="16" y="7" rx="2"></rect><path d="M2 2v20"></path></svg>
															Sampler
														</b>
														<p className={styles['image_value']}>
															Advanced Creator
														</p>
													</li>
													<li className={styles['image_param']}>
														<b className={styles['image_label']}>
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-git-commit-horizontal "><circle cx="12" cy="12" r="3"></circle><line x1="3" x2="9" y1="12" y2="12"></line><line x1="15" x2="21" y1="12" y2="12"></line></svg>
															Steps
														</b>
														<p className={styles['image_value']}>
															{40}
														</p>
													</li>
												</>
											)} */}
											<li className={styles['image_param']}>
												<b className={styles['image_label']}>
													{/* svg */}
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid "><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
													{/* text */}
													Tool
												</b>
												<p className={styles['image_value']}>
													{/* value from state var */}
													Creator
												</p>
											</li>
											<li className={styles['image_param']}>
												<b className={styles['image_label']}>
													{/* svg */}
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days "><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
													{/* text */}
													Created
												</b>
												<p className={styles['image_value']}>
													{selectedImage?.createdAt ? new Date(selectedImage.createdAt).toLocaleString('en-US', {
														month: 'short', // "Apr"
														day: '2-digit', // "23"
														year: 'numeric', // "2024"
														hour: 'numeric', // "8"
														minute: '2-digit', // "18"
														hour12: true // "PM"
													}) : 'Date not available'}
												</p>
											</li>
											{selectedImage?.pipeline === 'Advanced' && (
												<>
													<li className={styles['image_param']}>
														<b className={styles['image_label']}>
															{/* svg */}
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dices "><rect width="12" height="12" x="2" y="10" rx="2" ry="2"></rect><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"></path><path d="M6 18h.01"></path><path d="M10 14h.01"></path><path d="M15 6h.01"></path><path d="M18 9h.01"></path></svg>
															{/* text */}
															Cfg
														</b>
														<p className={styles['image_value']}>
															{/* value from state var */}
															{selectedImage?.cfg}
														</p>
													</li>
													<li className={styles['image_param']}>
														<b className={styles['image_label']}>
															{/* svg */}
															<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paintbrush "><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"></path><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"></path><path d="M14.5 17.5 4.5 15"></path></svg>
															{/* text */}
															Model
														</b>
														<p className={styles['image_value']}>
															{/* value from state var */}
															{modelData.find(model => model.apiName === selectedImage?.model)?.name || selectedImage?.model}
															</p>
													</li>
													<li className={styles['image_param']}>
														<b className={styles['image_label']}>
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-git-commit-horizontal "><circle cx="12" cy="12" r="3"></circle><line x1="3" x2="9" y1="12" y2="12"></line><line x1="15" x2="21" y1="12" y2="12"></line></svg>
															Steps
														</b>
														<p className={styles['image_value']}>
															{selectedImage?.steps}
														</p>
													</li>
													<li className={styles['image_param']}>
														<b className={styles['image_label']}>
															<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-horizontal-justify-start "><rect width="6" height="14" x="6" y="5" rx="2"></rect><rect width="6" height="10" x="16" y="7" rx="2"></rect><path d="M2 2v20"></path></svg>
															Denoise
														</b>
														<p className={styles['image_value']}>
															{selectedImage?.denoise}
														</p>
													</li>
												</>
											)}
										</ul>
									</div>
								</div>
							)}
						</ModalContent>
					</Modal>
				</div>
			</div>
			
		</div>
		<FeedbackModal isOpen={isFeedbackModalOpen} onClose={toggleFeedbackModal} />
		<ReferralModal isOpen={isReferralModalOpen} onClose={toggleReferralModal} />
		<PricingPopupModal isOpen={isPricingModalOpen} onClose={togglePricingModal} />
		</>
	);
}