// app/admin/page

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

type SubmissionCategory =
	| "Smartphones"
	| "Laptop"
	| "Accessories"
	| "Refrigerator"
	| "Television"
	| "Others";

type Submission = {
	_id: string;
	userId: string;
	brand?: string;
	model?: string;
	accessoryType?: string;
	deviceType?: string;
	deviceCompanyOrModel?: string;
	pickupDate: string;
	pickupTime: string;
	address: string;
	selectedFacility: string;
	phone: string;
	createdAt: string;
	status: "pending" | "completed";
	recycleItemPrice?: number;
};

const categories: { title: string; key: SubmissionCategory }[] = [
	{ title: "Smartphones", key: "Smartphones" },
	{ title: "Laptop", key: "Laptop" },
	{ title: "Accessories", key: "Accessories" },
	{ title: "Refrigerators", key: "Refrigerator" },
	{ title: "Televisions", key: "Television" },
	{ title: "Other Devices", key: "Others" },
];

export default function AdminAllSubmissionsPage() {
	const { data: session } = useSession();
	const [data, setData] = useState<Record<SubmissionCategory, Submission[]>>({
		Smartphones: [],
		Laptop: [],
		Accessories: [],
		Refrigerator: [],
		Television: [],
		Others: [],
	});

	const [error, setError] = useState("");
	const [workingOn, setWorkingOn] = useState<Set<string>>(new Set());

	const fetchData = async () => {
		try {
			const res = await axios.get("/api/admin/all-submissions");
			setData(res.data);
		} catch (err: any) {
			setError(err.message || "Failed to fetch submissions");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const saved = localStorage.getItem("workingOnSubmissions");
		if (saved) {
			try {
				setWorkingOn(new Set(JSON.parse(saved)));
			} catch {}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			"workingOnSubmissions",
			JSON.stringify(Array.from(workingOn))
		);
	}, [workingOn]);

	const handleDelete = async (category: SubmissionCategory, id: string) => {
		try {
			const res = await fetch("/api/admin/delete-submission", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ category, id }),
			});

			const data = await res.json();
			console.log("Marking as completed response:", data);

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Failed to delete item");
			}

			// Remove from UI state after success
			setData((prev) => ({
				...prev,
				[category]: prev[category].filter((item) => item._id !== id),
			}));
			setWorkingOn((prev) => {
				const newSet = new Set(prev);
				newSet.delete(id);
				return newSet;
			});
		} catch (error: any) {
			console.error("Delete error:", error);
			setError(error.message || "Failed to delete item.");
		}
	};

	const toggleWorking = (id: string) => {
		setWorkingOn((prev) => {
			const newSet = new Set(prev);
			newSet.has(id) ? newSet.delete(id) : newSet.add(id);
			return newSet;
		});
	};

	const markAsCompleted = async (category: SubmissionCategory, id: string) => {
		console.log("Marking as completed:", category, id);

		try {
			const res = await fetch("/api/admin/markCompleted", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ category, id }), // ✅ Matches route.ts expectations
			});

			const data = await res.json();
			console.log("Marking as completed response:", data);

			if (res.ok) {
				// Optimistic UI update
				setData((prev) => {
					const updated = { ...prev };
					updated[category] = updated[category].map((item) =>
						item._id === id ? { ...item, status: "completed" } : item
					);
					return updated;
				});
				setWorkingOn((prev) => {
					const newSet = new Set(prev);
					newSet.delete(id);
					return newSet;
				});
			} else {
				console.warn("Unexpected response:", data);
				setError("Failed to mark as completed.");
			}
		} catch (error) {
			console.error("Error marking as completed:", error);
			setError("Failed to mark item as completed.");
		}
	};

	const renderSubmissionCard = (
		category: SubmissionCategory,
		item: Submission,
		showCompletedButton = false
	) => (
		<li
			key={item._id}
			className={`p-4 mb-4 rounded-xl ${
				workingOn.has(item._id) ? "bg-yellow-200" : "bg-gray-100"
			}`}
		>
			<div className="flex items-center justify-between">
				<div>
					<div className="mb-2 text-base font-semibold text-green-900">
						{item.userId}
					</div>
					<div className="space-y-1 text-sm text-gray-800">
						{["Smartphones", "Laptop", "Refrigerator", "Television"].includes(
							category
						) && (
							<>
								{item.brand && (
									<p>
										<strong>Brand:</strong> {item.brand}
									</p>
								)}
								{item.model && (
									<p>
										<strong>Model:</strong> {item.model}
									</p>
								)}
							</>
						)}

						{category === "Accessories" && (
							<>
								{item.accessoryType && (
									<p>
										<strong>Accessory Type:</strong> {item.accessoryType}
									</p>
								)}
								{item.model && (
									<p>
										<strong>Model:</strong> {item.model}
									</p>
								)}
							</>
						)}

						{category === "Others" && (
							<>
								{item.deviceType && (
									<p>
										<strong>Device Type:</strong> {item.deviceType}
									</p>
								)}
								{item.deviceCompanyOrModel && (
									<p>
										<strong>Company/Model:</strong> {item.deviceCompanyOrModel}
									</p>
								)}
							</>
						)}

						<p>
							<strong>Pickup:</strong> {item.pickupDate} @ {item.pickupTime}
						</p>
						<p>
							<strong>Address:</strong> {item.address}
						</p>
						<p>
							<strong>Facility:</strong> {item.selectedFacility}
						</p>
						{item.recycleItemPrice && (
							<p>
								<strong>Recycle Price:</strong> ₹{item.recycleItemPrice}
							</p>
						)}
						<p>
							<strong>Phone:</strong> {item.phone}
						</p>
					</div>
					<div className="mt-2 text-sm text-gray-600">
						<strong>Created At:</strong>{" "}
						{new Date(item.createdAt).toLocaleString()}
					</div>
				</div>
				<div className="flex flex-col space-y-2">
					<button
						onClick={() => handleDelete(category, item._id)}
						className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
					>
						Delete
					</button>
					{item.status !== "completed" && (
						<>
							<button
								onClick={() => toggleWorking(item._id)}
								className={`px-3 py-1 text-sm font-medium rounded-lg ${
									workingOn.has(item._id)
										? "bg-yellow-600 text-white hover:bg-yellow-700"
										: "bg-blue-600 text-white hover:bg-blue-700"
								}`}
							>
								{workingOn.has(item._id) ? "Working..." : "Take Task"}
							</button>
							{showCompletedButton && (
								<button
									onClick={() => markAsCompleted(category, item._id)}
									className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
								>
									Mark as Completed
								</button>
							)}
						</>
					)}
				</div>
			</div>
		</li>
	);

	const hasPendingData = Object.values(data).some((items) =>
		items.some((i) => i.status !== "completed")
	);
	const hasCompletedData = Object.values(data).some((items) =>
		items.some((i) => i.status === "completed")
	);

	return (
		<div className="p-10 space-y-16">
			<div>
				<h1 className="flex items-center gap-2 mb-8 text-4xl font-bold text-green-700">
					♻️ Recycling Requests
				</h1>
				{error && <p className="mb-4 text-lg text-red-600">{error}</p>}

				{!hasPendingData ? (
					<p className="text-lg text-center text-gray-500">Nothing to Show</p>
				) : (
					<div className="grid gap-10 md:grid-cols-2">
						{categories.map((cat) => {
							const pendingItems = data[cat.key].filter(
								(i) => i.status !== "completed"
							);
							if (pendingItems.length === 0) return null;
							return (
								<div
									key={cat.key}
									className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl"
								>
									<h2 className="mb-4 text-2xl font-semibold text-green-800">
										{cat.title}
									</h2>
									<ul className="pr-2 overflow-y-auto max-h-128 scrollbar-thin scrollbar-thumb-gray-300">
										{pendingItems.map((item) =>
											renderSubmissionCard(cat.key, item, true)
										)}
									</ul>
								</div>
							);
						})}
					</div>
				)}
			</div>

			<div>
				<h1 className="flex items-center gap-2 mb-8 text-3xl font-bold text-gray-700">
					✅ Recycling Requests Completed
				</h1>
				{!hasCompletedData ? (
					<p className="text-lg text-center text-gray-500">
						No completed tasks yet.
					</p>
				) : (
					<div className="grid gap-10 md:grid-cols-2">
						{categories.map((cat) => {
							const completedItems = data[cat.key].filter(
								(i) => i.status === "completed"
							);
							if (completedItems.length === 0) return null;
							return (
								<div
									key={cat.key}
									className="p-6 border border-gray-300 shadow bg-gray-50 rounded-2xl"
								>
									<h2 className="mb-4 text-xl font-semibold text-gray-800">
										{cat.title}
									</h2>
									<ul className="pr-2 overflow-y-auto max-h-128 scrollbar-thin scrollbar-thumb-gray-300">
										{completedItems.map((item) =>
											renderSubmissionCard(cat.key, item)
										)}
									</ul>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
