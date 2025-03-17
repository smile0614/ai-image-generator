"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input, Checkbox, Spinner } from "@nextui-org/react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import styles from "@/styles/FeedbackPopup.module.css";


const NEXT_PUBLIC_FEEDBACK_CREDITS = parseInt(process.env.NEXT_PUBLIC_FEEDBACK_CREDITS!);

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {

    const socialVisitReward = NEXT_PUBLIC_FEEDBACK_CREDITS;

    const { data: session, update, status  } = useSession();

    const [shouldFetchData, setShouldFetchData] = useState(true);

    // console.log("Start session?.user", session?.user)
    // console.log("Start session?.user?.visitedSocials", session?.user?.visitedSocials)

    const fetchUpdatedUserData = async () => {
        try {
            const response = await fetch(`/api/user/${session?.user?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                const feedbackSubmittedStatus = data.user.feedbackSubmitted;
                
                await update({
                    user: {
                        ...session?.user,
                        credits: data.user.credits,
                        feedbackSubmitted: data.user.feedbackSubmitted,
                    },
                });
                // setTimeout(() => console.log("Updated session:", session?.user), 2000);
                // const currentSession = await getSession();
                // update(currentSession);
                // console.log('currentSession', currentSession)
            } else {
                console.error('Failed to fetch updated user data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching updated user data:', error);
        }
    };

    const updateCredits = async () => {
        const addResponse = await fetch('/api/user/tokens/add', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session?.user?.email, tokensToAdd: socialVisitReward }),
        });
        const addData = await addResponse.json();
        if (addData.message === 'User credits updated successfully') {
            // update({ user: { ...session?.user, credits: addData.newTokenCount } });
            // const currentSession = await getSession();
            // update(currentSession);
            // console.log('currentSession TOKEN', currentSession)
        } else {
            console.log(`Error adding credits submitting feedback!`, addData.message);
        }
    };

    // console.log('visitedSocials', visitedSocials)
    const searchParams = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : '',
      );

    const params = searchParams;
    const router = useRouter();
    let callbackUrl = params.get('callbackUrl') || '/';


    const handleClose = () => {
        onClose();
        resetFeedback();
    };

    useEffect(() => {
        if (session?.user && shouldFetchData) {
            fetchUpdatedUserData();
            setShouldFetchData(false);
        }
    }, [session, shouldFetchData]);

    const handleFeedbackSubmit = async (ratingNumber: number) => {
        // Return early if the required inputs are not provided
        if (!session) return;
        if (session?.user?.feedbackSubmitted) {
            setErrorMessage('Feedback already submitted.');
            // console.log("session?.user", session?.user)
            return;
        }
        if (ratingNumber === 0) {
            setErrorMessage('Please provide a rating.');
            return;
        }
        // if (!feedback1.trim()) {
        //     setErrorMessage('Please provide a response to the first question.');
        //     return;
        // }
        // if (feedback1.trim().length > 3000) {
        //     setErrorMessage('Feedback 1 must be less than or equal to 3000 characters.');
        //     return;
        // }
        // if (!feedback2.trim()) {
        //     setErrorMessage('Please provide a response to the second question.');
        //     return;
        // }
        // if (feedback2.trim().length > 3000) {
        //     setErrorMessage('Feedback 2 must be less than or equal to 3000 characters.');
        //     return;
        // }
    
        try {
            const response = await fetch('/api/user/update/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session.user.id,
                    rating: ratingNumber,
                    // feedback1,
                    // feedback2,
                }),
            });
    
            const data = await response.json();
            if (data.message === 'Feedback submitted successfully') {
                // await updateCredits();
                await fetchUpdatedUserData();
                resetFeedback();
                // setSuccessMessage(`Feedback submitted successfully, ${socialVisitReward} coins added to balance!`);
                // console.log("session?.user", session?.user)
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setErrorMessage('Failed to submit feedback.');
        }
    };

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback1, setFeedback1] = useState('');
    const [feedback2, setFeedback2] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleMouseEnter = (index: number) => {
        setHoverRating(index);
      };
    
      const handleMouseLeave = () => {
        setHoverRating(0);
      };
    
      const handleClick = async (index: number) => {
        setRating(index);
        await handleFeedbackSubmit(index);
        handleClose();
      };

    const handleFeedbackChange1 = (e: ChangeEvent<HTMLInputElement>) => {
        setFeedback1(e.target.value);
    };

    const handleFeedbackChange2 = (e: ChangeEvent<HTMLInputElement>) => {
        setFeedback2(e.target.value);
    };

    const resetFeedback = () => {
        setRating(0);
        // setFeedback1('');
        // setFeedback2('');
        setSuccessMessage('');
        setErrorMessage('');
    };

    return (
        <div className={`${styles['image__overlay']} ${!isOpen ? 'hidden' : ''}`}>
            <div className={styles['feedback__modal']}>
                <Modal 
                    backdrop="blur" 
                    isOpen={isOpen} 
                    onClose={handleClose}
                    size="md"
                    placement="center"
                    className={`${styles['modal_feedback']} ${styles['modal_sm_feedback']}`}
                >
                    <ModalContent className={`${styles['modal_feedback_content']}`}>
                        <div className={`${styles['modal_feedback_content__inner']}`}>
                            <p className={`${styles['modal_feedback_p']}`}>Rate Us!</p>
                            {/* <p className={`${styles['modal_feedback_p']}`}>{`We value your feedback. Rate our service and receive  ${socialVisitReward} free coins to create more amazing images!`}</p> */}
                            <p className={`${styles['modal_feedback_p']}`}>{`We value your feedback. Please rate our service so that we can make your experience better.`}</p>
                            <div className={`${styles['modal_feedback_stars']}`}>
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <button className={`${styles['modal_feedback_stars_button']}`} key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} onClick={() => handleClick(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={(hoverRating >= index || rating >= index) ? '#FC7614' : 'none'} stroke="#FC7614">
                                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                                        </svg>
                                    </button>
                                ))}
                                </div>
                            {/* <div className={`${styles['feedback_input_wrapper']} mt-4`}>
                                <Input
                                    className={`${styles['feedback_input']}`}
                                    size="md"
                                    placeholder="Why do you use our image generation service?"
                                    label="Why do you use our image generation service?"
                                    labelPlacement="outside"
                                    onChange={handleFeedbackChange1}
                                    value={feedback1}
                                    maxLength={3000}
                                />
                            </div>
                            <div className={`${styles['feedback_input_wrapper']} mt-4`}>
                                <Input
                                    className={`${styles['feedback_input']}`}
                                    size="md"
                                    placeholder="Do you think the results meet your expectations?"
                                    label="Do you think the results meet your expectations?"
                                    labelPlacement="outside"
                                    onChange={handleFeedbackChange2}
                                    value={feedback2}
                                    maxLength={3000}
                                />
                            </div> */}
                        {successMessage && <div className={styles['feedback_success_message']}>{successMessage}</div>}
                        {errorMessage && <div className={styles['feedback_error_message']}>{errorMessage}</div>}
                        {/* <Button
							className="mt-6 mb-4 text-md text-white bg-[#5858e6]"
							radius='sm'
							color='success'
							size='md'
                            onPress={handleFeedbackSubmit}
						>
							Send Feedback
						</Button> */}
                        </div>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}