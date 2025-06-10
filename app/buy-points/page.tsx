"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePoints } from "context/pointsContext";

const pointsOptions = [
	{ amount: 10, points: 100 },
	{ amount: 25, points: 250 },
	{ amount: 50, points: 500 },
	{ amount: 100, points: 1100 },
	{ amount: 200, points: 2300 },
	{ amount: 500, points: 6000 },
];

declare global {
	interface Window {
		Razorpay: any;
	}
}

const loadRazorpayScript = () => {
	const script = document.createElement("script");
	script.src = "https://checkout.razorpay.com/v1/checkout.js";
	script.async = true;
	document.body.appendChild(script);
};

const BuyPointsPage = () => {
	const [darkMode, setDarkMode] = useState(true);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		loadRazorpayScript();
		const storedTheme = localStorage.getItem("darkMode");
		if (storedTheme !== null) {
			setDarkMode(storedTheme === "true");
		}
		setHasMounted(true); // set this last to avoid race conditions
	}, []);

	useEffect(() => {
		if (hasMounted) {
			localStorage.setItem("darkMode", darkMode.toString());
		}
		// ✅ safe to omit hasMounted here; React warns, but it won't cause bugs
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [darkMode]);

	const { addPoints } = usePoints();

	const handleBuy = async (amount: number, points: number) => {
		const options = {
			key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
			amount: amount * 100,
			currency: "INR",
			name: "GreenCycle",
			description: `Purchase ${points} Points`,
			handler: async () => {
				await addPoints(points);
				toast.success(`Payment successful! You've earned ${points} points.`);
			},
			prefill: {
				name: "GreenCycle User",
				email: "user@example.com",
			},
			theme: {
				color: "#22c55e",
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

	return (
		<div
			className={`min-h-screen flex flex-col ${
				darkMode ? "bg-[#0f172a] text-white" : "bg-white text-black"
			}`}
		>
			{/* Header */}
			<div className="flex items-center justify-between w-full max-w-6xl px-6 py-4 mx-auto">
				<h1 className="text-3xl font-bold">
					{darkMode ? "🌙" : "☀️"} Buy Points
				</h1>
				<button
					onClick={() => setDarkMode(!darkMode)}
					className="px-4 py-1 text-sm font-medium transition border shadow rounded-xl hover:shadow-md"
				>
					Toggle {darkMode ? "Light" : "Dark"} Mode
				</button>
			</div>

			{/* Main Content */}
			<div className="flex items-center justify-center flex-grow px-4 py-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3"
				>
					{pointsOptions.map((option, idx) => (
						<motion.div
							key={idx}
							whileHover={{ scale: 1.05 }}
							className={`rounded-2xl p-6 shadow-xl border transition duration-300 ${
								darkMode
									? "bg-[#1e293b] border-green-500/20"
									: "bg-gray-100 border-green-300"
							}`}
						>
							<Image
								src="/assets/ecoFriendly.png"
								alt="Points Icon"
								width={100}
								height={100}
								className="mx-auto mb-4 rounded-xl"
							/>
							<p className="text-xl font-semibold text-center">
								💎 {option.points} Points
							</p>
							<p className="mb-4 text-lg font-bold text-center text-green-500">
								₹{option.amount}
							</p>
							<div className="text-center">
								<button
									onClick={() => handleBuy(option.amount, option.points)}
									className="px-5 py-2 text-white transition bg-green-500 rounded-lg shadow hover:bg-green-600"
								>
									Buy Now
								</button>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default BuyPointsPage;
