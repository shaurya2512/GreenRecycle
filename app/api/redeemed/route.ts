// app/api/redeemed/route.ts
import { NextResponse } from "next/server";
import connectDB from "lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
      try {
            await connectDB();
            const { userId } = await req.json();

            if (!userId || typeof userId !== "string") {
                  return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
            }

            const user = await User.findById(userId); // ✅ if no populate needed


            if (!user) {
                  return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            const redeemedIds = user.redeemedProducts.map((p: any) => p._id.toString());

            return NextResponse.json({ redeemedProductIds: redeemedIds });
      } catch (err) {
            console.error("Error fetching redeemed products:", err);
            return NextResponse.json({ error: "Server error" }, { status: 500 });
      }
}
