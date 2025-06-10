"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

type BlogData = {
	_id: string;
	title: string;
	content: string;
	image: string;
};

export default function Page() {
	const { id } = useParams();
	const [blog, setBlog] = useState<BlogData | null>(null);

	useEffect(() => {
		const fetchBlog = async () => {
			try {
				const res = await fetch(`/api/blogs/${id}`);
				if (!res.ok) throw new Error("Failed to fetch blog");
				const data = await res.json();
				setBlog(data);
			} catch (error) {
				console.error("Error fetching blog:", error);
			}
		};

		if (id) fetchBlog();
	}, [id]);

	if (!blog) return <p>Loading...</p>;

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<motion.h1
				className="text-4xl font-bold mb-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{blog.title}
			</motion.h1>

			{blog.image && (
				<motion.img
					src={blog.image}
					alt={blog.title}
					className="w-full rounded-lg mb-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
				/>
			)}

			<motion.div
				className="prose"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6 }}
				dangerouslySetInnerHTML={{ __html: blog.content }}
			/>
		</div>
	);
}
