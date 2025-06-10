"use client";

import React, { useState, ChangeEvent } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-hot-toast";
import { NextResponse } from "next/server";
import { ToastContainer } from "react-toastify";

const Signin: React.FC = () => {
	const router = useRouter();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const login = async () => {
		const res = await signIn("credentials", {
			redirect: false,
			email: formData.email,
			password: formData.password,
		});
		console.log(res);

		if (res?.ok) {
			toast.success("Login successful");

			const session = await getSession();

			if (session?.user.role === "admin") {
				router.push("/admin");
			} else {
				router.push("/");
			}
		} else {
			if (res?.error === "EMAIL_NOT_FOUND") {
				toast.error("You do not have an account on the platform.");
			} else if (res?.error === "PASSWORD_INCORRECT") {
				toast.error("Password does not match.");
			} else {
				toast.error("Invalid credentials.");
			}
		}
	};

	return (
		<div className="flex items-center justify-center md:h-screen h-[70vh]">
			{<ToastContainer />}
			<div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
				<div className="flex flex-col justify-center p-8 md:p-14">
					<span className="mb-3 text-4xl font-bold">Welcome back</span>
					<span className="mb-8 font-light text-gray-400">
						Welcome back! Please enter your details
					</span>
					<div className="py-4">
						<span className="mb-2 text-md">Email</span>
						<input
							type="text"
							className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
							name="email"
							placeholder="email"
							onChange={handleInputChange}
							value={formData.email}
						/>
					</div>
					<div className="py-4">
						<span className="mb-2 text-md">Password</span>
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							placeholder="password"
							className="w-full p-2 rounded-md sign-field placeholder:font-light placeholder:text-gray-500"
							onChange={handleInputChange}
							value={formData.password}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									login();
								}
							}}
						/>
					</div>
					<div className="flex justify-between w-full py-4">
						<label className="flex items-center text-sm">
							<input
								type="checkbox"
								className="mr-2"
								onClick={togglePasswordVisibility}
							/>
							Show Password
						</label>
						<Link href="/forget-password" className="font-bold text-black">
							Forgot password?
						</Link>
					</div>

					<button
						type="button"
						onClick={login}
						className="w-full p-2 mt-4 mb-6 text-white bg-black rounded-lg hover:bg-emerald-400 hover:text-black hover:border hover:border-gray-300"
					>
						Sign in
					</button>

					<div className="text-center text-gray-400">
						Don’t have an account?{" "}
						<Link
							href="/sign-up"
							className="font-bold text-black hover:text-emerald-300"
						>
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signin;
