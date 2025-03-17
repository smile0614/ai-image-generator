"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client"; 
import { title } from "@/components/primitives";
import styles from '@/styles/Creating.module.css';
import GeneratedImage from "@/components/GeneratedImage";
import CollectionCard from "@/components/CollectionCard";
import {Tabs, Tab, Textarea, Divider, Breadcrumbs, BreadcrumbItem, Accordion, AccordionItem, Slider, Tooltip, Button, Link, Input, Checkbox} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import {Selection} from "@react-types/shared";
import { Switch } from "@nextui-org/react";
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
import renaissanceMasqueradeFemaleImg from '@/assets/collections/renaissanceMasqueradeFemaleImg.png';
import renaissanceMasqueradeMaleImg from '@/assets/collections/renaissanceMasqueradeMaleImg.png';
import christmasPhotosFemaleImg from '@/assets/collections/christmasPhotosFemaleImg.png';
import christmasPhotosMaleImg from '@/assets/collections/christmasPhotosMaleImg.png';
import santaOutfitFemaleImg from '@/assets/collections/santaOutfitFemaleImg.png';
import santaOutfitMaleImg from '@/assets/collections/santaOutfitMaleImg.png';

import { useImageContext, ImageData } from "@/context/page";
import { useActionContext, ActionState } from "@/context/page";
import { useRouter } from 'next/navigation'
import FeedbackModal from "@/components/FeedbackModal";
import ReferralModal from "@/components/ReferralsModal";
import PricingPopupModal from "@/components/PricingPopupModal";
import {Spinner} from "@nextui-org/react";

const USER_IMAGES_URL = process.env.NEXT_PUBLIC_USER_IMAGES_URL!;
const USER_IMAGES_URL_DOWNLOAD = process.env.NEXT_PUBLIC_USER_IMAGES_URL_DOWNLOAD!;

const NEXT_PUBLIC_FREE_PLAN_IMAGES = parseInt(process.env.NEXT_PUBLIC_FREE_PLAN_IMAGES!);
const NEXT_PUBLIC_PRO_PLAN_IMAGES = parseInt(process.env.NEXT_PUBLIC_PRO_PLAN_IMAGES!);
const NEXT_PUBLIC_MAX_PLAN_IMAGES = parseInt(process.env.NEXT_PUBLIC_MAX_PLAN_IMAGES!);

// console.log('USER_IMAGES_URL', USER_IMAGES_URL);

interface Resolution {
    [key: string]: string;
}

export default function CreatingPage() {
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
		{ name: "Photorealism", category: "Photorealistic", image: modelImg_Photorealism.src, apiName: "realism", modelFacelockType: "faceswap" },
		{ name: "AnimagineXL v3.1", category: "Anime", image: modelImg_animagineXL_v31.src, apiName: "animagineXL_v31", modelFacelockType: "faceswap" },
		{ name: "Animexl", category: "Anime", image: modelImg_animexl.src, apiName: "animexl", modelFacelockType: "full" },
		{ name: "AnythingXL xl", category: "Anime", image: modelImg_AnythingXL_xl.src, apiName: "AnythingXL_xl", modelFacelockType: "full" },
		{ name: "Copax Timeless", category: "Photorealistic", image: modelImg_copaxtimeless.src, apiName: "copaxTimeless", modelFacelockType: "faceswap" },
		{ name: "CounterfeitXL v25", category: "Anime", image: modelImg_counterfeitxl_v25.src, apiName: "counterfeitxl_v25", modelFacelockType: "full" },
		{ name: "Crystal Clear XL", category: "Design", image: modelImg_CrystalClearXL.src, apiName: "crystalClearXL_ccxl", modelFacelockType: "faceswap" },
		// { name: "DreamshaperXL v21", image: modelImg_dreamshaperXL_v21.src, apiName: "dreamshaperXL_v21", modelFacelockType: "faceswap" },
		{ name: "DynavisionXLA", category: "Cartoon", image: modelImg_dynavisionXLA.src, apiName: "dynavisionXLA", modelFacelockType: "faceswap" },
		{ name: "HassakuXL V06", category: "Anime", image: modelImg_hassakuXLV06.src, apiName: "hassakuXLV06", modelFacelockType: "full" },
		{ name: "InfinianimeXL v16", category: "Anime", image: modelImg_infinianimeXL_v16.src, apiName: "infinianimexl_v16", modelFacelockType: "full" },
		{ name: "JibMix", category: "Design", image: modelImg_jibMix.src, apiName: "jibMix", modelFacelockType: "faceswap" },
		{ name: "LeosamsXL 70", category: "Epic style", image: modelImg_leosamsXL_70.src, apiName: "leosamsXL_70", modelFacelockType: "faceswap" },
		{ name: "MkIan Realistic", category: "Photorealistic", image: modelImg_mkIanRealistic.src, apiName: "mklanRealistic", modelFacelockType: "faceswap" },
		{ name: "MysteriousSDXL", category: "Epic style", image: modelImg_MysteriousSDXL.src, apiName: "MysteriousSDXL", modelFacelockType: "faceswap" },
		{ name: "NewrealityXL v40", category: "Epic style", image: modelImg_NewrealityXL_v40.src, apiName: "Newrealityxl_XL40", modelFacelockType: "faceswap" },
		{ name: "Nijijstyle", category: "Anime", image: modelImg_Nijijstyle.src, apiName: "Nijistyle", modelFacelockType: "faceswap" },
		{ name: "PhotoVisionXL v10", category: "Photorealistic", image: modelImg_photoVisionXL_v10.src, apiName: "photoVisionXL_v10", modelFacelockType: "faceswap" },
		{ name: "RealCartoonXL v6", category: "Epic style", image: modelImg_realcartoonXL_v6.src, apiName: "realcartoonXL_v6", modelFacelockType: "faceswap" },
		{ name: "RealDream sdx1", category: "Epic style", image: modelImg_realDream_sdx1.src, apiName: "realDream_sdxl1", modelFacelockType: "faceswap" },
		{ name: "RealvisXL v40", category: "Photorealistic", image: modelImg_realvisXL_v40.src, apiName: "realvisxlV40", modelFacelockType: "faceswap" },
		{ name: "ReproductionSDXL 2v12", category: "Anime", image: modelImg_reproductionSDXL_2v12.src, apiName: "reproductionSDXL_2v12", modelFacelockType: "full" },
		{ name: "Samaritan3dCartoon", category: "Cartoon", image: modelImg_samaritan3dCartoon.src, apiName: "samaritan3dCartoon", modelFacelockType: "faceswap" },
		{ name: "SdXL", category: "Photorealistic", image: modelImg_sdXL.src, apiName: "sdXL", modelFacelockType: "faceswap" },
		{ name: "SdXLNuclear", category: "Design", image: modelImg_sdXLNuclear.src, apiName: "sdxlNuclear", modelFacelockType: "faceswap" },
		{ name: "SdXLYamersAnime", category: "Anime", image: modelImg_sdXLYamersAnime.src, apiName: "sdxlYamersAnime", modelFacelockType: "faceswap" },
		{ name: "StarlightXL", category: "Epic style", image: modelImg_starlightXL.src, apiName: "starlightXL_v3", modelFacelockType: "faceswap" },
		{ name: "ThinkdiffusionXL v10", category: "Photorealistic", image: modelImg_thinkdiffusionXL_v10.src, apiName: "thinkdiffusionxl_v10", modelFacelockType: "faceswap" },
		{ name: "WildcardxXL", category: "Epic style", image: modelImg_wildcardxXL.src, apiName: "wildcardxXL", modelFacelockType: "faceswap" },
		{ name: "WildcardxXLAnimation", category: "Cartoon", image: modelImg_wildcardxXLAnimation.src, apiName: "wildcardxXLANIMATION", modelFacelockType: "faceswap" },
		{ name: "YamersRealisticv5", category: "Photorealistic", image: modelImg_YamersRealisticv5.src, apiName: "YamersRealisticv5", modelFacelockType: "faceswap" }
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
			name: "Renaissance Masquerade",
			maleImage: renaissanceMasqueradeMaleImg.src,
			femaleImage: renaissanceMasqueradeFemaleImg.src,
			description: "Immerse yourself in the atmosphere of luxury and mystery of the Renaissance. Elegant costumes, exquisite fabrics and sophisticated looks create the spirit of a royal masquerade. Every detail emphasises the beauty and grace of the era, making the collection truly unforgettable.",
			malePrompt1: "A dashing Renaissance nobleman in a black velvet doublet with golden accents, wearing a half-mask adorned with intricate carvings, standing confidently by a marble column.",
			femalePrompt1: "A mysterious Renaissance lady in a deep crimson velvet dress, adorned with pearls and lace, her face partially hidden by an ornate silver mask, standing by a marble staircase.",
			malePrompt2: "A Renaissance lord in a royal blue tunic, his face framed by a simple metallic half-mask that leaves his smile uncovered, posed near a grand tapestry with no one in sight.",
			femalePrompt2: "A Renaissance maiden with a soft smile, dressed in a lavender silk gown, her mask decorated with feathers and gemstones, standing by a balcony overlooking a moonlit garden.",
			malePrompt3: "A noble Renaissance lord in a dark green velvet cloak, his eyes framed by an ivy-patterned mask that reveals his nose and lips, standing beside a large oak door illuminated by torchlight.",
			femalePrompt3: "A captivating Renaissance woman in a black and gold masquerade outfit, wearing a lace mask and adorned with a diamond necklace, her gown shimmering under torchlight.",
			malePrompt4: "A dashing Renaissance nobleman in a black velvet doublet with golden embroidery, his posture confident as he stands beside a stone column in a grand ballroom.",
			femalePrompt4: "A mysterious Renaissance woman with auburn hair, her crimson and gold dress glowing softly in the candlelight, a mask in the shape of a butterfly covering her face.",
			malePrompt5: "A Renaissance lord in a deep burgundy coat with silver accents and a high-collared shirt, his hair neatly styled, standing near an ornate fireplace surrounded by candlelight.",
			femalePrompt5: "A Renaissance duchess in a royal blue and gold gown, her mask glittering with small gemstones, standing by a tall window framed with heavy velvet drapes.",
			malePrompt6: "A noble gentleman in a royal blue tunic with white ruffled cuffs and a gold-trimmed cape, standing beside a tall arched window with a view of the garden.",
			femalePrompt6: "A graceful Renaissance woman wearing a cream-colored gown with intricate lacework, a peacock feather mask in hand, surrounded by opulent Renaissance décor.",
			malePrompt7: "A Renaissance aristocrat in a forest green and gold outfit with intricate patterns, his boots polished, standing on a marble staircase with carved railings.",
			femalePrompt7: "A Renaissance lady in a deep crimson velvet dress adorned with pearls and lace, her delicate features illuminated by candlelight, posing gracefully beside a grand fireplace.",
			malePrompt8: "A regal man in a cream and gold doublet with puffed sleeves, his waist adorned with a jeweled belt, standing beside a grand piano in a quiet hall.",
			femalePrompt8: "An elegant woman in a sapphire blue gown with flowing skirts and silver embroidery, her hair adorned with small gemstones, standing by a tall stained-glass window in a quiet chamber.",
			malePrompt9: "A Renaissance figure in a navy blue and silver ensemble, his sleeves trimmed with lace, standing confidently by a large tapestry in an empty chamber.",
			femalePrompt9: "A graceful noblewoman in a lavender silk gown with golden accents, her sleeves adorned with lace, standing on a balcony overlooking a moonlit courtyard.",
			malePrompt10: "A Renaissance lord in a green velvet doublet with silver buttons, his shirt ruffled and his belt adorned with an ornate buckle, standing under a grand archway.",
			femalePrompt10: "A Renaissance figure in a blush pink dress with silver threading and puffed sleeves, her hair adorned with fresh flowers, standing near a tranquil fountain in a palace garden.",
			malePrompt11: "A rugged Renaissance man in a fitted black velvet doublet, his shirt slightly unbuttoned to reveal a muscular chest, leaning casually against a grand fireplace, his intense gaze captivating.",
			femalePrompt11: "A sensual Renaissance lady in a deep crimson velvet gown with a plunging neckline and a fitted corset, her exposed shoulders glowing in the candlelight as she leans against a marble balustrade.",
			malePrompt12: "A charismatic Renaissance lord in a navy blue doublet, his cloak draped casually over one shoulder, his open collar exposing a hint of his chest as he leans against a marble column.",
			femalePrompt12: "A captivating noblewoman in an emerald silk dress with a daring thigh-high slit, her legs elegantly crossed as she sits on a plush velvet chair, her gaze inviting.",
			malePrompt13: "A rugged Renaissance lord in a black velvet doublet with silver detailing, his collar slightly open to reveal his strong chest, leaning casually against a wooden balustrade in a dimly lit hall.",
			femalePrompt13: "A seductive Renaissance woman in a sheer black lace gown, her curves outlined by the delicate fabric, standing confidently in front of a grand mirror illuminated by soft torchlight.",
			malePrompt14: "A mysterious Renaissance gentleman in a deep green outfit, his cloak slightly draped over one shoulder, his collar undone to reveal his chiseled chest as he stands under a flickering chandelier.",
			femalePrompt14: "A bold Renaissance beauty in a royal blue dress with a corset that accentuates her figure, her skirt slightly parted to reveal her stockinged leg, standing in a lavishly decorated chamber.",
			malePrompt15: "A seductive Renaissance aristocrat in a gold and black ensemble, his sharp jawline and piercing gaze accentuated by the soft glow of torchlight, standing near a marble statue in an empty hall.",
			femalePrompt15: "A radiant Renaissance noblewoman in a deep sapphire gown with an off-the-shoulder design, her fitted corset highlighting her curves, standing elegantly by a velvet-draped window with her lips slightly parted."
		},
		{
			name: "Christmas Photos",
			maleImage: christmasPhotosMaleImg.src,
			femaleImage: christmasPhotosFemaleImg.src,
			description: "Plunge into the atmosphere of Christmas cosiness, warmth and light sensuality. The collection combines modern stylish images and festive décor: twinkling lights, smart Christmas trees and cosy interiors.",
			malePrompt1: "A confident young man in a dark green parka and a knitted scarf, standing on a snowy hilltop with a breathtaking view of the forest below.",
			femalePrompt1: "A cheerful young woman in a cozy red sweater with white snowflake patterns, wearing a knitted hat and scarf, standing in a snowy forest with tall pine trees dusted in snow.",
			malePrompt2: "A modern guy in a black puffer jacket and a scarf, standing on a frozen bridge over a quiet stream, surrounded by snow-laden trees and glowing lanterns.",
			femalePrompt2: "A trendy woman in a chunky knit sweater and jeans, holding a string of fairy lights, standing near a beautifully decorated Christmas tree in a snowy backyard.",
			malePrompt3: "A man in a black puffer jacket and leather gloves, sitting on the tailgate of a truck filled with Christmas gifts, parked in a snowy meadow.",
			femalePrompt3: "A woman in a sleek black winter coat and fur-lined boots, standing on a bridge overlooking a frozen river surrounded by Christmas decorations.",
			malePrompt4: "A stylish man in a beige trench coat and scarf, standing on a snow-covered path under frosted tree branches, with a distant cabin visible.",
			femalePrompt4: "A happy woman wearing a white turtleneck sweater and a red Santa hat, holding a gift box while standing on a porch decorated with wreaths and garlands.",
			malePrompt5: "A young man in a dark green sweater and jeans, sitting on a leather armchair by a glowing fireplace with Christmas stockings hanging above it, holding a glass of mulled wine.",
			femalePrompt5: "A girl in a cozy cream-colored sweater and wool leggings, standing on a snowy bridge over a frozen river, surrounded by softly glowing lanterns.",
			malePrompt6: "A cheerful guy in a plaid flannel shirt, kneeling by a Christmas tree as he carefully places ornaments on its branches, surrounded by wrapped gifts.",
			femalePrompt6: "A young lady in a soft pastel pink puffer jacket, playfully twirling in a snow-dusted forest with sunlight streaming through the trees.",
			malePrompt7: "A stylish gentleman in a red cardigan and dark jeans, leaning against a wooden dining table set with holiday decorations, with fairy lights hanging around the room.",
			femalePrompt7: "A woman in a festive red dress and fur-lined boots, sitting on the steps of a rustic wooden porch adorned with Christmas lights and garlands.",
			malePrompt8: "A young man in a cream cable-knit sweater, sitting cross-legged on a sofa with a Christmas throw, holding a small gift box wrapped in festive paper.",
			femalePrompt8: "A trendy woman in a cable-knit sweater and snow boots, standing beside a frosted Christmas wreath hanging on a rustic wooden door in a snowy landscape.",
			malePrompt9: "A man in a burgundy sweater and black trousers, sitting casually on a wooden bench near a window adorned with snowflake decals and Christmas lights.",
			femalePrompt9: "A modern woman in a cream-colored sweater and wool leggings, sitting cross-legged on a soft rug in front of a Christmas tree, surrounded by opened gift boxes and ornaments.",
			malePrompt10: "A cheerful man in a Santa hat and cozy knit sweater, kneeling on the floor by the Christmas tree, arranging gifts with a playful smile.",
			femalePrompt10: "A woman in a chunky knit cardigan, sitting on a window seat decorated with holiday pillows, gazing out at the snowy night with Christmas lights glowing in the background.",
			malePrompt11: "A charming guy in a fitted sweater and jeans, sitting casually on a sofa draped with a holiday blanket, holding a glass of whiskey in the warm glow of the fireplace.",
			femalePrompt11: "A playful woman in an oversized red sweater that falls off one shoulder, knee-high socks, and a Santa hat, lying on a sofa surrounded by Christmas decorations.",
			malePrompt12: "A bold man in an open cardigan and dark trousers, standing by a window adorned with holiday garlands, with snow visible outside and his gaze intense.",
			femalePrompt12: "A sensual woman in a silk robe tied loosely, holding a glass of champagne, standing barefoot by a window with snowflakes falling outside and Christmas lights glowing inside.",
			malePrompt13: "A rugged guy in a Santa-inspired red coat with no shirt underneath, standing confidently near a festive mantelpiece adorned with candles and greenery.",
			femalePrompt13: "A flirty woman in a white faux fur wrap and a red corset, sitting by a roaring fireplace with her legs crossed, surrounded by wrapped presents.",
			malePrompt14: "A muscular man in a half-buttoned white shirt and black trousers, leaning casually against a decorated Christmas tree, with soft golden lights reflecting off his defined chest.",
			femalePrompt14: "A seductive woman wearing a red silk chemise, lying on a chaise longue under soft candlelight, with a Christmas tree sparkling in the background.",
			malePrompt15: "A rugged man wearing a fitted black sweater and jeans, sitting on a wooden chair by a festive mantelpiece, holding a steaming mug with a teasing smirk.",
			femalePrompt15: "A woman in a fitted emerald green dress with a high slit, sitting on a fur rug beside a softly glowing Christmas tree, with her hand brushing through her hair."
		},
		{
			name: "Santa Outfit",
			maleImage: santaOutfitMaleImg.src,
			femaleImage: santaOutfitFemaleImg.src,
			description: "A modern take on the classic Santa look. Velvet suits, fur trim and stylish accents for guys and girls. Playful and elegant looks combined with a festive atmosphere give the mood of Christmas magic.",
			malePrompt1: "A cheerful man in a classic red Santa suit with a wide black belt and boots, sitting by a Christmas tree, holding a gift bag filled with presents.",
			femalePrompt1: "A playful woman in a red velvet Santa dress with white fur trim, wearing a Santa hat, sitting on a cozy chair beside a glowing Christmas tree, holding a candy cane.",
			malePrompt2: "A rugged man in a casual Santa-inspired outfit with a red coat and black trousers, leaning against a fireplace with a confident smile.",
			femalePrompt2: "A cheerful woman in a short Santa-inspired outfit with black boots and a wide belt, standing beside a festive fireplace adorned with garlands and stockings.",
			malePrompt3: "A confident man in a Santa-inspired coat, wearing a festive scarf, standing beside a holiday-decorated door with a wreath hanging above.",
			femalePrompt3: "A charming woman in a Santa-inspired corset and matching red skirt, kneeling by a beautifully decorated Christmas tree surrounded by sparkling fairy lights.",
			malePrompt4: "A cheerful guy in a Santa suit, sitting on a chair by a fireplace, holding a candy cane and surrounded by twinkling Christmas lights.",
			femalePrompt4: "A playful woman in a red Santa dress with fluffy white trim, holding a mistletoe above her head while standing near a softly glowing fireplace.",
			malePrompt5: "A rugged man in a partially unbuttoned Santa jacket, revealing a muscular chest, sitting confidently on a chair beside a glowing Christmas tree with a wrapped gift in hand.",
			femalePrompt5: "A seductive woman in a fitted Santa dress with lace-up details, posing beside a grand piano adorned with garlands and candles.",
			malePrompt6: "A confident guy in a Santa-inspired robe tied loosely at the waist, revealing his toned torso, standing barefoot by a frosted window surrounded by Christmas lights.",
			femalePrompt6: "A cheerful woman in a cozy Santa hat and a red sweater dress, standing by a window decorated with snowflake decals and fairy lights.",
			malePrompt7: "A seductive man in a classic Santa suit, but with the shirt unbuttoned and the jacket draped over his shoulders, standing near a mantelpiece holding a glass of whiskey.",
			femalePrompt7: "A modern woman in a Santa-inspired outfit with red leggings and a fluffy coat, holding a small gift box while sitting on the steps of a holiday-decorated porch.",
			malePrompt8: "A striking man in a sleeveless Santa-inspired top, paired with black boots and red trousers, standing confidently near a snow-frosted window holding a string of fairy lights.",
			femalePrompt8: "A bold woman in a fitted Santa-inspired bodysuit with high stockings and red heels, standing confidently by a softly glowing fireplace adorned with garlands and stockings.",
			malePrompt9: "A rugged man in a fitted Santa jacket with no shirt underneath, revealing his toned chest, standing confidently by a softly glowing Christmas tree.",
			femalePrompt9: "A flirty woman in a short Santa dress with a plunging neckline and fur-trimmed sleeves, holding a mistletoe above her head while sitting on the edge of a festive table.",
			malePrompt10: "A playful guy in red velvet Santa trousers and suspenders, with his shirt unbuttoned, leaning against a fireplace adorned with festive garlands.",
			femalePrompt10: "A captivating woman in a satin red robe tied loosely, revealing a Santa-inspired lingerie set beneath, leaning against a holiday-decorated door with a wreath.",
			malePrompt11: "A bold guy in low-slung Santa pants and a red scarf draped over his shoulders, standing barefoot on a plush rug in front of a softly lit Christmas tree.",
			femalePrompt11: "A playful woman in a sheer red Santa babydoll dress, sitting on a bed covered with holiday-themed sheets and twinkling fairy lights.",
			malePrompt12: "A charming man in a red velvet Santa coat, slightly open to reveal his toned chest, leaning against a frosted window with glowing Christmas lights around him.",
			femalePrompt12: "A stunning woman in a fitted Santa jacket with nothing underneath, paired with thigh-high boots, standing near a snow-frosted window holding a steaming mug.",
			malePrompt13: "A confident man in a perfectly tailored Santa suit with a sharp black belt and polished boots, standing with crossed arms beside a glowing Christmas tree, his intense gaze radiating charisma.",
			femalePrompt13: "A bold woman in a red and white corset with matching garters, standing provocatively beside a softly glowing fireplace holding a glass of champagne.",
			malePrompt14: "A rugged man in a modern Santa-inspired outfit: a fitted red coat with white fur trim, black leather gloves, and aviator sunglasses, standing beside a sleigh loaded with wrapped gifts.",
			femalePrompt14: "A flirty woman in a lace red bodysuit with white fur accents, kneeling beside a Christmas tree, surrounded by sparkling ornaments and wrapped presents.",
			malePrompt15: "A charismatic man in a sleek red Santa blazer, paired with dark jeans and a Santa hat tilted slightly to the side, standing confidently in front of a snow-dusted window illuminated by Christmas lights.",
			femalePrompt15: "A woman in a Santa hat and an off-shoulder red sweater, paired with thigh-high socks, sitting on a couch with Christmas decorations and a teasing smile."
		},
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
		  malePrompt11: "A pumped up guy on the beach goes and shows off his body",
		  femalePrompt11: "A girl kneels sexily on the sand on the beach and holds on to her boobs",
		  malePrompt12: "A guy in swim trunks lying on a beach towel, turned slightly on his side, his muscular body relaxed, and his gaze directed confidently at the camera. The pose exudes strength and appeal, with the ocean in the background.",
		  femalePrompt12: "A girl in a sexy bikini sits sexy on the sand at the beach",
		  malePrompt13: "A guy in swim trunks sitting on the edge of a lounge chair, with a relaxed and confident expression, one arm casually resting on the back, and his legs slightly apart. The pose is effortlessly sexy, with the beach setting enhancing the mood.",
		  femalePrompt13: "A girl in a sexy bikini stands in front of the sea on the beach and touches her body, boobs or between her legs.",
		  malePrompt14: "A guy in swim trunks standing waist-deep in the water, with his hands on his hips, showing off his toned physique and confident gaze looking into the distance. The sun reflects off the water, adding to the powerful image.",
		  femalePrompt14: "A girl in a sexy bikini sits on the sand and shows us her sexy boobs teasing us.",
		  malePrompt15: "A guy lying on his stomach on the sand, propped up on his elbows, his body slightly arching to highlight his back and shoulder muscles, with a playful glance to the side. The beach setting enhances the sensual and relaxed vibe.",
		  femalePrompt15: "A girl in a sexy bikini lays on the sand and shows us her sexy butt",
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
		  malePrompt11: "The guy is wearing an evening suit but he's not wearing a top. He's standing on a balcony with the night city as a backdrop and we can see his abs.",
		  femalePrompt11: "The girl is sitting on a large sofa. Dressed in a sexy evening dress, where you can see tight underwear with a sexy thong.",
		  malePrompt12: "A guy with a half-naked torso dressed in an evening suit. He's standing in front of a cool car with the night city as a backdrop.",
		  femalePrompt12: "Girl standing on a balcony with a view of the night city behind her. Dressed in a sexy evening dress where tight underwear is visible.",
		  malePrompt13: "The man is wearing a shirt and trousers from an evening outfit. His shirt is slightly unbuttoned and we can see his abs. He is holding a glass of wine and standing on a balcony with a night city in the background",
		  femalePrompt13: "A girl is sitting on the bonnet of a car that stands in the night city. Dressed in sexy tight lingerie, where you can see her sexy body.",
		  malePrompt14: "The man is wearing a shirt and trousers from an evening outfit. His shirt is slightly unbuttoned and we can see his abs. The shirt sleeves are also rolled up to the elbow. He is sitting in front of a laptop and in the background he has a window to a view of the city at night",
		  femalePrompt14: "A girl dressed in a sexy evening dress stands in a beautiful room and outside the window is evening. She has lifted the skirt of the short dress and we see her see-through underwear",
		  malePrompt15: "The man is wearing a shirt and trousers from an evening outfit. His shirt is slightly unbuttoned and we can see his abs. He is sitting on a soft sofa. In his background there is a window where we can see the night city.",
		  femalePrompt15: "A girl dressed in a sexy evening dress with a short skirt. She is standing on the roof of a building against the background of the night city. Her dress is translucent and we can see her body",
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
		  malePrompt11: "A man dressed in sexy latex and sitting on a luxurious sofa with a night city outside the window",
		  femalePrompt11: "The girl is dressed in sexy latex. She's leaning against a wall in a flat with the night city in the background out the window. She's looking at us. We can see her sexy ass.",
		  malePrompt12: "The man is dressed in sexy latex and shows us his sexy body. Standing in a luxurious room with the night city as a backdrop",
		  femalePrompt12: "The girl is dressed in sexy latex. She touches her boobs and shows her sexuality. Standing in a luxurious room",
		  malePrompt13: "The man is wearing sexy latex and showing off his muscles. Standing in front of a luxurious building against the background of the night city",
		  femalePrompt13: "The girl is dressed in sexy latex. She sits on a sofa in a luxurious room and spread her legs to show her sexy body.",
		  malePrompt14: "The man is dressed in sexy latex. He is sitting on a motorbike in a sexy pose against the background of a night city.",
		  femalePrompt14: "The girl is dressed in sexy latex. Sits on the bonnet of a car and shows her sexy body. In the background of the night city",
		  malePrompt15: "A man is dressed in sexy latex. He leans against a wall in an alley and stands in a sexy pose against the background of the night city.",
		  femalePrompt15: "The girl is dressed in sexy latex. Standing in a sexy pose leaning against a wall in a night alley and showing her sexy butt",
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
		  malePrompt11: "The man is dressed sexy in 80's American style. He is walking down the street of a cool city.",
		  femalePrompt11: "The girl is sexily dressed in 80's American style. She's sitting on a car",
		  malePrompt12: "The man is dressed sexy in 80's American style. He's walking on the beach",
		  femalePrompt12: "The girl is sexily dressed in 80's American style. She is walking along the street of the night city",
		  malePrompt13: "The man is dressed sexy in 80's American style. He's sitting on a car",
		  femalePrompt13: "The girl is sexily dressed in 80's American style. She is walking on the beach",
		  malePrompt14: "The man is dressed sexy in 80's American style. He's sitting on the couch",
		  femalePrompt14: "The girl is sexily dressed in 80's American style. She is sitting on a luxurious sofa",
		  malePrompt15: "The man is dressed sexy in 80's American style. He's sitting on the grass in the park",
		  femalePrompt15: "The girl is sexily dressed in 80's American style. She is sitting on the grass in the park",
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
		  malePrompt11: "The guy is dressed sexy in an urban style. Walking down the street",
		  femalePrompt11: "The girl is dressed sexy in an urban style. She's walking down the street",
		  malePrompt12: "The guy is dressed sexy in an urban style. Walking on a bridge against the background of the night city",
		  femalePrompt12: "The girl is dressed sexy in an urban style. She is walking on the bridge on the background of the night city",
		  malePrompt13: "The guy is dressed sexy in an urban style. He is sitting on a sofa in a sexy position against the background of a night city",
		  femalePrompt13: "The girl is dressed sexy in an urban style. She is sitting on the sofa in a sexy pose",
		  malePrompt14: "The guy is dressed sexy in an urban style. He is standing on a balcony in a sexy pose against the background of the night city",
		  femalePrompt14: "The girl is dressed sexy in an urban style. She is standing on the balcony on the night view of the city",
		  malePrompt15: "The guy is dressed sexy in an urban style. He is standing in a beautiful room with a glass of wine in a sexy pose against the background of the night city",
		  femalePrompt15: "The girl is dressed sexy in an urban style. She is standing in the middle of a beautiful room with a glass of wine and a view of the night city",
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
		  malePrompt11: "The guy is dressed in a sexy fitness style. He's standing in the gym.",
		  femalePrompt11: "The girl is dressed in a sexy fitness style. Standing in the gym",
		  malePrompt12: "The guy is dressed in a sexy fitness style. He's standing in the stadium ",
		  femalePrompt12: "The girl is dressed in a sexy fitness style. Standing in the stadium",
		  malePrompt13: "The guy is dressed in a sexy fitness style. He's standing on a sports field",
		  femalePrompt13: "The girl is dressed in a sexy fitness style. Standing on the sports ground. Her clothes are translucent",
		  malePrompt14: "The guy is dressed in a sexy fitness style. He's jogging athletically down the street",
		  femalePrompt14: "The girl is dressed in a sexy fitness style. She bends over and shows her athletic butt at the stadium",
		  malePrompt15: "The guy is dressed in a sexy fitness style. He's sitting on the grass at the stadium.",
		  femalePrompt15: "The girl is dressed in a sexy fitness style. She sits on a bench in a sports ground and shows her sexy body",
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
		  malePrompt11: "A guy in an Indian sherwani, standing on a palace terrace, his gaze directed into the distance, with a light breeze lifting the edges of his garment, highlighting the strength of his physique.",
		  femalePrompt11: "The girl is dressed sexy in a Japanese kimono. The kimono is short and the girl's sexy body is visible. Also the kimono has slipped off the girl's shoulders and we can see a bit of her breasts. She is standing on the background of blossoming sakura tree",
		  malePrompt12: "A guy in a traditional Scottish kilt, standing against the backdrop of rolling hills, his legs slightly apart and his hands clenched into fists, creating a confident and masculine pose. The wild landscape adds to his allure.",
		  femalePrompt12: "A girl in a traditional Chinese cheongsam with a high slit at the thigh, sitting on cushions in a tea room, her playful gaze directed at the camera. The close-fitting dress emphasizes her silhouette.",
		  malePrompt13: "A guy in a vintage European suit with an unbuttoned vest, standing by an old castle, his shirt slightly open, revealing his chest. The combination of old-world charm and sensuality creates an irresistible look.",
		  femalePrompt13: "A girl in a traditional African wrap dress tied to highlight her waist, standing against a sunset backdrop, her pose confident and seductive. The vibrant colors of the fabric contrast beautifully with the setting sun.",
		  malePrompt14: "A guy in traditional African attire, standing by a fire, his muscular body illuminated by the flames, creating an atmosphere of strength and confidence. The firelight highlights his powerful presence.",
		  femalePrompt14: "A girl in a form-fitting European historical corset, standing by an old castle, her hands gently touching her dress, emphasizing her figure. The dramatic setting enhances her regal and sensual appearance.",
		  malePrompt15: "A guy in a traditional Mexican poncho, standing atop a hill with cacti and a sunset in the background, his strong arms exposed, and his gaze filled with confidence. The scene evokes power and allure against a desert backdrop.",
		  femalePrompt15: "A girl in a form-fitting sari that accentuates her curves, standing in front of an Indian palace, her hands resting on her hips, creating a sensual pose. The vibrant colors of the sari enhance her beauty.",
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
		  malePrompt11: "The guy is dressed in a sexy wedding outfit. He's standing in a luxurious room. His shirt is unbuttoned and we can see his pumped up abs",
		  femalePrompt11: "The girl is dressed sexy in the style of a wedding outfit. We see her sexy body and she is standing in a luxurious room",
		  malePrompt12: "The guy is dressed in a sexy wedding outfit. He's sitting on a couch in a luxurious room. His shirt is unbuttoned and we can see his pumped up abs",
		  femalePrompt12: "The girl is dressed sexy in the style of a wedding outfit. She has a very short skirt and sits on the sofa with her legs spread.",
		  malePrompt13: "The guy is dressed in a sexy wedding outfit. He's standing on the deck of a ship. His shirt is unbuttoned and we can see his pumped up abs",
		  femalePrompt13: "The girl is dressed sexy in the style of a wedding outfit. She touches her boobs and sits very sexy on the sofa showing her sexy body.",
		  malePrompt14: "The guy is dressed in a sexy wedding outfit. He's standing next to the wedding car. His shirt is unbuttoned and we can see his pumped up abs",
		  femalePrompt14: "The girl is dressed sexy in the style of a wedding outfit. She touches her boobs and poses showing her sexy body. Her outfit is very revealing.",
		  malePrompt15: "The guy is dressed in a sexy wedding outfit. He's standing on the balcony with a glass of wine in his hand. His shirt is unbuttoned and we can see his pumped up abs",
		  femalePrompt15: "The girl is dressed sexy in the style of a wedding outfit. She stands on the balcony and shows her sexy body and ass. She is dressed very frankly.",
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
		  malePrompt11: "A male vampire in a sexy shirt that is unbuttoned sits on a throne in a sinister castle and holds a goblet of blood. The dimly lit room is filled with ancient artefacts and an aura of grim elegance.",
		  femalePrompt11: "A female vampire in sexy lingerie sits on a throne in a sinister castle, holding a goblet of blood. The dimly lit room is filled with ancient artefacts and an aura of grim elegance.",
		  malePrompt12: "A male vampire in a sexy unbuttoned shirt stands on a balcony in a sinister castle. The dimly lit room is filled with ancient artefacts and an aura of dark elegance.",
		  femalePrompt12: "A female vampire in sexy lingerie stands on a balcony in a sinister castle. The dimly lit room is filled with ancient artefacts and an aura of grim elegance.",
		  malePrompt13: "A male vampire in a sexy unbuttoned shirt sits on a luxurious couch in a sinister castle. The dimly lit room is filled with ancient artefacts and an aura of dark elegance.",
		  femalePrompt13: "A female vampire in sexy lingerie sits on a luxurious couch in a sinister castle. The dimly lit room is filled with ancient artefacts and an aura of grim elegance.",
		  malePrompt14: "A male vampire in a sexy unbuttoned shirt stands in the middle of a luxurious room in a sinister castle. The dimly lit room is filled with ancient artefacts and an aura of dark elegance.",
		  femalePrompt14: "A female vampire in sexy lingerie stands in the middle of a luxurious room and shows off her sexy booty in a sinister castle. The dimly lit room is filled with ancient artefacts and an aura of grim elegance.",
		  malePrompt15: "A male vampire in a sexy unbuttoned shirt stands in the middle of a bridge in a sinister castle. He holds a goblet of wine in his hands. The dimly lit room is filled with ancient artefacts and an aura of dark elegance.",
		  femalePrompt15: "A female vampire in sexy lingerie stands in the middle of a bridge in a sinister castle. In her hands is a glass of wine. The dimly lit room is filled with ancient artefacts and an aura of dark elegance.",
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
		  malePrompt11: "A male medic in a sexy uniform stands against an ambulance. His uniform is half unbuttoned and his abs are visible.",
		  femalePrompt11: "The nurse girl is dressed in a sexy uniform. She is sitting on the desk in the office and we can see her sexy body.",
		  malePrompt12: "A male doctor sits in his doctor's office. His shirt is unbuttoned and we can see his abs.",
		  femalePrompt12: "The nurse girl is dressed in a sexy uniform. She is bent over and you can see her sexy ass. She's standing in the middle of the office.",
		  malePrompt13: "A male medic sits on a couch in a hospital corridor. He is pumped up and his uniform is slightly unbuttoned and his abs are visible.",
		  femalePrompt13: "The nurse girl is dressed in a sexy uniform and lingerie. Sitting on the sofa in the office.",
		  malePrompt14: "A male medic is walking down the corridor of a hospital. He is pumped up and his uniform is slightly unbuttoned and his abs are visible.",
		  femalePrompt14: "Girl nurse dressed in sexy clothes and underwear. Walking down the corridor of the hospital",
		  malePrompt15: "A male paramedic sits on a couch in a hospital. His shirt is unbuttoned and his pumped-up abs are visible",
		  femalePrompt15: "Girl nurse dressed in sexy clothes and underwear. Standing near an ambulance",
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
    const [advancedFacelockUploadedImage, setAdvancedFacelockUploadedImage] = useState<string | null>(null);

	const [isFeedbackModalShown, setIsFeedbackModalShown] = useState(false);
	const feedbackModalShownRef = useRef(false);

	useEffect(() => {
		feedbackModalShownRef.current = isFeedbackModalShown;
	}, [isFeedbackModalShown]);
	
	const [displayedImages, setDisplayedImages] = useState<string[]>([]);
	const [isSeedOpen, setIsSeedOpen] = useState(false);
	const [isPromptOpen, setIsPromptOpen] = useState(false);
	const [isPublicGalleryEssentialOpen, setIsPublicGalleryEssentialOpen] = useState(false);
	const [isPublicGalleryAdvancedOpen, setIsPublicGalleryAdvancedOpen] = useState(false);
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

	const [allowPublicGallery, setAllowPublicGallery] = useState(true);

	const [selectedCategory, setSelectedCategory] = useState('All');
	const [filteredModels, setFilteredModels] = useState(modelData);

	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(false);

	const [isScrollable, setIsScrollable] = useState(false);

	const categoryRef = useRef<HTMLDivElement | null>(null);

	const containerRef = useRef<HTMLDivElement | null>(null);

	
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

	// const { isOpen, onOpen, onClose } = useDisclosure();

	const categoriesPadding = {
		paddingLeft: atStart ? '5px' : '30px',
		paddingRight: atEnd ? '5px' : '30px',
		paddingTop: '5px',
		paddingBottom: '5px',
	  };

	// Handle category selection
	const handleCategorySelect = (category: string) => {
		setSelectedCategory(category);
	
		if (category === 'All') {
		setFilteredModels(modelData);
		} else {
		const filtered = modelData.filter((model) => model.category === category);
		setFilteredModels(filtered);
		}
	};

	const scrollLeft = () => {
		categoryRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
		// Use requestAnimationFrame for better timing
		requestAnimationFrame(handleScroll);
	  };
	  
	  const scrollRight = () => {
		categoryRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
		requestAnimationFrame(handleScroll);
	  };

	  const handleScroll = () => {
		if (categoryRef.current) {
		  const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current;
		  const scrollThreshold = 0; // Small threshold to detect near the end
	  
		  setAtStart(scrollLeft <= 0);
		  setAtEnd(scrollLeft + clientWidth >= scrollWidth - scrollThreshold);
		}
	  };
	  
	  // Initialize scroll state on mount
		useEffect(() => {
			handleScroll();
		}, []);
		
		// Update scrollability on resize
		useEffect(() => {
			const handleResize = () => {
			if (categoryRef.current && containerRef.current) {
				const containerWidth = containerRef.current.clientWidth;
				const contentWidth = categoryRef.current.scrollWidth;
		
				setIsScrollable(contentWidth > containerWidth);
		
				// Update scroll position states
				handleScroll();
			}
			};
		
			handleResize(); // Initial check
			window.addEventListener('resize', handleResize);
		
			return () => window.removeEventListener('resize', handleResize);
		}, [isModelModalOpen]);

	//   useEffect(() => {
	// 	// Add scroll listener
	// 	categoryRef.current?.addEventListener('scroll', handleScroll);
	
	// 	return () => {
	// 		categoryRef.current?.removeEventListener('scroll', handleScroll);
	// 	};
	// }, []);

	const handleSwitchChange = (isSelected: boolean) => {
		setAllowPublicGallery(isSelected);
	  };

	const [activeTab, setActiveTab] = useState<string>("essential");
	const [activeTabCollection, setActiveTabCollection] = useState<string>("collections");

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
	
	const resetEssentialDefaults = () => {
		setAllowPublicGallery(true);
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
        setStepsAdvancedNumber(30);
		setCfgAdvancedNumber(4);
		setAdvancedSelectedSimilarity(3);
		setDenoiseAdvancedNumber(1);
		setPoseAdvancedNumber(1);
		setFacelockWeightNumberAdvanced(1);
		setSelectedAdvancedResolution("2:3");
		setSelectedModel(new Set(["realism"]));
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
		setAllowPublicGallery(true);
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
        setStepsAdvancedNumber(30);
		setCfgAdvancedNumber(4);
		setAdvancedSelectedSimilarity(3);
		setDenoiseAdvancedNumber(1);
		setPoseAdvancedNumber(1);
		setFacelockWeightNumberAdvanced(1);
		setSelectedAdvancedResolution("2:3");
		setSelectedModel(new Set(["realism"]));
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

	// const handleSelectModel = (modelId: number) => {
	// 	setSelectedModelId(modelId);
	// };

	const handleSelectModel = (index: number) => {
		// Find the model index in the original modelData array
		const model = filteredModels[index];
		const originalIndex = modelData.findIndex((m) => m.name === model.name);
	  
		setSelectedModelId(originalIndex);
		closeModelModal();
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
    const [selectedModel, setSelectedModel] = useState<Selection>(new Set(["realism"]));
    const selectedModelString = Array.from(selectedModel).length ? Array.from(selectedModel)[0].toString() : "realism";

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
	const [imagesNumberPerCollectionPrompt, setImagesNumberPerCollectionPrompt] = useState<number>(2);

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

		if (activeTab === 'collections') {
			handleFormSubmitGenerationCollection(event)
		} else {
			handleFormSubmitGeneration(event);
		}
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

        // if ((activeTab === 'essential' && (uploadedFacelockImage && !uploadedImage)) || (activeTab === 'advanced' && (advancedFacelockUploadedImage && !advancedUploadedImage))) {
		// 	toast.error('Please provide a base Image.', {
		// 		position: "top-right",
		// 		autoClose: 5000,
		// 		hideProgressBar: false,
		// 		closeOnClick: true,
		// 		pauseOnHover: true,
		// 		draggable: true,
		// 		progress: undefined,
		// 		theme: "dark",
		// 	  });
		// 	return;
		// }

		// if ((activeTab === 'advanced' && (advancedMaskImage !== null || userMaskPrompt !== '')) && advancedUploadedImage === null ) {
		if ((activeTab === 'advanced' && (advancedMaskImage !== null || userMaskPrompt !== '')) && uploadedImage === null ) {
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

		if (activeTab === 'essential' && !uploadedImage && (selectedReferenceTypeString === "Image to Image" || selectedReferenceTypeString === "Image Upscale")) {
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

		// if (activeTab === 'advanced' && !advancedUploadedImage && (selectedReferenceTypeStringAdvanced === "Image to Image" || selectedReferenceTypeStringAdvanced === "Image Upscale")) {
		if (activeTab === 'advanced' && !uploadedImage && (selectedReferenceTypeString === "Image to Image" || selectedReferenceTypeString === "Image Upscale")) {
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

		// Capture the initial number of images to generate
		// const initialImagesNumber = activeTab === 'essential' ? imagesNumber : imagesAdvancedNumber;
		const initialImagesNumber = imagesNumber;

		// Determine the current prompt based on the active tab
		// let currentPrompt = activeTab === 'essential' ? userPrompt : userAdvancedPrompt;
		let currentPrompt = userPrompt;


		if (activeTab === 'essential' && uploadedImage && selectedReferenceTypeString === "Image Upscale") {
			currentPrompt = "upscale";
		} 
		// else if (activeTab === 'advanced' && (advancedUploadedImage && ((advancedMaskImage === null && userMaskPrompt === '')) && selectedReferenceTypeStringAdvanced === "Image Upscale")) {
		else if (activeTab === 'advanced' && (uploadedImage && ((advancedMaskImage === null && userMaskPrompt === '')) && selectedReferenceTypeString === "Image Upscale")) {
			currentPrompt = "upscale";
		}

		const currentNegativePrompt = userNegativePrompt && userNegativePrompt.trim() !== "" ? userNegativePrompt : "none";
		// const currentImage = activeTab === 'essential' ? uploadedImage : advancedUploadedImage;
		const currentImage = uploadedImage;

        const currentFacelockImage = activeTab === 'essential' ? uploadedFacelockImage : advancedFacelockUploadedImage;
		// const resolution = activeTab === 'essential' ? resolutions[selectedResolution] : resolutions[selectedAdvancedResolution];
		const resolution = resolutions[selectedResolution]
		const loras = 'None';

		let type_gen;

		if (activeTab === 'essential' && uploadedImage && selectedReferenceTypeString === "Image to Image") {
		// if (activeTab === 'essential' && (uploadedImage || uploadedFacelockImage)) {
			type_gen = "img2img";
			// console.log('Set type_gen 1: ', type_gen)
		} else if (activeTab === 'essential' && uploadedImage && selectedReferenceTypeString === "Image Upscale") {
			type_gen = "img2upscale";
			// console.log('Set type_gen 2: ', type_gen)
		} 
		// else if (activeTab === 'advanced' && (advancedUploadedImage && ((advancedMaskImage === null && userMaskPrompt === '')) && selectedReferenceTypeStringAdvanced === "Image Upscale")) {
		else if (activeTab === 'advanced' && (uploadedImage && ((advancedMaskImage === null && userMaskPrompt === '')) && selectedReferenceTypeString === "Image Upscale")) {
			type_gen = "img2upscale";
			// console.log('Set type_gen 3: ', type_gen)
		} 
		// else if (activeTab === 'advanced' && (advancedUploadedImage && ((advancedMaskImage === null && userMaskPrompt === '')) && selectedReferenceTypeStringAdvanced === "Image to Image")) 
		else if (activeTab === 'advanced' && (uploadedImage && ((advancedMaskImage === null && userMaskPrompt === '')) && selectedReferenceTypeString === "Image to Image")) 
			{
		// } else if (activeTab === 'advanced' && ((advancedUploadedImage || advancedFacelockUploadedImage || advancedPoseImage) && (advancedMaskImage === null && userMaskPrompt === ''))) {
			type_gen = "img2img";
			// console.log('Set type_gen 4: ', type_gen)
		} else if (activeTab === 'advanced' && (advancedMaskImage !== null || userMaskPrompt !== '')) {
			type_gen = "img2inpaint";
			// console.log('Set type_gen 5: ', type_gen)
		} 
		else {
			type_gen = "txt2img";
			// console.log('Set type_gen 6: ', type_gen)
		}
		// console.log('Set fnal type_gen: ', type_gen)
		// if (activeTab === 'essential' && uploadedImage && selectedReferenceTypeString === "Image to Image") {
		// 	// if (activeTab === 'essential' && (uploadedImage || uploadedFacelockImage)) {
		// 		type_gen = "img2img";
		// 	} else if (activeTab === 'advanced' && (advancedUploadedImage && ((advancedMaskImage === null && userMaskPrompt === '')) && selectedReferenceTypeStringAdvanced === "Image to Image")) {
		// 	// } else if (activeTab === 'advanced' && ((advancedUploadedImage || advancedFacelockUploadedImage || advancedPoseImage) && (advancedMaskImage === null && userMaskPrompt === ''))) {
		// 		type_gen = "img2img";
		// 	} else if (activeTab === 'advanced' && (advancedMaskImage !== null || userMaskPrompt !== '')) {
		// 		type_gen = "img2inpaint";
		// 	} 
		// 	else {
		// 		type_gen = "txt2img";
		// 	}

		// console.log('type_gen', type_gen);

		// ADD IMAGE ID
	
		if (activeTab === 'essential' && selectedReferenceTypeString !== "Image Upscale" && !currentPrompt) {
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
		// else if (activeTab === 'advanced' && selectedReferenceTypeStringAdvanced !== "Image Upscale" && !currentPrompt) 
		else if (activeTab === 'advanced' && selectedReferenceTypeString !== "Image Upscale" && !currentPrompt) 
			{
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
		
		// if (!currentPrompt) {
		//   toast.warn('Please provide a prompt for the generation.', {
		// 	position: "top-right",
		// 	autoClose: 5000,
		// 	hideProgressBar: false,
		// 	closeOnClick: true,
		// 	pauseOnHover: true,
		// 	draggable: true,
		// 	progress: undefined,
		// 	theme: "dark",
		//   });
		//   setIsSubmitting(false);
		//   return; // Prevent the form from submitting if no prompt is provided
		// }

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

				let model;
				if (activeTab === 'advanced' && (advancedMaskImage !== null || userMaskPrompt !== '')) {
					model = 'realism_inpaint';
				} else {
					model = 'realism';
				}

				if (activeTab === 'essential' && currentStyle === "Anime") {
					model = 'counterfeitxl_v25';
				} else if (activeTab === 'advanced' && currentStyleAdvanced === "Anime") {
					model = 'counterfeitxl_v25';
				}

				let advancedPhotorealismStyle = '';

				if (activeTab === 'advanced' && selectedModelId !== null) {
					model = modelData[selectedModelId].apiName.toString();
				} 

				if (activeTab === 'essential' && currentStyle === "More" && selectedModelId !== null) {
					model = modelData[selectedModelId].apiName.toString();
				} 
				// else if (activeTab === 'advanced' && selectedModelId !== null && modelData[selectedModelId].name === 'Photorealism') {
				// 	advancedPhotorealismStyle = `${modelData[selectedModelId].name.toString()} style`
				// }

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
				let inpaint_what = model === 'realism_inpaint' ? userMaskPrompt ? userMaskPrompt : 'None' : 'None'
				
				// console.log('user_shared_settings', allowPublicGallery)
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
						style: activeTab === 'essential' && currentStyle !== 'More' ? currentStyle : 'null', 
						tool: 'Creating',
						neg_prompt: currentNegativePrompt,
						pipeline: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
						loras,
						favorite: false,
						cost: tokensPerImage,
						user_shared_settings: allowPublicGallery,
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

                    if (advancedMaskImage !== null && activeTab === 'advanced') {
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
                        prompt: activeTab === 'essential' && currentStyle !== 'More' ? `${currentPrompt}. ${currentStyle} style` : currentPrompt,
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

					if (type_gen === "img2upscale") {
						formData.append('params', upscale);
					} else {
						formData.append('params', JSONparams);
					}

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

						let endpoint;
						if (type_gen === 'txt2img') {
							endpoint = '/api/gen/v2/image/text-instant';
						} else if (type_gen === 'img2img') {
							endpoint = '/api/gen/v2/image/image-instant';
						} else if (type_gen === 'img2inpaint') {
							endpoint = '/api/gen/v2/image/image-inpaint';
						} else if (type_gen === 'img2upscale') {
							endpoint = '/api/gen/v2/image/image-upscale';
						} else {
							endpoint = '/api/gen/v2/image/text-instant';
						}

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

const handleFormSubmitGenerationCollection = async (event: React.FormEvent) => {

	event.preventDefault();
	
	if (isSubmitting === true) {
		return;
	}
	setIsSubmitting(true);

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
	
	
	if (session?.user?.credits === 0) {
		// checkReferralModalOpenCase();
		checkPricingModalOpenCase();
		setIsSubmitting(false);
		return;
	}

	if ((session?.user?.credits ?? 0) <= 0) {
		checkPricingModalOpenCase();
		setIsSubmitting(false);
		return;
	}

	if (session?.user?.subscription === "Free") {
		openPricingModalForCollection();
		setIsSubmitting(false);
		return;
	}

	if (session?.user?.credits === 0) {
		// checkFeedbackModalOpenCase();
		toast.error('You do not have enough tokens to generate a collection.', {
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

	if ((session?.user?.credits ?? 0) <= 0) {
		// checkFeedbackModalOpenCase();
		toast.error('You do not have enough tokens to generate a collection.', {
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

	if (activeTab !== 'collections') {
		toast.error('Please click Collections tab in menu.', {
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

	setActiveTabCollection('gallery');

	const selectedCollection = collectionData[selectedCollectionId];

    const prompts = selectedGenderTypeString === "Woman"
        ? [
            selectedCollection.femalePrompt1, selectedCollection.femalePrompt2,
            selectedCollection.femalePrompt3, selectedCollection.femalePrompt4,
            selectedCollection.femalePrompt5, selectedCollection.femalePrompt6,
            selectedCollection.femalePrompt7, selectedCollection.femalePrompt8,
            selectedCollection.femalePrompt9, selectedCollection.femalePrompt10,
			selectedCollection.femalePrompt11, selectedCollection.femalePrompt12,
            selectedCollection.femalePrompt13, selectedCollection.femalePrompt14,
            selectedCollection.femalePrompt15,
        ]
        : [
            selectedCollection.malePrompt1, selectedCollection.malePrompt2,
            selectedCollection.malePrompt3, selectedCollection.malePrompt4,
            selectedCollection.malePrompt5, selectedCollection.malePrompt6,
            selectedCollection.malePrompt7, selectedCollection.malePrompt8,
            selectedCollection.malePrompt9, selectedCollection.malePrompt10,
			selectedCollection.malePrompt11, selectedCollection.malePrompt12,
            selectedCollection.malePrompt13, selectedCollection.malePrompt14,
            selectedCollection.malePrompt15,
        ];

	let gender =  selectedGenderTypeString;
	let ethnicity = selectedEthnicityTypeString;
	let hair = selectedHairTypeString;

    const basePrompt = `${gender}. ${ethnicity}. ${hair} hair. `;

	const currentNegativePrompt = defaultNegativePrompt;
	// const currentImage = activeTab === 'essential' ? uploadedImage : advancedUploadedImage;
	const currentImage = uploadedImage;

	// const resolution = activeTab === 'essential' ? resolutions[selectedResolution] : resolutions[selectedAdvancedResolution];
	const resolution = resolutions[selectedResolution]
	const loras = 'None';

	let type_gen;

	if (activeTab === 'collections' && uploadedImage) {
	// if (activeTab === 'essential' && (uploadedImage || uploadedFacelockImage)) {
		type_gen = "txt2img";
		// console.log('Set type_gen 1: ', type_gen)
	} else {
		type_gen = "txt2img";
		// console.log('Set type_gen 6: ', type_gen)
	}
	// console.log('Set fnal type_gen: ', type_gen);

	// Check if the user has enough tokens
    let requiredTokens = prompts.length * imagesNumberPerCollectionPrompt; // Assuming 3 images per prompt
    let tokensPerImage = requiredTokens / (prompts.length * imagesNumberPerCollectionPrompt);

	// if (imagesResolutionParam === "2K" || imagesResolutionParam === '4K') {
	// 	tokensPerImage = tokensPerImage * resolutionPrices[imagesResolutionParam] 
	// }

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

	for (let prompt of prompts) {
		if (!prompt) continue;

		let currentPrompt = `${basePrompt}${prompt}`;

		for (let i = 0; i < imagesNumberPerCollectionPrompt; i++) {
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

					let facelock_type = activeTab === 'collections' && uploadedImage !== null ? "faceswap" : 'None';
					let model = 'realism'; // Replace with the actual model if different
					let steps = 30;
					let cfg = 4;
					let denoise = 1;
					let weights_interpretator = 'Lite';
					let loras = 'None';
					let upscale = 'None';
					let facelock_weight = facelockWeightNumber;
					let pose_weight = 1;
					let inpaint_what = 'None';

					// Create new image document and get its ID
					const createImageResponse = await fetch('/api/image/add', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ 
							userId: session?.user?.id, 
							type_gen, 
							prompt: 'Image was generated using Collections',
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
							style: 'null', 
							tool: 'Creating',
							neg_prompt: currentNegativePrompt,
							pipeline: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
							loras,
							favorite: false,
							cost: tokensPerImage,
							user_shared_settings: false,
						})
					});

					const imageData = await createImageResponse.json();
					// console.log('imageData', imageData);
					if (imageData.message !== 'Image document added successfully') throw new Error(imageData.message);
					imageId = imageData.imageId;

					try {

						const formData = new FormData();
		
						if (currentImage !== null && activeTab === 'collections') {
							// console.log("currentImage", currentImage)
							const base64Response = base64ToArrayBuffer(currentImage);
							const blob = new Blob([base64Response], { type: 'image/jpeg' });
							formData.append('facelock', blob);
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
							prompt: currentPrompt,
							negprompt: currentNegativePrompt
						};
		
						let JSONparams = JSON.stringify(params).toString();
		
						formData.append('params', JSONparams);
		
						// console.log('type_gen post', type_gen);
						formData.append('type_gen', type_gen);
						formData.append('type_user', type_user);
						formData.append('id_gen', imageId);
		
						try {
		
							let endpoint;
							if (type_gen === 'txt2img') {
								endpoint = '/api/gen/v2/image/text-instant';
							} else if (type_gen === 'img2img') {
								endpoint = '/api/gen/v2/image/image-instant';
							} else if (type_gen === 'img2inpaint') {
								endpoint = '/api/gen/v2/image/image-inpaint';
							} else if (type_gen === 'img2upscale') {
								endpoint = '/api/gen/v2/image/image-upscale';
							} else {
								endpoint = '/api/gen/v2/image/text-instant';
							}
		
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
		
							// toast.success(`Approximate time to generate image: ${queueTimeMessage}.`, {
							// 	position: "top-right",
							// 	autoClose: 5000,
							// 	hideProgressBar: false,
							// 	closeOnClick: true,
							// 	pauseOnHover: true,
							// 	draggable: true,
							// 	progress: undefined,
							// 	theme: "light", // Set theme to light for green toast
							// });
		
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
			delay(1000);
		}
	}
};

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
		}
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

	  const handleTabChangeCollection = (key: React.Key) => {
		setActiveTabCollection(String(key));
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
						<Tabs key={'underlined'} variant={'underlined'} aria-label="Tabs variants" color="primary" onSelectionChange={handleTabChange}>
							<Tab key="essential" title="Essential">
								<div className={styles['ai-generator_parameters__outer']}>
									<div className={styles['ai-generator_parameters__inner']}>
										<div className={styles['ai-generator__simple_prompt']}>
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
												value={userPrompt}
												onValueChange={handlePromptChange}
												classNames={{
													base: `max-w-full`,
													input: `min-h-[90px] ${styles['textarea-input']}`,
												}}
											/>
											<div className="flex flex-row mt-2">
												<span className={styles['ai-generator_styles_label']}>Style</span>
												<Breadcrumbs
													size="md"
													onAction={(key) => setCurrentStyle(String(key))}
													classNames={{
														list: "gap-2",
													}}
													itemClasses={{
														item: [
														"px-2 py-0.5 border-small border-default-400 rounded-small",
														"data-[current=true]:border-foreground data-[current=true]:bg-secondary data-[current=true] transition-colors",
														"data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
														],
														separator: "hidden",
													}}
													>
													<BreadcrumbItem 
														onPress={() => {
															trackEvent("essential_style_photorealism");
														}} 
														key="Photorealism" 
														isCurrent={currentStyle === "Photorealism"}
													>
														Photorealism
													</BreadcrumbItem>
										
													<BreadcrumbItem
														onPress={() => {
															trackEvent("essential_style_anime");
														}} 
														key="Anime" 
														isCurrent={currentStyle === "Anime"}
													>
														Anime
													</BreadcrumbItem>

													<BreadcrumbItem
														onClick={() => {
															openModalWithModels();
															// trackEvent("essential_style_anime");
														}} 
														key="More" 
														isCurrent={currentStyle === "More"}
													>
														More
													</BreadcrumbItem>
												</Breadcrumbs>
											</div>
										</div>
										<div className={styles['collapse']}>
											<Accordion 
												selectedKeys={Array.from(essentialSelectedKeys)}
												onSelectionChange={handleEssentialSelectionChange}
												selectionMode="multiple"
											>
											<AccordionItem
												key="1"
												aria-label="Accordion Resolution"
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scaling " style={{ marginRight: '8px' }}>
														<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
														<path d="M14 15H9v-5"></path>
														<path d="M16 3h5v5"></path>
														<path d="M21 3 9 15"></path>
													</svg>														
												}
												onPress={() => {
													trackEvent("essential_style_resolution");
												}} 
												title={
													<div className={`${styles['accordion-items-wrapper']} text-small`}>
														Resolution: {resolutions[selectedResolution]}
													</div>
												}
											>
                                                <div className={`${styles['collapse']}`}>
                                                    <div className={`${styles['']}`}>
                                                        <div>
                                                            <div className={`${styles['ai-generator_aspect_ratios']}`}>
															{Object.entries(resolutions).map(([key, value]) => {
																const [ratioW, ratioH] = key.split(':').map(Number);
																const visualWidth = 10 * ratioW / ratioH;
																const visualHeight = 10;
																const isSelected = selectedResolution === key;

																return (
																	<div key={key} className={`${styles['ai-generator_aspect_row']}`}>
																		<label 
																			htmlFor={`aspectRatio${key.replace(":", "_")}`} 
																			className={`${styles['ai-generator_aspect_ratio_btn']}`}
																			style={{
																				cursor: 'pointer',
																				border: isSelected ? '2px solid #5858e6' : '1px solid #f7f8f866',
																			}}
																			onClick={() => handleResolutionSelect(key)}
																		>
																			<input
																				id={`aspectRatio${key.replace(":", "_")}`}
																				name="aspectRatio"
																				type="checkbox"
																				value={key}
																				checked={isSelected}
																				onChange={() => {}}
																				style={{ display: 'none' }}
																			/>
																			<span>{key}</span>
																			<i 
																				className="ai-generator_apsect_ratio_vis"
																				style={{ 
																					width: `${visualWidth}px`, 
																					height: `${visualHeight}px`, 
																					backgroundColor: isSelected ? '#5858e6' : '#f7f8f866',
																				}}
																			></i>
																		</label>
																	</div>
																);
															})}
                                                            </div>
                                                            <div style={{}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionItem>

											{/* <AccordionItem
												className={styles['']}
												key="3"
                                                aria-label="Accordion Facelock"
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image " style={{ marginRight: '8px' }}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
												}
												onPress={() => {
													trackEvent("essential_style_facelock");
												}} 
												title={
													<div className={`${styles['accordion-items-wrapper']} text-small`}>
														{'Image (Facelock)'}
													</div>
												}
											>
												<div className={styles['ai-generator_upload__wrapper']}>
													<div className={styles['ai-generator_dropzone_img']}>
														<div 
															className={styles['ai-generator_dropzone']}
															onDragOver={(e) => e.preventDefault()}
															onDrop={handleFacelockFileDrop}
														>
															<button 
																		onClick={clearFacelockImage}
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
															{uploadedFacelockImage ? (
																<>
																	<img src={uploadedFacelockImage} alt="Uploaded Facelock Image" className={styles['uploaded-image']} />
																</>
															) : (
																<>
																	<input
																		id="fileUploadfacelock"
																		accept="image/png,.png,image/jpeg,.jpeg,.jpg"
																		type="file"
																		onChange={handleFacelockImageUpload}
																		className={`${styles['input-values-img']}`}
																	/>
																	<label className={`${styles['input-img-label']}`} htmlFor="fileUploadfacelock">Drag an image here, or click to select one.</label>
																</>
															)}
														</div>
													</div>
												</div>
												
												<div className={`${styles['slider-wrapper']}`}>
													<Slider
														label="Similarity to image"
														color="foreground"
														size="sm"
														step={1}
														minValue={1}
														maxValue={5}
														marks={[
															{ value: 1, label: "Low" },
															{ value: 2, label: "" },
															{ value: 3, label: "Medium" },
															{ value: 4, label: "" },
															{ value: 5, label: "High" },
														]}
														defaultValue={3}
														onChange={handleSimilaritySliderChange}
														className={`${styles['slider-values-input']}`}
													/>
												</div>
											</AccordionItem> */}

											<AccordionItem
												className={styles['']}
												key="2"
                                                aria-label="Accordion Image"
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image " style={{ marginRight: '8px' }}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
												}
												onPress={() => {
													trackEvent("essential_style_facelock");
												}} 
												title={
													<div className={`${styles['accordion-items-wrapper']} text-small`}>
														Image
													</div>
												}
											>
												<div className={styles['ai-generator_upload__wrapper']}>
													<div className={styles['ai-generator_dropzone_img']}>
														<div 
															className={styles['ai-generator_dropzone']}
															onDragOver={(e) => e.preventDefault()}
															onDrop={handleFileDrop}
														>
															<button 
																		onClick={clearImage}
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
															{uploadedImage ? (
																<>
																	<img src={uploadedImage} alt="Uploaded Facelock Image" className={styles['uploaded-image']} />
																</>
															) : (
																<>
																	<input
																		id="fileUpload"
																		accept="image/png,.png,image/jpeg,.jpeg,.jpg"
																		type="file"
																		onChange={handleImageUpload}
																		className={`${styles['input-values-img']}`}
																	/>
																	<label className={`${styles['input-img-label']}`} htmlFor="fileUpload">Drag an image here, or click to select one.</label>
																</>
															)}
														</div>
													</div>
												</div>
												<div className={`${styles['select-wrapper']}`}>
													<label htmlFor="model" className={`${styles['input_input_label']}`}>
                                                            Reference
															{/* <Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Select the number of steps that are taken during image generation process.
																	</div>
																}
																isOpen={isImageStepsOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsImageStepsOpen(true)}
																	onMouseLeave={() => setIsImageStepsOpen(false)}
																	onClick={() => setIsImageStepsOpen(!isImageStepsOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip> */}
														</label>
                                                    <Select
                                                        labelPlacement="outside"
                                                        // label="Model"
                                                        placeholder="Select facelock type"
                                                        className="mt-4"
                                                        size={isMobile ? "lg" : "md"}
                                                        selectedKeys={selectedReferenceType}
                                                        onSelectionChange={setSelectedReferenceType}
                                                    >
                                                        {referenceTypes.map((type) => (
                                                            <SelectItem key={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
												</div>

												{selectedReferenceTypeString === "Character / FaceLock" && 
												<>
													<div className={`${styles['slider-wrapper']}`}>
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
														<label htmlFor="facelockWeight" className={`${styles['input_input_label']}`}>
															Facelock Weight
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Adjust the Face Lock Strength to control the level of emphasis the model places on maintaining the facial features of the input image.
																	</div>
																}
																isOpen={isFacelockWeightOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsFacelockWeightOpen(true)}
																	onMouseLeave={() => setIsFacelockWeightOpen(false)}
																	onClick={() => setIsFacelockWeightOpen(!isFacelockWeightOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<div className={styles['generations-value']}>
															{facelockWeightNumber}
														</div>
													</div>
													<Slider
														color="foreground"
														size="sm"
														step={0.05}
														minValue={0.1}
														maxValue={1}
														// marks={[
														// 	{ value: 1, label: "HD" },
														// 	{ value: 2, label: "2K" },
														// 	{ value: 3, label: "4K" },
														// ]}
														defaultValue={facelockWeightNumber}
														value={facelockWeightNumber}
														onChange={handleEssentialFacelockWeightSliderChange}
														className={`${styles['slider-values-input']}`}
													/>
												</div>
												{/* <div className={`${styles['select-wrapper']}`}>
													<label htmlFor="model" className={`${styles['input_input_label']}`}>
                                                            Facelock Type
														</label>
                                                    <Select
                                                        labelPlacement="outside"
                                                        // label="Model"
                                                        placeholder="Select facelock type"
                                                        className="mt-4"
                                                        size={isMobile ? "lg" : "md"}
                                                        selectedKeys={selectedFacelockType}
                                                        onSelectionChange={setSelectedFacelockType}
                                                    >
                                                        {facelockTypes.map((type) => (
                                                            <SelectItem key={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
												</div> */}
												</>
												}
												{selectedReferenceTypeString === "Image to Image" && 
												<>
													<div className={`${styles['slider-wrapper']}`}>
														<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
															<label htmlFor="cfg" className={`${styles['input_input_label']}`}>
																Denoise
																<Tooltip
																	key={'bottom-start'}
																	placement={'bottom-start'}
																	content={
																		<div className={`${styles['seed-information']}`}>
																			Adjusting this setting allows you to control the clarity and detail level of the output image, with higher values typically preserving more details of the original image.
																		</div>
																	}
																	isOpen={isImageDenoiseOpen}
																	className={`${styles['seed-tooltip']}`}
																>
																	<button 
																		className={styles['seed_image_btn']}
																		onMouseEnter={() => setIsImageDenoiseOpen(true)}
																		onMouseLeave={() => setIsImageDenoiseOpen(false)}
																		onClick={() => setIsImageDenoiseOpen(!isImageDenoiseOpen)}
																	>
																			<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																		</button>
																</Tooltip>
															</label>
															<div className={styles['generations-value']}>
																{denoiseEssentialNumber}
															</div>
														</div>
														<Slider
															color="foreground"
															size="sm"
															step={0.05}
															minValue={0.1}
															maxValue={1}
															// marks={[
															// 	{ value: 1, label: "HD" },
															// 	{ value: 2, label: "2K" },
															// 	{ value: 3, label: "4K" },
															// ]}
															defaultValue={denoiseEssentialNumber}
															value={denoiseEssentialNumber}
															onChange={handleEssentialDenoiseSliderChange}
															className={`${styles['slider-values-input']}`}
														/>
													</div>
												</>
												}
												{selectedReferenceTypeString === "Image Upscale" && 
												<>
													<div className={`${styles['slider-wrapper']}`}>
														<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
															<label htmlFor="upscale" className={`${styles['input_input_label']}`}>
																Upscale
															</label>
															<div className={styles['generations-value']}>
																{imagesUpscaleParam}
															</div>
														</div>
														<Slider
															color="foreground"
															size="sm"
															step={1}
															minValue={1}
															maxValue={2}
															marks={[
																{ value: 1, label: "2x" },
																{ value: 2, label: "4x" },
															]}
															defaultValue={1}
															value={upscaleValueMap[imagesUpscaleParam]}
															onChange={handleImageUpscaleSliderChange}
															className={`${styles['slider-values-input']}`}
														/>
													</div>
												</>
												}
											</AccordionItem>

                                            {/* <AccordionItem
												className={styles['']}
												key="2"
                                                aria-label="Accordion Image"
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image " style={{ marginRight: '8px' }}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
												}
												title={
													<div className={`${styles['accordion-items-wrapper']} text-small`}>
														Image
													</div>
												}
											>
												<div className={styles['ai-generator_upload__wrapper']}>
													<div className={styles['ai-generator_dropzone_img']}>
														<div 
															className={styles['ai-generator_dropzone']}
															onDragOver={(e) => e.preventDefault()}
															onDrop={handleFileDrop}
														>
															<button 
																		onClick={clearImage}
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
															{uploadedImage ? (
																<>
																	<img src={uploadedImage} alt="Uploaded Image" className={styles['uploaded-image']} />
																</>
															) : (
																<>
																	<input
																		id="fileUpload"
																		accept="image/png,.png,image/jpeg,.jpeg,.jpg"
																		type="file"
																		onChange={handleImageUpload}
																		className={`${styles['input-values-img']}`}
																	/>
																	<label className={`${styles['input-img-label']}`} htmlFor="fileUpload">Drag an image here, or click to select one.</label>
																</>
															)}
														</div>
													</div>
												</div>
											</AccordionItem> */}

											<AccordionItem
												className={styles['']}
												key="3"
												aria-label="Accordion Images Number"
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sliders-horizontal " style={{ marginRight: '8px' }}><line x1="21" x2="14" y1="4" y2="4"></line><line x1="10" x2="3" y1="4" y2="4"></line><line x1="21" x2="12" y1="12" y2="12"></line><line x1="8" x2="3" y1="12" y2="12"></line><line x1="21" x2="16" y1="20" y2="20"></line><line x1="12" x2="3" y1="20" y2="20"></line><line x1="14" x2="14" y1="2" y2="6"></line><line x1="8" x2="8" y1="10" y2="14"></line><line x1="16" x2="16" y1="18" y2="22"></line></svg>
												}
												title={
													<div className={`${styles['accordion-items-wrapper']} text-small`}>
														Number of images: {imagesNumber}
													</div>
												}
												onPress={() => {
													trackEvent("essential_style_number_of_images");
												}} 
											>
												<div className={`${styles['slider-wrapper']}`}>
													<Slider 
														color="foreground"
														size="sm"
														step={1}
														minValue={1}
														maxValue={8}
														marks={[
															{ value: 1, label: "1" },
															{ value: 2, label: "2" },
															{ value: 3, label: "3" },
															{ value: 4, label: "4" },
															{ value: 5, label: "5" },
															{ value: 6, label: "6" },
															{ value: 7, label: "7" },
															{ value: 8, label: "8" },
														]}
														defaultValue={imagesNumber}
														value={imagesNumber}
														onChange={handleSliderChange}
														className={`${styles['slider-values-input']}`}
													/>
												</div>
												{showUpgradeLink && (
													<a 
														className={`${styles['onboarding_upgrade']}`}
														href="/pricing"
													>
														<div>
															<div 
																className={`${styles['onboarding_upgrade_title']}`}
															>
																<span>Upgrade to unlock</span>
																<button
																	className={`${styles['onboarding_upgrade_button']}`}
																>
																	<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap "><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> 
																	Upgrade
																</button>
															</div>
															<div 
																className={`${styles['onboarding_upgrade_text']}`}
															>
																Purchase a 
																<span 
																	className={`${styles['onboarding_tag']}`}
																>
																	Pro
																</span> 
																plan or higher,&nbsp;to generate up to 8 images at the same time.
															</div>
														</div>
													</a>
												)}
												</AccordionItem>

												{/* <AccordionItem
													className={styles['']}
													key="4"
													startContent={
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dices "><rect width="12" height="12" x="2" y="10" rx="2" ry="2"></rect><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"></path><path d="M6 18h.01"></path><path d="M10 14h.01"></path><path d="M15 6h.01"></path><path d="M18 9h.01"></path></svg>													}
													title={
														<div className={`${styles['accordion-items-wrapper']} text-small`}>
															Seed
														</div>
													}
													aria-label="Accordion 4"
												>
												
												<div className={`${styles['input-wrapper']}`}>
												<label htmlFor="seed" className={`${styles['input_input_label']}`}>
														Seed
														<Tooltip
															key={'bottom-start'}
															placement={'bottom-end'}
															content={
																<div className={`${styles['seed-information']}`}>
																	Different numbers result in new variations of your image. Use a fixed Seed to recreate and iterate on your favorite results.
																</div>
															}
															isOpen={isSeedOpen}
															className={`${styles['seed-tooltip']}`}
														>
															<button 
																className={styles['seed_image_btn']}
																onMouseEnter={() => setIsSeedOpen(true)}
																onMouseLeave={() => setIsSeedOpen(false)}
																onClick={() => setIsSeedOpen(!isSeedOpen)}
															>
																	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																</button>
														</Tooltip>
													</label>
													<input
														id="seed"
														name="seed"
														className={`${styles['input_input__ide']}`}
														type="number"
														placeholder="Leave blank to get a random seed"
														value={seed}
														onChange={handleSeedChange}
														maxLength={20}
														/>
												</div>
												</AccordionItem> */}
											</Accordion>
										</div>

										<div className={`${styles['switch_public_gallery']}`}>
											<div className={`${styles['switch_public_gallery_text']}`}>
												<p className={`${styles['switch_public_gallery_text_title']}`}>
													Public gallery
													<Tooltip
														key={'description-share'}
														placement={'bottom-start'}
														content={
																<div className={`${styles['description_share']}`}>
																	Allows you to share images you generate with community. If you use &quot;image to image&quot; and &quot;Facelock&quot; mode, your images will remain private regardless of whether publishing to the gallery is enabled.
																</div>
														}
														isOpen={isPublicGalleryEssentialOpen}
														className={`${styles['seed-tooltip']}`}
													>
														<button 
															className={styles['seed_image_btn']}
															onMouseEnter={() => setIsPublicGalleryEssentialOpen(true)}
															onMouseLeave={() => setIsPublicGalleryEssentialOpen(false)}
															onClick={() => setIsPublicGalleryEssentialOpen(!isPublicGalleryEssentialOpen)}
														>
																<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
															</button>
													</Tooltip>
												</p>
												<p className={`${styles['switch_public_gallery_text_description']}`}>
													Share your images in public gallery.
												</p>
											</div>
											<Switch
												isSelected={allowPublicGallery}
												onValueChange={setAllowPublicGallery}
												color="secondary"
												size="sm"
												>
											</Switch>
										</div>

                                        <div className={`${styles['form_btn']} ${styles['form_right']}`}>
                                            <div className={`${styles['reset_button']}`}>
                                                <button 
                                                    className={`${styles['button_btn']} ${styles['button_default']} ${styles['button_sm']} ${styles['active_button_advanced']}`}
                                                    onClick={resetEssentialDefaults}
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

							<Tab key="advanced" title="Advanced">
								<div className={styles['ai-generator_parameters__outer']}>
									<div className={styles['ai-generator_parameters__inner']}>
										<div className={styles['collapse']}>
										<Accordion
											selectedKeys={Array.from(advancedSelectedKeys)}
											onSelectionChange={handleAdvancedSelectionChange}
											selectionMode="multiple"
										>
											<AccordionItem
												key="0"
												aria-label="Accordion Model"
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-horizontal-justify-start "><rect width="6" height="14" x="6" y="5" rx="2"></rect><rect width="6" height="10" x="16" y="7" rx="2"></rect><path d="M2 2v20"></path></svg>
												}
												title={
													<div className={`${styles['accordion-items-wrapper']} text-small`}>
														Model{selectedModelId !== null ? `: ${modelData[selectedModelId].name}` : ''}
													</div>
												}
												onPress={() => {
													trackEvent('advanced_style_model');
													openModalWithModels();
												}}
												disableAnimation={true}
												disableIndicatorAnimation={true}
											>
                                            </AccordionItem>
											<AccordionItem
												key="1"
												aria-label="Accordion Prompt"
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pen-line "><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>													}
												title={
													<div className={`${styles['accordion-items-wrapper']} text-small`}>
														Prompt
													</div>
												}
												onPress={() => {
													trackEvent("advanced_style_prompt");
												}} 
											>
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
													
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']}`}>
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
													</div>
                                                    <div className={`${styles['slider-wrapper']}`}>
														<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
															<label htmlFor="cfg" className={`${styles['input_input_label']}`}>
																Classification guidance
																<Tooltip
																	key={'bottom-start'}
																	placement={'bottom-start'}
																	content={
																		<div className={`${styles['seed-information']}`}>
																			Increasing the Cfg value can lead to images that more closely match the details specified in the prompt, while lowering it allows for more creative and abstract interpretations by the model.
																		</div>
																	}
																	isOpen={isImageCfgOpen}
																	className={`${styles['seed-tooltip']}`}
																>
																	<button 
																		className={styles['seed_image_btn']}
																		onMouseEnter={() => setIsImageCfgOpen(true)}
																		onMouseLeave={() => setIsImageCfgOpen(false)}
																		onClick={() => setIsImageCfgOpen(!isImageCfgOpen)}
																	>
																			<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																		</button>
																</Tooltip>
															</label>
															<div className={styles['generations-value']}>
																{cfgAdvancedNumber}
															</div>
														</div>
														<Slider
															color="foreground"
															size="sm"
															step={0.5}
															minValue={2}
															maxValue={10}
															// marks={[
															// 	{ value: 1, label: "HD" },
															// 	{ value: 2, label: "2K" },
															// 	{ value: 3, label: "4K" },
															// ]}
															defaultValue={cfgAdvancedNumber}
															value={cfgAdvancedNumber}
															onChange={handleAdvancedCfgSliderChange}
															className={`${styles['slider-values-input']}`}
														/>
													</div>
                                                </div>
                                            </AccordionItem>

											{/* <AccordionItem
													className={styles['']}
													key="3"
													aria-label="Accordion Facelock"
													startContent={
														<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cat "><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"></path><path d="M8 14v.5"></path><path d="M16 14v.5"></path><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"></path></svg>
													}
													title={
														<div className={`${styles['accordion-items-wrapper']} text-small`}>
															{'Image (Facelock)'}
														</div>
													}
													onPress={() => {
														trackEvent("advanced_style_Facelock");
													}} 
												>
												<div className={styles['ai-generator_upload__wrapper']}>
													<div className={styles['ai-generator_dropzone_img']}>
														<div 
															className={styles['ai-generator_dropzone']}
															onDragOver={(e) => e.preventDefault()}
															onDrop={handleAdvancedFacelockFileDrop}
														>
															<button 
																		onClick={clearAdvancedFacelockImage}
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
															{advancedFacelockUploadedImage ? (
																<>
																	<img src={advancedFacelockUploadedImage} alt="Uploaded Image" className={styles['uploaded-image']} />
																</>
															) : (
																<>
																	<input
																		id="fileUploadFacelock"
																		accept="image/png,.png,image/jpeg,.jpeg,.jpg"
																		type="file"
																		onChange={handleAdvancedFacelockImageUpload}
																		className={`${styles['input-values-img']}`}
																	/>
																	<label className={`${styles['input-img-label']}`} htmlFor="fileUploadFacelock">Drag an image here, or click to select one.</label>
																</>
															)}
														</div>
													</div>
												</div>

												<div className={`${styles['slider-wrapper']}`}>
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
														<label htmlFor="facelockWeight" className={`${styles['input_input_label']}`}>
															Facelock Weight
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Adjust the Face Lock Strength to control the level of emphasis the model places on maintaining the facial features of the input image.
																	</div>
																}
																isOpen={isFacelockWeightOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsFacelockWeightOpen(true)}
																	onMouseLeave={() => setIsFacelockWeightOpen(false)}
																	onClick={() => setIsFacelockWeightOpen(!isFacelockWeightOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<div className={styles['generations-value']}>
															{facelockWeightNumber}
														</div>
													</div>
													<Slider
														color="foreground"
														size="sm"
														step={0.05}
														minValue={0.1}
														maxValue={1}
														// marks={[
														// 	{ value: 1, label: "HD" },
														// 	{ value: 2, label: "2K" },
														// 	{ value: 3, label: "4K" },
														// ]}
														defaultValue={facelockWeightNumber}
														value={facelockWeightNumber}
														onChange={handleAdvancedFacelockWeightSliderChange}
														className={`${styles['slider-values-input']}`}
													/>
												</div>
												<div className={`${styles['select-wrapper']}`}>
													<label htmlFor="model" className={`${styles['input_input_label']}`}>
                                                            Facelock Type
														</label>
                                                    <Select
                                                        labelPlacement="outside"
                                                        // label="Model"
                                                        placeholder="Select facelock type"
                                                        className="mt-4"
                                                        size={isMobile ? "lg" : "md"}
                                                        selectedKeys={selectedFacelockType}
                                                        onSelectionChange={setSelectedFacelockType}
                                                    >
                                                        {facelockTypes.map((type) => (
                                                            <SelectItem key={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
												</div>
											
											</AccordionItem> */}

                                            {/* <AccordionItem
													className={styles['']}
													key="2"
                                                    aria-label="Accordion Image"
													startContent={
														<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image " style={{ marginRight: '8px' }}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
													}
													title={
														<div className={`${styles['accordion-items-wrapper']} text-small`}>
															Image
														</div>
													}
												>
												<div className={styles['ai-generator_upload__wrapper']}>
													<div className={styles['ai-generator_dropzone_img']}>
														<div 
															className={styles['ai-generator_dropzone']}
															onDragOver={(e) => e.preventDefault()}
															onDrop={handleAdvancedFileDrop}
														>
															<button 
																		onClick={clearAdvancedImage}
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
															{advancedUploadedImage ? (
																<>
																	<img src={advancedUploadedImage} alt="Uploaded Image" className={styles['uploaded-image']} />
																</>
															) : (
																<>
																	<input
																		id="fileUpload"
																		accept="image/png,.png,image/jpeg,.jpeg,.jpg"
																		type="file"
																		onChange={handleAdvancedImageUpload}
																		className={`${styles['input-values-img']}`}
																	/>
																	<label className={`${styles['input-img-label']}`} htmlFor="fileUpload">Drag an image here, or click to select one.</label>
																</>
															)}
														</div>
													</div>
												</div>
												<div className={`${styles['slider-wrapper']}`}>
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
														<label htmlFor="cfg" className={`${styles['input_input_label']}`}>
															Denoise
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Adjusting this setting allows you to control the clarity and detail level of the output image, with higher values typically preserving more details of the original image.
																	</div>
																}
																isOpen={isImageDenoiseOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsImageDenoiseOpen(true)}
																	onMouseLeave={() => setIsImageDenoiseOpen(false)}
																	onClick={() => setIsImageDenoiseOpen(!isImageDenoiseOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<div className={styles['generations-value']}>
															{denoiseAdvancedNumber}
														</div>
													</div>
													<Slider
														color="foreground"
														size="sm"
														step={0.05}
														minValue={0.1}
														maxValue={1}
														// marks={[
														// 	{ value: 1, label: "HD" },
														// 	{ value: 2, label: "2K" },
														// 	{ value: 3, label: "4K" },
														// ]}
														defaultValue={denoiseAdvancedNumber}
														value={denoiseAdvancedNumber}
														onChange={handleAdvancedDenoiseSliderChange}
														className={`${styles['slider-values-input']}`}
													/>
												</div>
												<div className={`${styles['slider-wrapper']}`}>
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
														<label htmlFor="upscale" className={`${styles['input_input_label']}`}>
															Upscale
														</label>
														<div className={styles['generations-value']}>
															{imagesUpscaleParam}
														</div>
													</div>
													<Slider
														color="foreground"
														size="sm"
														step={1}
														minValue={1}
														maxValue={3}
														marks={[
															{ value: 1, label: "None" },
															{ value: 2, label: "2x" },
															{ value: 3, label: "4x" },
														]}
														defaultValue={1}
														value={upscaleValueMap[imagesUpscaleParam]}
														onChange={handleImageUpscaleSliderChange}
														className={`${styles['slider-values-input']}`}
													/>
												</div>
											</AccordionItem> */}

											<AccordionItem
												className={styles['']}
												key="2"
                                                aria-label="Accordion Image"
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image " style={{ marginRight: '8px' }}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
												}
												onPress={() => {
													trackEvent("essential_style_facelock");
												}} 
												title={
													<div className={`${styles['accordion-items-wrapper']} text-small`}>
														Image
													</div>
												}
											>
												<div className={styles['ai-generator_upload__wrapper']}>
													<div className={styles['ai-generator_dropzone_img']}>
														<div 
															className={styles['ai-generator_dropzone']}
															onDragOver={(e) => e.preventDefault()}
															// onDrop={handleAdvancedFileDrop}
															onDrop={handleFileDrop}
														>
															<button 
																		// onClick={clearAdvancedImage}
																		onClick={clearImage}
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
															{/* {advancedUploadedImage ? ( */}
															{uploadedImage ? (
																<>
																	{/* <img src={advancedUploadedImage} alt="Uploaded Facelock Image" className={styles['uploaded-image']} /> */}
																	<img src={uploadedImage} alt="Uploaded Facelock Image" className={styles['uploaded-image']} />
																</>
															) : (
																<>
																	<input
																		id="fileUploadAdvanced"
																		accept="image/png,.png,image/jpeg,.jpeg,.jpg"
																		type="file"
																		// onChange={handleAdvancedImageUpload}
																		onChange={handleImageUpload}
																		className={`${styles['input-values-img']}`}
																	/>
																	<label className={`${styles['input-img-label']}`} htmlFor="fileUploadAdvanced">Drag an image here, or click to select one.</label>
																</>
															)}
														</div>
													</div>
												</div>
												<div className={`${styles['select-wrapper']}`}>
													<label htmlFor="model" className={`${styles['input_input_label']}`}>
                                                            Reference
															{/* <Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Select the number of steps that are taken during image generation process.
																	</div>
																}
																isOpen={isImageStepsOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsImageStepsOpen(true)}
																	onMouseLeave={() => setIsImageStepsOpen(false)}
																	onClick={() => setIsImageStepsOpen(!isImageStepsOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip> */}
														</label>
                                                    <Select
                                                        labelPlacement="outside"
                                                        // label="Model"
                                                        placeholder="Select facelock type"
                                                        className="mt-4"
                                                        size={isMobile ? "lg" : "md"}
                                                        // selectedKeys={selectedReferenceTypeAdvanced}
                                                        // onSelectionChange={setSelectedReferenceTypeAdvanced}
														selectedKeys={selectedReferenceType}
                                                        onSelectionChange={setSelectedReferenceType}
                                                    >
                                                        {/* {referenceTypesAdvanced.map((type) => (
                                                            <SelectItem key={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))} */}
														{referenceTypes.map((type) => (
                                                            <SelectItem key={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
												</div>

												{/* {selectedReferenceTypeStringAdvanced === "Character / FaceLock" &&  */}
												{selectedReferenceTypeString === "Character / FaceLock" && 
												<>
													<div className={`${styles['slider-wrapper']}`}>
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
														<label htmlFor="facelockWeightAdvanced" className={`${styles['input_input_label']}`}>
															Facelock Weight
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Adjust the Face Lock Strength to control the level of emphasis the model places on maintaining the facial features of the input image.
																	</div>
																}
																isOpen={isFacelockWeightOpenAdvanced}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsFacelockWeightOpenAdvanced(true)}
																	onMouseLeave={() => setIsFacelockWeightOpenAdvanced(false)}
																	onClick={() => setIsFacelockWeightOpenAdvanced(!isFacelockWeightOpenAdvanced)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<div className={styles['generations-value']}>
															{facelockWeightNumberAdvanced}
														</div>
													</div>
													<Slider
														color="foreground"
														size="sm"
														step={0.05}
														minValue={0.1}
														maxValue={1}
														// marks={[
														// 	{ value: 1, label: "HD" },
														// 	{ value: 2, label: "2K" },
														// 	{ value: 3, label: "4K" },
														// ]}
														// defaultValue={facelockWeightNumberAdvanced}
														// value={facelockWeightNumberAdvanced}
														// onChange={handleAdvancedFacelockWeightSliderChange}
														defaultValue={facelockWeightNumber}
														value={facelockWeightNumber}
														onChange={handleEssentialFacelockWeightSliderChange}
														className={`${styles['slider-values-input']}`}
													/>
												</div>
												{/* <div className={`${styles['select-wrapper']}`}>
													<label htmlFor="modelAdvanced" className={`${styles['input_input_label']}`}>
                                                            Facelock Type
														</label>
                                                    <Select
                                                        labelPlacement="outside"
                                                        // label="Model"
                                                        placeholder="Select facelock type"
                                                        className="mt-4"
                                                        size={isMobile ? "lg" : "md"}
                                                        // selectedKeys={selectedFacelockTypeAdvanced}
                                                        // onSelectionChange={setSelectedFacelockTypeAdvanced}
														selectedKeys={selectedFacelockType}
                                                        onSelectionChange={setSelectedFacelockType}
                                                    >
														{facelockTypes.map((type) => (
															// facelockTypesAdvanced
                                                            <SelectItem key={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
												</div> */}
												</>
												}
												{/* {selectedReferenceTypeStringAdvanced === "Image to Image" &&  */}
												{selectedReferenceTypeString === "Image to Image" && 
												<>
													<div className={`${styles['slider-wrapper']}`}>
														<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
															<label htmlFor="denoiseAdvanced" className={`${styles['input_input_label']}`}>
																Denoise
																<Tooltip
																	key={'bottom-start'}
																	placement={'bottom-start'}
																	content={
																		<div className={`${styles['seed-information']}`}>
																			Adjusting this setting allows you to control the clarity and detail level of the output image, with higher values typically preserving more details of the original image.
																		</div>
																	}
																	isOpen={isImageDenoiseOpenAdvanced}
																	className={`${styles['seed-tooltip']}`}
																>
																	<button 
																		className={styles['seed_image_btn']}
																		onMouseEnter={() => setIsImageDenoiseOpenAdvanced(true)}
																		onMouseLeave={() => setIsImageDenoiseOpenAdvanced(false)}
																		onClick={() => setIsImageDenoiseOpenAdvanced(!isImageDenoiseOpenAdvanced)}
																	>
																			<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																		</button>
																</Tooltip>
															</label>
															<div className={styles['generations-value']}>
																{/* {denoiseAdvancedNumber} */}
																{denoiseEssentialNumber}
															</div>
														</div>
														<Slider
															color="foreground"
															size="sm"
															step={0.05}
															minValue={0.1}
															maxValue={1}
															// marks={[
															// 	{ value: 1, label: "HD" },
															// 	{ value: 2, label: "2K" },
															// 	{ value: 3, label: "4K" },
															// ]}
															// defaultValue={denoiseAdvancedNumber}
															// value={denoiseAdvancedNumber}
															// onChange={handleAdvancedDenoiseSliderChange}
															defaultValue={denoiseEssentialNumber}
															value={denoiseEssentialNumber}
															onChange={handleEssentialDenoiseSliderChange}
															className={`${styles['slider-values-input']}`}
														/>
													</div>
												</>
												}
												{/* {selectedReferenceTypeStringAdvanced === "Image Upscale" &&  */}
												{selectedReferenceTypeString === "Image Upscale" &&
												<>
													<div className={`${styles['slider-wrapper']}`}>
														<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
															<label htmlFor="upscaleAdvanced" className={`${styles['input_input_label']}`}>
																Upscale
															</label>
															<div className={styles['generations-value']}>
																{/* {imagesUpscaleParamAdvanced} */}
																{imagesUpscaleParam}
															</div>
														</div>
														<Slider
															color="foreground"
															size="sm"
															step={1}
															minValue={1}
															maxValue={2}
															marks={[
																{ value: 1, label: "2x" },
																{ value: 2, label: "4x" },
															]}
															defaultValue={1}
															// value={upscaleValueMapAdvanced[imagesUpscaleParamAdvanced]}
															// onChange={handleImageUpscaleSliderChangeAdvanced}
															value={upscaleValueMap[imagesUpscaleParam]}
															onChange={handleImageUpscaleSliderChange}
															className={`${styles['slider-values-input']}`}
														/>
													</div>
												</>
												}
											</AccordionItem>
											
											<AccordionItem
													className={styles['']}
													key="3"
                                                    aria-label="Accordion Pose"
													startContent={
														<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-contact2 "><path d="M16 18a4 4 0 0 0-8 0"></path><circle cx="12" cy="11" r="3"></circle><rect width="18" height="18" x="3" y="4" rx="2"></rect><line x1="8" x2="8" y1="2" y2="4"></line><line x1="16" x2="16" y1="2" y2="4"></line></svg>
													}
													title={
														<div className={`${styles['accordion-items-wrapper']} text-small`}>
															Pose
														</div>
													}
												>
												<div className={styles['ai-generator_upload__wrapper']}>
													<div className={styles['ai-generator_dropzone_img']}>
														<div 
															className={styles['ai-generator_dropzone']}
															onDragOver={(e) => e.preventDefault()}
															onDrop={handleAdvancedPoseDrop}
														>
															<button 
																		onClick={clearAdvancedPoseImage}
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
															{advancedPoseImage ? (
																<>
																	<img src={advancedPoseImage} alt="Uploaded Image" className={styles['uploaded-image']} />
																</>
															) : (
																<>
																	<input
																		id="fileUploadPose"
																		accept="image/png,.png,image/jpeg,.jpeg,.jpg"
																		type="file"
																		onChange={handleAdvancedPoseImageUpload}
																		className={`${styles['input-values-img']}`}
																		disabled={poseAllowed ? false : true}
																	/>
																	<label className={`${styles['input-img-label']}`} htmlFor="fileUploadPose">Drag an image here, or click to select one.</label>
																</>
															)}
														</div>
													</div>
												</div>
												<div className={`${styles['slider-wrapper']}`}>
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
														<label htmlFor="pose" className={`${styles['input_input_label']}`}>
															Pose Weight
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Pose Strength allows you to adjust the emphasis the model places on the pose of the input image.																	</div>
																}
																isOpen={isImagePoseOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsImagePoseOpen(true)}
																	onMouseLeave={() => setIsImagePoseOpen(false)}
																	onClick={() => setIsImagePoseOpen(!isImagePoseOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<div className={styles['generations-value']}>
															{poseAdvancedNumber}
														</div>
													</div>
													<Slider
														color="foreground"
														size="sm"
														step={0.1}
														minValue={0.5}
														maxValue={1.5}
														// marks={[
														// 	{ value: 1, label: "HD" },
														// 	{ value: 2, label: "2K" },
														// 	{ value: 3, label: "4K" },
														// ]}
														defaultValue={poseAdvancedNumber}
														value={poseAdvancedNumber}
														onChange={handleAdvancedPoseSliderChange}
														className={`${styles['slider-values-input']}`}
														isDisabled={poseAllowed ? false : true}
													/>
												</div>
												{(poseAllowed === false) && (
													<a 
														className={`${styles['onboarding_upgrade']}`}
														href="/pricing"
													>
														<div>
															<div 
																className={`${styles['onboarding_upgrade_title']}`}
															>
																<span>Upgrade to unlock</span>
																<button
																	className={`${styles['onboarding_upgrade_button']}`}
																>
																	<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap "><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> 
																	Upgrade
																</button>
															</div>
															<div 
																className={`${styles['onboarding_upgrade_text']}`}
															>
																Purchase a 
																<span 
																	className={`${styles['onboarding_tag']}`}
																>
																	Pro
																</span> 
																plan or higher,&nbsp;to generate images with poses you like.
															</div>
														</div>
													</a>
												)}
											</AccordionItem>

											{/* <AccordionItem
													className={styles['']}
													key="5"
                                                    aria-label="Accordion Inpaint"
													startContent={
														<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette "><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>
													}
													title={
														<div className={`${styles['accordion-items-wrapper']} text-small`}>
															Inpaint
														</div>
													}
												>
													<label htmlFor="weights" className={`${styles['input_input_label']}`}>
														Mask image
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Mask Image is used to specify areas of the input image that you want to modify or preserve. Leave blank and provide mask prompt for automatic detection.
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
															onDrop={handleAdvancedPoseDrop}
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
												<div className={`${styles['input-wrapper']}`}>
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
													</div>
											</AccordionItem> */}

											<AccordionItem
												key="4"
												aria-label="Accordion Resolution"
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scaling " style={{ marginRight: '8px' }}>
														<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
														<path d="M14 15H9v-5"></path>
														<path d="M16 3h5v5"></path>
														<path d="M21 3 9 15"></path>
													</svg>														}
												title={
													<div className={`${styles['accordion-items-wrapper']} text-small`}>
														{/* Resolution: {resolutions[selectedAdvancedResolution]} */}
														Resolution: {resolutions[selectedResolution]}
													</div>
												}
												onPress={() => {
													trackEvent("advanced_style_resolution");
												}} 
											>
                                                <div className={`${styles['collapse']}`}>
                                                    <div className={`${styles['']}`}>
                                                        <div>
                                                            <div className={`${styles['ai-generator_aspect_ratios']}`}>
																{Object.entries(resolutions).map(([key, value]) => {
																	const [ratioW, ratioH] = key.split(':').map(Number);
																	const visualWidth = 10 * ratioW / ratioH;
																	const visualHeight = 10;
																	// const isSelected = selectedAdvancedResolution === key;
																	const isSelected = selectedResolution === key;

																	return (
																		<div key={key} className={`${styles['ai-generator_aspect_row']}`}>
																			<label 
																				htmlFor={`aspectRatio${key.replace(":", "_")}`} 
																				className={`${styles['ai-generator_aspect_ratio_btn']}`}
																				style={{
																					cursor: 'pointer',
																					border: isSelected ? '2px solid #5858e6' : '1px solid #f7f8f866',
																				}}
																				// onClick={() => handleAdvancedResolutionSelect(key)}
																				onClick={() => handleResolutionSelect(key)}
																			>
																				<input
																					id={`aspectRatio${key.replace(":", "_")}`}
																					name="aspectRatio"
																					type="checkbox"
																					value={key}
																					checked={isSelected}
																					onChange={() => {}}
																					style={{ display: 'none' }}
																				/>
																				<span>{key}</span>
																				<i 
																					className="ai-generator_apsect_ratio_vis"
																					style={{ 
																						width: `${visualWidth}px`, 
																						height: `${visualHeight}px`, 
																						backgroundColor: isSelected ? '#5858e6' : '#f7f8f866',
																					}}
																				></i>
																			</label>
																		</div>
																	);
																})}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionItem>
											<AccordionItem
												className={styles['']}
												key="5"
												aria-label="Accordion Gen Params"
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sliders-horizontal " style={{ marginRight: '8px' }}><line x1="21" x2="14" y1="4" y2="4"></line><line x1="10" x2="3" y1="4" y2="4"></line><line x1="21" x2="12" y1="12" y2="12"></line><line x1="8" x2="3" y1="12" y2="12"></line><line x1="21" x2="16" y1="20" y2="20"></line><line x1="12" x2="3" y1="20" y2="20"></line><line x1="14" x2="14" y1="2" y2="6"></line><line x1="8" x2="8" y1="10" y2="14"></line><line x1="16" x2="16" y1="18" y2="22"></line></svg>
												}
												title={
													<div className={`${styles['accordion-items-wrapper']} text-small`}>
														Generation Parameters
													</div>
												}
												onPress={() => {
													trackEvent("advanced_style_generation_parameters");
												}} 
											>
												<div className={`${styles['slider-wrapper']}`}>
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
														<label htmlFor="seed" className={`${styles['input_input_label']}`}>
															Number of images
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Select the number of images you would like to generate.
																	</div>
																}
																isOpen={isImageNumberOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsImageNumberOpen(true)}
																	onMouseLeave={() => setIsImageNumberOpen(false)}
																	onClick={() => setIsNegativePromptOpen(!isImageNumberOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<div className={styles['generations-value']}>
															{/* {imagesAdvancedNumber} */}
															{imagesNumber}
														</div>
													</div>
													<Slider 
														color="foreground"
														size="sm"
														step={1}
														minValue={1}
														maxValue={8}
														marks={[
															{ value: 1, label: "1" },
															{ value: 2, label: "2" },
															{ value: 3, label: "3" },
															{ value: 4, label: "4" },
															{ value: 5, label: "5" },
															{ value: 6, label: "6" },
															{ value: 7, label: "7" },
															{ value: 8, label: "8" },
														]}
														// defaultValue={imagesAdvancedNumber}
														// value={imagesAdvancedNumber}
														// onChange={handleAdvancedSliderChange}
														defaultValue={imagesNumber}
														value={imagesNumber}
														onChange={handleSliderChange}
														className={`${styles['slider-values-input']}`}
													/>
													{/* {showAdvancedUpgradeLink && ( */}
													{showUpgradeLink && (
														<a 
															className={`${styles['onboarding_upgrade']}`}
															href="/pricing"
														>
															<div>
																<div 
																	className={`${styles['onboarding_upgrade_title']}`}
																>
																	<span>Upgrade to unlock</span>
																	<button
																		className={`${styles['onboarding_upgrade_button']}`}
																	>
																		<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap "><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> 
																		Upgrade
																	</button>
																</div>
																<div 
																	className={`${styles['onboarding_upgrade_text']}`}
																>
																	Purchase a 
																	<span 
																		className={`${styles['onboarding_tag']}`}
																	>
																		Pro
																	</span> 
																	plan or higher,&nbsp;to generate up to 6 images at the same time.
																</div>
															</div>
														</a>
													)}
												</div>
												{/* <div className={`${styles['slider-wrapper']}`}>
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
														<label htmlFor="seed" className={`${styles['input_input_label']}`}>
															Steps
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Increase &quot; Steps &quot; to enhance image qualuty. Setting steps over 25 may not improve quality and may take longer to generate.
																	</div>
																}
																isOpen={isAdvancedStepsOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsAdvancedStepsOpen(true)}
																	onMouseLeave={() => setIsAdvancedStepsOpen(false)}
																	onClick={() => setIsAdvancedStepsOpen(!isAdvancedStepsOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<div className={styles['generations-value']}>
															{imagesStepsNumber}
														</div>
													</div>
													<Slider 
														color="foreground"
														size="sm"
														step={1}
														minValue={1}
														maxValue={70}
														defaultValue={25}
														onChange={handleSliderStepsChange}
														className={`${styles['slider-values-input']}`}
													/>
												</div> */}
												{/* <div className={`${styles['slider-wrapper']}`}>
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
														<label htmlFor="seed" className={`${styles['input_input_label']}`}>
															Guidance scale
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		&quot; Guidance scale &quot; controls how much the image generation process follows the text prompt.
																	</div>
																}
																isOpen={isGuidanceOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsGuidanceOpen(true)}
																	onMouseLeave={() => setIsGuidanceOpen(false)}
																	onClick={() => setIsGuidanceOpen(!isGuidanceOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<div className={styles['generations-value']}>
															{imagesGuidanceNumber}
														</div>
													</div>
													<Slider 
														color="foreground"
														size="sm"
														step={1}
														minValue={1}
														maxValue={20}
														defaultValue={9}
														onChange={handleGuidanceChange}
														className={`${styles['slider-values-input']}`}
													/>
												</div> */}
												<div className={`${styles['slider-wrapper']}`}>
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
														<label htmlFor="resolution" className={`${styles['input_input_label']}`}>
															Resolution
														</label>
														<div className={styles['generations-value']}>
															{imagesResolutionParam}
														</div>
													</div>
													<Slider
														color="foreground"
														size="sm"
														step={1}
														minValue={1}
														maxValue={3}
														marks={[
															{ value: 1, label: "HD" },
															{ value: 2, label: "2K" },
															{ value: 3, label: "4K" },
														]}
														defaultValue={1}
														value={resolutionValueMap[imagesResolutionParam]}
														onChange={handleImageResolutionSliderChange}
														className={`${styles['slider-values-input']}`}
													/>
													<div className={`${styles['slider_resolution_price']}`}>Resolution price: {resolutionPrices[imagesResolutionParam]} credits</div>
												</div>
												{/* <div className={`${styles['checkbox-advanced']} ${styles['checkbox_disabled']}`}>
													<label htmlFor="highres"  className={`${styles['checkbox__checkbox']}`}>
														<Checkbox 
															isSelected={isHighResSelected}
															onValueChange={setIsHighResSelected}
															color="default"
															size="sm"
														>
															High-Res (+1 credit/image)
														</Checkbox>
													</label>
												</div> */}
												{advancedResolutionShowUpgradeLink && (
													<a 
														className={`${styles['onboarding_upgrade']}`}
														href="/pricing"
													>
														<div>
															<div 
																className={`${styles['onboarding_upgrade_title']}`}
															>
																<span>Upgrade to unlock</span>
																<button
																	className={`${styles['onboarding_upgrade_button']}`}
																>
																	<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap "><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> 
																	Upgrade
																</button>
															</div>
															<div 
																className={`${styles['onboarding_upgrade_text']}`}
															>
																Purchase a 
																<span 
																	className={`${styles['onboarding_tag']}`}
																>
																	Pro
																</span> 
																plan or higher,&nbsp;to generate images up to 4K.
															</div>
														</div>
													</a>
												)}
                                                <div className={`${styles['slider-wrapper']}`}>
													<div className={`${styles['input-wrapper']} ${styles['negative-prompt']} ${styles['generation-params']}`}>
														<label htmlFor="steps" className={`${styles['input_input_label']}`}>
                                                            Steps
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Select the number of steps that are taken during image generation process.
																	</div>
																}
																isOpen={isImageStepsOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsImageStepsOpen(true)}
																	onMouseLeave={() => setIsImageStepsOpen(false)}
																	onClick={() => setIsImageStepsOpen(!isImageStepsOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
														<div className={styles['generations-value']}>
															{stepsAdvancedNumber}
														</div>
													</div>
													<Slider
														color="foreground"
														size="sm"
														step={1}
														minValue={20}
														maxValue={50}
														// marks={[
														// 	{ value: 1, label: "HD" },
														// 	{ value: 2, label: "2K" },
														// 	{ value: 3, label: "4K" },
														// ]}
														defaultValue={stepsAdvancedNumber}
														value={stepsAdvancedNumber}
														onChange={handleAdvancedStepsSliderChange}
														className={`${styles['slider-values-input']}`}
													/>
												</div>
                                                {/* <div className={`${styles['select-wrapper']}`}>
													<label htmlFor="model" className={`${styles['input_input_label']}`}>
                                                            Model
														</label>
                                                    <Select
                                                        labelPlacement="outside"
                                                        // label="Model"
                                                        placeholder="Select a model"
                                                        className="mt-4"
                                                        size={isMobile ? "lg" : "md"}
                                                        selectedKeys={selectedModel}
                                                        onSelectionChange={setSelectedModel}
                                                    >
                                                        {generationModels.map((model) => (
                                                            <SelectItem key={model}>
                                                                {model}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
												</div> */}
												<div className={`${styles['select-wrapper']}`}>
													<label htmlFor="weights" className={`${styles['input_input_label']}`}>
														Weights Interpretator
															<Tooltip
																key={'bottom-start'}
																placement={'bottom-start'}
																content={
																	<div className={`${styles['seed-information']}`}>
																		Lite for faster processing with moderate detail, ideal for quick previews or less complex images, and Pro for high-quality image processing, offering greater detail and accuracy at the cost of longer processing times.
																	</div>
																}
																isOpen={isWeightsInterpretatorOpen}
																className={`${styles['seed-tooltip']}`}
															>
																<button 
																	className={styles['seed_image_btn']}
																	onMouseEnter={() => setIsWeightsInterpretatorOpen(true)}
																	onMouseLeave={() => setIsWeightsInterpretatorOpen(false)}
																	onClick={() => setIsWeightsInterpretatorOpen(!isWeightsInterpretatorOpen)}
																>
																		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																	</button>
															</Tooltip>
														</label>
                                                    <Select
                                                        labelPlacement="outside"
                                                        // label="Weights Interpretator"
                                                        placeholder="Select interpretator"
                                                        className="mt-4"
                                                        size={isMobile ? "lg" : "md"}
                                                        selectedKeys={selectedWeightsInterpretator}
                                                        onSelectionChange={setSelectedWeightsInterpretator}
                                                    >
                                                        {weightsInterpretators.map((interpretator) => (
                                                            <SelectItem key={interpretator}>
                                                                {interpretator}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
												</div>
												{/* <div className={`${styles['input-wrapper']} ${styles['input-wrapper-advanced']}`}>
													<label htmlFor="seed" className={`${styles['input_input_label']}`}>
														Seed
														<Tooltip
															key={'bottom-start'}
															placement={'bottom-end'}
															content={
																<div className={`${styles['seed-information']}`}>
																	Different numbers result in new variations of your image. Use a fixed Seed to recreate and iterate on your favorite results.
																</div>
															}
															isOpen={isSeedOpen}
															className={`${styles['seed-tooltip']}`}
														>
															<button 
																className={styles['seed_image_btn']}
																onMouseEnter={() => setIsSeedOpen(true)}
																onMouseLeave={() => setIsSeedOpen(false)}
																onClick={() => setIsSeedOpen(!isSeedOpen)}
															>
																	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																</button>
														</Tooltip>
													</label>
													<input
														id="seed"
														name="seed"
														className={`${styles['input_input__ide']}`}
														type="number"
														placeholder="Leave blank to get a random seed"
														value={seed}
														onChange={handleSeedChange}
														maxLength={20}
														/>
												</div> */}
												</AccordionItem>
												{/* <AccordionItem
													key="5"
													aria-label="Accordion 5"
													startContent={
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings "><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
													}
													title={
														<div className={`${styles['accordion-items-wrapper']} text-small`}>
															Advanced
														</div>
													}
												>
                                                	<div className={`${styles['collapse']}`}>
														<div className={`${styles['input-wrapper']}`}>
															<label htmlFor="seed" className={`${styles['input_input_label']}`}>
																Sampler
																<Tooltip
																	key={'bottom-start-advanced'}
																	placement={'bottom-start'}
																	content={
																		<div className={`${styles['seed-information']}`}>
																			Samplers give you deeper control over the generation process to achieve slightly different details.
																		</div>
																	}
																	isOpen={isSamplerOpen}
																	className={`${styles['seed-tooltip']}`}
																>
																	<button 
																		className={styles['seed_image_btn']}
																		onMouseEnter={() => setIsSamplerOpen(true)}
																		onMouseLeave={() => setIsSamplerOpen(false)}
																		onClick={() => setIsSamplerOpen(!isSamplerOpen)}
																	>
																			<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
																		</button>
																</Tooltip>
															</label>
															<Select
																placeholder="Select sampler"
																variant="bordered"
																selectedKeys={[selectedSampler]}
																onChange={handleSamplerChange}
															>
																{samplers.map((sampler, index) => (
																	<SelectItem key={index} value={sampler}>
																		{sampler}
																	</SelectItem>
																))}
															</Select>
														</div>
                                                	</div>
                                            	</AccordionItem> */}
											</Accordion>
										</div>

										<div className={`${styles['switch_public_gallery']}`}>
											<div className={`${styles['switch_public_gallery_text']}`}>
												<p className={`${styles['switch_public_gallery_text_title']}`}>
													Public gallery
													<Tooltip
														key={'description-share'}
														placement={'bottom-start'}
														content={
															<div className={`${styles['description_share']}`}>
																Allows you to share images you generate with community. If you use &quot;image to image&quot; and &quot;Facelock&quot; mode, your images will remain private regardless of whether publishing to the gallery is enabled.
															</div>
														}
														isOpen={isPublicGalleryAdvancedOpen}
														className={`${styles['seed-tooltip']}`}
													>
														<button 
															className={styles['seed_image_btn']}
															onMouseEnter={() => setIsPublicGalleryAdvancedOpen(true)}
															onMouseLeave={() => setIsPublicGalleryAdvancedOpen(false)}
															onClick={() => setIsPublicGalleryAdvancedOpen(!isPublicGalleryAdvancedOpen)}
														>
																<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle svg-seed-input"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
															</button>
													</Tooltip>
												</p>
												<p className={`${styles['switch_public_gallery_text_description']}`}>
													Share your images in public gallery.
												</p>
											</div>
											<Switch
												isSelected={allowPublicGallery}
												onValueChange={setAllowPublicGallery}
												color="secondary"
												size="sm"
												>
											</Switch>
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

							<Tab key="collections" title="Collections" className={styles['newTab']} data-new="true">
							<div className={styles['ai-generator_parameters__outer']}>
								<div className={styles['ai-generator_parameters__inner']}>
									<Accordion 
										selectedKeys={Array.from(collectionSelectedKeys)}
										onSelectionChange={handleCollectionSelectionChange}
										selectionMode="multiple"
									>
										<AccordionItem
											className={styles['']}
											key="1"
											aria-label="Accordion Parameters"
											startContent={
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-contact2 "><path d="M16 18a4 4 0 0 0-8 0"></path><circle cx="12" cy="11" r="3"></circle><rect width="18" height="18" x="3" y="4" rx="2"></rect><line x1="8" x2="8" y1="2" y2="4"></line><line x1="16" x2="16" y1="2" y2="4"></line></svg>
											}
											// onPress={() => {
											// 	trackEvent("essential_style_facelock");
											// }} 
											title={
												<div className={`${styles['accordion-items-wrapper']} text-small`}>
													Collection parameters
												</div>
											}
										>
											<div className={styles['ai-generator_upload__wrapper']}>
													<div className={styles['ai-generator_dropzone_img_header']}>Character Image</div>
													<div className={styles['ai-generator_dropzone_img']}>
														<div 
															className={styles['ai-generator_dropzone']}
															onDragOver={(e) => e.preventDefault()}
															onDrop={handleFileDrop}
														>
															<button 
																		onClick={clearImage}
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
															{uploadedImage ? (
																<>
																	<img src={uploadedImage} alt="Uploaded Facelock Image" className={styles['uploaded-image']} />
																</>
															) : (
																<>
																	<input
																		id="fileUpload"
																		accept="image/png,.png,image/jpeg,.jpeg,.jpg"
																		type="file"
																		onChange={handleImageUpload}
																		className={`${styles['input-values-img']}`}
																	/>
																	<label className={`${styles['input-img-label']}`} htmlFor="fileUpload">Drag an image here, or click to select one.</label>
																</>
															)}
														</div>
													</div>
												</div>

											<div className={`${styles['select-wrapper']}`}>
												<label htmlFor="gender" className={`${styles['input_input_label']}`}>
														Gender
												</label>
												<Select
													labelPlacement="outside"
													// label="Model"
													placeholder="Select gender"
													className="mt-4"
													size={isMobile ? "lg" : "md"}
													selectedKeys={selectedGenderType}
													onSelectionChange={setSelectedGenderType}
												>
													{genderTypes.map((type) => (
														<SelectItem key={type}>
															{type}
														</SelectItem>
													))}
												</Select>
											</div>

											<div className={`${styles['select-wrapper']}`}>
												<label htmlFor="hairType" className={`${styles['input_input_label']}`}>
														Hair Type
												</label>
												<Select
													labelPlacement="outside"
													// label="Model"
													placeholder="Select hair type"
													className="mt-4"
													size={isMobile ? "lg" : "md"}
													selectedKeys={selectedHairType}
													onSelectionChange={setSelectedHairType}
												>
													{hairTypes.map((type) => (
														<SelectItem key={type}>
															{type}
														</SelectItem>
													))}
												</Select>
											</div>

											<div className={`${styles['select-wrapper']}`}>
												<label htmlFor="Ethnicity" className={`${styles['input_input_label']}`}>
													Ethnicity
												</label>
												<Select
													labelPlacement="outside"
													// label="Model"
													placeholder="Select ethnicity"
													className="mt-4"
													size={isMobile ? "lg" : "md"}
													selectedKeys={selectedEthnicityType}
													onSelectionChange={setSelectedEthnicityType}
												>
													{ethnicityTypes.map((type) => (
														<SelectItem key={type}>
															{type}
														</SelectItem>
													))}
												</Select>
											</div>
											
										</AccordionItem>

										<AccordionItem
											key="2"
											aria-label="Accordion Resolution"
											startContent={
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scaling " style={{ marginRight: '8px' }}>
													<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
													<path d="M14 15H9v-5"></path>
													<path d="M16 3h5v5"></path>
													<path d="M21 3 9 15"></path>
												</svg>														
											}
											onPress={() => {
												trackEvent("essential_style_resolution");
											}} 
											title={
												<div className={`${styles['accordion-items-wrapper']} text-small`}>
													Resolution: {resolutions[selectedResolution]}
												</div>
											}
										>
                                            <div className={`${styles['collapse']}`}>
                                                <div className={`${styles['']}`}>
                                                    <div>
                                                        <div className={`${styles['ai-generator_aspect_ratios']}`}>
														{Object.entries(resolutions).map(([key, value]) => {
															const [ratioW, ratioH] = key.split(':').map(Number);
															const visualWidth = 10 * ratioW / ratioH;
															const visualHeight = 10;
															const isSelected = selectedResolution === key;

															return (
																<div key={key} className={`${styles['ai-generator_aspect_row']}`}>
																	<label 
																		htmlFor={`aspectRatio${key.replace(":", "_")}`} 
																		className={`${styles['ai-generator_aspect_ratio_btn']}`}
																		style={{
																			cursor: 'pointer',
																			border: isSelected ? '2px solid #5858e6' : '1px solid #f7f8f866',
																		}}
																		onClick={() => handleResolutionSelect(key)}
																	>
																		<input
																			id={`aspectRatio${key.replace(":", "_")}`}
																			name="aspectRatio"
																			type="checkbox"
																			value={key}
																			checked={isSelected}
																			onChange={() => {}}
																			style={{ display: 'none' }}
																		/>
																		<span>{key}</span>
																		<i 
																			className="ai-generator_apsect_ratio_vis"
																			style={{ 
																				width: `${visualWidth}px`, 
																				height: `${visualHeight}px`, 
																				backgroundColor: isSelected ? '#5858e6' : '#f7f8f866',
																			}}
																		></i>
																	</label>
																</div>
															);
														})}
                                                        </div>
                                                        <div style={{}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionItem>

									</Accordion>

									{/* <div className={`${styles['switch_public_gallery']}`}>
										<div className={`${styles['switch_public_gallery_text']}`}>
											<p className={`${styles['switch_public_gallery_text_title']}`}>Public gallery</p>
											<p className={`${styles['switch_public_gallery_text_description']}`}>
												Share your images in public gallery.
											</p>
										</div>
										<Switch
											isSelected={allowPublicGallery}
											onValueChange={setAllowPublicGallery}
											color="secondary"
											size="sm"
											>
										</Switch>
									</div> */}

									<div className={`${styles['form_btn']} ${styles['form_right']}`}>
										<div className={`${styles['reset_button']}`}>
											<button 
												className={`${styles['button_btn']} ${styles['button_default']} ${styles['button_sm']} ${styles['active_button_advanced']}`}
												onClick={resetEssentialDefaults}
											>
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-restart "><path d="M21 6H3"></path><path d="M7 12H3"></path><path d="M7 18H3"></path><path d="M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14"></path><path d="M11 10v4h4"></path></svg>
												<span className="ml-3">
													Reset to default
												</span>
											</button>
										</div>
									</div>

									<div 
										className={`${styles['onboarding_upgrade']}`}
									>
										<div>
											<div 
												className={`${styles['onboarding_upgrade_title']}`}
											>
												<span>Pack of 30 images</span>
											</div>
											<div 
												className={`${styles['onboarding_upgrade_text']}`}
											>
												Collection is a new feature that lets you generate a pack of 30 images 
												<br/>
												<br/>
												<span 
													className={`${styles['onboarding_tag']}`}
												>
													&quot;Collections&quot;
												</span> 
												<br/>
												Choose collection suited for your needs from the right &quot;Collections&quot; menu.
												 <br/>
												 <br/>
												 <span 
													className={`${styles['onboarding_tag']}`}
												>
													&quot;Gallery&quot;
												</span> 
												<br/>
												 Your collection will be available in &quot;Gallery&quot; menu.
											</div>
										</div>
									</div>

									{session?.user?.subscription === "Free" && (
										<a 
											className={`${styles['onboarding_upgrade']}`}
											href="/pricing"
										>
											<div>
												<div 
													className={`${styles['onboarding_upgrade_title']}`}
												>
													<span>Upgrade to unlock</span>
													<button
														className={`${styles['onboarding_upgrade_button']}`}
													>
														<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap "><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> 
														Upgrade
													</button>
												</div>
												<div 
													className={`${styles['onboarding_upgrade_text']}`}
												>
													Purchase a 
													<span 
														className={`${styles['onboarding_tag']}`}
													>
														Pro
													</span> 
													plan or higher,&nbsp;to generate collections.
												</div>
											</div>
										</a>
									)}
												
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
									{activeTab === 'collections' ? (
										<>Generate collection&nbsp;</>
									) : (
										<>Generate {imagesNumber} {imagesNumber === 1 ? 'image' : 'images'}&nbsp;</>
									)}
								</Button>
							)}
						</div>
					</form>
					<LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} order="reverse"/>
				</div>
			</div>

			{activeTab === 'collections' ? (
				<div className={styles['ai-generator_images']}>
					<div className={styles['ai_generator_images_tabs']}>
						<Tabs key={'underlined'} variant={'underlined'} aria-label="Tabs variants" color="primary" selectedKey={activeTabCollection} onSelectionChange={handleTabChangeCollection}>
							<Tab key="collections" title="Collections">
							<div className={styles['masonry_collections']}>
								{collectionColumns.map((column, colIndex) => (
									<div key={colIndex} className={styles['column_collections']}>
										{column.map((collection, index) => {
											const collectionIndex = collectionData.findIndex(
												item => item.name === collection.name
											);
											const isSelected = collectionIndex === selectedCollectionId;
											return (
												<CollectionCard
													key={collectionIndex}
													name={collection.name}
													image={selectedGenderTypeString === "Woman" ? collection.femaleImage : collection.maleImage}
													description={collection.description}
													onImageClick={(e) => {
														e.stopPropagation();
														handleSelectCollection(collectionIndex);
														// console.log(collectionData[collectionIndex].name);
													}}
													isSelected={isSelected}
												/>
											);
										})}
									</div>
								))}
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
			) : (
				// Code to show for other tabs
				<div className={styles['ai-generator_images']} id="images">
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
				</div>	
			)}

		{/* <div className={styles['ai-generator_images']} id="images">
					<div className={styles['image-grid']}>
					<div className={styles['masonry']} ref={masonryRef}>
					{userImages.map((image, index) => (
							// <div key={index} className={styles['item']}>
								<GeneratedImage
									key={index}
									image={image}
									ref={index === userImages.length - 1 ? lastImageRef : null}
									onImageClick={() => openModalWithImage(image)}
									deleteImage={() => deleteImage(image._id)}
									toggleFavorite={() => toggleFavoriteImage(image._id, image.userId, image.res_image)}
									updateImages={updateImageContext}
									reusePrompt={() => setUserPrompt(image.prompt)}
									generateSimilar={() => handleGenerateSimilar(image)}
									reuseImage={() => handleReuseImage(image)}
									openFaceLock={() => handleFaceLockSelectionChangeButton()}
								/>
							// </div>
						))}
					</div>
				</div> */}

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
			<div className={`${styles['image__overlay']} ${!isModelModalOpen ? 'hidden' : ''}`}>
				<div className={styles['image__modal']}>
					<Modal 
						backdrop="blur" 
						isOpen={isModelModalOpen} 
						onClose={closeModelModalAndSimulateClick} 
						size="5xl"
						placement="center"
						className={`${styles['modal_models']} ${styles['modal_lg']}`}
					>
						<ModalContent>
							{(closeModelModalAndSimulateClick) => (
								<div className={styles['']}>
									<div className={styles['models_modal_header']}>
										<div className={styles['models_modal_head']}>
											<div className={styles['modal_title']}>
												Select AI Model
												<Tabs key={'underlined'} variant={'underlined'} aria-label="Tabs variants" color="primary" onSelectionChange={handleModelTabChange}>
												<Tab key="models" title="Models"></Tab>
												<Tab key="favorite" title="Favorite"></Tab>
												</Tabs>
											</div>
										</div>
									</div>

									<div className={styles['category_container']} ref={containerRef}>
										<button
											className={`${styles['scroll_arrow']} ${atStart || !isScrollable ? styles['scroll_arrow_hidden'] : ''}`}
											onClick={scrollLeft}
										>
											{/* Left arrow SVG */}
											<div className={styles['category_arrow_svg_wrapper']}>
											<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
												<path d="M12 4l-6 6 6 6" />
											</svg>
											</div>
										</button>

										<div 
											className={styles['categories']} 
											ref={categoryRef} 
											onScroll={handleScroll}
											style={categoriesPadding}
										>
											{/* Category Buttons */}
											{['All', 'Photorealistic', 'Anime', 'Epic style', 'Cartoon', 'Design'].map((category) => (
											<button
												key={category}
												className={`${styles['category_btn']} ${selectedCategory === category ? styles['category_btn_active'] : ''}`}
												onClick={() => handleCategorySelect(category)}
											>
												{/* Include icons and labels as needed */}
												<span>{category}</span>
											</button>
											))}
										</div>

										<button
											className={`${styles['scroll_arrow']} ${atEnd || !isScrollable ? styles['scroll_arrow_hidden'] : ''}`}
											onClick={scrollRight}
										>
											{/* Right arrow SVG */}
											<div className={styles['category_arrow_svg_wrapper']}>
											<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
												<path d="M8 4l6 6-6 6" />
											</svg>
											</div>
										</button>
										</div>

									{
										activeModelTab === 'models' ? (
											<div className={styles['models_modal_body']}>
												<div className={styles['select_models_list']}>
												{filteredModels.map((model, index) => {
													const isSelected = index === selectedModelId;
													return (
														<div 
															key={index} 
															className={styles['select_model']} 
															onClick={(e) => {
																e.stopPropagation();
																handleSelectModel(index);
															}}
														>
														<div className={styles['select_model_item']}>
															<div className={`${styles['select_model_images']} ${isSelected ? styles['select_model_checked'] : ''}`}>
															<img src={model.image} alt={model.name} />
															</div>
															<div className={styles['select_model_info']}>
															<div className={styles['select_model_name']}>
																{model.name}
																<span className={styles['select_model_new']}>XL</span>
															</div>
															<div className={styles['select_like_model']}>
																<div className={styles['select_like_button_wrapper']}>
																<button 
																	className={`${styles['button_btn_like']} ${styles['button_transparent_like']} ${styles['button_xs_like']} ${styles['button_xs_like']}`}
																	onClick={async (e) => {
																		e.stopPropagation(); // Stop event propagation
																		// console.log('Like button clicked');
																		await toggleFavoriteModel(model.name);
																		await fetchUpdatedUserData();
																	}}
																>
																	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 	viewBox="0 0 24 24" fill={(session?.user?.favoriteModels as string[])?.includes(model.name.toString()) ? "red" : "none"} stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart " scale="14"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
																</button>
																</div>
															</div>
															</div>
															<div className={`${styles['select_icon']} ${isSelected ? 'select_checked_icon' : ''}`}>
															<svg className="" width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12L9 18L21 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
															</div>
														</div>
														</div>
													);
													})}
												</div>
											</div>
										) : (
											<div className={styles['models_modal_body']}>
												<div className={styles['select_models_list']}>
												{getFavoriteModels()
													.filter((model) => model && (selectedCategory === 'All' || model.category === selectedCategory))
													.map((model, index) => {
													if (!model) return null;
													const isSelected = model.name === modelData[selectedModelId].name;
													return (
														<div 
															key={index} 
															className={styles['select_model']} 
															onClick={(e) => {
																e.stopPropagation();
																handleSelectModelByName(model.name);
															}}
														>
														<div className={styles['select_model_item']}>
															<div className={`${styles['select_model_images']} ${isSelected ? styles['select_model_checked'] : ''}`}>
															<img src={model.image} alt={model.name} />
															</div>
															<div className={styles['select_model_info']}>
															<div className={styles['select_model_name']}>
																{model.name}
																<span className={styles['select_model_new']}>XL</span>
															</div>
															<div className={styles['select_like_model']}>
																<div className={styles['select_like_button_wrapper']}>
																<button 
																	className={`${styles['button_btn_like']} ${styles['button_transparent_like']} ${styles['button_xs_like']} ${styles['button_xs_like']}`}
																	onClick={async (e) => {
																		e.stopPropagation(); // Stop event propagation
																		if (!isSubmitting) {
																			setIsSubmitting(true);
																			// console.log('Like button clicked');
																			await toggleFavoriteModel(model.name);
																		}
																	}}
																>
																	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={(session?.user?.favoriteModels as string[])?.includes(model.name.toString()) ? "red" : "none"} stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart " scale="14"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
																</button>
																</div>
															</div>
															</div>
															<div className={`${styles['select_icon']} ${isSelected ? 'select_checked_icon' : ''}`}>
															<svg className="" width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12L9 18L21 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
															</div>
														</div>
														</div>
													);
													})}
												</div>
											</div>
										)
									}
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