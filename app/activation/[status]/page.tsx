'use client';

import { useParams, useRouter } from 'next/navigation';
import Footer from "@/components/footer";

import styles from "@/styles/Activation.module.css";

const ActivationStatus = () => {
  const params = useParams();
  const router = useRouter();
  const status = params.status;

  const redirectToHome = () => {
    router.push('/');
  };

    const renderContent = () => {
        switch (status) {
            case 'success':
                return (
                    <div className={`${styles['activation_wrapper']}`}>
                        <h1>Activation Successful!</h1>
                        <p>Your account has been successfully activated.</p>
                        <button 
                            className={`${styles['activation_button']}`}
                            onClick={redirectToHome}
                        >
                            Start creating!
                        </button>
                    </div>
                );
            case 'error':
                return (
                    <div className={`${styles['activation_wrapper']}`}>
                        <h1>Activation Error</h1>
                        <p>Invalid or expired activation token.</p>
                        <button 
                            className={`${styles['activation_button']}`}
                            onClick={redirectToHome}
                        >
                            Return to Home
                        </button>
                    </div>
                );
            default:
        return <p>Checking activation status...</p>;
    }
  };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {renderContent()}
            </div>
            <Footer />
        </div>
    );
};

export default ActivationStatus;