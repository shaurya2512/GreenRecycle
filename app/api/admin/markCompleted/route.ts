import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "lib/mongodb";
import getSubmissionModel from "@/models/Submission";
import { categoryToCollection } from "@/utils/collectionMap"; // ✅ Import this

export async function PUT(req: NextRequest) {
      try {
            const body = await req.json();
            console.log("BODY RECEIVED IN API:", body);

            const { category, id } = body;
            if (!category || !id) {
                  return NextResponse.json({ message: "Missing category or ID" }, { status: 400 });
            }

            await connectMongoDB();
            console.log("Incoming category:", category);


            // ✅ Map category to actual MongoDB collection name
            const collectionName = categoryToCollection[category.toLowerCase()];
            if (!collectionName) {
                  return NextResponse.json({ message: "Invalid category" }, { status: 400 });
            }

            const Submission = getSubmissionModel(collectionName);

            // ✅ Make sure id is a valid ObjectId
            const objectId = new mongoose.Types.ObjectId(id);
            const result = await Submission.findByIdAndUpdate(objectId, { status: "completed" });

            if (!result) {
                  console.warn("No document found with ID:", id, "in", collectionName);
                  return NextResponse.json({ message: "Submission not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Marked as completed" }, { status: 200 });
      } catch (error) {
            console.error("API error in mark-completed:", error);
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
      }
}
