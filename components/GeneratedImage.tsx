import { Logo } from "./icons";
import React, { useState, useRef, useEffect, forwardRef } from 'react';
import styles from '@/styles/Buttons.module.css'
import {Tabs, Tab, Textarea, Divider, Breadcrumbs, BreadcrumbItem, Accordion, AccordionItem, Slider, Image, Tooltip, Button, Link} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";
import { ImageData } from "@/context/page";
import { signIn, signOut, useSession } from "next-auth/react";


const USER_IMAGES_URL = process.env.NEXT_PUBLIC_USER_IMAGES_URL!;
const USER_IMAGES_URL_DOWNLOAD = process.env.NEXT_PUBLIC_USER_IMAGES_URL_DOWNLOAD!;

interface GeneratedImageProps {
    image: ImageData;
    onImageClick: () => void;
    columnWidth: number;
    deleteImage: () => void;
    toggleFavorite: () => void;
    updateImages: () => void;
    reusePrompt: () => void;
    generateSimilar: () => void;
    reuseImage: () => void;
    openFaceLock:  () => void;
}

const GeneratedImage = forwardRef<HTMLDivElement, GeneratedImageProps>(({
    image,
    onImageClick,
    columnWidth,
    deleteImage,
    toggleFavorite,
    updateImages,
    reusePrompt,
    generateSimilar,
    reuseImage,
    openFaceLock
}, ref) => {

    GeneratedImage.displayName = 'GeneratedImage';
    
    const [isGenerateOpen, setIsGenerateOpen] = useState(false);
    const [isReuseOpen, setIsReuseOpen] = useState(false);
    const [isActionOpen, setIsActionOpen] = useState(false);
    const [isHoveringOverActions, setIsHoveringOverActions] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const { data: session, status, update } = useSession();

    const updateMedia = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    });


    const handleToggleActions = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsActionOpen(!isActionOpen);
        setIsGenerateOpen(false);
        setIsReuseOpen(false);
    };

    const handleMouseLeave = () => {
        if (isActionOpen) {
            setIsActionOpen(false);
        }
    };

    const handleActionButtonClicked = () => {
        setIsActionOpen(false);
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        // Additional logic here
    };

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const img = imgRef.current;
        if (img) {
            const aspectRatio = img.naturalHeight / img.naturalWidth;
            const columnSpan = aspectRatio > 1 ? 2 : 1; // Adjust span based on aspect ratio
            img.parentElement!.style.gridRow = `span ${Math.ceil(aspectRatio)}`;
        }
    }, [session]);

    return (
        <div 
            className={styles['image-container']} 
            style={image.res_image === null ? { height: `${columnWidth}px` } : {}}
            onClick={onImageClick} 
            onMouseEnter={() => setIsHoveringOverActions(true)}
            onMouseLeave={() => {
                setIsHoveringOverActions(false)
                handleMouseLeave()
            }}
            ref={ref}
        >
            {image.res_image === null ? (
                <Spinner className={styles['image_spinner']}/>
                // <Spinner className={styles['image']}/>
            ) : (
                <img src={`${USER_IMAGES_URL}${image.res_image}`} alt="Generated" className={styles['image']} />
            )}
            <div 
                className={`${styles['image_img_hover']}`} 
                style={{ display: (isMobile || isHoveringOverActions || isActionOpen) ? 'block' : 'none' }}
            >
                <div className={styles['img-button-group-wrapper']}>
                    <div className={styles['image_img_hover_row']}>
                        <div className={styles['image_btn_group']}>
                            <Tooltip
                                key={'like-btn'}
                                placement={'bottom-start'}
                                className={`${styles['tooltip_content']}  ${styles['empty_tooltip_content']}`}
                            >
                                <button 
                                    className={styles['image_btn']}
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        // console.log('Like button clicked');
                                        await toggleFavorite();
                                        await updateImages();
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20 " viewBox="0 0 24 24" fill={image.favorite ? "red" : "none"} stroke={image.favorite ? "red" : "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart "><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                                </button>
                            </Tooltip>
                            <Tooltip
                                key={'generate-btn'}
                                placement={'bottom-start'}
                                content={'Generate similar'}
                                isOpen={isGenerateOpen}
                                className={`${styles['tooltip_content']}`}
                            >
                                <button 
                                    className={styles['image_btn']}
                                    onMouseEnter={() => setIsGenerateOpen(true)}
                                    onMouseLeave={() => setIsGenerateOpen(false)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsGenerateOpen(!isGenerateOpen)
                                        // console.log('Generate button clicked');
                                        generateSimilar();
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-repeat "><path d="m17 2 4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path></svg>
                                </button>
                            </Tooltip>
                            <Tooltip
                                key={'reuse-btn'}
                                placement={'bottom-start'}
                                content={'Use as init image'}
                                className={`${styles['tooltip_content']}`}
                                isOpen={isReuseOpen}
                            >
                                <button 
                                    className={styles['image_btn']}
                                    onMouseEnter={() => setIsReuseOpen(true)}
                                    onMouseLeave={() => setIsReuseOpen(false)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsReuseOpen(!isReuseOpen)
                                        // console.log('Reuse button clicked');
                                        reuseImage();
                                        openFaceLock();
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-plus "><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path><line x1="16" x2="22" y1="5" y2="5"></line><line x1="19" x2="19" y1="2" y2="8"></line><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                                </button>
                            </Tooltip>
                            <Tooltip
                                key={'delete-btn'}
                                placement={'bottom-start'}
                                className={`${styles['tooltip_content']} ${styles['empty_tooltip_content']}`}
                            >
                                <button 
                                    className={styles['image_btn']}
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        await deleteImage();
                                        await updateImages();
                                    }}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 "><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                            </button>
                            </Tooltip>
                        </div>
                        <Tooltip
                                key={'actions-btn'}
                                placement={'bottom-end'}
                                className={`${styles['actions_tooltip_content']}`}
                                isOpen={isActionOpen}
                                content={
                                    <div 
                                        className={styles['image_actions']}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <a 
                                            className={styles['image_actions_btn']} 
                                            href={image.res_image ? `${USER_IMAGES_URL_DOWNLOAD}${image.res_image}` : '#'}
                                            download={image.res_image ? image.res_image.split('/').pop() : ''}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // console.log('Download button clicked');
                                                handleActionButtonClicked()
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download "><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                                            Download
                                        </a>
                                        <button 
                                            className={styles['image_actions_btn']}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // console.log('Generate button clicked');
                                                handleActionButtonClicked();
                                                generateSimilar();
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-repeat "><path d="m17 2 4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path></svg>
                                            Generate similiar
                                        </button>
                                        <button 
                                            className={styles['image_actions_btn']}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // console.log('Init button clicked');
                                                handleActionButtonClicked();
                                                reuseImage();
                                                openFaceLock();
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-plus "><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path><line x1="16" x2="22" y1="5" y2="5"></line><line x1="19" x2="19" y1="2" y2="8"></line><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                                            Use as init image
                                        </button>
                                        <button 
                                            className={styles['image_actions_btn']}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // console.log('Reuse prompt button clicked');
                                                handleActionButtonClicked()
                                                reusePrompt();
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alarge-small "><path d="M21 14h-5"></path><path d="M16 16v-3.5a2.5 2.5 0 0 1 5 0V16"></path><path d="M4.5 13h6"></path><path d="m3 16 4.5-9 4.5 9"></path></svg>
                                            Reuse prompt
                                        </button>
                                        {/* <button 
                                            className={styles['image_actions_btn']}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log('Reuse seed button clicked');
                                                handleActionButtonClicked()
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dices "><rect width="12" height="12" x="2" y="10" rx="2" ry="2"></rect><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"></path><path d="M6 18h.01"></path><path d="M10 14h.01"></path><path d="M15 6h.01"></path><path d="M18 9h.01"></path></svg>
                                            Reuse seed
                                        </button> */}
                                        {/* <button 
                                            className={styles['image_actions_btn']}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log('Upscale button clicked');
                                                handleActionButtonClicked()
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-up "><path d="m17 11-5-5-5 5"></path><path d="m17 18-5-5-5 5"></path></svg>
                                            Upscale x4
                                        </button> */}
                                        <button 
                                            className={styles['image_actions_btn']}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // console.log('Details button clicked');
                                                handleActionButtonClicked();
                                                onImageClick();
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-maximize "><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>
                                            View details
                                        </button>
                                        <button 
                                            className={styles['image_actions_btn']} 
                                            onClick={async (e) => {
                                                handleButtonClick(e);
                                                // console.log("image", image._id)
                                                await deleteImage();
                                                await updateImages();
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 "><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                                            Delete
                                        </button>
                                    </div>
                                }
                                color="default"
                            >
                                <button 
                                    className={styles['image_btn']}
                                    onClick={handleToggleActions}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-horizontal "><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                </button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
});
  
  export default GeneratedImage;