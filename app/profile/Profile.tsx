"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		if (status === "loading") return;
		if (status === "unauthenticated") {
			router.push("/sign-in");
			return;
		}
		if (session?.user) {
			setUser(session.user);
		}
	}, [status, session, router]);

	if (status === "loading" || !user) {
		return (
			<div className="flex items-center justify-center h-screen text-xl">
				Loading...
			</div>
		);
	}

	return (
		<div className="container px-4 py-12 mx-auto">
			<div className="flex items-center justify-center">
				<div className="w-full max-w-3xl p-10 transition-all duration-300 bg-white shadow-2xl rounded-3xl hover:shadow-emerald-300">
					<div className="flex flex-col items-center mb-8">
						<div className="overflow-hidden border-4 rounded-full shadow-lg border-emerald-500">
							<Image
								src="/assets/profile.png"
								alt="User Avatar"
								width={160}
								height={160}
								className="object-cover w-40 h-40 transition-transform duration-300 hover:scale-105"
							/>
						</div>
						<h2 className="mt-6 text-3xl font-bold text-gray-800">
							{user.name}
						</h2>
						<p className="text-lg text-gray-500">@{user.username}</p>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-lg table-auto">
							<tbody className="divide-y divide-gray-200">
								{[
									["User ID", user.id],
									["Name", user.fullname],
									["Email", user.email],
									["Phone", user.phone],
									["Points", user.points],
									["Role", user.role],
								].map(([label, value]) => (
									<tr key={label}>
										<td className="w-1/3 py-4 font-semibold text-gray-600">
											{label}
										</td>
										<td className="py-4 text-gray-800">{value}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
