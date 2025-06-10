// app/sessionProviderWrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const SessionProviderWrapper = ({ children }: Props) => {
	return <SessionProvider>{children}</SessionProvider>; // ✅ Must use SessionProvider
};

export default SessionProviderWrapper;
