import { getPhoneNumber } from "@/sign-in/auth";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Toast from "components/Toast";
import "react-toastify/dist/ReactToastify.css";
import { usePoints } from "context/pointsContext";
import { facility } from "@/data/facility";
import { useSession } from "next-auth/react";

interface Brand {
	accessoryType: string;
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
	accessoryType: string;
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
	accessoryType: string;
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

const Acessories: React.FC = () => {
	const [selectedAccessoryType, setSelectedAccessoryType] = useState("");
	const [selectedModel, setSelectedModel] = useState("");
	const [selectedFacility, setSelectedFacility] = useState("");
	const [pickupDate, setPickupDate] = useState<string>("");
	const [pickupTime, setPickupTime] = useState<string>("");
	const [accessory, setAccessory] = useState<Brand[]>([]);
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
		const accessoryType = event.target.value;
		setSelectedAccessoryType(accessoryType);
		setSelectedModel("");
		setSelectedFacility("");

		if (accessoryType) {
			const selectedAccessory = accessory.find(
				(b) => b.accessoryType === accessoryType
			);
			if (selectedAccessory) {
				setModels(selectedAccessory.models);
			}
		} else {
			setModels([]); // <-- added reset on clearing selection
		}
	};

	useEffect(() => {
		const fetchBrandsAndModels = () => {
			const brandsData: Brand[] = [
				{
					accessoryType: "Headphones",
					models: [
						"Sony WH-1000XM4 (2020)",
						"Bose QuietComfort 35 II (2018)",
						"AirPods Pro (2019)",
						"Sennheiser HD 660 S (2018)",
						"JBL Free X (2018)",
						"Sony WH-1000XM5 (2021)",
						"Bose QuietComfort 45 (2021)",
						"Apple AirPods Max (2020)",
						"Sennheiser Momentum 3 Wireless (2019)",
						"JBL Live 650BTNC (2019)",
					],
				},
				{
					accessoryType: "Chargers",
					models: [
						"Anker PowerPort (2018)",
						"Belkin Boost Charge (2019)",
						"Apple 20W USB-C Power Adapter (2020)",
						"Samsung Super Fast Charger (2019)",
						"RAVPower 60W 6-Port USB Charger (2019)",
						"Anker Nano II 65W (2021)",
						"Belkin Boost Charge Pro 3-in-1 (2022)",
						"Apple 35W Dual USB-C Charger (2022)",
						"Samsung 45W USB-C Super Fast Charger (2019)",
						"RAVPower 90W 2-Port USB-C Charger (2020)",
					],
				},
				{
					accessoryType: "Laptop Bags",
					models: [
						"SwissGear Travel Gear 1900 Scansmart TSA Laptop Backpack (2019)",
						"AmazonBasics Laptop Backpack (2018)",
						"Targus Drifter II Backpack (2019)",
						"KROSER Laptop Backpack (2020)",
						"Matein Travel Laptop Backpack (2019)",
						"Samsonite Xenon 3.0 Slim Backpack (2020)",
						"Thule Subterra Backpack 23L (2021)",
						"Hynes Eagle Business Laptop Backpack (2019)",
						"Timbuk2 Uptown Laptop Backpack (2022)",
						"Incase Icon Lite Backpack (2020)",
					],
				},
				{
					accessoryType: "External Hard Drives",
					models: [
						"WD Black 5TB P10 Game Drive (2019)",
						"Seagate Backup Plus Slim 2TB (2019)",
						"Samsung T5 Portable SSD (2018)",
						"LaCie Rugged Mini 4TB (2019)",
						"Toshiba Canvio Basics 1TB (2018)",
						"WD My Passport SSD 2TB (2020)",
						"Seagate FireCuda Gaming SSD 2TB (2021)",
						"Samsung T7 Touch Portable SSD (2020)",
						"LaCie Rugged SSD Pro 1TB (2019)",
						"Toshiba Canvio Advance 4TB (2022)",
					],
				},
				{
					accessoryType: "Smartwatches",
					models: [
						"Apple Watch Series 7 (2021)",
						"Samsung Galaxy Watch 4 (2021)",
						"Fitbit Charge 5 (2021)",
						"Garmin Venu 2 (2021)",
						"Amazfit GTR 3 (2021)",
						"Apple Watch Series 8 (2022)",
						"Samsung Galaxy Watch 5 (2022)",
						"Fitbit Versa 4 (2022)",
						"Garmin Fenix 7 (2022)",
						"Amazfit Bip U Pro (2020)",
					],
				},
				{
					accessoryType: "Mouse and Keyboards",
					models: [
						"Logitech MX Master 3 (2019)",
						"Razer DeathAdder Elite (2018)",
						"Apple Magic Keyboard (2019)",
						"Corsair K95 RGB Platinum XT (2020)",
						"HP Wireless Elite Keyboard (2018)",
						"Logitech MX Keys (2019)",
						"Razer Basilisk V3 (2021)",
						"Apple Magic Keyboard with Touch ID (2021)",
						"Corsair K70 RGB Pro (2021)",
						"HP Omen Vector Wireless Mouse (2020)",
					],
				},
				{
					accessoryType: "Power Banks",
					models: [
						"Anker PowerCore 26800mAh (2019)",
						"RAVPower Portable Charger 20000mAh (2019)",
						"Xiaomi Mi Power Bank 3 (2019)",
						"AUKEY Portable Charger 10000mAh (2020)",
						"Samsung Wireless Charger Portable Battery 10,000mAh (2019)",
						"Anker PowerCore III Elite 25600 87W (2020)",
						"RAVPower PD Pioneer 20000mAh 60W (2021)",
						"Xiaomi Redmi Power Bank 20000mAh 22.5W (2021)",
						"AUKEY Basix Pro Wireless Power Bank (2022)",
						"Samsung Wireless Charger Battery Pack 10000mAh (2022)",
					],
				},
			];

			setAccessory(brandsData);
			setModels(models);
		};
		fetchBrandsAndModels();
	}, [models]);

	const email = session?.user?.email;

	useEffect(() => {
		const initialPhone = getPhoneNumber();
		if (initialPhone) setPhone("");
	}, []);

	const handleSubmit = async () => {
		const recycleItem = `${selectedAccessoryType} ${selectedModel}`.trim();
		const cleanedPhone = (phone ?? "").replace(/\D/g, "");
		const isValidPhone = cleanedPhone.length >= 10 && cleanedPhone.length <= 13;
		const userId = session?.user?.id || session?.user?.email;

		if (!userId) {
			alert("Please log in before submitting");
			return;
		}

		if (
			!facilityData.length ||
			!selectedAccessoryType ||
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
			accessoryType: selectedAccessoryType,
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
			const bookingResponse = await fetch("/api/recycle/accessories", {
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

			setSelectedAccessoryType("");
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
				Accessories Recycling
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
						htmlFor="accessoryType"
						className="block text-2xl font-medium text-gray-600"
					>
						Select Type:
					</label>
					<select
						id="accessoryType"
						value={selectedAccessoryType}
						onChange={handleBrandChange}
						className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
					>
						<option value="">Select Accessory Type:</option>
						{accessory.map((accessoryType) => (
							<option
								key={accessoryType.accessoryType}
								value={accessoryType.accessoryType}
							>
								{accessoryType.accessoryType}
							</option>
						))}
					</select>
				</div>

				<div className="mb-4">
					<label
						htmlFor="model"
						className="block text-2xl font-medium text-gray-600"
					>
						Select Company/Model:
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
						onChange={(e) =>
							setRecycleItemPrice(
								e.target.value === "" ? "" : Number(e.target.value)
							)
						}
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

export default Acessories;
