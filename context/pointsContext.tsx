// pointsContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface PointsContextType {
	points: number;
	setPoints: React.Dispatch<React.SetStateAction<number>>;
	addPoints: (p: number) => Promise<void>;
	refreshPoints: () => Promise<void>;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider = ({ children }: { children: React.ReactNode }) => {
	const [points, setPoints] = useState<number>(0);
	const { data: session } = useSession();

	useEffect(() => {
		if (session?.user) {
			refreshPoints();
		}
	}, [session]);

	const refreshPoints = async () => {
		try {
			const res = await fetch("/api/points/get");

			if (!res.ok) {
				console.error("Failed to fetch points:", res.status);
				return;
			}

			const data = await res.json();
			if (data?.points !== undefined) {
				setPoints(data.points);
			}
		} catch (error) {
			console.error("Error refreshing points:", error);
		}
	};

	const addPoints = async (p: number) => {
		const res = await fetch("/api/points/increase", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ points: p }),
		});

		if (res.ok) {
			const data = await res.json();
			setPoints(data.points);
		}
	};

	return (
		<PointsContext.Provider
			value={{ points, setPoints, addPoints, refreshPoints }}
		>
			{children}
		</PointsContext.Provider>
	);
};

export const usePoints = () => {
	const context = useContext(PointsContext);
	if (!context) {
		throw new Error("usePoints must be used within a PointsProvider");
	}
	return context;
};
