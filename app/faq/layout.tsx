import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "AI Image Generator Free: Create and Edit images with AI",
	description: "With our free AI image generator, creating and editing images has never been easier. Harness the potential of AI to effortlessly generate and customize visuals according to your vision. Start creating today!",
	robots: {
		index: true,
		follow: true,
	},
};

export default function PricingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="container mx-auto max-w-[100%] pt-16 flex-grow">
			<div className="max-w-[100%] max-h-[100%]">
				{children}
			</div>
		</section>
	);
}
