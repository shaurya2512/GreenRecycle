"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { blogs, getBlogsByCategory } from "../data/blogs";
import Head from "next/head";

const Education: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [filteredBlogs, setFilteredBlogs] = useState(blogs);
	const [isLoading, setIsLoading] = useState(false);

	// Extract unique categories from blogs
	const categories = [
		"all",
		...Array.from(new Set(blogs.map((blog) => blog.category))),
	];

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			if (selectedCategory === "all") {
				setFilteredBlogs(blogs);
			} else {
				setFilteredBlogs(getBlogsByCategory(selectedCategory));
			}
			setIsLoading(false);
		}, 300); // Small delay for transition effect
	}, [selectedCategory]);

	return (
		<>
			<Head>
				<title>GreenRecycle - E-Waste Education & Resources</title>
				<meta
					name="description"
					content="Explore our educational resources on e-waste management, environmental impact, and sustainable electronics practices."
				/>
			</Head>

			{/* Hero section with parallax effect */}
			<div className="relative overflow-hidden h-80 md:h-96">
				<div
					className="absolute inset-0 bg-center bg-cover"
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
						transform: "translateZ(0)",
					}}
				>
					<div className="absolute inset-0 bg-black bg-opacity-60"></div>
				</div>
				<div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
					<h1 className="mb-4 text-4xl font-bold text-white md:text-5xl drop-shadow-lg">
						E-Waste Education Hub
					</h1>
					<p className="max-w-3xl mx-auto text-xl text-white opacity-90">
						Gain valuable insights into sustainable electronics management and
						discover how your choices can make a significant environmental
						impact.
					</p>
				</div>
			</div>

			<div className="container px-4 py-12 section education-container bg-gray-50 md:px-8">
				{/* Featured article */}
				<div className="bg-white shadow-xl rounded-lg overflow-hidden mb-16 max-w-5xl mx-auto transform transition-transform hover:scale-[1.01]">
					<div className="md:flex">
						<div className="relative h-64 md:w-1/2 md:h-auto">
							<Image
								src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
								alt="E-waste management and sustainability"
								layout="fill"
								objectFit="cover"
								className="w-full h-full"
							/>
							<div className="absolute top-0 left-0 px-3 py-1 font-semibold text-white rounded-br-lg bg-emerald-600">
								FEATURED
							</div>
						</div>
						<div className="p-8 md:w-1/2">
							<div className="flex items-center mb-3">
								<span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
									Education
								</span>
								<span className="text-sm text-gray-500">8 min read</span>
							</div>
							<h2 className="mt-3 mb-4 text-2xl font-bold text-gray-800">
								The Growing E-Waste Crisis: Understanding Our Digital Footprint
							</h2>
							<p className="mb-6 text-gray-600">
								The rapid pace of technological advancement has transformed
								modern life, but it comes with a hidden cost - electronic waste.
								Learn how your devices impact the planet and what you can do to
								minimize your digital carbon footprint.
							</p>
							<div className="flex items-center mb-6">
								<div className="flex items-center justify-center w-10 h-10 mr-3 font-bold text-white rounded-full bg-emerald-500">
									E
								</div>
								<div>
									<p className="text-sm font-semibold">
										GreenRecycle Research Team
									</p>
									<p className="text-xs text-gray-500">June 15, 2023</p>
								</div>
							</div>
							<Link
								href={`/education/1`}
								className="inline-flex items-center px-4 py-2 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
							>
								Read Full Article
								<svg
									className="w-4 h-4 ml-2 -mr-1"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									></path>
								</svg>
							</Link>
						</div>
					</div>
				</div>

				{/* Category filter */}
				<div className="max-w-6xl mx-auto mb-8">
					<div className="flex flex-wrap items-center justify-between mb-6">
						<h2 className="text-3xl font-bold text-gray-800">
							Educational Resources
						</h2>
						<div className="flex pb-2 mt-4 -mx-2 overflow-x-auto md:mt-0 scrollbar-hide">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-4 py-2 mx-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
										selectedCategory === category
											? "bg-emerald-600 text-white"
											: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
								>
									{category === "all" ? "All Topics" : category}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Blog grid with animated loading effect */}
				<div className="max-w-6xl mx-auto">
					<div
						className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative ${
							isLoading ? "opacity-50" : "opacity-100"
						} transition-opacity duration-300`}
					>
						{filteredBlogs.map((blog, index) => (
							<div
								key={index}
								className="flex flex-col h-full overflow-hidden transition-all duration-300 transform bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1"
							>
								<div className="relative h-56 overflow-hidden">
									<Image
										src={blog.image}
										alt={`Image for ${blog.title}`}
										layout="fill"
										objectFit="cover"
										className="transition-transform duration-500 hover:scale-110"
									/>
									<div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none bg-gradient-to-t from-black/70 to-transparent"></div>
									<div className="absolute bottom-3 left-3">
										<span className="bg-emerald-100 bg-opacity-90 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
											{blog.category}
										</span>
									</div>
								</div>
								<div className="flex flex-col flex-grow p-6">
									<div className="flex items-center justify-between mb-3">
										<span className="text-sm text-gray-500">
											{blog.readTime}
										</span>
										{blog.date && (
											<span className="text-sm text-gray-500">{blog.date}</span>
										)}
									</div>
									<h3 className="mb-3 text-xl font-bold text-gray-800 line-clamp-2">
										{blog.title}
									</h3>
									<p className="mb-4 text-gray-600 line-clamp-3">
										{blog.description}
									</p>

									{blog.tags && (
										<div className="flex flex-wrap gap-1 mb-4">
											{blog.tags.slice(0, 3).map((tag) => (
												<span
													key={tag}
													className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
												>
													#{tag}
												</span>
											))}
										</div>
									)}

									<div className="flex items-center justify-between mt-auto">
										<div className="flex items-center">
											<div className="flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded-full bg-emerald-500">
												{blog.author ? blog.author.charAt(0) : "E"}
											</div>
											{blog.author && (
												<span className="ml-2 text-sm text-gray-700 truncate max-w-[120px]">
													{blog.author}
												</span>
											)}
										</div>
										<Link
											href={`/education/${blog.id}`}
											className="inline-flex items-center font-medium text-emerald-600 hover:text-emerald-800"
										>
											Read More
											<svg
												className="w-5 h-5 ml-1"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
													clipRule="evenodd"
												></path>
											</svg>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Empty state */}
					{filteredBlogs.length === 0 && !isLoading && (
						<div className="py-16 text-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-16 h-16 mx-auto mb-4 text-gray-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1}
									d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
								/>
							</svg>
							<h3 className="mb-2 text-xl font-semibold text-gray-700">
								No articles found
							</h3>
							<p className="mb-4 text-gray-500">
								We couldn&apos;t find any articles in this category.
							</p>
							<button
								onClick={() => setSelectedCategory("all")}
								className="font-medium text-emerald-600 hover:text-emerald-800"
							>
								View all articles
							</button>
						</div>
					)}
				</div>

				{/* E-waste facts section with improved design */}
				<div className="max-w-6xl p-8 mx-auto mt-24 rounded-lg bg-emerald-50">
					<div className="mb-10 text-center">
						<h2 className="mb-4 text-2xl font-bold md:text-3xl text-emerald-800">
							E-Waste Facts You Should Know
						</h2>
						<p className="max-w-2xl mx-auto text-gray-600">
							Understanding the impact of electronic waste is the first step
							toward making better choices.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						<div className="p-6 text-center transition-all bg-white rounded-lg shadow-sm group hover:shadow-md">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors rounded-full bg-emerald-100 group-hover:bg-emerald-200">
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
										d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
									/>
								</svg>
							</div>
							<h3 className="mb-2 text-lg font-semibold">57.4 Million Tons</h3>
							<p className="text-sm text-gray-600">
								Global e-waste generated annually, equivalent to the weight of
								5,000 Eiffel Towers
							</p>
						</div>

						<div className="p-6 text-center transition-all bg-white rounded-lg shadow-sm group hover:shadow-md">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors rounded-full bg-emerald-100 group-hover:bg-emerald-200">
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
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="mb-2 text-lg font-semibold">$62.5 Billion</h3>
							<p className="text-sm text-gray-600">
								Value of raw materials in global e-waste, more than the GDP of
								many countries
							</p>
						</div>

						<div className="p-6 text-center transition-all bg-white rounded-lg shadow-sm group hover:shadow-md">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors rounded-full bg-emerald-100 group-hover:bg-emerald-200">
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
							<h3 className="mb-2 text-lg font-semibold">17.4%</h3>
							<p className="text-sm text-gray-600">
								Only 17.4% of e-waste is properly recycled globally, the rest
								ends up in landfills
							</p>
						</div>

						<div className="p-6 text-center transition-all bg-white rounded-lg shadow-sm group hover:shadow-md">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors rounded-full bg-emerald-100 group-hover:bg-emerald-200">
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
							<h3 className="mb-2 text-lg font-semibold">80 kg of Earth</h3>
							<p className="text-sm text-gray-600">
								Recycling one smartphone prevents mining approximately 80 kg of
								raw earth materials
							</p>
						</div>
					</div>
				</div>

				{/* Enhanced Educational video section */}
				<div className="max-w-6xl mx-auto mt-24">
					<div className="mb-10 text-center">
						<h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
							Educational Videos
						</h2>
						<p className="max-w-2xl mx-auto text-gray-600">
							Visual learning resources to help you understand the e-waste
							challenge and solutions.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						<div className="overflow-hidden transition transform bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1">
							<div className="relative pb-[56.25%] h-0">
								<iframe
									className="absolute top-0 left-0 w-full h-full"
									src="https://www.youtube.com/embed/Jzw1zv1zz0E"
									title="The E-Waste Crisis"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</div>
							<div className="p-6">
								<h3 className="mb-2 text-lg font-bold">
									The E-Waste Crisis Explained
								</h3>
								<p className="mb-3 text-gray-600">
									Learn about the growing e-waste problem and its environmental
									impact
								</p>
								<div className="flex items-center text-sm text-gray-500">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-4 h-4 mr-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span>10:23</span>
								</div>
							</div>
						</div>

						<div className="overflow-hidden transition transform bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1">
							<div className="relative pb-[56.25%] h-0">
								<iframe
									className="absolute top-0 left-0 w-full h-full"
									src="https://www.youtube.com/embed/4g9Zu3pOIYU"
									title="What Happens to Your E-Waste"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</div>
							<div className="p-6">
								<h3 className="mb-2 text-lg font-bold">
									Inside an E-Waste Recycling Facility
								</h3>
								<p className="mb-3 text-gray-600">
									See the journey of electronic devices through the recycling
									process
								</p>
								<div className="flex items-center text-sm text-gray-500">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-4 h-4 mr-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span>8:47</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* New infographics section */}
				<div className="max-w-6xl mx-auto mt-24">
					<div className="mb-10 text-center">
						<h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
							E-Waste Infographics
						</h2>
						<p className="max-w-2xl mx-auto text-gray-600">
							Visual guides to help understand the e-waste challenge and
							potential solutions.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div className="overflow-hidden bg-white rounded-lg shadow-md">
							<div className="relative h-64">
								<Image
									src="https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
									alt="E-waste lifecycle"
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<div className="p-5">
								<h3 className="mb-2 text-lg font-bold">
									The Lifecycle of Electronics
								</h3>
								<p className="text-sm text-gray-600">
									From production to disposal: understanding the full journey of
									electronic devices
								</p>
								<a
									href="#"
									className="inline-block mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-800"
								>
									Download PDF
								</a>
							</div>
						</div>

						<div className="overflow-hidden bg-white rounded-lg shadow-md">
							<div className="relative h-64">
								<Image
									src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
									alt="Materials in e-waste"
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<div className="p-5">
								<h3 className="mb-2 text-lg font-bold">
									Valuable Materials in E-Waste
								</h3>
								<p className="text-sm text-gray-600">
									Identifying the precious metals and materials that can be
									recovered from electronic waste
								</p>
								<a
									href="#"
									className="inline-block mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-800"
								>
									Download PDF
								</a>
							</div>
						</div>

						<div className="overflow-hidden bg-white rounded-lg shadow-md">
							<div className="relative h-64">
								<Image
									src="https://images.unsplash.com/photo-1546156929-a4c0ac411f47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
									alt="E-waste reduction tips"
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<div className="p-5">
								<h3 className="mb-2 text-lg font-bold">
									10 Ways to Reduce Your E-Waste
								</h3>
								<p className="text-sm text-gray-600">
									Practical tips for consumers to minimize electronic waste
									generation in daily life
								</p>
								<a
									href="#"
									className="inline-block mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-800"
								>
									Download PDF
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Enhanced Call to action */}
				<div className="max-w-6xl mx-auto mt-24">
					<div className="p-8 shadow-lg bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl md:p-12">
						<div className="items-center justify-between md:flex">
							<div className="mb-6 md:w-2/3 md:mb-0">
								<h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
									Ready to Take Action?
								</h2>
								<p className="mb-0 text-lg text-emerald-50">
									Find certified e-waste recycling facilities near you and
									ensure your electronics are handled responsibly.
								</p>
							</div>
							<div>
								<Link
									href="/e-facilities"
									className="inline-block px-8 py-3 font-bold transition-all transform bg-white rounded-lg shadow-md text-emerald-700 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1"
								>
									Find Recycling Centers
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Education;
