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
	brand: string;
	model: string;
	recycleItemPrice: number;
	pickupDate: string;
	pickupTime: string;
	address: string;
	phone: string;
	selectedFacility: string;
}

type BookingPayload = {
	userId: string;
	brand: string;
	model: string;
	recycleItemPrice: number;
	pickupDate: string;
	pickupTime: string;
	address: string;
	phone: string;
	selectedFacility: string;
	email: string;
	name?: string;
};

const Smartphone: React.FC = () => {
	const [selectedBrand, setSelectedBrand] = useState("");
	const [selectedModel, setSelectedModel] = useState("");
	const [selectedFacility, setSelectedFacility] = useState("");
	const [pickupDate, setPickupDate] = useState<string>("");
	const [pickupTime, setPickupTime] = useState<string>("");
	const [brands, setBrands] = useState<Brand[]>([]);
	const [address, setAddress] = useState("");
	const [models, setModels] = useState<string[]>([]);
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

	const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const brand = event.target.value;
		setSelectedBrand(brand);
		setSelectedModel("");
		setSelectedFacility("");

		if (brand) {
			const selectedBrand = brands.find((b) => b.brand === brand);
			if (selectedBrand) {
				setModels(selectedBrand.models);
			}
		}
	};

	useEffect(() => {
		const fetchBrandsAndModels = () => {
			const brandsData: Brand[] = [
				{
					brand: "Samsung",
					models: [
						"Galaxy S21 (2021)",
						"Galaxy S20 (2020)",
						"Galaxy Note 20 (2020)",
						"Galaxy A52 (2021)",
						"Galaxy M32 (2021)",
						"Galaxy S22 (2022)",
						"Galaxy Z Fold 3 (2021)",
						"Galaxy Z Flip 3 (2021)",
						"Galaxy A72 (2021)",
						"Galaxy M53 5G (2022)",
					],
				},
				{
					brand: "Apple",
					models: [
						"iPhone 13 (2021)",
						"iPhone 12 (2020)",
						"iPhone SE (2020) (2020)",
						"iPhone 11 (2019)",
						"iPhone XR (2018)",
						"iPhone 14 (2022)",
						"iPhone 14 Pro (2022)",
						"iPhone 13 Pro Max (2021)",
						"iPhone 12 Mini (2020)",
						"iPhone SE (2022) (2022)",
					],
				},
				{
					brand: "Xiaomi",
					models: [
						"Redmi Note 10 (2021)",
						"Mi 11X (2021)",
						"Poco X3 (2020)",
						"Redmi 9 (2020)",
						"Mi 10T (2020)",
						"Redmi Note 11 Pro (2022)",
						"Mi 12 (2022)",
						"Poco F4 (2022)",
						"Redmi K50 (2022)",
						"Redmi Note 12 (2022)",
					],
				},
				{
					brand: "OnePlus",
					models: [
						"OnePlus 9 Pro (2021)",
						"OnePlus 9 (2021)",
						"OnePlus 8T (2020)",
						"OnePlus Nord (2020)",
						"OnePlus 8 (2020)",
						"OnePlus 10 Pro (2022)",
						"OnePlus Nord 2 (2022)",
						"OnePlus 11 (2023)",
						"OnePlus Nord CE 2 (2022)",
						"OnePlus 10T (2022)",
					],
				},
				{
					brand: "Realme",
					models: [
						"Realme 8 Pro (2021)",
						"Realme Narzo 30 Pro (2021)",
						"Realme 7 (2020)",
						"Realme C11 (2020)",
						"Realme X7 Max (2021)",
						"Realme GT 2 (2022)",
						"Realme 9 Pro+ (2022)",
						"Realme Narzo 50 (2022)",
						"Realme GT Neo 3 (2022)",
						"Realme C35 (2022)",
					],
				},
				{
					brand: "Vivo",
					models: [
						"Vivo V21 (2021)",
						"Vivo Y73 (2021)",
						"Vivo X60 Pro (2021)",
						"Vivo S1 Pro (2019)",
						"Vivo Y20G (2021)",
						"Vivo V23 5G (2022)",
						"Vivo X80 Pro (2022)",
						"Vivo Y75 5G (2022)",
						"Vivo T1 5G (2022)",
						"Vivo V25 (2022)",
					],
				},
				{
					brand: "OPPO",
					models: [
						"OPPO F19 Pro (2021)",
						"OPPO Reno 5 Pro (2021)",
						"OPPO A74 (2021)",
						"OPPO A53 (2020)",
						"OPPO Find X3 Pro (2021)",
						"OPPO Reno 7 (2022)",
						"OPPO A96 (2022)",
						"OPPO Find X5 Pro (2022)",
						"OPPO A57 (2022)",
						"OPPO Reno 8 (2022)",
					],
				},
				{
					brand: "Nokia",
					models: [
						"Nokia 5.4 (2020)",
						"Nokia 3.4 (2020)",
						"Nokia 8.3 (2020)",
						"Nokia 2.4 (2020)",
						"Nokia 7.2 (2019)",
						"Nokia G50 (2021)",
						"Nokia X20 (2021)",
						"Nokia G21 (2022)",
						"Nokia C20 (2021)",
						"Nokia XR20 (2021)",
					],
				},
				{
					brand: "Motorola",
					models: [
						"Moto G60 (2021)",
						"Moto G40 Fusion (2021)",
						"Moto G30 (2021)",
						"Moto G9 Power (2020)",
						"Moto E7 Power (2020)",
						"Moto G200 5G (2021)",
						"Moto Edge 30 (2022)",
						"Moto G82 5G (2022)",
						"Moto E32 (2022)",
						"Moto G71 5G (2022)",
					],
				},
			];

			setBrands(brandsData);
			setModels(models);
		};
		fetchBrandsAndModels();
	}, [models]);

	const email = session?.user?.email;

	useEffect(() => {
		const initialPhone = getPhoneNumber();
		if (initialPhone) setPhone("");
	}, []);

	useEffect(() => {
		console.log("SESSION:", session);
	}, [session]);

	const handleSubmit = async () => {
		const recycleItem = `${selectedBrand} ${selectedModel}`.trim();
		const cleanedPhone = (phone ?? "").replace(/\D/g, "");
		const isValidPhone = cleanedPhone.length >= 10 && cleanedPhone.length <= 13;
		const userId = session?.user?.id || session?.user?.email;

		if (!userId) {
			alert("Please log in before submitting");
			return;
		}

		if (
			!facilityData.length ||
			!selectedBrand ||
			!selectedModel ||
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
			brand: selectedBrand,
			model: selectedModel,
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
			const bookingResponse = await fetch("/api/recycle/smartphone", {
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

			const data = await bookingResponse.json();

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

			setSelectedBrand("");
			setSelectedModel("");
			setSelectedFacility("");
			setRecycleItemPrice(0);
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
				Smartphone Recycling
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
						Select Brand:
					</label>
					<select
						id="brand"
						value={selectedBrand}
						onChange={handleBrandChange}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
					>
						<option value="">Select Brand</option>
						{brands.map((brand) => (
							<option key={brand.brand} value={brand.brand}>
								{brand.brand}
							</option>
						))}
					</select>
				</div>

				<div className="mb-4">
					<label
						htmlFor="model"
						className="block text-2xl font-medium text-gray-600"
					>
						Select Model:
					</label>
					<select
						id="model"
						value={selectedModel}
						onChange={(e) => setSelectedModel(e.target.value)}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
					>
						<option value="">Select Model</option>
						{models.map((model) => (
							<option key={model} value={model}>
								{model}
							</option>
						))}
					</select>
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
						onChange={(e) => setRecycleItemPrice(e.target.value)}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
					/>{" "}
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
						disabled={isLoading}
						className={`w-full px-6 py-3 text-xl text-white rounded-md ${
							isLoading ? "bg-gray-500" : "bg-emerald-700"
						}`}
					>
						{isLoading ? "Submitting..." : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Smartphone;
