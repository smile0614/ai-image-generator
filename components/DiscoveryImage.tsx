import { Logo } from "./icons";
import React, { useState, useRef, useEffect, forwardRef } from 'react';
import styles from '@/styles/DiscoveryImage.module.css'
import {Tabs, Tab, Textarea, Divider, Breadcrumbs, BreadcrumbItem, Accordion, AccordionItem, Slider, Image, Tooltip, Button, Link} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";
import { ImageData } from "@/context/page";
import { signIn, signOut, useSession } from "next-auth/react";


const USER_IMAGES_URL = process.env.NEXT_PUBLIC_USER_IMAGES_URL!;
const USER_IMAGES_URL_DOWNLOAD = process.env.NEXT_PUBLIC_USER_IMAGES_URL_DOWNLOAD!;

interface DiscoveryImageProps {
    image: ImageData;
    onImageClick: () => void;
    columnWidth: number;
    toggleFavorite: () => void;
    updateImages: () => void;
    generateSimilar: () => void;
}

const DiscoveryImage = forwardRef<HTMLDivElement, DiscoveryImageProps>(({
    image,
    onImageClick,
    columnWidth,
    toggleFavorite,
    updateImages,
    generateSimilar,
}, ref) => {

    DiscoveryImage.displayName = 'DiscoveryImage';
    
    const [isGenerateOpen, setIsGenerateOpen] = useState(false);
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

    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const img = imgRef.current;
        if (img) {
            const aspectRatio = img.naturalHeight / img.naturalWidth;
            const columnSpan = aspectRatio > 1 ? 2 : 1; // Adjust span based on aspect ratio
            img.parentElement!.style.gridRow = `span ${Math.ceil(aspectRatio)}`;
        }
    }, [session]);

    // Check if the current image is in the user's favorites
    const isImageFavorite = session?.user?.favorites && image?.res_image
    ? session.user.favorites.some(fav => fav === image.res_image.toString())
    : false;
    
    return (
        <div 
            className={styles['discovery_image_container']} 
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
                <Spinner className={styles['discovery_image_spinner']}/>
                // <Spinner className={styles['image']}/>
            ) : (
                <img src={`${USER_IMAGES_URL}${image.res_image}`} alt="Generated" className={styles['image']} />
            )}
            <div 
                className={`${styles['discovery_image_img_hover']}`} 
                style={{ display: (isMobile || isHoveringOverActions || isActionOpen) ? 'block' : 'block' }}
            >
                <div className={styles['img-button-group-wrapper']}>
                    <div className={styles['discovery_image_img_hover_row']}>
                        <div className={styles['discovery_image_btn_group']}>
                            <Tooltip
                                key={'like-btn'}
                                placement={'bottom-start'}
                                className={`${styles['discovery_tooltip_content']}  ${styles['discovery_empty_tooltip_content']}`}
                            >
                                <button 
                                    className={`${styles['discovery_image_btn']}  ${styles['discovery_image_btn_like']}`}
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        await toggleFavorite();
                                        await updateImages();
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20 " viewBox="0 0 24 24" fill={isImageFavorite ? "red" : "none"} stroke={isImageFavorite ? "red" : "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart "><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                                    <div className={styles['discovery_like_count_wrapper']}>
                                        <div className={styles['discovery_like_count']}>{image.gallery_image_likes}</div>
                                    </div>
                                </button>
                            </Tooltip>
                            <Tooltip
                                key={'generate-btn'}
                                placement={'bottom-start'}
                                hidden
                                className={`${styles['discovery_tooltip_content']}`}
                            >
                                <button 
                                    className={styles['discovery_image_btn_clone']}
                                    onMouseEnter={() => setIsGenerateOpen(true)}
                                    onMouseLeave={() => setIsGenerateOpen(false)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsGenerateOpen(!isGenerateOpen)
                                        generateSimilar();
                                    }}
                                >
                                    Clone & Try
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
  
  export default DiscoveryImage;