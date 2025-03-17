"use client";
import React, { useEffect, useState, useRef } from "react";
import { title } from "@/components/primitives";
import styles from '@/styles/Gallery.module.css';
import GalleryImage from "@/components/GalleryImage";
import {Tabs, Tab, Textarea, Divider, Breadcrumbs, BreadcrumbItem, Accordion, AccordionItem, Slider, Tooltip, Button, Link, Input, Checkbox} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useImageContext, ImageData } from "@/context/page";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useActionContext, ActionState } from "@/context/page";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface Resolution {
    [key: string]: string;
}

const USER_IMAGES_URL = process.env.NEXT_PUBLIC_USER_IMAGES_URL!;
const USER_IMAGES_URL_DOWNLOAD = process.env.NEXT_PUBLIC_USER_IMAGES_URL_DOWNLOAD!;

export default function Gallery() {
	const { data: session, status, update } = useSession();

	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
		//   console.log("No user session");
		  router.push('/');
		}
	}, [status, router]);

	const { userImages, setUserImages } = useImageContext();
	const [hasMoreImages, setHasMoreImages] = useState(true);
	const { userAction, setUserAction } = useActionContext();

    const [displayedImages, setDisplayedImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const [userPrompt, setUserPrompt] = useState<string>("");
    const [negativePrompt, setNegativePrompt] = useState<string>("");
    const [selectedResolution, setSelectedResolution] = useState("2:3");
    const [currentStyle, setCurrentStyle] = useState("Artistic");
    const [advancedImage, setAdvancedImage] = useState<boolean>(true);
	const [selectionMode, setSelectionMode] = useState(false);
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [selectedFilter, setSelectedFilter] = useState("Newest first");



	const [selectedTab, setSelectedTab] = useState('All');

	const filters = [
		{label: "Newest first", value: "Newest first", description: ""},
		{label: "Oldest first", value: "Oldest first", description: ""},
	]

	const toggleSelectionMode = () => {
        setSelectionMode(true);
    };

	const cancelSelectionMode = () => {
		setSelectedImages([]);
        setSelectionMode(false);
    };

	const handleTabChange = (key: React.Key) => {
        if (typeof key === 'string') {
            setSelectedTab(key);
        }
    };

	const filteredImages = userImages.filter(image => {
        if (selectedTab === 'Liked') {
            return image.favorite;
        }
        return true;
    });
    
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});

	
	const masonryRef = useRef<HTMLDivElement>(null);
	const lastImageRef = useRef<HTMLDivElement | null>(null);
	
	const [columns, setColumns] = useState<ImageData[][]>([]);
	const [isLastImageInView, setIsLastImageInView] = useState(false);
	const lastImageIndex = userImages.length - 1;


	const getFilteredAndSortedImages = (): ImageData[] => {
        let filteredImages = userImages;

        if (selectedTab === 'Liked') {
            filteredImages = filteredImages.filter(image => image.favorite);
        }

        if (selectedFilter === "Newest first") {
            filteredImages = filteredImages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else {
            filteredImages = filteredImages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }

        return filteredImages;
    };
	
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

    // Update columns when the component mounts or when the userImages, selectedTab, or selectedFilter change
    useEffect(() => {
        const numColumns = getNumberOfColumns();
        const filteredAndSortedImages = getFilteredAndSortedImages();
        setColumns(createColumns(filteredAndSortedImages, numColumns));
    }, [userImages, selectedTab, selectedFilter]);

    // Handle screen resize to recalculate columns
    useEffect(() => {
        const handleResize = () => {
            const numColumns = getNumberOfColumns();
            const filteredAndSortedImages = getFilteredAndSortedImages();
            setColumns(createColumns(filteredAndSortedImages, numColumns));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [userImages, selectedTab, selectedFilter]);

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
	}, [isLastImageInView, hasMoreImages, selectedTab]);  // Trigger on visibility change

	useEffect(() => {
		fetchImages(userImages.length).then(fetchedImages => {
			setUserImages(fetchedImages);
		}).catch(error => {
			console.error('Error fetching user images:', error);
		});
	}, [session?.user.id]);

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
	
			return deleteResult;  // Optional: return result for further processing if needed
		} catch (error) {
			console.error("Failed to delete image:", error);
		}
	}
	
	async function deleteSelectedImages() {
		try {
			if (selectedImages.length === 0) {
				toast.warn('No images selected.', {
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

			for (const imageId of selectedImages) {
				await deleteImage(imageId);
			}
			setSelectedImages([]);
			await updateImageContext();
		} catch (error) {
			console.error("Failed to delete selected images:", error);
		}
	}

	async function downloadSelectedImagesAsZip() {
		if (selectedImages.length === 0) {
			toast.warn('No images selected.', {
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
	
		const zip = new JSZip();
		const folder = zip.folder('images');
	
		if (!folder) {
			console.error('Failed to create folder in zip');
			return;
		}
	
		for (const imageId of selectedImages) {
			const image = userImages.find(img => img._id === imageId);
			if (image) {
				const response = await fetch(`${USER_IMAGES_URL_DOWNLOAD}${image.res_image}`);
				const blob = await response.blob();
				folder.file(`${image.res_image.split('/').pop()}`, blob);
			}
		}
	
		const content = await zip.generateAsync({ type: 'blob' });
		saveAs(content, 'images.zip');
	}
	

	const toggleFavorite = async (
		imageId: string,
		userId: string,
		res_image: string
	) => {
        try {
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

	let fetchTimeoutId: number | null = null;

	const updateImageContext = async () => {
		const fetchedImages = await fetchImages(userImages.length);
		setUserImages(fetchedImages);
		// console.log("Images updated", userImages);
	}

	// useEffect(() => {
	// 	startImageFetcher();
	//   }, [status]);

	const startImageFetcher = async () => {
		const fetchedImages = await fetchImages(userImages.length);
		if (fetchedImages.every(img => img.res_image !== null)) {
			// All images are loaded, no null found, stop fetching
			stopImageFetcher();
		} else {
			// If there are still images with null, schedule the next check
			scheduleNextFetch();
		}
		setUserImages(fetchedImages);
	};

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

	const openCreatingPageWithParams = (functionName: string, imageId: string) => {
        setUserAction({functionName, imageId})
		// console.log('userAction', userAction)
        router.push("/ai-generator");
    };

	// Add the following function to handle image selection
	const handleImageSelect = (imageId: string) => {
		if (selectionMode) {
			setSelectedImages((prevSelectedImages) => {
				if (prevSelectedImages.includes(imageId)) {
					// Remove the image from the selection
					return prevSelectedImages.filter((id) => id !== imageId);
				} else {
					// Add the image to the selection
					return [...prevSelectedImages, imageId];
				}
			});
		}
	};

	const handleFilterChange = (value: string) => {
		setSelectedFilter(value);
	};
	
	const sortedImages = filteredImages.sort((a, b) => {
		if (selectedFilter === "Newest first") {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		} else {
			return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
		}
	});

    const {
        isOpen: isImagetModalOpen,
        onOpen: openImageModal,
        onClose: closeModal
    } = useDisclosure();

    const openModalWithImage = (image: ImageData) => {
		const index = filteredImages.findIndex(img => img._id === image._id);
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
			setSelectedImage(filteredImages[newIndex]);
			setCurrentIndex(newIndex);
		}
	};
	
	const showNextImage = () => {
		// console.log("showNextImage")
		if (currentIndex !== null && currentIndex < filteredImages.length - 1) {
			const newIndex = currentIndex + 1;
			setSelectedImage(filteredImages[newIndex]);
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
	}, [currentIndex, filteredImages, isImagetModalOpen]);

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
		<div className={styles['gallery_image_grid_outer']}>
			<div className={styles['gallery_image_images']} id="images">
				<div className={styles['gallery_head']}>
					<div className={styles['gallery_head_inner']}>
							<div className={`${styles['gallery_form_btns']} ${styles['gallery_form_left']}`}>
								<div className={styles['gallery_button_group']}>
									{selectionMode ? (
										<Button 
											size="sm"
											radius="sm"
											color="danger"
											aria-label="Cancel selection"
											className={`${styles['gallery_button']} ${styles['gallery_button_select']}`}
											onClick={(e) => {
												e.preventDefault();
												cancelSelectionMode();
											}}
											startContent={
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mouse-pointer-click">
												<path d="m9 9 5 12 1.8-5.2L21 14Z"></path>
												<path d="M7.2 2.2 8 5.1"></path>
												<path d="m5.1 8-2.9-.8"></path>
												<path d="M14 4.1 12 6"></path>
												<path d="m6 12-1.9 2"></path>
											</svg>
											}
										>										
											Cancel
										</Button>
									) : (
										<Button 
											size="sm"
											radius="sm"
											aria-label="Select images"
											className={`${styles['gallery_button']} ${styles['gallery_button_select']}`}
											onClick={(e) => {
												e.preventDefault();
												toggleSelectionMode();
											}}
											startContent={
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mouse-pointer-click">
												<path d="m9 9 5 12 1.8-5.2L21 14Z"></path>
												<path d="M7.2 2.2 8 5.1"></path>
												<path d="m5.1 8-2.9-.8"></path>
												<path d="M14 4.1 12 6"></path>
												<path d="m6 12-1.9 2"></path>
											</svg>
											}
										>										
											Select
										</Button>
									)}

									{selectionMode && (
											<Button 
												radius="sm"
												size="sm"
												aria-label="Delete this image" 
												className={`${styles['gallery_button']} ${styles['gallery_button_select']}`}
												onClick={async (e) => {
													e.preventDefault();
													await deleteSelectedImages(); // Call the function to delete selected images
												}}
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 "><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
												}
											>
												Delete
											</Button>
									)}
									{selectionMode && (
											<Button 
												radius="sm"
												size="sm"
												aria-label="Download this image" 
												className={`${styles['gallery_button']} ${styles['gallery_button_select']}`}
												onClick={async (e) => {
													e.preventDefault();
													await downloadSelectedImagesAsZip();
													cancelSelectionMode();
												}}
												startContent={
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download "><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
												}
											>
												Download
											</Button>
									)}
								</div>
							</div>
							<div className={styles['gallery_head_options_wrapper']}>
								<div className={styles['gallery_head_options']}>
									<Select 
										size="sm"
										placeholder="Filter"
										onChange={(e) => handleFilterChange(e.target.value)}
                    					value={selectedFilter}
									>
										{filters.map((filters) => (
										<SelectItem  key={filters.value} value={filters.value}>
											{filters.label}
										</SelectItem>
										))}
									</Select>
								</div>
								<div>
									<Tabs 
										className={styles['gallery_head_tabs']} 
										aria-label="Options" 
										color="default" 
										variant="bordered" 
										size="sm"
										onSelectionChange={handleTabChange}
									>
										<Tab
										key="All"
										title={
											<div className="flex items-center space-x-2">
												<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gallery-horizontal-end "><path d="M2 7v10"></path><path d="M6 5v14"></path><rect width="12" height="18" x="10" y="3" rx="2"></rect></svg>
											<span>All</span>
											</div>
										}
										/>
										<Tab
										key="Liked"
										title={
											<div className="flex items-center space-x-2">
												<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart "><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
											<span>Liked</span>
											</div>
										}
										/>
										{/* <Tab
										key="Enhanced"
										title={
											<div className="flex items-center space-x-2">
												<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-up "><path d="m17 11-5-5-5 5"></path><path d="m17 18-5-5-5 5"></path></svg>
											<span>Enhanced</span>
											</div>
										}
										/> */}
									</Tabs>
								</div>
							</div>
					</div>
				</div>

				<div className={styles['ai-generator_images']} id="images">
					<div className={styles['masonry']} ref={masonryRef}>
						{columns.map((column, colIndex) => (
							<div key={colIndex} className={styles['column']}>
								{column.map((image, index) => {
									// Check if this is the last image in the overall userImages array
									const isLastImage = userImages.indexOf(image) === userImages.length - 1;
									return (
										<GalleryImage 
											key={index} 
											image={image}
											ref={isLastImage ? lastImageRef : null}
											onImageClick={() => {
												if (!selectionMode) {
													openModalWithImage(image);
												} else {
													handleImageSelect(image._id);
												}
											}}
											updateImages={updateImageContext}
											isSelected={selectedImages.includes(image._id)} // Pass the selection state
										/>
									);
								})}
							</div>
						))}
					</div>
				</div>

				{/* <div className={styles['gallery_image_grid']}>
					{filteredImages.map((image, index) => (
						<GalleryImage 
							key={index} 
							image={image}
							columnWidth={columnWidth}
							ref={index === userImages.length - 1 ? lastImageRef : null} 
							onImageClick={() => {
								if (!selectionMode) {
									openModalWithImage(image);
								} else {
									handleImageSelect(image._id);
								}
							}}
							updateImages={updateImageContext}
							isSelected={selectedImages.includes(image._id)} 
						/>
					))}
				</div> */}
			</div>

			<div className={`${styles['image__overlay']} ${!isImagetModalOpen ? 'hidden' : ''}`}>
				<div className={styles['image__modal']}>
					<Modal 
						backdrop="blur" 
						isOpen={isImagetModalOpen} 
						onClose={closeImageModal} 
						size="5xl"
						placement="center"
						className={styles['image_modal__inner']}
					>
						<ModalContent>
							{(closeImageModal) => (
								<div className={styles['image_view']}>
									{!isMobile && currentIndex !== null && currentIndex > 0 && (
									<Button 
										isIconOnly 
										aria-label="Show previous image button" 
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
									{!isMobile && currentIndex !== null && currentIndex < filteredImages.length - 1 && (
										<Button 
										isIconOnly 
										aria-label="Show next image button" 
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
												<Button 
													size="sm"
													aria-label="Like this image" 
													onClick={async () => {
														if (selectedImage?._id) {
															await toggleFavorite(selectedImage?._id, selectedImage?.userId, selectedImage?.res_image);
															await updateImageContext();
														}
												}}
													startContent={
														<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart "><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>													}
												>
													Like
												</Button>
												<a 
													className={styles['image_btn']}
													aria-label="Download image button" 
													href={selectedImage?.res_image ? `${USER_IMAGES_URL_DOWNLOAD}${selectedImage?.res_image}` : '#'}
													download={selectedImage?.res_image ? selectedImage?.res_image.split('/').pop() : ''}
													onClick={(e) => {
														e.stopPropagation();
													}}
												>
													<Button 
														size="sm"
														aria-label="Download this image"
														startContent={
															<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download "><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
														}
													>
														Download
													</Button>
												</a>
												<Button 
													size="sm"
													aria-label="Use image as facelock"
													onClick={() => {
														if (selectedImage?._id) {
															openCreatingPageWithParams('reuseImage', selectedImage?._id)
														}
													}}
													startContent={
														<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link "><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
													}
												>
													FaceLock
												</Button>
												<Button 
													size="sm"
													aria-label="Generate similar image" 
													onClick={() => {
														if (selectedImage?._id) {
															openCreatingPageWithParams('generateSimilar', selectedImage?._id)
														}
													}}
													startContent={
														<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-ccw "><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>
													}
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
														if (selectedImage) {
															copyToClipboard(selectedImage?.prompt)
														}
													}}
												>
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy "><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
													Copy Prompt
												</button>
											</div>
											<div className={styles['modal-prompt-text']}>{selectedImage?.prompt}</div>
											{selectedImage?.pipeline === "Advanced" && (
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
											{/* {advancedImage && (
												<>
													<li className={styles['image_param']}>
														<b className={styles['image_label']}>
															<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-horizontal-justify-start "><rect width="6" height="14" x="6" y="5" rx="2"></rect><rect width="6" height="10" x="16" y="7" rx="2"></rect><path d="M2 2v20"></path></svg>
															Sampler
														</b>
														<p className={styles['image_value']}>
															AdvancedCreator
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
													{/* value from state var */}
													{formattedDate}
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
		</>
	);
}