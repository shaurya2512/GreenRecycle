import { NextResponse } from "next/server";
import connectDB from "lib/mongodb"; // your DB connection file
import Facility from "@/models/facility";

export async function GET() {
      await connectDB();

      try {
            const facilities = await Facility.find();
            return NextResponse.json(facilities);
      } catch (error) {
            return NextResponse.json({ error: "Failed to fetch facilities" }, { status: 500 });
      }
}
