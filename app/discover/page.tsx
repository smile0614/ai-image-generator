"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

import DiscoveryImage from "@/components/DiscoveryImage";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/dropdown";
import styles from '@/styles/Gallery.module.css';
import { createRoot } from "react-dom/client"; 
import { title } from "@/components/primitives";
import CollectionCard from "@/components/CollectionCard";
import {Textarea, Divider, Breadcrumbs, BreadcrumbItem, Accordion, AccordionItem, Slider, Tooltip, Button, Link, Input, Checkbox, user} from "@nextui-org/react";
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
import horizonImage from '@/assets/images/horizon.png';
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


import { useDiscoveryImageContext, ImageData } from "@/context/page";
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

const Discover = () => {

    const { data: session, status, update } = useSession();
	const router = useRouter();
	const actionHandledRef = useRef(false);

	const { discoveryImages, setDiscoveryImages } = useDiscoveryImageContext();
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
						favorites: data.user.favorites,
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
			const imageToUse = discoveryImages.find(image => image._id === userAction.imageId);
            
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
			const imageToReuse = discoveryImages.find(image => image._id === userAction.imageId);
	
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

	const fetchImages = async (imageLength: number, filterType: string, sortBy: string): Promise<ImageData[]> => {
		try {
			const response = await fetch('/api/images/discover', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ imageLength, filterType, sortBy, userId: session?.user.id })
			});
	
			const responseData = await response.json();
			if (responseData.message === 'Images found successfully') {
				const sortedImages = responseData.images;
	
				// Set hasMoreImages based on the API response
				setHasMoreImages(responseData.hasMoreImages);
	
				return sortedImages;
			} else {
				console.error('Failed to fetch user images:', responseData.message);
				return []; // Return an empty array on failure
			}
		} catch (error: any) {
			console.error('Error fetching user images:', error);
			return []; // Return an empty array on error
		}
	};

	useEffect(() => {
		fetchImages(discoveryImages.length, filterType, selectedSortBy).then(fetchedImages => {
			// console.log('fetchedImages', fetchedImages)
			setDiscoveryImages(fetchedImages);
		}).catch(error => {
			console.error('Error fetching user images:', error);
		});
	}, [session?.user.id]);

	let fetchTimeoutId: number | null = null;

	const updateImageContext = async () => {
		const fetchedImages = await fetchImages(discoveryImages.length, filterType, selectedSortBy);
		setDiscoveryImages(fetchedImages);
		// console.log("Images updated", discoveryImages);
	}

	const startImageFetcher = async () => {
		const fetchedImages = await fetchImages(discoveryImages.length, filterType, selectedSortBy);
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

		const now = new Date();
		const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000); 

		let remainingImages = [...fetchedImages];

		for (const img of fetchedImages) {
			if (img.res_image === null && new Date(img.createdAt) < fiveMinutesAgo) {
				if (session) {
					try {
						// console.log('img.cost', img.cost)

						remainingImages = remainingImages.filter(image => image._id !== img._id);
                    	setDiscoveryImages(remainingImages);

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

		// setDiscoveryImages(fetchedImages);
		setDiscoveryImages(remainingImages);
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
        isOpen: isFiltersModalOpen,
        onOpen: openFiltersModal,
        onClose: closeFilterModal
    } = useDisclosure();

	const closeFiltersModal = () => {
		closeFilterModal();
		setCurrentIndex(null);
	};

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

	useEffect(() => {
		if (selectedImage) {
		  const updatedImage = discoveryImages.find((image: ImageData) => image._id === selectedImage._id);
		  if (updatedImage) {
			setSelectedImage(updatedImage);
		  }
		}
	  }, [discoveryImages, selectedImage]);

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


	const openModalWithImage = (image: ImageData) => {
		const index = discoveryImages.findIndex(img => img._id === image._id);
		setSelectedImage(image);
		setCurrentIndex(index);
		openImageModal();
	};

	const openModalWithFilters = () => {
		openFiltersModal();
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
			setSelectedImage(discoveryImages[newIndex]);
			setCurrentIndex(newIndex);
		}
	};
	
	const showNextImage = () => {
		// console.log("showNextImage")
		if (currentIndex !== null && currentIndex < discoveryImages.length - 1) {
			const newIndex = currentIndex + 1;
			setSelectedImage(discoveryImages[newIndex]);
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
	}, [currentIndex, discoveryImages, isImagetModalOpen]);



	const openModalWithCanvas = () => {
		openCanvasModal();
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


	const {
		isOpen: isLoginModalOpen,
		onOpen: openLoginModal,
		onClose: toggleLoginModal,
	} = useDisclosure();


	const toggleFavoriteGalleryImage = async (imageId: string, userId: string, res_image: string) => {
        
		const userSessionId = session?.user?.id;
		if (!userSessionId) {
			openLoginModal();
			return;
		}
		
		try {
			// Optimistically update the state to toggle the favorite status
			setDiscoveryImages((prevImages) => 
				prevImages.map(image => 
					image._id === imageId ? { ...image, favorite: !image.favorite } : image
				)
			);
			
            const toggleFavoriteResponse = await fetch('/api/image/favorites/gallery/toggle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    imageId,
                    userId,
                    res_image
                })
            });
            const toggleData = await toggleFavoriteResponse.json();
            if (toggleData.message !== 'Image like status updated successfully') throw new Error(toggleData.message);
			
			// Update session user favoriteModels
			await fetchUpdatedUserData();

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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const handleGenerateSimilar = async (image: ImageData) => {

	const userSessionId = session?.user?.id;
	if (!userSessionId) {
		openLoginModal();
		return;
	}

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

	if (session?.user?.credits === 0) {
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
	  const lastImageIndex = discoveryImages.length - 1;

	  // Function to determine the number of columns based on screen width
	const getNumberOfColumns = (): number => {
		if (window.innerWidth < 768) {
			return 1;
		} else if (window.innerWidth >= 768 && window.innerWidth <= 1100) {
			return 3;
		} else if (window.innerWidth >= 1600) {
			return 5;
		} else {
			return 5;
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

	// Update columns when the component mounts or when discoveryImages change
	useEffect(() => {
		const numColumns = getNumberOfColumns();
		setColumns(createColumns(discoveryImages, numColumns));
	}, [discoveryImages]);

	// Handle screen resize to recalculate columns
	useEffect(() => {
		const handleResize = () => {
			const numColumns = getNumberOfColumns();
			setColumns(createColumns(discoveryImages, numColumns));
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [discoveryImages]);

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
			console.log("Fetching more images...");
			fetchImages(discoveryImages.length, filterType, selectedSortBy).then(fetchedImages => {
				if (fetchedImages.length > 0) {
					setDiscoveryImages(fetchedImages);  // Replace the entire array with fetched images
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

	const [searchTerm, setSearchTerm] = useState('');
	const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<'newest' | 'popular' | 'following'>('newest');
	const [filterLikes, setFilterLikes] = useState<'all' | 'liked'>('all');
	const [filterUserLikes, setFilterUserLikes] = useState<'all' | 'userLiked'>('all');
	const [userLikes, setUserLikes] = useState<string[]>([]); // IDs of images liked by the user
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [selectedSortBy, setSelectedSortBy] = useState<'newest' | 'oldest' | 'likes'>('newest');

	const [filterType, setFilterType] = useState<'all' | 'favorites' | 'mostLiked' | 'newest' | 'popular' | 'following'>('all');

	// Reset filters function
	const resetFilters = () => {
    	setFilterType('newest');
	};

	// Handle filter selection
	const handleFilterSelect = (filter: 'all' | 'favorites' | 'mostLiked' | 'newest' | 'popular' | 'following') => setFilterType(filter);
	const handleSortBySelect = (sortBy: 'newest' | 'oldest' | 'likes') => setSelectedSortBy(sortBy);

	// Filter and sort images based on user's input (search term, sorting order)
	useEffect(() => {
		let updatedImages = [...discoveryImages];
	
		// Filter by search term
		if (searchTerm) {
			updatedImages = updatedImages.filter(image =>
				image.prompt.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
	
		// Filter by selected category
		if (selectedCategory !== 'All') {
			updatedImages = updatedImages.filter(image =>
				image.category === selectedCategory
			);
		}
	
		setFilteredImages(updatedImages); // Set filtered images
		const numColumns = getNumberOfColumns();
		setColumns(createColumns(updatedImages, numColumns)); // Update columns based on filtered images
	}, [searchTerm, filterType, selectedCategory, discoveryImages]);
	
	// Handle category selection
	const handleCategorySelect = (category: string) => {
		setSelectedCategory(category);
	};

	const [isSortOpen, setIsSortOpen] = useState(false);
	
	useEffect(() => {
		fetchImages(discoveryImages.length, filterType, selectedSortBy)
			.then(fetchedImages => {
				setDiscoveryImages(fetchedImages);
			})
			.catch(error => {
				console.error('Error fetching user images:', error);
			});
	}, [filterType, selectedSortBy]);

	const handleSortToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setIsSortOpen(!isSortOpen);
	};

	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(false);

	const categoryRef = useRef<HTMLDivElement | null>(null);

	const scrollLeft = () => {
	categoryRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
	};

	const scrollRight = () => {
	categoryRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
	};

	const [isScrollable, setIsScrollable] = useState(false);

	const isImageFavorite = selectedImage 
	? session?.user?.favorites?.some(fav => fav === selectedImage.res_image.toString()) ?? false 
	: false;
	
	useEffect(() => {
		const handleResize = () => {
		  if (categoryRef.current) {
			const containerWidth = categoryRef.current.clientWidth;
			const contentWidth = categoryRef.current.scrollWidth;
	  
			// Check if the total width of the content exceeds the container width
			setIsScrollable(contentWidth > containerWidth);
	  
			// Also, check if the scroll is at the start or end
			const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current;
			const maxScrollLeft = scrollWidth - clientWidth;
			const scrollThreshold = 10; // small threshold to detect near the end
	  
			setAtStart(scrollLeft <= 0);
			setAtEnd(scrollLeft + clientWidth >= scrollWidth - scrollThreshold);
		  }
		};
	  
		handleResize(); // Check on initial render
		window.addEventListener('resize', handleResize);
		
		return () => window.removeEventListener('resize', handleResize);
	  }, []);
	
	useEffect(() => {
		const handleScroll = () => {
			if (categoryRef.current) {
				const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current;
				const maxScrollLeft = scrollWidth - clientWidth;
				const scrollThreshold = 10; // Add a small threshold to detect near the end
	
				setAtStart(scrollLeft <= 0);
				setAtEnd(scrollLeft + clientWidth >= scrollWidth - scrollThreshold);
			}
		};
	
		// Add scroll listener
		categoryRef.current?.addEventListener('scroll', handleScroll);
	
		return () => {
			categoryRef.current?.removeEventListener('scroll', handleScroll);
		};
	}, []);

    return (
        <div>

		<div className={styles['banner_wrapper']}>
			<div className={styles['banner']}>
				<img src={horizonImage.src} alt="Banner Image" className={styles['banner_image']} />
				<div className={styles['banner_text_container']}>
					<h1 className={styles['banner_text_large']}>Community</h1>
					<h2 className={styles['banner_text_small']}>Share your images!</h2>				
				</div>
			</div>
		</div>
			
			<div className={styles['gallery_toolbar_wrapper']}>

			{
				!isMobile && (
					<div className={styles['sort__content']}>
						<Dropdown className={styles['sort__content']}>
							<DropdownTrigger>
								<div className={styles['discover_sort_btn_wrapper']}>
									<button 
										className={styles['discover_sort_btn']} 
									>
										<div className={styles['discover_sort_btn_text']}>
											{filterType === 'mostLiked' 
												? 'Most Popular' 
												: filterType === 'favorites' 
												? 'Following' 
												: 'New'}
										</div>
										<svg width="16" height="17" viewBox="0 0 16 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.08393 10.749C3.34428 11.0094 3.76639 11.0094 4.02674 10.749L7.99978 6.77598L11.9728 10.749C12.2332 11.0094 12.6553 11.0094 12.9156 10.749C13.176 10.4887 13.176 10.0666 12.9156 9.80621L8.47119 5.36177C8.21084 5.10142 7.78873 5.10142 7.52838 5.36177L3.08393 9.80621C2.82358 10.0666 2.82358 10.4887 3.08393 10.749Z"></path></svg>
									</button>
								</div>
							</DropdownTrigger>
							<DropdownMenu
								aria-label="sort options"
								// className="w-[90vw]"
								itemClasses={{
									base: "gap-4",
								}}
							>
								<DropdownItem>
									<button
										className={styles['sort_option_btn']}
										onClick={(e) => {
											e.stopPropagation();
											// handleFilterSelect('newest');
											handleFilterSelect('all');
                                			handleSortBySelect('newest');
										}}
									>
										<svg viewBox="0 0 16 16" focusable="false" aria-hidden="true"><path d="M9.66406 4.01562L11 3.5L11.4922 2.1875C11.5156 2.07031 11.6328 2 11.75 2C11.8438 2 11.9609 2.07031 11.9844 2.1875L12.5 3.5L13.8125 4.01562C13.9297 4.03906 14 4.15625 14 4.25C14 4.36719 13.9297 4.48438 13.8125 4.50781L12.5 5L11.9844 6.33594C11.9609 6.42969 11.8438 6.5 11.75 6.5C11.6328 6.5 11.5156 6.42969 11.4922 6.33594L11 5L9.66406 4.50781C9.54688 4.48438 9.5 4.36719 9.5 4.25C9.5 4.15625 9.54688 4.03906 9.66406 4.01562ZM6.125 3.73438C6.17188 3.59375 6.3125 3.5 6.45312 3.5C6.59375 3.5 6.73438 3.59375 6.80469 3.73438L8.02344 6.40625L10.6953 7.625C10.8359 7.69531 10.9297 7.83594 10.9297 7.97656C10.9297 8.11719 10.8359 8.25781 10.6953 8.32812L8.02344 9.54688L6.80469 12.2188C6.73438 12.3594 6.59375 12.4531 6.45312 12.4531C6.3125 12.4531 6.17188 12.3594 6.125 12.2188L4.88281 9.54688L2.21094 8.32812C2.07031 8.25781 2 8.11719 2 7.97656C2 7.83594 2.07031 7.69531 2.21094 7.625L4.88281 6.40625L6.125 3.73438ZM5.89062 6.875C5.79688 7.10938 5.58594 7.32031 5.35156 7.41406L4.15625 7.97656L5.35156 8.53906C5.58594 8.63281 5.79688 8.84375 5.89062 9.07812L6.45312 10.2734L7.01562 9.07812C7.10938 8.84375 7.32031 8.63281 7.55469 8.53906L8.75 7.97656L7.55469 7.41406C7.32031 7.32031 7.10938 7.10938 7.01562 6.875L6.45312 5.67969L5.89062 6.875ZM11.4922 9.6875C11.5156 9.57031 11.6328 9.5 11.75 9.5C11.8438 9.5 11.9609 9.57031 11.9844 9.6875L12.5 11L13.8125 11.5156C13.9297 11.5391 14 11.6562 14 11.75C14 11.8672 13.9297 11.9844 13.8125 12.0078L12.5 12.5L11.9844 13.8359C11.9609 13.9297 11.8438 14 11.75 14C11.6328 14 11.5156 13.9297 11.4922 13.8359L11 12.5L9.66406 12.0078C9.54688 11.9844 9.5 11.8672 9.5 11.75C9.5 11.6562 9.54688 11.5391 9.66406 11.5156L11 11L11.4922 9.6875Z" fill="currentColor"></path></svg>
										New
									</button>
								</DropdownItem>
								<DropdownItem>
									<button
										className={styles['sort_option_btn']}
										onClick={(e) => {
											e.stopPropagation();
											// handleFilterSelect('popular');
											handleFilterSelect('mostLiked');
                                			handleSortBySelect('likes');
										}}
									>
										<svg viewBox="0 0 16 16" focusable="false" aria-hidden="true"><path d="M9.66406 4.01562L11 3.5L11.4922 2.1875C11.5156 2.07031 11.6328 2 11.75 2C11.8438 2 11.9609 2.07031 11.9844 2.1875L12.5 3.5L13.8125 4.01562C13.9297 4.03906 14 4.15625 14 4.25C14 4.36719 13.9297 4.48438 13.8125 4.50781L12.5 5L11.9844 6.33594C11.9609 6.42969 11.8438 6.5 11.75 6.5C11.6328 6.5 11.5156 6.42969 11.4922 6.33594L11 5L9.66406 4.50781C9.54688 4.48438 9.5 4.36719 9.5 4.25C9.5 4.15625 9.54688 4.03906 9.66406 4.01562ZM6.125 3.73438C6.17188 3.59375 6.3125 3.5 6.45312 3.5C6.59375 3.5 6.73438 3.59375 6.80469 3.73438L8.02344 6.40625L10.6953 7.625C10.8359 7.69531 10.9297 7.83594 10.9297 7.97656C10.9297 8.11719 10.8359 8.25781 10.6953 8.32812L8.02344 9.54688L6.80469 12.2188C6.73438 12.3594 6.59375 12.4531 6.45312 12.4531C6.3125 12.4531 6.17188 12.3594 6.125 12.2188L4.88281 9.54688L2.21094 8.32812C2.07031 8.25781 2 8.11719 2 7.97656C2 7.83594 2.07031 7.69531 2.21094 7.625L4.88281 6.40625L6.125 3.73438ZM5.89062 6.875C5.79688 7.10938 5.58594 7.32031 5.35156 7.41406L4.15625 7.97656L5.35156 8.53906C5.58594 8.63281 5.79688 8.84375 5.89062 9.07812L6.45312 10.2734L7.01562 9.07812C7.10938 8.84375 7.32031 8.63281 7.55469 8.53906L8.75 7.97656L7.55469 7.41406C7.32031 7.32031 7.10938 7.10938 7.01562 6.875L6.45312 5.67969L5.89062 6.875ZM11.4922 9.6875C11.5156 9.57031 11.6328 9.5 11.75 9.5C11.8438 9.5 11.9609 9.57031 11.9844 9.6875L12.5 11L13.8125 11.5156C13.9297 11.5391 14 11.6562 14 11.75C14 11.8672 13.9297 11.9844 13.8125 12.0078L12.5 12.5L11.9844 13.8359C11.9609 13.9297 11.8438 14 11.75 14C11.6328 14 11.5156 13.9297 11.4922 13.8359L11 12.5L9.66406 12.0078C9.54688 11.9844 9.5 11.8672 9.5 11.75C9.5 11.6562 9.54688 11.5391 9.66406 11.5156L11 11L11.4922 9.6875Z" fill="currentColor"></path></svg>
										Most popular
									</button>
								</DropdownItem>
								<DropdownItem>
									<button
										className={styles['sort_option_btn']}
										onClick={(e) => {
											e.stopPropagation();
											// handleFilterSelect('following');
											handleFilterSelect('favorites');
                                			handleSortBySelect('newest');
										}}
									>
										<svg viewBox="-2 -4 20 20" focusable="false" className="chakra-icon css-onymcf" aria-hidden="true"><path d="M9.00014 16.125C8.9118 16.125 8.82344 16.1067 8.74094 16.0692C8.46844 15.945 2.05514 12.9708 1.02681 7.67418C0.629309 5.62501 1.02848 3.62583 2.09431 2.3275C2.95681 1.27583 4.19678 0.71665 5.68094 0.70915C5.68844 0.70915 5.69594 0.70915 5.70261 0.70915C7.39594 0.70915 8.42849 1.67334 8.99932 2.49417C9.57266 1.67001 10.6134 0.70165 12.3176 0.70915C13.8026 0.71665 15.0434 1.27583 15.9068 2.3275C16.9709 3.625 17.3693 5.62416 16.9709 7.67499C15.9443 12.9717 9.5301 15.9467 9.2576 16.07C9.17677 16.1067 9.08847 16.125 9.00014 16.125ZM5.7018 1.95834C5.6968 1.95834 5.69266 1.95834 5.68766 1.95834C4.57266 1.96334 3.68934 2.35415 3.06101 3.11999C2.22851 4.13415 1.92766 5.7475 2.25433 7.43583C3.05016 11.5392 7.82764 14.2058 9.00014 14.8042C10.1726 14.2058 14.9501 11.5392 15.7451 7.43583C16.0735 5.74667 15.7726 4.13332 14.9418 3.11999C14.3135 2.35499 13.4301 1.96498 12.3126 1.95915C12.3076 1.95915 12.3026 1.95915 12.2985 1.95915C10.3218 1.95915 9.62102 3.94001 9.59269 4.02417C9.50602 4.27667 9.26762 4.44832 9.00095 4.44832C8.99928 4.44832 8.99843 4.44832 8.99759 4.44832C8.73009 4.44748 8.49177 4.27666 8.40677 4.02249C8.37927 3.93916 7.67763 1.95834 5.7018 1.95834Z" fill="currentColor"></path></svg>
										Following
									</button>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				)
			}

				<div className={styles['search_input_discovery_wrapper']}>
					<div className={styles['search_input_discovery']}>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.88873 14.4444C5.82048 14.4444 3.33317 11.9571 3.33317 8.88889C3.33317 5.82065 5.82048 3.33334 8.88873 3.33334C11.957 3.33334 14.4443 5.82065 14.4443 8.88889C14.4443 11.9571 11.957 14.4444 8.88873 14.4444ZM1.6665 8.88889C1.6665 4.90017 4.9 1.66667 8.88873 1.66667C12.8774 1.66667 16.1109 4.90017 16.1109 8.88889C16.1109 10.583 15.5277 12.1409 14.551 13.3726L17.2558 16.0774C17.5812 16.4029 17.5812 16.9305 17.2558 17.2559C16.9303 17.5814 16.4027 17.5814 16.0772 17.2559L13.3724 14.5511C12.1407 15.5278 10.5828 16.1111 8.88873 16.1111C4.9 16.1111 1.6665 12.8776 1.6665 8.88889Z"></path></svg>
						<input 
							className={styles['search_input_discovery_input']} 
							placeholder="search gallery"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						>
						</input>
					</div>
					
					{
						isMobile && (
							<button
									className={`${styles['filters_btn']}`}
									onClick={() => openModalWithFilters()}
								>
									<svg viewBox="0 0 14 14" focusable="false" aria-hidden="true"><path d="M0.333313 2.33331C0.333313 1.96531 0.63198 1.66665 0.99998 1.66665H3.66665V0.99998C3.66665 0.63198 3.96531 0.333313 4.33331 0.333313C4.70131 0.333313 4.99998 0.63198 4.99998 0.99998V3.66665C4.99998 4.03465 4.70131 4.33331 4.33331 4.33331C3.96531 4.33331 3.66665 4.03465 3.66665 3.66665V2.99998H0.99998C0.63198 2.99998 0.333313 2.70131 0.333313 2.33331ZM6.99998 2.99998H13C13.368 2.99998 13.6666 2.70131 13.6666 2.33331C13.6666 1.96531 13.368 1.66665 13 1.66665H6.99998C6.63198 1.66665 6.33331 1.96531 6.33331 2.33331C6.33331 2.70131 6.63198 2.99998 6.99998 2.99998ZM0.99998 7.66665H6.99998C7.36798 7.66665 7.66665 7.36798 7.66665 6.99998C7.66665 6.63198 7.36798 6.33331 6.99998 6.33331H0.99998C0.63198 6.33331 0.333313 6.63198 0.333313 6.99998C0.333313 7.36798 0.63198 7.66665 0.99998 7.66665ZM13 6.33331H10.3333V5.66665C10.3333 5.29865 10.0346 4.99998 9.66665 4.99998C9.29865 4.99998 8.99998 5.29865 8.99998 5.66665V8.33331C8.99998 8.70131 9.29865 8.99998 9.66665 8.99998C10.0346 8.99998 10.3333 8.70131 10.3333 8.33331V7.66665H13C13.368 7.66665 13.6666 7.36798 13.6666 6.99998C13.6666 6.63198 13.368 6.33331 13 6.33331ZM4.33331 9.66665C3.96531 9.66665 3.66665 9.96531 3.66665 10.3333V11H0.99998C0.63198 11 0.333313 11.2986 0.333313 11.6666C0.333313 12.0346 0.63198 12.3333 0.99998 12.3333H3.66665V13C3.66665 13.368 3.96531 13.6666 4.33331 13.6666C4.70131 13.6666 4.99998 13.368 4.99998 13V10.3333C4.99998 9.96531 4.70131 9.66665 4.33331 9.66665ZM13 11H6.99998C6.63198 11 6.33331 11.2986 6.33331 11.6666C6.33331 12.0346 6.63198 12.3333 6.99998 12.3333H13C13.368 12.3333 13.6666 12.0346 13.6666 11.6666C13.6666 11.2986 13.368 11 13 11Z" fill="white"></path></svg>					
							</button>
						)
					}
				</div>

				<div className={styles['category_container']}>
					<button
						className={`${styles['scroll_arrow']} ${atStart || !isScrollable ? styles['scroll_arrow_hidden'] : ''}`}
						onClick={() => scrollLeft()}
					>
						{/* Left arrow SVG */}
						<div className={styles['category_arrow_svg_wrapper']}>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
								<path d="M12 4l-6 6 6 6" />
							</svg>
						</div>
					</button>
					
					<div className={styles['categories']} ref={categoryRef}>

						<button
							className={`${styles['category_btn']} ${selectedCategory === 'All' ? styles['category_btn_active'] : ''}`}
							onClick={() => handleCategorySelect('All')}
						>
							<svg viewBox="0 0 18 18" focusable="false" aria-hidden="true"><path d="M15.5 7.75h-3c-1.4 0-2.25-.84-2.25-2.25v-3c0-1.4.84-2.25 2.25-2.25h3c1.4 0 2.25.84 2.25 2.25v3c0 1.4-.84 2.25-2.25 2.25Zm-3-6c-.59 0-.75.16-.75.75v3c0 .59.16.75.75.75h3c.59 0 .75-.16.75-.75v-3c0-.59-.16-.75-.75-.75h-3Zm-7 6h-3C1.1 7.75.25 6.91.25 5.5v-3C.25 1.1 1.09.25 2.5.25h3c1.4 0 2.25.84 2.25 2.25v3c0 1.4-.84 2.25-2.25 2.25Zm-3-6c-.59 0-.75.16-.75.75v3c0 .59.16.75.75.75h3c.59 0 .75-.16.75-.75v-3c0-.59-.16-.75-.75-.75h-3Zm13 16h-3c-1.4 0-2.25-.84-2.25-2.25v-3c0-1.4.84-2.25 2.25-2.25h3c1.4 0 2.25.84 2.25 2.25v3c0 1.4-.84 2.25-2.25 2.25Zm-3-6c-.59 0-.75.16-.75.75v3c0 .59.16.75.75.75h3c.59 0 .75-.16.75-.75v-3c0-.59-.16-.75-.75-.75h-3Zm-7 6h-3c-1.4 0-2.25-.84-2.25-2.25v-3c0-1.4.84-2.25 2.25-2.25h3c1.4 0 2.25.84 2.25 2.25v3c0 1.4-.84 2.25-2.25 2.25Zm-3-6c-.59 0-.75.16-.75.75v3c0 .59.16.75.75.75h3c.59 0 .75-.16.75-.75v-3c0-.59-.16-.75-.75-.75h-3Z"></path></svg>
							<span>All</span>
						</button>

						<button
							className={`${styles['category_btn']} ${selectedCategory === 'Photography' ? styles['category_btn_active'] : ''}`}
							onClick={() => handleCategorySelect('Photography')}
						>
						<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M18 6.25h-1.46l-.49-1.46a2.25 2.25 0 0 0-2.13-1.54h-3.84c-.97 0-1.83.62-2.13 1.54l-.49 1.46H6c-2.42 0-3.75 1.33-3.75 3.75v8c0 2.42 1.33 3.75 3.75 3.75h12c2.42 0 3.75-1.33 3.75-3.75v-8c0-2.42-1.33-3.75-3.75-3.75ZM20.25 18c0 1.58-.67 2.25-2.25 2.25H6c-1.58 0-2.25-.67-2.25-2.25v-8c0-1.58.67-2.25 2.25-2.25h2c.32 0 .6-.2.71-.51l.66-1.98c.1-.3.39-.51.71-.51h3.84c.32 0 .6.2.71.51l.66 1.98c.1.3.39.5.71.5h2c1.58 0 2.25.68 2.25 2.26v8ZM12 10.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm0 6a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Zm6.5-5.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>
							<span>Photography</span>
						</button>

						<button
							className={`${styles['category_btn']} ${selectedCategory === 'Animals' ? styles['category_btn_active'] : ''}`}
							onClick={() => handleCategorySelect('Animals')}
						>
						<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="m23.58 13.74.09.05a.64.64 0 1 1-.61 1.12l-.09-.05-.71-.38c-.06.3-.13.6-.22.89.4.19.8.4 1.24.64l.07.04a.64.64 0 1 1-.6 1.12l-.08-.04c-.41-.22-.76-.42-1.11-.58-1.58 3.12-5.25 5.1-9.56 5.1-4.31 0-7.98-1.98-9.56-5.1-.35.16-.7.36-1.1.58l-.08.04a.63.63 0 0 1-.86-.25.64.64 0 0 1 .25-.87l.07-.04c.44-.24.84-.45 1.24-.64-.09-.3-.16-.6-.22-.9l-.71.4-.09.04a.63.63 0 0 1-.86-.26.64.64 0 0 1 .25-.86l.09-.05c.43-.23.81-.44 1.2-.62v-.04c0-2 .77-3.96 2.16-5.55L3.6 3.98v-.02c-.03-.77.27-1.4.8-1.74.5-.3 1.14-.3 1.75.04l.04.02 3.15 2.01c1.73-.4 3.56-.4 5.29 0l3.14-2.01.04-.02c.61-.33 1.25-.35 1.75-.04.53.34.83.97.8 1.74l-.12 3.6a8.41 8.41 0 0 1 2.14 5.55c.39.19.77.4 1.2.63ZM3.64 16.1c1.4 2.62 4.6 4.28 8.36 4.28 3.77 0 6.96-1.66 8.36-4.28a7.1 7.1 0 0 0-.75-.15.64.64 0 0 1 .19-1.26c.37.06.71.13 1.05.23.09-.32.16-.64.2-.97-.35-.11-.71-.2-1.12-.26a.64.64 0 1 1 .18-1.26c.35.06.67.12.98.2a7.13 7.13 0 0 0-1.96-4.41.64.64 0 0 1-.16-.5l.13-3.8c0-.35-.1-.55-.21-.61-.14-.1-.36 0-.46.06L15.09 5.5l-1.05.7a.63.63 0 0 1-.88-.19.63.63 0 0 1-.01-.69c-.78-.08-1.56-.08-2.34 0a.63.63 0 0 1-.89.87L8.9 5.51 5.53 3.37c-.1-.06-.32-.15-.46-.06-.1.06-.21.26-.2.61l.19 3.81c0 .18-.06.34-.17.47a7.13 7.13 0 0 0-1.98 4.44c.3-.09.63-.15.98-.2a.64.64 0 0 1 .18 1.25c-.4.06-.77.15-1.12.26.04.33.11.65.2.97.34-.1.68-.17 1.06-.23a.64.64 0 1 1 .18 1.26c-.26.04-.51.1-.75.15Zm5.58-3.62a.64.64 0 0 0 1.27 0 2.01 2.01 0 0 0-4.02 0 .64.64 0 1 0 1.27 0 .74.74 0 0 1 1.48 0Zm7.67.64a.64.64 0 0 1-.63-.64.74.74 0 0 0-1.48 0 .64.64 0 1 1-1.27 0 2.01 2.01 0 0 1 4.02 0c0 .35-.29.64-.64.64Zm-2.98 1.33c.19-.09.42 0 .5.19A1.46 1.46 0 0 1 12 16.22a1.46 1.46 0 0 1-2.41-1.58.38.38 0 0 1 .7.31.7.7 0 1 0 1.34.29.38.38 0 1 1 .75 0 .7.7 0 1 0 1.34-.29.37.37 0 0 1 .19-.5Z"></path></svg>
							<span>Animals</span>
						</button>

						<button
							className={`${styles['category_btn']} ${selectedCategory === 'Anime' ? styles['category_btn_active'] : ''}`}
							onClick={() => handleCategorySelect('Anime')}
						>
						<svg viewBox="0 0 24 24" focusable="false" strokeWidth="0.2" aria-hidden="true"><path d="M9.78.52 9.6.3v7.98c-.07.3-.27.68-.6.92-.33.23-.88.4-1.83.06l-.26-.1-.05-.01-.05.03-6.3 5.04-.22.18h7.86c.33.08.72.27.95.6.2.3.36.83-.07 1.78l-.13.29-.02.05.04.05 5.18 6.29.18.21v-7.93c.09-.33.3-.73.65-.96.16-.11.36-.2.64-.21.28-.01.63.06 1.08.27l.28.13.05.03.05-.04 6.48-5.06.23-.18h-8.12c-.3-.09-.67-.3-.88-.63-.2-.31-.33-.84.1-1.74l.13-.28L15 7l-.04-.05L9.78.52ZM10.8 8.4V3.7l2.8 3.49c-.4 1.03-.29 1.89.13 2.55a2.82 2.82 0 0 0 1.66 1.17l.06.01h4.81l-3.44 2.69c-1.05-.4-1.92-.27-2.57.18a3 3 0 0 0-1.16 1.74l-.01.05v4.75l-2.81-3.4c.4-1.08.27-1.96-.18-2.61a2.8 2.8 0 0 0-1.77-1.1l-.04-.02H3.7l3.38-2.7c1.09.31 1.96.14 2.6-.32.67-.48 1-1.2 1.1-1.73V8.4Zm1.14 1.82a1.84 1.84 0 1 0 0 3.68 1.84 1.84 0 0 0 0-3.68Zm-.64 1.84a.64.64 0 1 1 1.28 0 .64.64 0 0 1-1.28 0Z"></path></svg>
							<span>Anime</span>
						</button>

						<button
							className={`${styles['category_btn']} ${selectedCategory === 'Architecture' ? styles['category_btn_active'] : ''}`}
							onClick={() => handleCategorySelect('Architecture')}
						>
						<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 10.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Zm0-4a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm10 14.5h-.25V12.5c0-1.4-.84-2.25-2.25-2.25h-.75V7.07l.84.56a.75.75 0 0 0 1.04-.21.75.75 0 0 0-.22-1.04l-7.16-4.75c-.76-.5-1.74-.5-2.5 0L3.6 6.38a.75.75 0 1 0 .82 1.25l.84-.56v3.18H4.5c-1.4 0-2.25.84-2.25 2.25v8.75H2a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5ZM3.75 12.5c0-.59.16-.75.75-.75h.75v9.5h-1.5V12.5Zm3-6.42 4.83-3.2a.75.75 0 0 1 .84 0l4.83 3.2v15.17h-2.5V19a2.75 2.75 0 0 0-5.5 0v2.25h-2.5V6.08Zm4 15.17V19a1.25 1.25 0 0 1 2.5 0v2.25h-2.5Zm8 0v-9.5h.75c.59 0 .75.16.75.75v8.75h-1.5ZM15 12.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm-2.25.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9 14.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"></path></svg>
							<span>Architecture</span>
						</button>

						<button
							className={`${styles['category_btn']} ${selectedCategory === 'Character' ? styles['category_btn_active'] : ''}`}
							onClick={() => handleCategorySelect('Character')}
						>
						<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 10.75a4.25 4.25 0 1 1 .02-8.51 4.25 4.25 0 0 1-.01 8.51Zm0-7a2.75 2.75 0 1 0 .01 5.5 2.75 2.75 0 0 0 0-5.5Zm4 18H8c-2.42 0-3.75-1.32-3.75-3.73 0-2.66 1.5-5.77 5.75-5.77h4c4.24 0 5.75 3.1 5.75 5.77 0 2.4-1.33 3.73-3.75 3.73Zm-6-8c-3.94 0-4.25 3.27-4.25 4.27 0 1.56.67 2.23 2.25 2.23h8c1.58 0 2.25-.67 2.25-2.23 0-1-.3-4.27-4.25-4.27h-4Z"></path></svg>
							<span>Character</span>
						</button>

						<button
							className={`${styles['category_btn']} ${selectedCategory === 'Food' ? styles['category_btn_active'] : ''}`}
							onClick={() => handleCategorySelect('Food')}
						>
							<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M2.114 15.569a.756.756 0 0 1 0-1.513h19.781a.756.756 0 1 1 0 1.513h-1.453c-.496 0-.889.115-1.216.315-.297.182-.51.42-.658.586l-.017.018c-.165.185-.263.288-.385.363-.103.063-.256.124-.537.124-.28 0-.433-.061-.536-.124-.122-.075-.22-.178-.386-.363l-.016-.018c-.149-.166-.36-.404-.658-.586-.327-.2-.72-.315-1.216-.315s-.889.115-1.216.315c-.297.182-.51.42-.658.586l-.016.018c-.166.185-.264.288-.386.363-.103.063-.256.124-.537.124-.28 0-.433-.061-.536-.124-.122-.075-.22-.178-.386-.363l-.016-.018c-.149-.166-.36-.404-.658-.586-.327-.2-.72-.315-1.216-.315s-.889.115-1.216.315c-.297.182-.51.42-.658.586l-.016.018c-.166.185-.264.288-.386.363-.103.063-.256.124-.537.124-.28 0-.438-.06-.548-.127-.13-.077-.234-.184-.405-.369l-.016-.017c-.155-.167-.372-.401-.672-.58-.329-.198-.722-.313-1.218-.313H2.114Zm20.407 1.203a2.057 2.057 0 0 0 .874-3.366 2.057 2.057 0 0 0-.862-3.361c-.125-2.992-1.288-5.132-3.157-6.522-1.949-1.448-4.58-2.017-7.372-2.017-2.79 0-5.422.569-7.371 2.017-1.87 1.39-3.032 3.53-3.158 6.522a2.057 2.057 0 0 0-.861 3.361 2.057 2.057 0 0 0 .875 3.366c.284 3.212 3.024 5.722 6.297 5.722h8.437c3.273 0 6.013-2.51 6.298-5.722Zm-19.714.097c.324 2.435 2.445 4.325 4.979 4.325h8.437c2.534 0 4.655-1.89 4.98-4.325h-.761c-.28 0-.434.06-.537.124-.122.074-.22.178-.385.362l-.016.019c-.15.166-.361.403-.659.585-.327.201-.72.316-1.215.316-.496 0-.89-.115-1.216-.316-.298-.182-.51-.419-.659-.585l-.016-.019c-.165-.184-.264-.288-.385-.362-.103-.063-.256-.124-.537-.124-.28 0-.434.06-.537.124-.121.074-.22.178-.385.362l-.016.019c-.15.166-.361.403-.659.585-.327.201-.72.316-1.216.316-.495 0-.888-.115-1.215-.316-.298-.182-.51-.419-.659-.585l-.016-.019c-.165-.184-.263-.288-.385-.362-.103-.063-.256-.124-.537-.124-.28 0-.434.06-.537.124-.122.074-.22.178-.385.362l-.016.019c-.15.166-.361.403-.659.585-.327.201-.72.316-1.216.316s-.889-.115-1.218-.313c-.3-.18-.516-.414-.67-.58l-.017-.018c-.172-.184-.276-.291-.405-.368-.11-.066-.268-.127-.549-.127h-.713ZM5.408 4.567c-1.483 1.102-2.483 2.81-2.626 5.377h18.445c-.143-2.567-1.143-4.275-2.626-5.377-1.637-1.217-3.951-1.76-6.596-1.76-2.646 0-4.96.543-6.597 1.76ZM22.651 12a.756.756 0 0 0-.756-.756H2.114a.756.756 0 1 0 0 1.512h19.781a.756.756 0 0 0 .756-.756ZM7.786 8.484a.703.703 0 1 0 0-1.406.703.703 0 0 0 0 1.406Zm9.14-.703a.703.703 0 1 1-1.406 0 .703.703 0 0 1 1.407 0Zm-3.515-.703a.703.703 0 1 0 0-1.406.703.703 0 0 0 0 1.406Zm-2.11-2.11a.703.703 0 1 1-1.406 0 .703.703 0 0 1 1.407 0Z"></path></svg>
							<span>Food</span>
						</button>

						<button
							className={`${styles['category_btn']} ${selectedCategory === 'Sci-Fi' ? styles['category_btn_active'] : ''}`}
							onClick={() => handleCategorySelect('Sci-Fi')}
						>
						<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M2.06 9.94C2.06 4.459 6.519 0 12 0c5.48 0 9.94 4.459 9.94 9.94 0 5.429-4.664 10.533-7.443 13.093a3.65 3.65 0 0 1-2.48.967h-.014a3.654 3.654 0 0 1-2.486-.986C6.732 20.414 2.06 15.256 2.06 9.94Zm8.422 12.04a2.258 2.258 0 0 0 3.057.012c2.408-2.217 6.321-6.443 6.91-10.924h-1.744v.689a3.834 3.834 0 0 1-3.83 3.83h-2.103v-2.104a3.834 3.834 0 0 1 3.83-3.83h3.918c-.152-4.568-3.915-8.238-8.52-8.238-4.605 0-8.369 3.67-8.52 8.239h3.918a3.834 3.834 0 0 1 3.83 3.829v2.103H9.123a3.834 3.834 0 0 1-3.83-3.83v-.688H3.554c.601 4.396 4.518 8.66 6.929 10.912ZM6.709 11.068v.689a2.418 2.418 0 0 0 2.415 2.415h.689v-.69a2.418 2.418 0 0 0-2.415-2.414h-.689Zm10.581.689v-.689h-.689a2.418 2.418 0 0 0-2.414 2.415v.689h.688a2.418 2.418 0 0 0 2.415-2.415Zm-3.811 6.24h-2.96v1.414h2.96v-1.415Z"></path></svg>
							<span>Sci-Fi</span>
						</button>

					</div>
					
					<button
						className={`${styles['scroll_arrow']} ${atEnd || !isScrollable ? styles['scroll_arrow_hidden'] : ''}`}
						onClick={() => scrollRight()}
					>
						{/* Left arrow SVG */}
						<div className={styles['category_arrow_svg_wrapper']}>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
								<path d="M8 4l6 6-6 6" />
							</svg>
						</div>
					</button>
					
				</div>

			</div>


        <div className={styles['masonry']} ref={masonryRef}>
			{columns.map((column, colIndex) => (
				<div key={colIndex} className={styles['column']}>
					{column.map((image, index) => {
						// Check if this is the last image in the overall discoveryImages array
						const isLastImage = discoveryImages.indexOf(image) === lastImageIndex;
						return (
							<DiscoveryImage
								key={index}
								image={image}
								ref={isLastImage ? lastImageRef : null}
								onImageClick={() => openModalWithImage(image)}
								columnWidth={columnWidth}
								toggleFavorite={() => {
									if (!session?.user?.id) {
										openLoginModal();
										return;
									}
									if (session?.user?.id && image.res_image) {
										toggleFavoriteGalleryImage(image._id, session.user.id, image.res_image);
									}
								}}
								updateImages={updateImageContext}
								generateSimilar={() => {
									if (!session?.user?.id) {
										openLoginModal();
										return;
									}
									if (session?.user?.id) {
										router.push('ai-generator');
										handleGenerateSimilar(image);
									}
								}}
							/>
						);
					})}
				</div>
			))}
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
									{!isMobile && currentIndex !== null && currentIndex < discoveryImages.length - 1 && (
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
												
												{/* <Button 
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
												</Button> */}
												{/* <Button 
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
												</Button> */}
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
											{/* {selectedImage?.pipeline === 'Advanced' && (
												<>
													<label className={`${styles['image_label']} ${styles['negative-prompt-modal']}`}>
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-plus "><path d="M11 12H3"></path><path d="M16 6H3"></path><path d="M16 18H3"></path><path d="M18 9v6"></path><path d="M21 12h-6"></path></svg>
														Negative prompt
													</label>
													<div className={styles['modal-prompt-text']}>{selectedImage?.neg_prompt}</div>
												</>
											)} */}
											
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
											{/* <li className={styles['image_param']}>
												<b className={styles['image_label']}>
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit "><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"></path><path d="M16 8V5c0-1.1.9-2 2-2"></path><path d="M12 13h4"></path><path d="M12 18h6a2 2 0 0 1 2 2v1"></path><path d="M12 8h8"></path><path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path></svg>
													Pipeline
												</b>
												<p className={styles['image_value']}>
													{selectedImage?.pipeline}
												</p>
											</li> */}
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
													{/* <li className={styles['image_param']}>
														<b className={styles['image_label']}>
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dices "><rect width="12" height="12" x="2" y="10" rx="2" ry="2"></rect><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"></path><path d="M6 18h.01"></path><path d="M10 14h.01"></path><path d="M15 6h.01"></path><path d="M18 9h.01"></path></svg>
															Cfg
														</b>
														<p className={styles['image_value']}>
															{selectedImage?.cfg}
														</p>
													</li> */}
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
													{/* <li className={styles['image_param']}>
														<b className={styles['image_label']}>
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-git-commit-horizontal "><circle cx="12" cy="12" r="3"></circle><line x1="3" x2="9" y1="12" y2="12"></line><line x1="15" x2="21" y1="12" y2="12"></line></svg>
															Steps
														</b>
														<p className={styles['image_value']}>
															{selectedImage?.steps}
														</p>
													</li> */}
													{/* <li className={styles['image_param']}>
														<b className={styles['image_label']}>
															<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-horizontal-justify-start "><rect width="6" height="14" x="6" y="5" rx="2"></rect><rect width="6" height="10" x="16" y="7" rx="2"></rect><path d="M2 2v20"></path></svg>
															Denoise
														</b>
														<p className={styles['image_value']}>
															{selectedImage?.denoise}
														</p>
													</li> */}
												</>
											)}
										</ul>
										
										<div className={styles['discovery_image_btn_wrapper']}>
											<div className={styles['discovery_image_btn_clone_wrapper']}>
												<button 
													className={`${styles['discovery_image_btn']}  ${styles['discovery_image_btn_like']}`}
													onClick={async (e) => {
														e.stopPropagation();
														if (session?.user?.id && selectedImage && selectedImage.res_image) {
															toggleFavoriteGalleryImage(selectedImage._id, session.user.id, selectedImage.res_image);
														}
														if (selectedImage) {
															await toggleFavoriteGalleryImage(selectedImage?._id, selectedImage?.userId, selectedImage?.res_image)
														}
														await updateImageContext();
													}}
												>
													{/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20 " viewBox="0 0 24 24" fill={image.favorite ? "red" : "none"} stroke={image.favorite ? "red" : "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart "><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg> */}
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20 " viewBox="0 0 24 24" fill={isImageFavorite ? "red" : "none"} stroke={isImageFavorite ? "red" : "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart "><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
													<div className={styles['discovery_like_count_wrapper']}>
														<div className={styles['discovery_like_count']}>{selectedImage?.gallery_image_likes}</div>
													</div>
												</button>
												<button 
													className={styles['discovery_image_btn_clone']}
													onClick={async () => {
														// console.log("Generate Similar");
														if (!session?.user?.id) {
															openLoginModal();
															return;
														}
														if (session?.user?.id && selectedImage) {
															await handleGenerateSimilar(selectedImage);
															await updateImageContext();
														} else {
														console.error("No image selected");
														}
													}}
												>
													Clone & Try
												</button>
											</div>
										</div>

									</div>
									
								</div>
							)}
						</ModalContent>
					</Modal>
				</div>
			</div>

			<div 
				className={`${styles['filters__overlay']} ${!isFiltersModalOpen ? 'hidden' : ''}`} 
				// onTouchStart={handleTouchStart}
        		// onTouchMove={handleTouchMove}
        		// onTouchEnd={handleTouchEnd}
			>
				<div className={styles['filters__modal']}>
					<Modal 
						backdrop="blur" 
						isOpen={isFiltersModalOpen} 
						onClose={closeFiltersModal} 
						size="sm"
						placement="center"
						className={styles['filters_modal__inner']}
					>
						<ModalContent>
							<h2 className={styles['filter_modal_title']}>
								<svg viewBox="0 0 14 14" focusable="false"><path d="M0.333313 2.33331C0.333313 1.96531 0.63198 1.66665 0.99998 1.66665H3.66665V0.99998C3.66665 0.63198 3.96531 0.333313 4.33331 0.333313C4.70131 0.333313 4.99998 0.63198 4.99998 0.99998V3.66665C4.99998 4.03465 4.70131 4.33331 4.33331 4.33331C3.96531 4.33331 3.66665 4.03465 3.66665 3.66665V2.99998H0.99998C0.63198 2.99998 0.333313 2.70131 0.333313 2.33331ZM6.99998 2.99998H13C13.368 2.99998 13.6666 2.70131 13.6666 2.33331C13.6666 1.96531 13.368 1.66665 13 1.66665H6.99998C6.63198 1.66665 6.33331 1.96531 6.33331 2.33331C6.33331 2.70131 6.63198 2.99998 6.99998 2.99998ZM0.99998 7.66665H6.99998C7.36798 7.66665 7.66665 7.36798 7.66665 6.99998C7.66665 6.63198 7.36798 6.33331 6.99998 6.33331H0.99998C0.63198 6.33331 0.333313 6.63198 0.333313 6.99998C0.333313 7.36798 0.63198 7.66665 0.99998 7.66665ZM13 6.33331H10.3333V5.66665C10.3333 5.29865 10.0346 4.99998 9.66665 4.99998C9.29865 4.99998 8.99998 5.29865 8.99998 5.66665V8.33331C8.99998 8.70131 9.29865 8.99998 9.66665 8.99998C10.0346 8.99998 10.3333 8.70131 10.3333 8.33331V7.66665H13C13.368 7.66665 13.6666 7.36798 13.6666 6.99998C13.6666 6.63198 13.368 6.33331 13 6.33331ZM4.33331 9.66665C3.96531 9.66665 3.66665 9.96531 3.66665 10.3333V11H0.99998C0.63198 11 0.333313 11.2986 0.333313 11.6666C0.333313 12.0346 0.63198 12.3333 0.99998 12.3333H3.66665V13C3.66665 13.368 3.96531 13.6666 4.33331 13.6666C4.70131 13.6666 4.99998 13.368 4.99998 13V10.3333C4.99998 9.96531 4.70131 9.66665 4.33331 9.66665ZM13 11H6.99998C6.63198 11 6.33331 11.2986 6.33331 11.6666C6.33331 12.0346 6.63198 12.3333 6.99998 12.3333H13C13.368 12.3333 13.6666 12.0346 13.6666 11.6666C13.6666 11.2986 13.368 11 13 11Z" fill="white"></path></svg>
								Filters
							</h2>
							<div className={styles['filters_container']}>
								<button
									className={`${styles['filters_category_btn']} ${filterType === 'newest' ? styles['filters_category_btn_active'] : ''}`}
									onClick={(e) => {
										// handleFilterSelect('newest')
										e.stopPropagation();
										handleFilterSelect('all');
                                		handleSortBySelect('newest');
									}}
								>
									<svg viewBox="0 0 16 16" focusable="false" aria-hidden="true"><path d="M9.66406 4.01562L11 3.5L11.4922 2.1875C11.5156 2.07031 11.6328 2 11.75 2C11.8438 2 11.9609 2.07031 11.9844 2.1875L12.5 3.5L13.8125 4.01562C13.9297 4.03906 14 4.15625 14 4.25C14 4.36719 13.9297 4.48438 13.8125 4.50781L12.5 5L11.9844 6.33594C11.9609 6.42969 11.8438 6.5 11.75 6.5C11.6328 6.5 11.5156 6.42969 11.4922 6.33594L11 5L9.66406 4.50781C9.54688 4.48438 9.5 4.36719 9.5 4.25C9.5 4.15625 9.54688 4.03906 9.66406 4.01562ZM6.125 3.73438C6.17188 3.59375 6.3125 3.5 6.45312 3.5C6.59375 3.5 6.73438 3.59375 6.80469 3.73438L8.02344 6.40625L10.6953 7.625C10.8359 7.69531 10.9297 7.83594 10.9297 7.97656C10.9297 8.11719 10.8359 8.25781 10.6953 8.32812L8.02344 9.54688L6.80469 12.2188C6.73438 12.3594 6.59375 12.4531 6.45312 12.4531C6.3125 12.4531 6.17188 12.3594 6.125 12.2188L4.88281 9.54688L2.21094 8.32812C2.07031 8.25781 2 8.11719 2 7.97656C2 7.83594 2.07031 7.69531 2.21094 7.625L4.88281 6.40625L6.125 3.73438ZM5.89062 6.875C5.79688 7.10938 5.58594 7.32031 5.35156 7.41406L4.15625 7.97656L5.35156 8.53906C5.58594 8.63281 5.79688 8.84375 5.89062 9.07812L6.45312 10.2734L7.01562 9.07812C7.10938 8.84375 7.32031 8.63281 7.55469 8.53906L8.75 7.97656L7.55469 7.41406C7.32031 7.32031 7.10938 7.10938 7.01562 6.875L6.45312 5.67969L5.89062 6.875ZM11.4922 9.6875C11.5156 9.57031 11.6328 9.5 11.75 9.5C11.8438 9.5 11.9609 9.57031 11.9844 9.6875L12.5 11L13.8125 11.5156C13.9297 11.5391 14 11.6562 14 11.75C14 11.8672 13.9297 11.9844 13.8125 12.0078L12.5 12.5L11.9844 13.8359C11.9609 13.9297 11.8438 14 11.75 14C11.6328 14 11.5156 13.9297 11.4922 13.8359L11 12.5L9.66406 12.0078C9.54688 11.9844 9.5 11.8672 9.5 11.75C9.5 11.6562 9.54688 11.5391 9.66406 11.5156L11 11L11.4922 9.6875Z" fill="currentColor"></path></svg>
									New
								</button>
								<button
									className={`${styles['filters_category_btn']} ${filterType === 'popular' ? styles['filters_category_btn_active'] : ''}`}
									onClick={(e) => {
										e.stopPropagation();
										// handleFilterSelect('popular');
										handleFilterSelect('mostLiked');
										handleSortBySelect('likes');
									}}
								>
									<svg viewBox="0 0 16 16" focusable="false" aria-hidden="true"><path d="M9.66406 4.01562L11 3.5L11.4922 2.1875C11.5156 2.07031 11.6328 2 11.75 2C11.8438 2 11.9609 2.07031 11.9844 2.1875L12.5 3.5L13.8125 4.01562C13.9297 4.03906 14 4.15625 14 4.25C14 4.36719 13.9297 4.48438 13.8125 4.50781L12.5 5L11.9844 6.33594C11.9609 6.42969 11.8438 6.5 11.75 6.5C11.6328 6.5 11.5156 6.42969 11.4922 6.33594L11 5L9.66406 4.50781C9.54688 4.48438 9.5 4.36719 9.5 4.25C9.5 4.15625 9.54688 4.03906 9.66406 4.01562ZM6.125 3.73438C6.17188 3.59375 6.3125 3.5 6.45312 3.5C6.59375 3.5 6.73438 3.59375 6.80469 3.73438L8.02344 6.40625L10.6953 7.625C10.8359 7.69531 10.9297 7.83594 10.9297 7.97656C10.9297 8.11719 10.8359 8.25781 10.6953 8.32812L8.02344 9.54688L6.80469 12.2188C6.73438 12.3594 6.59375 12.4531 6.45312 12.4531C6.3125 12.4531 6.17188 12.3594 6.125 12.2188L4.88281 9.54688L2.21094 8.32812C2.07031 8.25781 2 8.11719 2 7.97656C2 7.83594 2.07031 7.69531 2.21094 7.625L4.88281 6.40625L6.125 3.73438ZM5.89062 6.875C5.79688 7.10938 5.58594 7.32031 5.35156 7.41406L4.15625 7.97656L5.35156 8.53906C5.58594 8.63281 5.79688 8.84375 5.89062 9.07812L6.45312 10.2734L7.01562 9.07812C7.10938 8.84375 7.32031 8.63281 7.55469 8.53906L8.75 7.97656L7.55469 7.41406C7.32031 7.32031 7.10938 7.10938 7.01562 6.875L6.45312 5.67969L5.89062 6.875ZM11.4922 9.6875C11.5156 9.57031 11.6328 9.5 11.75 9.5C11.8438 9.5 11.9609 9.57031 11.9844 9.6875L12.5 11L13.8125 11.5156C13.9297 11.5391 14 11.6562 14 11.75C14 11.8672 13.9297 11.9844 13.8125 12.0078L12.5 12.5L11.9844 13.8359C11.9609 13.9297 11.8438 14 11.75 14C11.6328 14 11.5156 13.9297 11.4922 13.8359L11 12.5L9.66406 12.0078C9.54688 11.9844 9.5 11.8672 9.5 11.75C9.5 11.6562 9.54688 11.5391 9.66406 11.5156L11 11L11.4922 9.6875Z" fill="currentColor"></path></svg>
									Most Popular
								</button>
								<button
									className={`${styles['filters_category_btn']} ${filterType === 'following' ? styles['filters_category_btn_active'] : ''}`}
									onClick={(e) => {
										e.stopPropagation();
										// handleFilterSelect('following');
										handleFilterSelect('favorites');
										handleSortBySelect('newest');
									}}
								>
									<svg viewBox="-2 -4 20 20" focusable="false" className="chakra-icon css-onymcf" aria-hidden="true"><path d="M9.00014 16.125C8.9118 16.125 8.82344 16.1067 8.74094 16.0692C8.46844 15.945 2.05514 12.9708 1.02681 7.67418C0.629309 5.62501 1.02848 3.62583 2.09431 2.3275C2.95681 1.27583 4.19678 0.71665 5.68094 0.70915C5.68844 0.70915 5.69594 0.70915 5.70261 0.70915C7.39594 0.70915 8.42849 1.67334 8.99932 2.49417C9.57266 1.67001 10.6134 0.70165 12.3176 0.70915C13.8026 0.71665 15.0434 1.27583 15.9068 2.3275C16.9709 3.625 17.3693 5.62416 16.9709 7.67499C15.9443 12.9717 9.5301 15.9467 9.2576 16.07C9.17677 16.1067 9.08847 16.125 9.00014 16.125ZM5.7018 1.95834C5.6968 1.95834 5.69266 1.95834 5.68766 1.95834C4.57266 1.96334 3.68934 2.35415 3.06101 3.11999C2.22851 4.13415 1.92766 5.7475 2.25433 7.43583C3.05016 11.5392 7.82764 14.2058 9.00014 14.8042C10.1726 14.2058 14.9501 11.5392 15.7451 7.43583C16.0735 5.74667 15.7726 4.13332 14.9418 3.11999C14.3135 2.35499 13.4301 1.96498 12.3126 1.95915C12.3076 1.95915 12.3026 1.95915 12.2985 1.95915C10.3218 1.95915 9.62102 3.94001 9.59269 4.02417C9.50602 4.27667 9.26762 4.44832 9.00095 4.44832C8.99928 4.44832 8.99843 4.44832 8.99759 4.44832C8.73009 4.44748 8.49177 4.27666 8.40677 4.02249C8.37927 3.93916 7.67763 1.95834 5.7018 1.95834Z" fill="currentColor"></path></svg>
									Following
								</button>
							</div>

							{/* Buttons for Reset and Apply */}
							<div className={styles['filter_modal_buttons']}>
								<button onClick={resetFilters} className={styles['reset_button']}>Reset Filters</button>
								<button onClick={closeFiltersModal} className={styles['apply_button']}>Apply</button>
							</div>
						</ModalContent>
					</Modal>
				</div>
			</div>

			<LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} order="reverse"/>

        </div>
    );
};

export default Discover;