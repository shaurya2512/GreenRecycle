import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "lib/mongodb";
import televisionRecycle from "@/models/television/televisionRecycleSubmission";
import User from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]/options";
import { sendConfirmationEmail } from "lib/mailer";

export async function POST(req: NextRequest) {
      try {
            await connectMongoDB();

            const session = await getServerSession(authOptions);
            if (!session?.user?.email) {
                  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }

            const body = await req.json();
            const { brand, model, recycleItemPrice, pickupDate, pickupTime, phone, address, selectedFacility } = body;

            if (!brand || !model || !recycleItemPrice || !pickupDate || !pickupTime || !phone || !address || !selectedFacility) {
                  return NextResponse.json({ message: "Missing fields" }, { status: 400 });
            }

            const user = await User.findOne({ email: session.user.email });
            if (!user) {
                  return NextResponse.json({ message: "User not found" }, { status: 404 });
            }

            // Save recycle request
            const recycleRequest = new televisionRecycle({
                  brand,
                  model,
                  recycleItemPrice,
                  pickupDate,
                  pickupTime,
                  phone,
                  address,
                  selectedFacility,
                  userId: user._id, // user._id is already ObjectId from MongoDB
            });

            await recycleRequest.save();

            // Update user points
            const earnedPoints = Math.floor(Number(recycleItemPrice) * 0.15);
            user.points = (user.points || 0) + earnedPoints;
            await user.save();

            try {
                  await sendConfirmationEmail(
                        session.user.email,
                        session.user.fullname || "User",
                        brand,
                        model,
                        pickupDate,
                        pickupTime,
                        earnedPoints,
                  );
            } catch (emailError) {
                  console.error("Email sending failed:", emailError);
            }

            return NextResponse.json({
                  message: "Smartphone recycling request submitted successfully",
                  pointsEarned: earnedPoints,
            }, { status: 201 });

      } catch (error: any) {
            console.error("Error:", error);
            return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
      }
}
