import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
	return (
		<section className="section features" id="features" aria-label="features">
			<div className="container px-4 mx-auto text-center">
				<p className="mb-2 font-bold text-gray-700 section-subtitle">
					—Discover GreenRecycle—
				</p>

				<h2 className="mb-4 text-4xl font-bold text-black section-title">
					Pioneering the Future of E-Waste Management & Sustainability
				</h2>

				<div className="px-4 py-8 mx-auto ">
					<div className="flex flex-col items-center justify-between gap-10 text-center md:flex-row md:text-left">
						<div className="mb-4 md:w-1/2 md:mb-0 md:pl-8">
							<p className="text-3xl font-semibold leading-relaxed text-gray-600 section-text">
								India faces a critical environmental challenge with 1.71 million
								metric tons of e-waste generated annually, much of it improperly
								disposed. The scarcity of accessible, trustworthy e-waste
								collection facilities intensifies this growing crisis. <br />
								<br />
								GreenRecycle was born from this urgent need. Our award-winning
								platform bridges the critical gap between consumers and
								certified e-waste facilities through an intuitive, powerful
								interface. We&apos;re not just locating recycling
								centers—we&apos;re catalyzing a movement toward responsible
								electronics lifecycle management and environmental stewardship.
							</p>
							<div className="flex flex-wrap justify-center mt-6 md:justify-start">
								<p className="mr-3 btn btn-primary">
									<Link href="/contactus">Connect With Us</Link>
								</p>
								<p className="mr-3 btn btn-secondary">
									<Link href="/recycle">Explore Recycling Solutions</Link>
								</p>{" "}
							</div>
						</div>
						<div className="flex justify-center md:w-1/2 section-banner has-before">
							<Image
								src="/assets/features/banner.svg"
								alt="Sustainable E-Waste Management Solution"
								width={400}
								height={400}
								className="object-cover rounded-lg"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
