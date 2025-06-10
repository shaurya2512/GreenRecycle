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

const Laptop: React.FC = () => {
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
					brand: "Dell",
					models: [
						"Dell XPS 13 (2020)",
						"Dell XPS 15 (2021)",
						"Dell Inspiron 14 5000 (2022)",
						"Dell G3 15 Gaming (2020)",
						"Dell Latitude 7420 (2021)",
						"Dell Alienware M15 R6 (2021)",
						"Dell XPS 13 Plus (2022)",
						"Dell Inspiron 16 Plus (2023)",
						"Dell G15 Ryzen Edition (2022)",
						"Dell Latitude 9430 2-in-1 (2023)",
					],
				},
				{
					brand: "HP",
					models: [
						"HP Spectre x360 14 (2021)",
						"HP Pavilion 15 (2020)",
						"HP Omen 15 (2021)",
						"HP Elite Dragonfly G3 (2023)",
						"HP Envy 13 (2022)",
						"HP Spectre x360 16 (2022)",
						"HP Omen 16 (2023)",
						"HP Pavilion Aero 13 (2022)",
						"HP EliteBook 840 G9 (2023)",
					],
				},
				{
					brand: "Lenovo",
					models: [
						"Lenovo ThinkPad X1 Carbon Gen 9 (2021)",
						"Lenovo Legion Y540 (2019)",
						"Lenovo IdeaPad Flex 5 (2020)",
						"Lenovo Yoga 9i (2021)",
						"Lenovo ThinkBook 14s Yoga (2022)",
						"Lenovo ThinkPad X1 Carbon Gen 11 (2023)",
						"Lenovo Legion 5 Pro (2022)",
						"Lenovo IdeaPad 5 Pro (2023)",
						"Lenovo Yoga Slim 7i Carbon (2021)",
					],
				},
				{
					brand: "Asus",
					models: [
						"Asus ROG Zephyrus G14 (2020)",
						"Asus VivoBook 15 (2021)",
						"Asus TUF Gaming F15 (2021)",
						"Asus ZenBook 13 OLED (2022)",
						"Asus ROG Strix Scar 15 (2022)",
						"Asus ROG Flow X13 (2021)",
						"Asus ZenBook Pro Duo 14 (2022)",
						"Asus TUF Dash F15 (2022)",
						"Asus VivoBook S14 (2023)",
					],
				},
				{
					brand: "Acer",
					models: [
						"Acer Predator Helios 300 (2021)",
						"Acer Aspire 5 (2022)",
						"Acer Swift 3 (2021)",
						"Acer Nitro 5 (2022)",
						"Acer Chromebook Spin 713 (2020)",
						"Acer Predator Triton 500 SE (2022)",
						"Acer Swift X (2022)",
						"Acer Aspire 7 (2023)",
						"Acer Chromebook 514 (2023)",
					],
				},
				{
					brand: "Apple",
					models: [
						"MacBook Air M1 (2020)",
						"MacBook Pro 13 M1 (2020)",
						"MacBook Pro 14 (2021)",
						"MacBook Pro 16 (2021)",
						"MacBook Air M2 (2022)",
						"MacBook Pro 13 M2 (2022)",
						"MacBook Pro 16 M2 Pro (2023)",
					],
				},
				{
					brand: "MSI",
					models: [
						"MSI GS65 Stealth (2019)",
						"MSI Prestige 14 Evo (2021)",
						"MSI Modern 14 (2022)",
						"MSI Alpha 15 (2021)",
						"MSI Raider GE78 HX (2023)",
						"MSI Creator Z16 (2022)",
						"MSI Pulse GL66 (2022)",
					],
				},
				{
					brand: "Sony",
					models: ["Sony VAIO S15 (2019)", "Sony VAIO SX14 (2019)"],
				},
				{
					brand: "LG",
					models: [
						"LG Gram 14 (2021)",
						"LG Gram 16 (2022)",
						"LG Gram 17 (2023)",
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
			const bookingResponse = await fetch("/api/recycle/laptop", {
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
				Laptop Recycling
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

export default Laptop;
