'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import styles from '@/styles/MobileNavigation.module.css';
import { signIn, signOut, useSession } from "next-auth/react";
import LoginModal from "@/components/loginModal";


const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const MobileNavigation = () => {
  const { data: session, status, update } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  
  const windowSize = useWindowSize();
  const isMobile = windowSize.width <= 768;

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  const {
    isOpen: isLoginModalOpen,
    onOpen: openLoginModal,
    onClose: toggleLoginModal,
  } = useDisclosure();

  if (!isMobile) return null; // Hide on non-mobile screens

  return (
    <div className={`${styles['mobile_navigation_wrapper']}`}>
        {/* AI Generator Button */}
              <button
              onClick={() => {
                if (!session?.user?.id) {
                  openLoginModal();
                  return;
                }
                if (session?.user?.id) {
                  handleMenuClick('/ai-generator')
                }
            }}
            className={`${styles['mobile_navigation_button']} ${pathname.includes('/ai-generator') ? styles['mobile_nav_active_button_nav'] : ''}`}
        >
            <div className={`${styles['mobile_navigation_button_inner_wrapper']}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette "><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>
              {/* <span className={`${styles['mobile_navigation_button_text']}`}>AI Generator</span> */}
            </div>
        </button>

        {/* Canvas Button */}
        <button
            onClick={() => {
                if (!session?.user?.id) {
                  openLoginModal();
                  return;
                }
                if (session?.user?.id) {
                  handleMenuClick('/canvas')
                }
            }}
            className={`${styles['mobile_navigation_button']} ${pathname.includes('/canvas') ? styles['mobile_nav_active_button_nav'] : ''}`}      
        >
            <div className={`${styles['mobile_navigation_button_inner_wrapper']}`}>
              <svg width="24" height="24" viewBox="0 0 18 17" focusable="false" className="chakra-icon css-1stnah5"><path d="M2 7.57918C4.9716 4.90841 9.49525 2.58869 14.0206 1.52305C14.9465 1.30542 15.4724 2.552 14.674 3.07231C11.4059 5.19859 7.89433 7.86185 5.49005 10.9545C5.19852 11.2364 5.54057 11.7075 5.89587 11.5132C8.86747 9.89224 12.0908 8.02195 15.5809 8.23958C16.0306 8.26793 16.1606 8.87329 15.7614 9.08509C12.8669 10.5243 10.5802 12.1119 8.76311 14.2298C8.16846 14.7602 8.74158 15.7257 9.48613 15.4489C10.9786 14.8544 14.9713 12.2537 15.9627 14.7168" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>                {/* <span className={`${styles['mobile_navigation_button_text']}`}>Canvas</span> */}
            </div>     
        </button>

        {/* Gallery Button */}
        <button
            onClick={() => {
                if (!session?.user?.id) {
                  openLoginModal();
                  return;
                }
                if (session?.user?.id) {
                  handleMenuClick('/discover')
                }
            }}
            className={`${styles['mobile_navigation_button']} ${pathname.includes('/discover') ? styles['mobile_nav_active_button_nav'] : ''}`}
        >
            <div className={`${styles['mobile_navigation_button_inner_wrapper']}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image " style={{ marginRight: '8px' }}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
            {/* <span className={`${styles['mobile_navigation_button_text']}`}>AI Generator</span> */}
            </div>
        </button>

        <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} order="reverse"/>

        </div>
    );
};

export default MobileNavigation;