"use client";
import React, { useState } from "react";
import Footer from "@/components/footer";
import styles from '../../styles/Pricing.module.css';
import { title } from "@/components/primitives";
import { Switch, Card, Accordion, AccordionItem } from "@nextui-org/react";
import PlanCard from "@/components/PlanCard";

export default function PricingPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
				<div className={`${styles['website_faq_email']}`}>
					Contact us at <span className={`${styles['website_faq_span']}`}>hi@mixart.ai</span> for any additional queries and concerns
				</div>
				<section className={`${styles['website_faq']}`}>
					<h2 className={`${styles['website_heading']}`}>Frequently Asked Questions</h2>
					<Accordion 
						selectionMode="multiple"
						className={`${styles['website_questions']}`}	
					>
						<AccordionItem
						key="1"
						aria-label="How do image credits work?"
						title="How do image credits work?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									When you create an image, one credit will be used up. Thus, when you generate two images at once, two credits will be spent. 
								</p>
								<p>
									You can also improve the quality of the image at the expense of credits. Improving the quality costs one credit.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="2"
						aria-label="Can I use created images for commercial projects?"
						title="Can I use created images for commercial projects?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									Yes, but only with our paid plans. Images generated under these
									plans can be used commercially, adhering to the{" "}
									<a
									target="_blank"
									rel="noreferrer noopener"
									href="https://huggingface.co/spaces/CompVis/stable-diffusion-license"
									>
									CreativeML Open RAIL-M
									</a>{" "}
									license.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="3"
						aria-label="Can I create NSFW content?"
						title="Can I create NSFW content?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									You can create anything you want! But keep in mind that we do
									monitor generated content. Usage that violates any applicable
									national, federal, state, local, or international law or regulation
									will <b>be banned and reported!</b>
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="4"
						aria-label="Can I change my plan later?"
						title="Can I change my plan later?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									Yes, you can change your plan at any time, either upgrading or
									downgrading. Upgrades will be prorated for the remaining month.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="5"
						aria-label="What if I decide to cancel?"
						title="What if I decide to cancel?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									If you no longer wish to use mixart.ai, you can cancel your
									subscription anytime. When canceled, you will still be able to use
									your credits for the remaining of the current billing cycle.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="6"
						aria-label="What payment options are accepted?"
						title="What payment options are accepted?"
						>
							<div className={`${styles['website_answer']}`}>
							<p>We accept major credit and debit cards, PayPal, Apple Pay, and Google Pay.</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="7"
						aria-label="Will my unused credits roll over to the next month?"
						title="Will my unused credits roll over to the next month?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>Plan&apos;s credits <b>do not</b> roll over to the next month.</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="8"
						aria-label="Can I get more credits?"
						title="Can I get more credits?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									Yes, we offer an option to top up with more credits. You can
									purchase 2400 credits for $9 <a href="/api/billing/checkout">here</a>. These credits do not expire.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="9"
						aria-label="Will I be able to use the plan to access the API?"
						title="Will I be able to use the plan to access the API?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									No, the API is a separate product and is not included in the
									subscription plans. To access the API, please create another account{" "}
									<a href="https://mixart.ai/">here</a>.
								</p>
							</div>
						</AccordionItem>
						<AccordionItem
						key="10"
						aria-label="Do prices include tax?"
						title="Do prices include tax?"
						>
							<div className={`${styles['website_answer']}`}>
								<p>
									All prices listed in our table are exclusive of tax. Taxes, if
									applicable, will be added and calculated at the checkout stage.
								</p>
								<p>
									Please note that we apply VAT/GST in certain regions according to
									local tax regulations. For recurring payments, please be aware that
									we may begin to add tax if required by regulations, once we meet a
									local sales threshold. It&apos;s important to review your final invoice
									to see the detailed tax breakdown and any changes to your recurring
									charges.
								</p>
							</div>
						</AccordionItem>
					</Accordion>
				</section>
			</div>
			<Footer />
		</div>
	);
}
