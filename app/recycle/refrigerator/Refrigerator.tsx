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

const Refrigerator: React.FC = () => {
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
						"Samsung RT28M3022S8 Double Door Refrigerator (2018)",
						"Samsung RT42M553ES8 Top Freezer Refrigerator (2019)",
						"Samsung RS74T5F01B4 Side-by-Side Refrigerator (2020)",
						"Samsung RT65K7058BS Frost-Free Double Door Refrigerator (2021)",
						"Samsung RR20T182XR8/NL Single Door Refrigerator (2022)",
						"Samsung Family Hub 4-Door Flex RF28T5001SR (2020)",
						"Samsung Bespoke RF23A9770SR (2021)",
						"Samsung RF28R7201SR Flex Side-by-Side Refrigerator (2021)",
						"Samsung RT38K5532S8 Single Door Refrigerator (2019)",
						"Samsung RB38T775DS9/HL Frost Free Double Door Refrigerator (2021)",
					],
				},
				{
					brand: "LG",
					models: [
						"LG GL-I292RPZL Double Door Refrigerator (2018)",
						"LG GL-T292RPZY Double Door Frost-Free Refrigerator (2019)",
						"LG GC-B247SLUV Side-by-Side Refrigerator (2020)",
						"LG GL-B201AHPY Single Door Refrigerator (2018)",
						"LG GL-D201ASOX Single Door Refrigerator (2019)",
						"LG InstaView Door-in-Door Refrigerator LFXS26596S (2020)",
						"LG Side-by-Side Refrigerator LSXS26366S (2021)",
						"LG Double Door Refrigerator GL-T302RPZY (2021)",
						"LG Frost Free Refrigerator GL-B302RPPY (2021)",
						"LG Bottom Freezer Refrigerator BCD-621NSUV (2022)",
					],
				},
				{
					brand: "Whirlpool",
					models: [
						"Whirlpool IF INV CNV 278 ELT Double Door Refrigerator (2018)",
						"Whirlpool NEO IF 278 ELT Double Door Refrigerator (2019)",
						"Whirlpool FP 263D Protton Roy Triple Door Refrigerator (2020)",
						"Whirlpool WDE 205 CLS 3S Single Door Refrigerator (2018)",
						"Whirlpool WDE 205 ROY 3S Single Door Refrigerator (2018)",
						"Whirlpool 465 L Frost Free Side-by-Side Refrigerator WSF 655 SD (2021)",
						"Whirlpool Double Door Refrigerator 258 IMPC ROY (2019)",
						"Whirlpool 265 L Single Door Refrigerator WDE 265 CLS 3S (2020)",
						"Whirlpool 190 L Single Door Refrigerator WDE 205 CLS (2018)",
						"Whirlpool FP 263D Protton Roy Triple Door Refrigerator (2020)",
					],
				},
				{
					brand: "Haier",
					models: [
						"Haier HRF 618SS Side-by-Side Refrigerator (2019)",
						"Haier HRB-2764PBG-E Double Door Refrigerator (2018)",
						"Haier HED-20FDS Single Door Refrigerator (2019)",
						"Haier HRD-2204BS-R 5 Star Single Door Refrigerator (2020)",
						"Haier HRF-619KS Side-by-Side Refrigerator (2019)",
						"Haier HRF-522WSAA Side-by-Side Refrigerator (2020)",
						"Haier HRB-3404PBG-E Double Door Refrigerator (2021)",
						"Haier HED-25SS Single Door Refrigerator (2021)",
						"Haier HRF-540WSAA Frost-Free Side-by-Side Refrigerator (2022)",
						"Haier HBM-3104PBG-E Double Door Refrigerator (2022)",
					],
				},
				{
					brand: "Godrej",
					models: [
						"Godrej RT EON 311 PD 3.4 Double Door Refrigerator (2019)",
						"Godrej RD EDGEPRO 225 C 33 TAFQ Single Door Refrigerator (2018)",
						"Godrej RF GF 2362PTH 236 L Double Door Refrigerator (2020)",
						"Godrej RT EON 241 P 3.4 Double Door Refrigerator (2019)",
						"Godrej RD EDGESX 185 CT 2.2 Single Door Refrigerator (2018)",
						"Godrej Eon 315 PB PTC 4.4 Double Door Refrigerator (2021)",
						"Godrej RD EDGE PRO 225 CT 3 Star Single Door Refrigerator (2020)",
						"Godrej RF EON 260 PTC 3.6 Double Door Refrigerator (2021)",
						"Godrej RT EON 260 P 4.4 Double Door Refrigerator (2021)",
						"Godrej Edge Pro 190 CT 3 Star Single Door Refrigerator (2019)",
					],
				},
				{
					brand: "Panasonic",
					models: [
						"Panasonic NR-BG311VSS3 Double Door Refrigerator (2018)",
						"Panasonic NR-BR347VSX1 Double Door Refrigerator (2019)",
						"Panasonic NR-A195STWRT Single Door Refrigerator (2018)",
						"Panasonic NR-BS60MSX1 Side-by-Side Refrigerator (2020)",
						"Panasonic NR-A195RSTL Single Door Refrigerator (2019)",
						"Panasonic NR-BS60MSX2 Side-by-Side Refrigerator (2021)",
						"Panasonic NR-BS69MSX2 Side-by-Side Refrigerator (2022)",
						"Panasonic NR-BL308VSS3 Double Door Refrigerator (2020)",
						"Panasonic NR-BS62MSX1 Side-by-Side Refrigerator (2021)",
						"Panasonic NR-BG344VSS3 Double Door Refrigerator (2021)",
					],
				},
				{
					brand: "Bosch",
					models: [
						"Bosch KDN43VS30I Double Door Refrigerator (2019)",
						"Bosch KDN56XI30I Side-by-Side Refrigerator (2020)",
						"Bosch KDN30VS30I Double Door Refrigerator (2018)",
						"Bosch KAN56V40AU Side-by-Side Refrigerator (2021)",
						"Bosch KDN46XI30I Double Door Refrigerator (2020)",
						"Bosch KDN86VI30I Side-by-Side Refrigerator (2022)",
						"Bosch KDN75VI30I Side-by-Side Refrigerator (2021)",
						"Bosch KAN93VI30I Side-by-Side Refrigerator (2023)",
						"Bosch KDN87VI30I Side-by-Side Refrigerator (2023)",
						"Bosch KDN78VI30I Double Door Refrigerator (2022)",
					],
				},
				{
					brand: "Hitachi",
					models: [
						"Hitachi R-WB550PND2 Frost Free Double Door Refrigerator (2020)",
						"Hitachi R-H350PND4K Single Door Refrigerator (2019)",
						"Hitachi R-S800GPUC Side-by-Side Refrigerator (2021)",
						"Hitachi R-VG470PND3 Frost Free Double Door Refrigerator (2019)",
						"Hitachi R-M700AGPU2X Side-by-Side Refrigerator (2022)",
						"Hitachi R-H310P7PB Single Door Refrigerator (2018)",
						"Hitachi R-WB730PND5 Frost Free French Door Refrigerator (2023)",
						"Hitachi R-VX490PND Frost Free Double Door Refrigerator (2021)",
						"Hitachi R-VG400PND3 Double Door Refrigerator (2020)",
						"Hitachi R-W660PND3 Frost Free French Door Refrigerator (2022)",
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
			const bookingResponse = await fetch("/api/recycle/refrigerators", {
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
				Refrigerator Recycling
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

export default Refrigerator;
