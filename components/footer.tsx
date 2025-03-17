import MixartaiLogo from "@/assets/logos/mixartai.svg";
import { Link } from "@nextui-org/link";
import React from "react";
import LoginModal from "@/components/loginModal";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from "@nextui-org/react";
import styles from '@/styles/Footer.module.css';


const Footer: React.FC = () => {
  const { data: session } = useSession();

	const router = useRouter();

  const {
		isOpen: isLoginModalOpen,
		onOpen: openLoginModal,
		onClose: toggleLoginModal,
	} = useDisclosure();

	const handleMenuClick = () => {
		if (!session) {
			openLoginModal();
		} else {
			router.push('/ai-generator');
		}
	};

  const handleFooterClick = (path : string) => {
		router.push(path);
	};

  return (
    <footer className={styles['footer']}>
      <div className={styles['footerContainer']}>
        <div className={styles['footer_container_left']}>
          <div className={styles['footerLogo']}>
            <Link href="/">
              <img src={MixartaiLogo.src} alt="mixart.ai Logo" className="max-h-7 w-auto object-contain mt-2 mb-2" />
            </Link>
          </div>
          <div className={styles['footer_links_wrapper']}>
            <div className={styles['footerLinks']}>
              <Link 
                className="footer-link" 
                href="/ai-generator"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick();
                }}
              >
                Creating
              </Link>

              <Link 
                className="footer-link" 
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  handleFooterClick('/faq');
                }}
              >
                FAQ
              </Link>

              <Link 
                className="footer-link" 
                href="/pricing"
                onClick={(e) => {
                  e.preventDefault();
                  handleFooterClick('/pricing');
                }}
              >
                Pricing
              </Link>
              {/* <Link className="footer-link" href="/guides">Guides</Link> */}
              {/* <Link className="footer-link" href="/faq">FAQ</Link>
              <Link className="footer-link" href="/pricing">Pricing</Link> */}
            </div>
            <div className={styles['footerIconLinks']}>
              <Link 
                className="footer-link" 
                href="https://x.com/MixArt_AI"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true" className="d-block" width="16" height="16"><path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"></path></svg>
              </Link>
              <Link 
                className="footer-link" 
                href="https://www.youtube.com/@mixart_ai"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.17 13.6" aria-hidden="true" className="d-block" width="23" height="16"><path d="M18.77 2.13A2.4 2.4 0 0 0 17.09.42C15.59 0 9.58 0 9.58 0a57.55 57.55 0 0 0-7.5.4A2.49 2.49 0 0 0 .39 2.13 26.27 26.27 0 0 0 0 6.8a26.15 26.15 0 0 0 .39 4.67 2.43 2.43 0 0 0 1.69 1.71c1.52.42 7.5.42 7.5.42a57.69 57.69 0 0 0 7.51-.4 2.4 2.4 0 0 0 1.68-1.71 25.63 25.63 0 0 0 .4-4.67 24 24 0 0 0-.4-4.69zM7.67 9.71V3.89l5 2.91z" fill="currentColor"></path></svg>
              </Link>
              <Link 
                className="footer-link" 
                href="https://www.tiktok.com/@mixart.ai"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" aria-hidden="true" className="d-block" width="18" height="18"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="currentColor"></path></svg>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles['footer_container_right']}>
          <div className={styles['footerText']}>
            <p className={styles['footerText_text']}>
              LETSKY TECHNOLOGY LIMITED<br/>
              76810239<br/>
              UNIT B, 3/F., KAI WAN HOUSE, 146 TUNG CHOI STREET,<br/>
              MONGKOK, KLN, HONG KONG
            </p>
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} order="reverse"/>
    </footer>
  );
};

export default Footer;