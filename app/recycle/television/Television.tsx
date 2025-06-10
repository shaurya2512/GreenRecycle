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

const Television: React.FC = () => {
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
						"Samsung QN90A Neo QLED 4K TV (2021)",
						"Samsung TU8000 Crystal UHD 4K TV (2020)",
						"Samsung Frame QLED 4K TV (2019)",
						"Samsung Q70T QLED 4K TV (2020)",
						"Samsung TU8500 Crystal UHD 4K TV (2020)",
						"Samsung QN85B Neo QLED 4K TV (2022)",
						"Samsung The Serif QLED 4K TV (2021)",
						"Samsung Q80A QLED 4K TV (2021)",
						"Samsung The Frame LS03B QLED 4K TV (2022)",
						"Samsung QN900A Neo QLED 8K TV (2021)",
					],
				},
				{
					brand: "LG",
					models: [
						"LG C1 OLED 4K TV (2021)",
						"LG NanoCell 85 Series 4K TV (2020)",
						"LG GX OLED 4K TV (2020)",
						"LG UN7300 4K UHD TV (2020)",
						"LG B9 OLED 4K TV (2019)",
						"LG G2 OLED 4K TV (2022)",
						"LG C2 OLED 4K TV (2022)",
						"LG QNED MiniLED 90 Series (2021)",
						"LG UP8000 4K UHD TV (2021)",
						"LG Z2 OLED 8K TV (2021)",
					],
				},
				{
					brand: "Sony",
					models: [
						"Sony A80J OLED 4K TV (2021)",
						"Sony X90J Bravia XR 4K TV (2021)",
						"Sony X800H 4K UHD TV (2020)",
						"Sony A9G Master Series OLED 4K TV (2019)",
						"Sony X950H 4K UHD TV (2020)",
						"Sony A90J OLED 4K TV (2021)",
						"Sony X85J 4K UHD TV (2021)",
						"Sony X95K 4K UHD TV (2022)",
						"Sony A80K OLED 4K TV (2022)",
						"Sony X90K 4K UHD TV (2022)",
					],
				},
				{
					brand: "TCL",
					models: [
						"TCL 6-Series 4K QLED TV (2020)",
						"TCL 5-Series 4K QLED TV (2020)",
						"TCL 4-Series 4K UHD TV (2020)",
						"TCL 8-Series QLED 4K TV (2021)",
						"TCL 3-Series HD LED Roku Smart TV (2021)",
						"TCL 6-Series R655 8K QLED TV (2022)",
						"TCL 5-Series R546 4K QLED TV (2022)",
						"TCL 4-Series S435 4K UHD TV (2022)",
						"TCL 8-Series Q735 8K QLED TV (2023)",
						"TCL 5-Series S535 4K QLED TV (2023)",
					],
				},
				{
					brand: "Vizio",
					models: [
						"Vizio P-Series Quantum X 4K TV (2020)",
						"Vizio M-Series Quantum 4K TV (2020)",
						"Vizio OLED 4K TV (2020)",
						"Vizio V-Series 4K UHD TV (2020)",
						"Vizio D-Series HD LED TV (2019)",
						"Vizio P-Series Quantum 2021 (2021)",
						"Vizio M-Series 2021 (2021)",
						"Vizio V-Series 2021 (2021)",
						"Vizio OLED 2021 (2021)",
						"Vizio P-Series Quantum 2022 (2022)",
					],
				},
				{
					brand: "Hisense",
					models: [
						"Hisense U8G Quantum Series 4K ULED TV (2021)",
						"Hisense H9G Quantum Series 4K ULED TV (2020)",
						"Hisense H8G Quantum Series 4K ULED TV (2019)",
						"Hisense H65G Series 4K UHD TV (2021)",
						"Hisense H4G Series HD LED Roku TV (2020)",
						"Hisense U7G Series 4K ULED TV (2021)",
						"Hisense A6 Series 4K UHD TV (2022)",
						"Hisense U9DG Series 8K ULED TV (2022)",
						"Hisense A8 Series 4K ULED TV (2023)",
						"Hisense U6G Series 4K ULED TV (2022)",
					],
				},
				{
					brand: "Panasonic",
					models: [
						"Panasonic JX800 4K UHD TV (2020)",
						"Panasonic HX800 4K UHD TV (2020)",
						"Panasonic HZ2000 OLED 4K TV (2021)",
						"Panasonic GX800 4K UHD TV (2019)",
						"Panasonic FX800 4K UHD TV (2019)",
						"Panasonic JZ2000 OLED 4K TV (2022)",
						"Panasonic LX800 4K UHD TV (2021)",
						"Panasonic HZ1500 OLED 4K TV (2023)",
						"Panasonic JX940 4K UHD TV (2022)",
						"Panasonic JX940 8K UHD TV (2023)",
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
			const bookingResponse = await fetch("/api/recycle/television", {
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
				Television Recycling
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
						{brands.map((brand, index) => (
							<option key={`${brand.brand}-${index}`} value={brand.brand}>
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

export default Television;
