"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { menuOutline, closeOutline, location } from "ionicons/icons";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { usePoints } from "context/pointsContext";
import { useSession } from "next-auth/react";
import { handleLogout } from "../sign-in/auth";

interface NavItemProps {
	label: string;
}

const Header = () => {
	const [isNavbarActive, setIsNavbarActive] = useState(false);
	const [isHeaderActive, setIsHeaderActive] = useState(false);
	const [locations, setLocation] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { points } = usePoints();
	const [user, setUser] = useState<any>(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);

	const router = useRouter();

	useEffect(() => {
		setHasMounted(true);
	}, []);

	const { data: session } = useSession();

	useEffect(() => {
		if (session?.user) {
			setUser(session.user);
			if (session.user.role?.toLowerCase() === "admin") {
				setIsAdmin(true);
			}
		}
	}, [session]);

	useEffect(() => {
		document.documentElement.classList.remove("no-js");

		if (navigator.geolocation) {
			const options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			};

			navigator.geolocation.getCurrentPosition(
				(position) => {
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;

					fetch(
						`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1Ijoic2h1ZW5jZSIsImEiOiJjbG9wcmt3czMwYnZsMmtvNnpmNTRqdnl6In0.vLBhYMBZBl2kaOh1Fh44Bw`
					)
						.then((response) => response.json())
						.then((data) => {
							const city = data.features[0].context.find((context: any) =>
								context.id.includes("place")
							).text;
							const state = data.features[0].context.find((context: any) =>
								context.id.includes("region")
							).text;
							setLocation(`${city}, ${state}`);
						})
						.catch((error) => {
							console.error("Error:", error);
						});
				},
				(error) => {
					console.error(error);
				},
				options
			);
		}
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsHeaderActive(true);
			} else {
				setIsHeaderActive(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!hasMounted) return null;

	const toggleNavbar = () => {
		setIsNavbarActive(!isNavbarActive);
	};

	const handleToggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	return (
		<header className={`header ${isHeaderActive ? "active" : ""}`} data-header>
			<div className="container shadow-md">
				<Link href="/">
					<Image
						src="/assets/GreenRecycle.png"
						alt="GreenRecycle"
						width={80}
						height={80}
						className="ml-4 logo md:ml-16"
					/>
				</Link>

				<nav className={`navbar ${isNavbarActive ? "active" : ""}`} data-navbar>
					<div className="wrapper">
						<Link href="/" className="logo">
							GreenRecycle
						</Link>
						<button
							className="nav-close-btn"
							onClick={toggleNavbar}
							aria-label="close menu"
						>
							<IonIcon icon={closeOutline}></IonIcon>
						</button>
					</div>

					<ul className="navbar-list">
						<NavItem label="Home" />
						<NavItem label="About" />
						<NavItem label="E-Facilities" />
						<NavItem label="Recycle" />
						<NavItem label="Products" />
					</ul>
				</nav>

				<h1 className="font-montserrat font-bold text-xl ml-12 md:ml-4 md:text-2xl text-emerald-600 flex items-center gap-[1vh]">
					<IonIcon icon={location} />
					{locations || "Loading..."}
				</h1>

				{user !== null ? (
					<div className="relative flex items-center gap-4">
						<div className="relative inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold border shadow-sm text-emerald-800 bg-emerald-50 border-emerald-200 rounded-xl">
							<span className="text-lg">🌱</span>
							<span>{points}</span>
							<button
								onClick={() => router.push("/buy-points")}
								className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold transition bg-white border rounded-full -top-2 -right-2 text-emerald-600 border-emerald-600 hover:bg-emerald-600 hover:text-white"
								title="Buy Points"
							>
								+
							</button>
						</div>

						<button
							type="button"
							className="flex items-center justify-center w-8 h-8 transition rounded-full md:mr-8 bg-emerald-100 hover:bg-emerald-200"
							onClick={handleToggleDropdown}
							title="Account"
						>
							<FiUser className="text-lg text-emerald-700" />
						</button>

						{isDropdownOpen && (
							<div className="absolute right-0 z-10 p-4 mt-2 bg-white divide-y rounded-lg shadow-md top-12 projects w-44">
								<Link
									href="/profile"
									className="block mb-2 hover:text-emerald-500"
								>
									Profile
								</Link>
								{isAdmin && (
									<Link
										href="/admin"
										className="block mb-2 hover:text-emerald-500"
									>
										Admin
									</Link>
								)}
								<button
									className="hover:text-emerald-500"
									onClick={handleLogout}
								>
									Logout
								</button>
							</div>
						)}
					</div>
				) : (
					<Link href="/sign-in" className="btn-md btn-outline md:mr-4">
						SignIn
					</Link>
				)}

				<button
					className="nav-open-btn"
					onClick={toggleNavbar}
					aria-label="open menu"
				>
					<IonIcon icon={menuOutline}></IonIcon>
				</button>

				<div
					className={`overlay ${isNavbarActive ? "active" : ""}`}
					data-nav-toggler
					data-overlay
					onClick={toggleNavbar}
				></div>
			</div>
		</header>
	);
};

const NavItem = ({ label }: NavItemProps) => {
	return (
		<li className="navbar-link">
			<Link
				href={
					label === "Home"
						? "/"
						: `/${label.toLowerCase().replace(/\s+/g, "-")}`
				}
			>
				{label}
			</Link>
		</li>
	);
};

export default Header;
