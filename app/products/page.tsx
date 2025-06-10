"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePoints } from "context/pointsContext";
import toast from "react-hot-toast";
import Image from "next/image";

const products = [
	{
		id: 1,
		name: "Recycled Phone Charging Cable",
		description: "Eco-friendly cable made using recycled copper and plastic.",
		image: "/assets/products/1.jpg",
		points: 1500,
	},
	{
		id: 2,
		name: "Laptop Sleeve (Made from Recycled PET Bottles)",
		description: "Protective sleeve made from recycled materials.",
		image: "/assets/products/2.jpg",
		points: 2500,
	},
	{
		id: 3,
		name: "Solar-Powered Power Bank",
		description: "Charge your devices sustainably on the go.",
		image: "/assets/products/3.jpg",
		points: 8000,
	},
	{
		id: 4,
		name: "Refurbished Wireless Mouse",
		description: "Fully functional wireless mouse from refurbished e-waste.",
		image: "/assets/products/4.jpg",
		points: 3000,
	},
	{
		id: 5,
		name: "Eco-friendly Earphones",
		description: "Earphones with recycled plastic housing and packaging.",
		image: "/assets/products/5.jpg",
		points: 4000,
	},
	{
		id: 6,
		name: "DIY E-Waste Reuse Kit",
		description: "Create gadgets using parts from old electronics.",
		image: "/assets/products/6.jpg",
		points: 6000,
	},
	{
		id: 7,
		name: "Recycled Metal Water Bottle",
		description: "Stainless steel bottle made with recycled materials.",
		image: "/assets/products/7.jpg",
		points: 2000,
	},
	{
		id: 8,
		name: "Refurbished Bluetooth Speaker",
		description: "Tested and certified speaker built from reused e-components.",
		image: "/assets/products/8.jpg",
		points: 7000,
	},
	{
		id: 9,
		name: "Plant a Tree Certificate",
		description: "We plant a tree in your name to support e-waste offset.",
		image: "/assets/products/9.jpg",
		points: 1000,
	},
	{
		id: 10,
		name: "Upcycled Tech Organizer",
		description:
			"Keep cables and devices tidy with this recycled-material pouch.",
		image: "/assets/products/10.jpg",
		points: 2500,
	},
	{
		id: 11,
		name: "Second-Life USB Drive (32GB)",
		description: "Rebuilt USB drive using reused memory modules.",
		image: "/assets/products/11.jpg",
		points: 3500,
	},
	{
		id: 12,
		name: "Eco-friendly Smartwatch Strap",
		description: "Made using recycled silicone and eco dyes.",
		image: "/assets/products/12.jpg",
		points: 3000,
	},
	{
		id: 13,
		name: "Sustainable Tech Backpack",
		description: "Carry your gadgets in a backpack made from e-waste textiles.",
		image: "/assets/products/13.jpg",
		points: 9000,
	},
	{
		id: 14,
		name: "Desk Organizer from Circuit Boards",
		description: "Decorative and functional desk item made from real e-waste.",
		image: "/assets/products/14.jpg",
		points: 4500,
	},
	{
		id: 15,
		name: "Recycled Aluminum Phone Stand",
		description: "Stylish and strong, made from reused laptop bodies.",
		image: "/assets/products/15.jpg",
		points: 2000,
	},
	{
		id: 16,
		name: "Donation to E-Waste Awareness Program",
		description: "Support e-waste education and disposal drives.",
		image: "/assets/products/16.jpg",
		points: 1000,
	},
];

export default function ProductsPage() {
	const { points, setPoints } = usePoints();
	const [ownedProducts, setOwnedProducts] = useState<number[]>([]);
	const [tempOwned, setTempOwned] = useState<number[]>([]);
	const [loading, setLoading] = useState(true);
	const { data: session, status } = useSession();
	const userId = session?.user?.id;

	useEffect(() => {
		// Allow access even if not logged in
		if (!userId) {
			setLoading(false);
			return;
		}

		const fetchOwnedProducts = async () => {
			try {
				const res = await fetch("/api/redeemed", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ userId }),
				});

				const data = await res.json();
				if (res.ok) {
					setOwnedProducts(data.redeemedProductIds);
				} else {
					console.error("Failed to fetch owned products", data);
				}
			} catch (err) {
				console.error("Error fetching owned products:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchOwnedProducts();
	}, [userId]);

	const handleRedeem = async (
		userId: string,
		productId: number,
		productPoints: number
	) => {
		if (!userId) {
			toast.error("Please sign in to redeem products.");
			return;
		}

		try {
			const res = await fetch("/api/redeem", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId, productId }),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.error || "Something went wrong");
				return;
			}

			toast.success(data.message);
			setPoints((prev) => prev - productPoints);
			setOwnedProducts((prevOwned) => [...prevOwned, productId]);

			// Temporarily set to "Owned", then revert back to "Buy" after 2 sec
			setTempOwned((prev) => [...prev, productId]);
			setTimeout(() => {
				setTempOwned((prev) => prev.filter((id) => id !== productId));
			}, 2000);
		} catch (err) {
			console.error("Redeem error:", err);
			toast.error("An unexpected error occurred");
		}
	};

	if (status === "loading" || loading) {
		return (
			<div className="p-8 text-xl text-center">Loading your products...</div>
		);
	}

	return (
		<div className="p-8">
			<div className="flex justify-end">
				<h1 className="flex items-center gap-4 px-6 py-4 mb-8 text-2xl font-bold text-green-700 border border-green-200 shadow-inner bg-green-50 rounded-2xl w-fit">
					<span className="text-3xl">🌱</span>
					<span className="flex items-center gap-2">
						Your Points:
						<span className="font-extrabold text-green-800">{points}</span>
					</span>
				</h1>
			</div>

			<div className="grid grid-cols-4 gap-6">
				{products.map((product) => {
					const isOwned = ownedProducts.includes(product.id);
					const isTempOwned = tempOwned.includes(product.id);

					return (
						<div
							key={product.id}
							className="border p-4 rounded-xl shadow bg-white flex flex-col items-center justify-between min-h-[360px]"
						>
							<div className="flex items-center justify-center w-full h-80">
								<div className="relative w-full h-64">
									<Image
										src={product.image}
										alt={product.name}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
										className="object-contain"
									/>
								</div>
							</div>

							<div className="mt-4 text-center">
								<div className="text-lg font-semibold">{product.name}</div>
								<div className="text-sm text-gray-500">
									{product.description}
								</div>
								<div className="my-2 text-gray-700">
									{product.points} Points
								</div>

								<button
									onClick={() =>
										handleRedeem(String(userId), product.id, product.points)
									}
									disabled={isTempOwned}
									className={`px-4 py-2 rounded mt-2 mx-auto ${
										isTempOwned
											? "bg-gray-300 cursor-not-allowed"
											: "bg-green-500 hover:bg-green-600 text-white"
									}`}
								>
									{isTempOwned ? "Owned" : "Buy"}
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
