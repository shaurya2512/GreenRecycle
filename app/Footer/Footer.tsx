"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import Toast from "components/Toast"; // adjust path as needed
import "react-toastify/dist/ReactToastify.css";

import {
	IoCall,
	IoMail,
	IoLogoLinkedin,
	IoLogoTwitter,
	IoLogoInstagram,
	IoLogoWhatsapp,
	IoPaperPlane,
	IoLocationSharp,
} from "react-icons/io5";

const Footer = () => {
	const [formData, setFormData] = useState({
		email: "",
	});

	const [toastMessage, setToastMessage] = useState<string | null>(null);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		} as Pick<typeof formData, keyof typeof formData>);
	};

	const SendMsg = (e: React.FormEvent) => {
		e.preventDefault();
		const templateParams = {
			email: formData.email,
		};

		emailjs
			.send(
				"service_jqn5flv",
				"template_ppph1w9",
				templateParams,
				"ddYcz13MvW01UFF5u"
			)
			.then((result: { text: any }) => {
				setFormData({
					email: "",
				});
				setToastMessage("Submitted successfully!");
			})
			.catch((error: { text: any }) => {
				setToastMessage("Unable to process your request. Please try again.");
			});
	};

	return (
		<footer className="shadow-2xl footer projects">
			<div className="footer-top md:section">
				<div className="container">
					<div className="footer-brand">
						<Link href="/">
							<Image
								src="/assets/GreenRecycle.png"
								alt="ELocate - E-waste Facility Locator"
								width={100}
								height={100}
								className="mx-auto logo md:mx-0"
							/>
						</Link>
						<p className="footer-text">
							GreenRecycle: Revolutionizing e-waste management through
							technological innovation. Our platform connects you with certified
							recycling facilities, empowering your journey toward environmental
							responsibility and sustainable electronics disposal.
						</p>
						<form onSubmit={SendMsg} className="mb-0 newsletter-form md:mb-4">
							<input
								type="email"
								name="email"
								placeholder="Join our sustainability newsletter"
								className="email-field"
								value={formData.email}
								onChange={handleInputChange}
								required
							/>
							<button
								type="submit"
								className="form-btn"
								aria-label="Subscribe to our newsletter"
							>
								<IoPaperPlane aria-hidden="true" />
							</button>
						</form>
					</div>
					<ul className="footer-list">
						<li>
							<p className="footer-list-title">Recycling Solutions</p>
						</li>
						<li>
							<Link href="/recycle/smartphone" className="footer-link">
								Smartphone Recycling
							</Link>
						</li>
						<li>
							<Link href="/recycle/laptop" className="footer-link">
								Laptop & Computer Recycling
							</Link>
						</li>
						<li>
							<Link href="/recycle/accessories" className="footer-link">
								Electronics Accessories
							</Link>
						</li>

						<li>
							<Link href="/recycle/tv" className="footer-link">
								Television & Display Recycling
							</Link>
						</li>

						<li>
							<Link href="/recycle/refrigerator" className="footer-link">
								Refrigerator & Cooling Appliances
							</Link>
						</li>

						<li>
							<Link href="/recycle/washing-machine" className="footer-link">
								Household Appliance Recycling
							</Link>
						</li>
					</ul>
					<ul className="footer-list">
						<li>
							<p className="footer-list-title">GreenRecycle Platform</p>
						</li>
						<li>
							<Link href="/aboutus" className="footer-link">
								Our Mission & Vision
							</Link>
						</li>

						<li>
							<Link href="/education" className="footer-link">
								E-Waste Education Center
							</Link>
						</li>

						<li>
							<Link href="/facilities" className="footer-link">
								Certified Recycling Network
							</Link>
						</li>

						<li>
							<Link href="/news" className="footer-link">
								Sustainability News
							</Link>
						</li>

						<li>
							<Link href="/contactus" className="footer-link">
								Get In Touch
							</Link>
						</li>
						<li>
							<Link href="/blogs" className="footer-link">
								Insights & Resources
							</Link>
						</li>
						<li>
							<Link href="/rules" className="footer-link">
								Rules
							</Link>
						</li>
						<li>
							<Link href="/education" className="footer-link">
								Education
							</Link>
						</li>
					</ul>
					<ul className="footer-list">
						<li>
							<p className="footer-list-title">Connect With Us</p>
						</li>
						<li className="footer-item">
							<IoLocationSharp aria-hidden="true" className="w-8 h-8 mt-4" />
							<address className="contact-link address">
								Alpha 1, Greater Noida
								<br />
								Uttar Pradesh, India, 201310
							</address>
						</li>
						<li className="footer-item">
							<IoCall aria-hidden="true" />
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href="tel:+911234567890"
								className="contact-link"
							>
								+91 123 456 7890
							</Link>
						</li>
						<li className="footer-item">
							<IoMail className="w-6 h-6" aria-hidden="true" />
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href="mailto:contact@greenRecycle.com"
								className="contact-link"
							>
								contact@greenRecycle.com
							</Link>
						</li>
						<li className="footer-item">
							<ul className="mb-4 social-list md:mb-0">
								<li>
									<Link
										target="_blank"
										rel="noopener noreferrer"
										href="#"
										aria-label="Connect with GreenRecycle on LinkedIn"
										className="social-link"
									>
										<IoLogoLinkedin className="w-6 h-6" aria-hidden="true" />
									</Link>
								</li>
								<li>
									<Link
										target="_blank"
										rel="noopener noreferrer"
										href="#"
										aria-label="Follow GreenRecycle on Instagram"
										className="social-link"
									>
										<IoLogoInstagram className="w-6 h-6" aria-hidden="true" />
									</Link>
								</li>
								<li>
									<Link
										target="_blank"
										rel="noopener noreferrer"
										href="#"
										aria-label="Follow GreenRecycle on Twitter"
										className="social-link"
									>
										<IoLogoTwitter className="w-6 h-6" aria-hidden="true" />
									</Link>
								</li>
								<li>
									<Link
										target="_blank"
										rel="noopener noreferrer"
										href="#"
										aria-label="Contact GreenRecycle on WhatsApp"
										className="social-link"
									>
										<IoLogoWhatsapp className="w-6 h-6" aria-hidden="true" />
									</Link>
								</li>
							</ul>
						</li>
						<li className="mt-48">
							<Link
								href="/contactus"
								className="inline-block px-6 py-2 text-white transition bg-emerald-600 hover:bg-emerald-700 rounded-2xl"
							>
								Contact Us
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container">
					<p className="copyright">
						&copy; 2025 GreenRecycle | All Rights Reserved by{" "}
						<Link href="#" className="copyright-link">
							GreenRecycle Team
						</Link>
					</p>
					<ul className="footer-bottom-list">
						<li>
							<Link href="/privacypolicy" className="footer-bottom-link">
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link href="/termsandservices" className="footer-bottom-link">
								Terms of Service
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
