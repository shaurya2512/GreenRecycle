"use client";
import React from "react";
import { motion } from "framer-motion";
import Profile from "./Profile";

const Page = () => {
	return (
		<>
			<motion.div
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -20 }}
				transition={{ duration: 0.5 }}
			>
				<div className="pt-8 mt-16 md:mt-20">
					<Profile />
				</div>
			</motion.div>
		</>
	);
};

export default Page;
