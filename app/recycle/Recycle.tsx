import React from "react";
import { FiSmartphone, FiHeadphones, FiTv } from "react-icons/fi";
import { GiWashingMachine } from "react-icons/gi";
import { RiFridgeFill } from "react-icons/ri";
import { FaLaptop } from "react-icons/fa";
import { MdOutlineDevicesOther } from "react-icons/md";
import Link from "next/link";
import Head from "next/head";

interface RecycleCardProps {
	itemName: string;
	description: string;
	recyclingProcess: string;
	specialInstructions: string;
	icon: React.ReactNode;
	benefits: string;
}

const Recycle: React.FC = () => {
	const recycleItems: RecycleCardProps[] = [
		{
			itemName: "Smartphone",
			description:
				"Responsibly recycle your outdated or non-functional smartphones and recover valuable materials while protecting the environment.",
			recyclingProcess:
				"Our certified process includes data wiping, component dismantling, precious metal recovery, and safe disposal of hazardous materials.",
			specialInstructions:
				"Back up and factory reset your device to remove personal data. Remove SIM cards and memory cards before recycling.",
			benefits:
				"Recycling one smartphone can recover enough precious metals to prevent mining 80 kg of earth.",
			icon: <FiSmartphone size={48} className="text-emerald-500" />,
		},
		{
			itemName: "Laptop",
			description:
				"Give your old laptops and computers a sustainable afterlife through our specialized electronics recycling program.",
			recyclingProcess:
				"We implement secure data destruction, component disassembly, circuit board processing, and proper management of LCD screens and batteries.",
			specialInstructions:
				"Back up important files, perform a secure wipe of all storage drives, and remove any external batteries before recycling.",
			benefits:
				"Recycling laptops can recover 95% of materials including valuable metals like gold, silver, and rare earth elements.",
			icon: <FaLaptop size={48} className="text-emerald-500" />,
		},
		{
			itemName: "Accessories",
			description:
				"Properly dispose of cables, chargers, headphones, keyboards, and other electronic accessories that accumulate over time.",
			recyclingProcess:
				"We meticulously sort accessories by material type, separate metal components, process plastic elements, and safely handle any hazardous materials.",
			specialInstructions:
				"Bundle similar accessories together for easier processing and ensure batteries are removed from wireless devices.",
			benefits:
				"Recycling accessories prevents toxic materials from entering landfills and reduces the need for virgin resource extraction.",
			icon: <FiHeadphones size={48} className="text-emerald-500" />,
		},
		{
			itemName: "Television",
			description:
				"Ensure your old TVs, monitors, and display devices are recycled in an environmentally responsible manner.",
			recyclingProcess:
				"Our specialized process includes screen separation, hazardous material containment, circuit board recovery, and plastic/metal segregation for optimal recycling.",
			specialInstructions:
				"Transport with screen facing down to prevent shattering. Include all cables, stands, and remote controls when possible.",
			benefits:
				"Proper TV recycling prevents lead, mercury, and flame retardants from contaminating soil and water resources.",
			icon: <FiTv size={48} className="text-emerald-500" />,
		},
		{
			itemName: "Refrigerator",
			description:
				"Dispose of refrigerators and freezers through our specialized large appliance recycling program that safely handles refrigerants.",
			recyclingProcess:
				"We carefully extract and properly dispose of refrigerants, recover insulation materials, separate and process metal components, and manage hazardous elements.",
			specialInstructions:
				"Clean and defrost the unit completely before recycling. Remove all food, shelving, and loose components.",
			benefits:
				"Proper refrigerator recycling prevents potent greenhouse gases from entering the atmosphere and recovers valuable metals and plastics.",
			icon: <RiFridgeFill size={48} className="text-emerald-500" />,
		},
		{
			itemName: "Other",
			description:
				"Recycle any electronic device not covered by other categories through our comprehensive e-waste management program.",
			recyclingProcess:
				"Every device undergoes proper assessment, disassembly, component sorting, material recovery, and environmentally sound disposal of non-recyclable parts.",
			specialInstructions:
				"If possible, include original packaging, manuals, and accessories for the most complete recycling process.",
			benefits:
				"Ensures that even unusual or uncommon electronic devices are properly handled and don't end up in landfills.",
			icon: <MdOutlineDevicesOther size={48} className="text-emerald-500" />,
		},
	];

	return (
		<>
			<Head>
				<title>GreenRecycle - Electronics Recycling Solutions</title>
				<meta
					name="description"
					content="Responsibly recycle your electronic devices with GreenRecycle's specialized recycling programs for smartphones, laptops, TVs, refrigerators and more."
				/>
			</Head>

			<div className="container px-4 mx-auto section recycle-container">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl font-bold text-emerald-700">
						Sustainable Electronics Recycling Solutions
					</h2>
					<p className="max-w-3xl mx-auto text-xl text-gray-600">
						Choose the right recycling option for your electronic devices and
						contribute to a circular economy that preserves resources and
						protects our environment.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{recycleItems.map((item, index) => (
						<RecycleCard key={index} {...item} />
					))}
				</div>

				<div className="p-8 mt-20 rounded-lg bg-emerald-50">
					<div className="mb-8 text-center">
						<h3 className="text-2xl font-bold text-emerald-700">
							Why Recycle Electronics With GreenRecycle?
						</h3>
						<p className="mt-2 text-gray-600">
							Our comprehensive approach ensures responsible handling of your
							electronic waste
						</p>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-4">
						<div className="p-6 text-center bg-white rounded-lg shadow-sm">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-8 h-8 text-emerald-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
									/>
								</svg>
							</div>
							<h4 className="mb-2 text-lg font-semibold">Certified Process</h4>
							<p className="text-sm text-gray-600">
								All recycling follows strict environmental standards and
								compliance protocols
							</p>
						</div>

						<div className="p-6 text-center bg-white rounded-lg shadow-sm">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-8 h-8 text-emerald-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<h4 className="mb-2 text-lg font-semibold">Data Security</h4>
							<p className="text-sm text-gray-600">
								Guaranteed destruction of personal data on all electronic
								devices
							</p>
						</div>

						<div className="p-6 text-center bg-white rounded-lg shadow-sm">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-8 h-8 text-emerald-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
									/>
								</svg>
							</div>
							<h4 className="mb-2 text-lg font-semibold">Resource Recovery</h4>
							<p className="text-sm text-gray-600">
								Maximum extraction of valuable materials from your electronic
								waste
							</p>
						</div>

						<div className="p-6 text-center bg-white rounded-lg shadow-sm">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-8 h-8 text-emerald-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
							</div>
							<h4 className="mb-2 text-lg font-semibold">Effortless Process</h4>
							<p className="text-sm text-gray-600">
								Simple booking system makes recycling your electronics quick and
								convenient
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const RecycleCard: React.FC<RecycleCardProps> = ({
	itemName,
	description,
	recyclingProcess,
	specialInstructions,
	benefits,
	icon,
}) => {
	return (
		<div className="flex flex-col h-full overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
			<div className="flex items-center justify-center p-6 bg-emerald-50">
				<div className="p-4 bg-white rounded-full shadow-sm">{icon}</div>
			</div>

			<div className="flex flex-col flex-grow p-6">
				<h3 className="mb-3 text-2xl font-bold text-gray-800">{itemName}</h3>
				<p className="mb-4 text-gray-600">{description}</p>

				<div className="flex-grow mb-4">
					<div className="mb-3">
						<h4 className="mb-1 text-sm font-semibold tracking-wide uppercase text-emerald-700">
							Recycling Process
						</h4>
						<p className="text-sm text-gray-600">{recyclingProcess}</p>
					</div>

					<div className="mb-3">
						<h4 className="mb-1 text-sm font-semibold tracking-wide uppercase text-emerald-700">
							Special Instructions
						</h4>
						<p className="text-sm text-gray-600">{specialInstructions}</p>
					</div>

					<div>
						<h4 className="mb-1 text-sm font-semibold tracking-wide uppercase text-emerald-700">
							Environmental Benefits
						</h4>
						<p className="text-sm text-gray-600">{benefits}</p>
					</div>
				</div>

				<Link
					href={`/recycle/${itemName.toLowerCase()}`}
					className="inline-block w-full px-4 py-3 mt-auto font-medium text-center text-white transition-colors duration-300 rounded-md bg-emerald-500 hover:bg-emerald-600"
				>
					Recycle {itemName} Now
				</Link>
			</div>
		</div>
	);
};

export default Recycle;
