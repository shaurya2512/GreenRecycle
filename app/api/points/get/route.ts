// app/api/points/get/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/options";
import connectMongoDB from "lib/mongodb"

import User from "@/models/User";

export async function GET(req: NextRequest) {
      console.log("HIT /api/points/get route");
      try {
            await connectMongoDB();

            const session = await getServerSession(authOptions);

            if (!session || !session.user?.email) {
                  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }

            const user = await User.findOne({ email: session.user.email });

            if (!user) {
                  return NextResponse.json({ message: "User not found" }, { status: 404 });
            }

            return NextResponse.json({ points: user.points || 0 }, { status: 200 });
      } catch (error: any) {
            console.error("Error fetching points:", error.message);
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
      }
}
