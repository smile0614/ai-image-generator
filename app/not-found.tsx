"use client";
import Footer from "@/components/footer";
import styles from '@/styles/Error.module.css';

export default function PricingPage() {

	return (
		<>
		<div className="flex flex-col min-h-screen">
			<div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                <div className={styles['errors_page']}>
                    <h6 className={styles['errors_code']}>
                        Error Code: 404
                    </h6>
                    <h1 className={styles['errors_title']}>
                        Page not found!
                    </h1>
                    <h2 className={styles['errors_subtitle']}>
                        Sorry, we could not find the page you are looking for. <br />
                        Go to homepage to view all our AI tools.
                    </h2>
                    <div className={styles['errors_cta']}>
                        <div className={`${styles['form_btn']} ${styles['form_center']}`}>
                            <div className={styles['button']}>
                                <a 
                                    className={`${styles['button_btn']} ${styles['button_primary']} ${styles['button_lg']}`}
                                    href="/"
                                >
                                    Go to home page 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right "><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
			<Footer />
		</div>
		</>
	);
}
