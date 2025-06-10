import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/options";

export const auth = () => getServerSession(authOptions);