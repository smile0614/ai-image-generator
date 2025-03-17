'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'

import { signIn, signOut, useSession } from 'next-auth/react';

import { Accordion, AccordionItem } from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";

import { link as linkStyles } from "@nextui-org/theme";

import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";

import {ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale} from "@/assets/MenuIcons";
import MixartaiLogo from "@/assets/logos/mixartai.svg";
import { Guides, Faq } from '@/assets/Logos';
import LoginModal from './loginModal';
import FeedbackModal from './FeedbackModal';
import UserProfile from './UserProfile';

import { sendGAEvent } from '@next/third-parties/google'

import styles from '@/styles/Navbar.module.css';

export const Navbar = () => {

	const { data: session } = useSession();

	const router = useRouter();
	const pathname = usePathname();

	const [isLoginModalOpen, setLoginModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState<string | null>(null);

	const toggleLoginModal = () => {
		setLoginModalOpen(!isLoginModalOpen);
	};

	// Directly using the handler function without conditionally calling useRouter
	const handleNavigation = (path: string) => {
		router.push(path);
	};

	const handleLinkNavigation = (path: string) => {
		// Check if 'window' is defined (for SSR frameworks like Next.js)
		if (typeof window !== "undefined") {
			window.open(path, '_blank'); // '_blank' opens the link in a new tab
		}
	};

	const handleMenuClick = (path: string) => {
		// console.log('path', path)
		if (path === '/pricing' || '/faq') {
			router.push(path);
		} else if (!session) {
			toggleLoginModal();
		} else {
			router.push(path);
		}
	};

  const [isMenuOpen, setIsMenuOpen] = useState(false);

	const icons = {
		chevron: <ChevronDown fill="currentColor" size={16} />,
		scale: <Scale className="text-warning" fill="currentColor" size={30} />,
		lock: <Lock className="text-success" fill="currentColor" size={30} />,
		activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
		flash: <Flash className="text-primary" fill="currentColor" size={30} />,
		server: <Server className="text-success" fill="currentColor" size={30} />,
		user: <TagUser className="text-danger" fill="currentColor" size={30} />,
	};

	const buttonText = () => {
        if (!session?.user) {
            return "Get started for free";
        } else if (session?.user?.subscription === 'Free') {
            return "Upgrade";
		} else if (session?.user?.subscription === 'Pro') {
            return "Upgrade";
        } else if (session?.user?.subscription === 'Max') {
            return "Buy Coins";
        }
    };

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

	return (
		<>
		<NextUINavbar maxWidth="full" position="sticky" className="fixed bg-navbar-custom" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start" >
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink 
						className="flex justify-center items-center" 
						href={"/"}
						onClick={() => {
							if (isMenuOpen) {
								setIsMenuOpen(false);
							}
						}}
					>
						{/* <Logo /> */}
						<img src={MixartaiLogo.src} alt="mixartai Logo" className="max-h-7 w-auto object-contain mr-4" />
						{/* <p className="text-white font-bold text-large">Pixy.Ai</p> */}
					</NextLink>
				</NavbarBrand>

				{session && (
					<NavbarItem 
						key={'ai-generator'}
						onClick={(e) => {
							e.preventDefault();
							trackEvent('header_creating');
							handleMenuClick('/ai-generator');
						}}
						className={`${styles['ai_generator_button']} hidden xl:flex ${pathname.includes('/ai-generator') ? styles['active_button_nav'] : ''}`} 
					>
						<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
							AI Generator
						</a>
					</NavbarItem>	
				)}

				{session && (
					<NavbarItem 
						key={'canvas'}
						onClick={(e) => {
							e.preventDefault();
							trackEvent('header_creating');
							handleMenuClick('/canvas');
						}}
						className={`${styles['ai_generator_button']} hidden xl:flex ${pathname.includes('/canvas') ? styles['active_button_nav'] : ''}`} 
					>
						<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
							Canvas
						</a>
					</NavbarItem>	
				)}

				{session && (
					<NavbarItem 
						key={'discover'}
						onClick={(e) => {
							e.preventDefault();
							trackEvent('header_creating');
							handleMenuClick('/discover');
						}}
						className={`${styles['ai_generator_button']} hidden xl:flex ${pathname.includes('/discover') ? styles['active_button_nav'] : ''}`} 
					>
						<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
							Gallery
						</a>
					</NavbarItem>	
				)}
				


			</NavbarContent>

			<NavbarContent
				// md:flex for desktop menu navbar breakpoint 
				className="hidden xl:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				{/* <NavbarItem className="hidden sm:flex gap-2">
					<ThemeSwitch />
				</NavbarItem> */}
				<ul className="hidden lg:flex md:flex sm:flex gap-4 justify-start ml-8">
					{/* <NavbarItem key={'Login'}>
						<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"text-xl"
								)}
								color="foreground"
								href={"/login"}
							>
								Log in
						</NextLink>
					</NavbarItem> */}
					{!session && (
						<NavbarItem 
							key={'Login'} 
							onClick={(e) => {
								e.preventDefault();
								trackEvent('header_log_in');
								toggleLoginModal();
							}}>
							<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
							Log in
							</a>
						</NavbarItem>
					)}
					{/* {session && (
						<NavbarItem 
							key={'Signout'} 
							onClick={(e) => {
								e.preventDefault();
								signOut();
							}}>
							<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
							Sign out
							</a>
						</NavbarItem>
					)}					 */}

{/* 					
					<NavbarItem 
						key={'Pricing'}
						onClick={(e) => {
							e.preventDefault();
							trackEvent('header_pricing');
							handleMenuClick('/pricing');
						}}
					>
						<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
						Pricing
						</a>
					</NavbarItem>

					<NavbarItem 
						key={'FAQ'}
						onClick={(e) => {
							e.preventDefault();
							trackEvent('header_faq');
							handleMenuClick('/faq');
						}}
					>
						<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
							FAQ
						</a>
					</NavbarItem> */}
					
					{/* <Dropdown>
						<NavbarItem>
						<DropdownTrigger>
							<span
								className={clsx(
								linkStyles({ color: "foreground" }),
								"text-xl text-white",
								"cursor-pointer select-none inline-flex items-center"
								)}
							>
								<span style={{ paddingRight: '0.5em' }}>Community</span>
								{icons.chevron}
							</span>
						</DropdownTrigger>
						</NavbarItem>
						<DropdownMenu
							aria-label="ACME resources"
							className="w-[340px]"
							itemClasses={{
								base: "gap-4",
							}}
						>
							<DropdownItem
								key="twitter"
								description="Follow to stay up to date."
								startContent={
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true" className="d-block" width="16" height="16"><path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"></path></svg>
								}
								onClick={() => handleLinkNavigation('https://x.com/MixArt_AI')}
							>
								<Link 
									color="foreground"
									href="https://x.com/MixArt_AI"
              						target="_blank" 
              						rel="noopener noreferrer"
								>
									X
								</Link> 
							</DropdownItem>
							<DropdownItem
								key="youtube"
								description="Follow for community updates."
								startContent={
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.17 13.6" aria-hidden="true" className="d-block" width="23" height="16"><path d="M18.77 2.13A2.4 2.4 0 0 0 17.09.42C15.59 0 9.58 0 9.58 0a57.55 57.55 0 0 0-7.5.4A2.49 2.49 0 0 0 .39 2.13 26.27 26.27 0 0 0 0 6.8a26.15 26.15 0 0 0 .39 4.67 2.43 2.43 0 0 0 1.69 1.71c1.52.42 7.5.42 7.5.42a57.69 57.69 0 0 0 7.51-.4 2.4 2.4 0 0 0 1.68-1.71 25.63 25.63 0 0 0 .4-4.67 24 24 0 0 0-.4-4.69zM7.67 9.71V3.89l5 2.91z" fill="currentColor"></path></svg>
								}
								onClick={() => handleLinkNavigation('https://www.youtube.com/@mixart_ai')}
							>
								<Link 
									color="foreground"
									href="https://www.youtube.com/@mixart_ai"
              						target="_blank" 
              						rel="noopener noreferrer"
								>
									YouTube
								</Link>
							</DropdownItem>
							<DropdownItem
								key="tiktok"
								description="Join and share your art."
								startContent={
									<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" aria-hidden="true" className="d-block" width="18" height="18"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="currentColor"></path></svg>
								}
								onClick={() => handleLinkNavigation('https://www.tiktok.com/@mixart.ai')}
							>
								<Link 
									color="foreground"
									href="https://www.tiktok.com/@mixart.ai"
              						target="_blank" 
              						rel="noopener noreferrer"
								>
									TikTok
								</Link>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown> */}

					
					{/* <Dropdown>
						<NavbarItem>
						<DropdownTrigger>
							<span
								className={clsx(
								linkStyles({ color: "foreground" }),
								"text-xl text-white",
								"cursor-pointer select-none inline-flex items-center"
								)}
							>
								<span style={{ paddingRight: '0.5em' }}>Resources</span>
								{icons.chevron}
							</span>
						</DropdownTrigger>
						</NavbarItem>
						<DropdownMenu
							aria-label="ACME resources"
							className="w-[340px]"
							itemClasses={{
								base: "gap-4",
							}}
						>
							<DropdownItem
								key="production_ready"
								description="Learn how to use AI."
								startContent={<Guides />}
								onClick={() => handleNavigation('/guides')}
							>
								<NextLink href="/guides" passHref>
									<Link color="foreground">
										Guides
									</Link>
								</NextLink>
							</DropdownItem>
							<DropdownItem
								key="supreme_support"
								description="We're here to help."
								startContent={<Faq />}
								onClick={() => handleNavigation('/faq')}
							>
								<NextLink href="/faq" passHref>
									<Link color="foreground">
										FAQ
									</Link>
								</NextLink>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown> */}
				</ul>
				<NavbarItem className="hidden md:flex">
					<Button
						className="text-md text-white bg-[#5858e6]"
						radius='sm'
						color='success'
						size='sm'
						onClick={() => {
							if (buttonText() === 'Get started for free') {
								trackEvent('header_get_started');
							} else {
								trackEvent('header_upgrade');
							}
							handleNavigation('/pricing');
						}}
					>
						{buttonText()}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							aria-hidden="true"
							role="img"
							className="outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&amp;>path]:stroke-[2.5px]"
							focusable="false"
							tabIndex={-1}
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								d="M4 12h16m0 0l-6-6m6 6l-6 6"
							></path>
						</svg>
					</Button>
						{session && !isMobile && (
							<div	
								className={`${styles['button_badge']} `} 
							>
									First Month -50%
							</div>
						)}
				</NavbarItem>
				{/* {session && (
					<NavbarItem className="flex">
						<Button
							className="text-md text-white bg-[#5858e6]"
							radius='sm'
							color='success'
							size='sm'
							onClick={() => {
								trackEvent('header_invite_friends');
								handleNavigation('/referrals');
							}}
							endContent={
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins "><circle cx="8" cy="8" r="6"></circle><path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path><path d="M7 6h1v4"></path><path d="m16.71 13.88.7.71-2.82 2.82"></path></svg>
							}
						>
							Invite friends & Earn credits
						</Button>
					</NavbarItem>
				)} */}
				{session && (
					<NavbarItem>
					<UserProfile onMenuToggle={() => setIsMenuOpen(false)} />
					</NavbarItem>
				)}
			</NavbarContent>

			{/* md:hidden for the breakpoint of mobile navbar */}
			<NavbarContent className="xl:hidden basis-1 pl-4" justify="end">
				{/* <ThemeSwitch /> */}
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu >
				<div className="mx-4 mt-2 flex flex-col gap-2">
				<div className={`${styles['banner']}`}>
					<span className={`${styles['banner_text']}`}>
						<strong>Try Us Now:</strong> 50% Off Your First Month – <em>This January Only!</em>
					</span>
				</div>
				<NavbarItem className="flex flex-col items-center mb-4">
					<Button
						className="text-xl text-white bg-[#5858e6]"
						radius='sm'
						fullWidth
						color='success'
						onClick={() => {
							setIsMenuOpen(false);
							if (buttonText() === 'Get started for free') {
								trackEvent('header_get_started');
							} else {
								trackEvent('header_upgrade');
							}
							handleNavigation('/pricing');
						}}
					>
						{buttonText()}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							aria-hidden="true"
							role="img"
							className="outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&amp;>path]:stroke-[2.5px]"
							focusable="false"
							tabIndex={-1}
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								d="M4 12h16m0 0l-6-6m6 6l-6 6"
							></path>
						</svg>
					</Button>
				</NavbarItem>
				{/* {session && (
					<NavbarItem className="flex">
						<Button
							className="mb-4 text-md text-white bg-[#5858e6]"
							radius='sm'
							color='success'
							fullWidth
							size='lg'
							onClick={() => {
								setIsMenuOpen(false)
								handleNavigation('/referrals')
							}}
							endContent={
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins "><circle cx="8" cy="8" r="6"></circle><path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path><path d="M7 6h1v4"></path><path d="m16.71 13.88.7.71-2.82 2.82"></path></svg>
							}
						>
							Invite friends & Earn credits
						</Button>
					</NavbarItem>
				)} */}
				{session && (
						<NavbarItem className='mb-4'>
							<UserProfile onMenuToggle={() => setIsMenuOpen(false)} />
						</NavbarItem>
				)}
				{session && (
					<NavbarItem 
					key={'canvas'}
					onClick={(e) => {
						e.preventDefault();
						trackEvent('header_pricing');
						handleMenuClick('/ai-generator');
						setIsMenuOpen(!isMenuOpen);
					}}
				>
					<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
					AI Generator
					</a>
				</NavbarItem>

					// <NavbarItem 
					// 	key={'ai-generator'} 
					// 	onClick={(e) => {
					// 		e.preventDefault();
					// 		trackEvent('header_creating');
					// 		setIsMenuOpen(!isMenuOpen);
					// 		handleMenuClick('/ai-generator');
					// 	}}>
					// 		<NextLink
					// 			className={clsx(
					// 				linkStyles({ color: "foreground" }),
					// 				"text-xl"
					// 			)}
					// 			color="foreground"
					// 			href={"/ai-generator"}
					// 		>
					// 			AI Generator
					// 	</NextLink>
					// </NavbarItem>		
				)}

				{session && (
					<NavbarItem 
						key={'canvas'}
						onClick={(e) => {
							e.preventDefault();
							trackEvent('header_pricing');
							handleMenuClick('/canvas');
							setIsMenuOpen(!isMenuOpen);
						}}
					>
						<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
						Canvas
						</a>
					</NavbarItem>

					// <NavbarItem 
					// 	key={'canvas'} 
					// 	onClick={(e) => {
					// 		e.preventDefault();
					// 		trackEvent('header_creating');
					// 		setIsMenuOpen(!isMenuOpen);
					// 		handleMenuClick('/canvas');
					// 	}}>
					// 		<NextLink
					// 			className={clsx(
					// 				linkStyles({ color: "foreground" }),
					// 				"text-xl"
					// 			)}
					// 			color="foreground"
					// 			href={"/canvas"}
					// 		>
					// 			Canvas
					// 	</NextLink>
					// </NavbarItem>		
				)}

				{session && (
					<NavbarItem 
						key={'discover'}
						onClick={(e) => {
							e.preventDefault();
							trackEvent('header_pricing');
							handleMenuClick('/discover');
							setIsMenuOpen(!isMenuOpen);
						}}
					>
						<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
							Gallery
						</a>
					</NavbarItem>
				)}

				<NavbarItem 
					key={'FAQ'}
					onClick={(e) => {
						e.preventDefault();
						trackEvent('header_faq');
						handleMenuClick('/faq');
						setIsMenuOpen(!isMenuOpen)
					}}
				>
					<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
						FAQ
					</a>
				</NavbarItem>
					{/* <Dropdown>
						<NavbarItem>
						<DropdownTrigger>
							<span
								className={clsx(
								linkStyles({ color: "foreground" }),
								"text-xl",
								"cursor-pointer select-none inline-flex items-center"
								)}
							>
								<span style={{ paddingRight: '0.5em' }}>Resources</span>
								{icons.chevron}
							</span>
						</DropdownTrigger>
						</NavbarItem>
						<DropdownMenu
							aria-label="ACME resources"
							className="w-[90vw]"
							itemClasses={{
								base: "gap-4",
							}}
						>
							<DropdownItem
								key="production_ready"
								description="Learn how to use ACME ai."
								startContent={<Guides />}
								onClick={() => {
									handleNavigation('/guides');
									setIsMenuOpen(!isMenuOpen);
								}}
							>
								<NextLink href="/guides" passHref>
									<Link color="foreground">
										Guides
									</Link>
								</NextLink>
							</DropdownItem>
							<DropdownItem
								key="supreme_support"
								description="We're here to help."
								startContent={<Faq />}
								onClick={() => {
									handleNavigation('/faq');
									setIsMenuOpen(!isMenuOpen);
								}}
							>
								<NextLink href="/faq" passHref>
									<Link color="foreground">
										FAQ
									</Link>
								</NextLink>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown> */}
					{/* <NavbarItem key={'Pricing'}>
						<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"text-xl"
								)}
								color="foreground"
								href={"/pricing"}
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								Pricing
						</NextLink>
					</NavbarItem> */}
					<NavbarItem 
						key={'Pricing'}
						onClick={(e) => {
							e.preventDefault();
							trackEvent('header_pricing');
							handleMenuClick('/pricing');
							setIsMenuOpen(!isMenuOpen);
						}}
					>
						<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
						Pricing
						</a>
					</NavbarItem>

					{/* <NavbarItem key={'Login'}>
						<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"text-xl"
								)}
								color="foreground"
								href={"/login"}
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								Log in
						</NextLink>
					</NavbarItem> */}
					{!session && (
						<NavbarItem 
							key={'Login'} 
							onClick={(e) => {
								e.preventDefault();
								trackEvent('header_log_in');
								setIsMenuOpen(!isMenuOpen);
								toggleLoginModal();
							}}>
							<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
							Log in
							</a>
						</NavbarItem>
					)}
					{session && (
						<NavbarItem 
							key={'Signout'} 
							onClick={(e) => {
								e.preventDefault();
								setIsMenuOpen(!isMenuOpen);
								signOut();
							}}>
							<a className={clsx(linkStyles({ color: "foreground" }), "text-xl cursor-pointer")}>
							Sign out
							</a>
						</NavbarItem>
					)}
				</div>
			</NavbarMenu>
		</NextUINavbar>
		<LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} order='default' />
		</>
	);
};
