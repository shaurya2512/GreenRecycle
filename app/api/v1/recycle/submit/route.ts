import { NextResponse } from "next/server";
import connectMongoDB from "lib/mongodb";
import RecycleSubmission from "@/models/smartphone/smartphoneRecycleRequestModel";

export async function POST(req: Request) {
      try {
            await connectMongoDB();
            const data = await req.json();
            const submission = await RecycleSubmission.create(data);
            return NextResponse.json(submission, { status: 201 });
      } catch (error) {
            return NextResponse.json({ error: "Failed to submit recycle info" }, { status: 500 });
      }
}

export async function GET() {
      try {
            await connectMongoDB();
            const submissions = await RecycleSubmission.find().sort({ createdAt: -1 });
            return NextResponse.json(submissions, { status: 200 });
      } catch (error) {
            return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
      }
}
