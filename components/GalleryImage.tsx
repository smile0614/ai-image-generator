import { Logo } from "./icons";
import React, { useState, useRef, useEffect, forwardRef } from 'react';
import styles from '@/styles/Gallery.module.css'
import {Tabs, Tab, Textarea, Divider, Breadcrumbs, BreadcrumbItem, Accordion, AccordionItem, Slider, Image, Tooltip, Button, Link} from "@nextui-org/react";
import { ImageData } from "@/context/page";
import { signIn, signOut, useSession } from "next-auth/react";


interface GalleryImageProps {
    image: ImageData;
    onImageClick: () => void;
    updateImages: () => void;
    isSelected?: boolean;
}

const USER_IMAGES_URL = process.env.NEXT_PUBLIC_USER_IMAGES_URL!;
const USER_IMAGES_URL_DOWNLOAD = process.env.NEXT_PUBLIC_USER_IMAGES_URL_DOWNLOAD!;

const GalleryImage = forwardRef<HTMLDivElement, GalleryImageProps>(({

    image, 
    onImageClick,
    updateImages,
    isSelected
}, ref) => {

    GalleryImage.displayName = 'GalleryImage';

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

    const handleMouseLeave = () => {
        if (isActionOpen) {
            setIsActionOpen(false);
        }
    };

    const handleActionButtonClicked = () => {
        setIsActionOpen(false);
    };

    const toggleFavorite = async () => {
        try {
            const toggleFavoriteResponse = await fetch('/api/image/favorites/toggle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    imageId: image._id,
                    userId: image.userId,
                    res_image: image.res_image
                })
            });
            const toggleData = await toggleFavoriteResponse.json();
            if (toggleData.message !== 'Favorites updated successfully') throw new Error(toggleData.message);
        } catch (error) {
            console.error('Error updating user favorites:', error);
        }
    }

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
        className={`${styles['image-container']} ${isSelected ? styles['selected_image_container'] : ''}`} 
            onClick={onImageClick} 
            onMouseEnter={() => setIsHoveringOverActions(true)}
            onMouseLeave={() => {
                setIsHoveringOverActions(false)
                handleMouseLeave()
            }}
            ref={ref}
        >
            <img src={`${USER_IMAGES_URL}${image.res_image}`} alt="Generated" className={styles['image']} />
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
                                    aria-label="Like this image" 
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
                                aria-label="Download this image" 
                                key={'download-btn'}
                                placement={'bottom-end'}
                                className={`${styles['tooltip_content']}  ${styles['empty_tooltip_content']}`}
                        >
                            <a 
                                className={styles['image_btn']}
                                aria-label="Download this image" 
                                href={image.res_image ? `${USER_IMAGES_URL_DOWNLOAD}${image.res_image}` : '#'}
                                download={image.res_image ? image.res_image.split('/').pop() : ''}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // console.log('Download button clicked');
                                    handleActionButtonClicked()
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download "><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                            </a>
                        </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  });
  
  export default GalleryImage;