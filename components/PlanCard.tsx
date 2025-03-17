import React from 'react';
import styles from '@/styles/PlanCard.module.css';
import { Button } from '@nextui-org/react';
import { signIn, signOut, useSession } from "next-auth/react";


interface PlanFeatureSegment {
  text: string;
  highlight: boolean;
}
  
interface PlanFeature {
  key: PlanFeatureSegment[];
  value: boolean;
}

interface PlanCardProps {
  planName: string;
  planDescription: string;
  imageAmountText: string;
  planPrice: number;
  planCredits: number;
  planFeatures: PlanFeature[];
  isDiscounted: boolean;
  yearDiscount: number,
  isSelected: boolean,
  onSelect: () => void,
  onModalOpen: () => void,
}

const PlanCard: React.FC<PlanCardProps> = ({
  planName,
  planDescription,
  imageAmountText,
  planPrice,
  planCredits,
  planFeatures,
  isDiscounted,
  yearDiscount,
  isSelected,
  onSelect,
  onModalOpen,
}) => {

  const { data: session, status, update } = useSession();

  const priceDiscount = 50;

  const creditsInfo = {
    'k': Math.floor(planCredits / 1),
    '2k': Math.floor(planCredits / 4),
    '4k': Math.floor(planCredits / 6),
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

  return (
    <div onClick={onSelect} className={`${styles['website__card']} ${isSelected ? styles['website__card_selected'] : ''}`}>
      <div className={styles['website_card__inner']}>
        <div className={styles['plans__plan_outer']}>
          <div className={styles['plans_plan_inner']}>
            <div className={styles['plans_name']}>
              {planName}
              {session?.user?.subscription === planName ? (
                <span 
                  className={styles['plans_active_plan']}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check "><path d="M20 6 9 17l-5-5"></path></svg>
                </span>
              ) : isDiscounted && (
                <span className={styles['plans_discount']}>-{yearDiscount}%</span>
              )}
            </div>
            <div className={styles['plans_price']}>
              <span className={styles['plans_value']}>
                <i className={styles['plans_symbol_strike']}>${planPrice}</i>
                <i className={styles['plans_unit']}>/mo</i>
              </span>

              <div className={styles['plans_value_container']}>
                <span className={styles['plans_value']}>
                  <i className={styles['plans_symbol']}>${planPrice * (1 - priceDiscount / 100)}</i>
                  <i className={styles['plans_unit']}>/mo</i>
                </span>
                {(
                  <div className={styles['plans_discount_badge']}>
                    {priceDiscount}% OFF
                  </div>
                )}
              </div>
            </div>
            <div className={styles['plans_price_info']}>
              {planName === 'Free' ? 'Forever' : (isDiscounted ? 'Pay yearly' : 'Pay monthly')}
            </div>
            {session?.user?.subscription === planName ? (
              <button
                className={styles['button_btn_card_active_plan']}
                // onClick={onModalOpen}
              >
                Current Plan
              </button>
            ) : (
              planName !== 'Free' && (
                <button
                  className={styles['button_btn_card']}
                  onClick={() => {
                    if (planName === 'Pro') {
                      trackEvent('chose_plan_basic');
                    } else if (planName === 'Max') {
                      trackEvent('chose_plan_expert');
                    }
                    onModalOpen();
                  }}
                >
                  Subscribe now
                </button>
              )
            )}
            <div className={styles['plans_credits']}>
              {planDescription}
              {/* Take <span className={styles['plans_difference_illuminantion']}>{planCredits}</span> AI Photos (credits)
              <div className={styles['plans_credits_info']}>{imageAmountText}</div> */}
            </div>
            <div className={styles['plans_features']}>
              {planFeatures.map((feature, index) => (
                <div key={index} className={styles['plans_feature']}>
                  {feature.value ? (
                    <svg
                      className={styles['plans_check']}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 12L9 18L21 6"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${styles['plans_unavailable']} ${styles['plans_x']}`}
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  )}
                 <div className={`${styles['feature_left']} ${!feature.value && styles['plans_unavailable']}`}>
                    {feature.key.map(segment => (
                      <span key={segment.text} className={segment.highlight ? styles['plans_difference_illuminantion'] : ''}>
                        {segment.text}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;