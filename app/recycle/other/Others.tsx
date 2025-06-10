import {
	getEmail,
	getPhoneNumber,
	getUserID,
	isAuthenticated,
} from "@/sign-in/auth";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Toast from "components/Toast";
import "react-toastify/dist/ReactToastify.css";
import { usePoints } from "context/pointsContext";
import { facility } from "@/data/facility";
import { useSession } from "next-auth/react";

interface Brand {
	brand: string;
	models: string[];
}

interface Facility {
	name: string;
	capacity: number;
	lon: number;
	lat: number;
	phone: string;
	time: string;
	verified: boolean;
	address: string;
}

interface BookingData {
	userId: string;
	deviceType: string;
	deviceCompanyOrModel: string;
	recycleItemPrice: number;
	pickupDate: string;
	pickupTime: string;
	address: string;
	phone: string;
	selectedFacility: string;
}

interface BookingPayload {
	userId: string;
	name?: string;
	email: string;
	phone: string;
	deviceType: string;
	deviceCompanyOrModel: string;
	recycleItemPrice: number;
	pickupDate: string;
	pickupTime: string;
	address: string;
	selectedFacility: string;
}

const Others: React.FC = () => {
	const [deviceType, setDeviceType] = useState("");
	const [deviceCompanyOrModel, setDeviceCompanyOrModel] = useState("");
	const [selectedFacility, setSelectedFacility] = useState("");
	const [pickupDate, setPickupDate] = useState<string>("");
	const [pickupTime, setPickupTime] = useState<string>("");
	const [address, setAddress] = useState("");
	const [bookingData, setBookingData] = useState<BookingData[]>([]);
	const [facilityData, setFacilityData] = useState<Facility[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [recycleItemPrice, setRecycleItemPrice] = useState<number | string>("");
	const [toastMessage, setToastMessage] = useState<string | null>(null);
	const [phone, setPhone] = useState("");
	const { data: session } = useSession();
	const userName = session?.user?.fullname || "";
	const { setPoints } = usePoints();

	useEffect(() => {
		setFacilityData(facility);
	}, []);

	const email = session?.user?.email;

	useEffect(() => {
		const initialPhone = getPhoneNumber();
		if (initialPhone) setPhone("");
	}, []);

	const handleSubmit = async () => {
		const recycleItem = `${deviceType} ${deviceCompanyOrModel}`.trim();
		const cleanedPhone = (phone ?? "").replace(/\D/g, "");
		const isValidPhone = cleanedPhone.length >= 10 && cleanedPhone.length <= 13;
		const userId = session?.user?.id || session?.user?.email;

		if (!userId) {
			alert("Please log in before submitting");
			return;
		}

		// Validation
		if (
			!facilityData.length ||
			!deviceType ||
			!deviceCompanyOrModel ||
			!selectedFacility ||
			!recycleItemPrice ||
			!pickupDate ||
			!pickupTime ||
			!address?.trim() ||
			!email?.trim() ||
			!userId ||
			!isValidPhone
		) {
			setToastMessage(
				"Please fill in all the required fields with valid data."
			);
			return;
		}

		const newBooking: BookingPayload = {
			userId,
			deviceType: deviceType,
			deviceCompanyOrModel: deviceCompanyOrModel,
			recycleItemPrice: Number(recycleItemPrice),
			pickupDate,
			pickupTime,
			address,
			phone: cleanedPhone,
			selectedFacility,
			email,
			name: userName,
		};

		setBookingData([...bookingData, newBooking]);
		setIsLoading(true);

		try {
			const bookingResponse = await fetch("/api/recycle/others", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newBooking),
				credentials: "include",
			});

			if (!bookingResponse.ok) {
				const errorText = await bookingResponse.text();
				console.error("Booking API Error:", bookingResponse.status, errorText);
				throw new Error("Booking submission failed");
			}

			const pointsEarned = Math.round(Number(recycleItemPrice) * 0.15);

			await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/update-points`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ userId, points: pointsEarned }),
				}
			);

			setPoints((prev) => prev + pointsEarned);
			setToastMessage(
				`Submitted successfully! You earned ${pointsEarned} points.`
			);

			setDeviceType("");
			setDeviceCompanyOrModel("");
			setSelectedFacility("");
			setRecycleItemPrice("");
			setPickupDate("");
			setPickupTime("");
			setAddress("");
			setPhone("");
		} catch (error) {
			console.error("Error during submission:", error);
			setToastMessage(
				"Something went wrong during submission. Please try again."
			);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="loader-container">
				<div className="loader" />
				<div className="loading-text">Submitting...</div>
			</div>
		);
	}

	const currentDate = new Date().toISOString().split("T")[0];

	return (
		<div className="container p-8 mx-auto">
			{toastMessage && (
				<Toast message={toastMessage} onClose={() => setToastMessage(null)} />
			)}

			<h1 className="p-6 mb-6 text-4xl font-bold text-center">
				Other Product Recycling
			</h1>
			<form
				className="grid justify-center grid-cols-1 gap-4 mx-8 md:grid-cols-2 md:mx-0"
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<div className="mb-4">
					<label
						htmlFor="brand"
						className="block text-2xl font-medium text-gray-600"
					>
						Device Type:
					</label>
					<input
						type="text"
						id="brand"
						value={deviceType}
						onChange={(e) => setDeviceType(e.target.value)}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="model"
						className="block text-2xl font-medium text-gray-600"
					>
						Device Company/Model:
					</label>
					<input
						type="text"
						id="model"
						value={deviceCompanyOrModel}
						onChange={(e) => setDeviceCompanyOrModel(e.target.value)}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="recycleItemPrice"
						className="block text-2xl font-medium text-gray-600"
					>
						Recycle Item Price:
					</label>
					<input
						type="number"
						id="recycleItemPrice"
						value={recycleItemPrice}
						onChange={(e) => setRecycleItemPrice(Number(e.target.value))}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="pickupDate"
						className="block text-2xl font-medium text-gray-600"
					>
						Pickup Date:
					</label>
					<input
						type="date"
						id="pickupDate"
						value={pickupDate}
						min={currentDate}
						onChange={(e) => setPickupDate(e.target.value)}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="pickupTime"
						className="block text-2xl font-medium text-gray-600"
					>
						Pickup Time:
					</label>
					<input
						type="time"
						id="pickupTime"
						value={pickupTime}
						onChange={(e) => setPickupTime(e.target.value)}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="address"
						className="block text-2xl font-medium text-gray-600"
					>
						Pickup Address:
					</label>
					<input
						type="text"
						id="address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
						placeholder="e.g. 123 Main St, Green Park, New Delhi"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="phone"
						className="block text-2xl font-medium text-gray-600"
					>
						Phone:
					</label>
					<input
						type="tel"
						id="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						onBlur={() => setPhone((phone ?? "").replace(/\D/g, ""))}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="facility"
						className="block text-2xl font-medium text-gray-600"
					>
						Select Facility:
					</label>
					<select
						id="facility"
						value={selectedFacility}
						onChange={(e) => setSelectedFacility(e.target.value)}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
					>
						<option value="">Select Facility</option>
						{facilityData.map((facility, index) => (
							<option key={`${facility.name}-${index}`} value={facility.name}>
								{" "}
								{facility.name}
							</option>
						))}
					</select>

					{selectedFacility && (
						<p className="mt-2 text-lg text-gray-600">
							{facilityData.find((f) => f.name === selectedFacility)?.address}
						</p>
					)}
				</div>

				<div className="mb-4 md:col-span-2">
					<button
						type="submit"
						className="w-full px-6 py-3 text-xl text-white rounded-md bg-emerald-700"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default Others;
