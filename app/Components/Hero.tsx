"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const solutions = [
	"Recycling Revolution",
	"Sustainable Disposal",
	"Smart Facility Finder",
];

const solutionVariants = {
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const HeroSection: React.FC = () => {
	const [currentSolution, setCurrentSolution] = useState(solutions[0]);

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSolution((prev) => {
				const currentIndex = solutions.indexOf(prev);
				const nextIndex = (currentIndex + 1) % solutions.length;
				return solutions[nextIndex];
			});
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	if (!mounted) return null;

	return (
		<section className="section hero" id="home" aria-label="hero">
			<div className="container px-4 mx-auto">
				<div className="text-center hero-content">
					<p className="mb-4 hero-subtitle has-before">
						Welcome to GreenRecycle — Powering a Greener Tomorrow
					</p>

					<h1 className="mb-6 font-bold text-center h1 hero-title md:text-start">
						Your Strategic Partner for Innovative and High-Impact
						<br />{" "}
						<motion.span
							className="pt-2 text-go-green"
							variants={solutionVariants}
							initial="initial"
							animate="animate"
							key={currentSolution}
						>
							E-Waste {currentSolution}
						</motion.span>
					</h1>

					<p className="mb-8 text-center text-gray-700 md:text-start">
						ELocate: Revolutionizing E-Waste Management for a Sustainable
						Future. Discover nearby e-waste facilities with precision and ease.
						Your gateway to responsible recycling practices and environmental
						stewardship — one device at a time.
					</p>

					<div className="flex flex-row items-center justify-center mb-10 md:flex-row md:justify-start sm:space-y-0 md:space-x-4">
						<Link href="/e-facilities" className="mr-4 btn btn-primary">
							Find Nearest Facility
						</Link>
						<Link href="/recycle" className="mr-4 btn btn-primary">
							Start Recycling Today
						</Link>

						<Link href="#" className="flex items-center text-primary">
							{/**<div className="mr-2 btn-icon">
                <IonIcon
                  icon={play}
                  aria-hidden="true"
                  role="img"
                  className="md hydrated"
                />
              </div>

              <span className="ml-4 font-semibold">How it works</span> */}
						</Link>
					</div>
				</div>

				<div className="mx-auto mb-16 hero-banner has-before img-holder">
					<Image
						src="/assets/hero-banner.png"
						alt="hero banner"
						width={650}
						height={650}
						className="object-cover"
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
