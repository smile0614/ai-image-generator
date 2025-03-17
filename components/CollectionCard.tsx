import { Logo } from "./icons";
import React, { useState, useRef, useEffect, forwardRef } from 'react';
import styles from '@/styles/CollectionCard.module.css'
import {Tabs, Tab, Textarea, Divider, Breadcrumbs, BreadcrumbItem, Accordion, AccordionItem, Slider, Image, Tooltip, Button, Link} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

interface CollectionCardProps {
    name: string;
    image: string;
    description: string;
    onImageClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    isSelected: boolean;
}

const CollectionCard = forwardRef<HTMLDivElement, CollectionCardProps>(({
    name,
    image,
    description,
    onImageClick,
    isSelected,
}, ref) => {

    CollectionCard.displayName = 'CollectionCard';
    
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

    return (
        <div 
            className={`${styles['image-container']} ${isSelected ? styles['image_container_checked'] : ''}`}
            onClick={onImageClick} 
            onMouseEnter={() => setIsHoveringOverActions(true)}
            onMouseLeave={() => {
                setIsHoveringOverActions(false)
                handleMouseLeave()
            }}
            ref={ref}
        >
            <div className={styles['image_collection_name']}>
                {name}
            </div>
            <img src={image} alt="Generated" className={styles['image']} />
            <div className={styles['image_collection_description']}>
                {description}
            </div>
        </div>
    );
});
  
  export default CollectionCard;