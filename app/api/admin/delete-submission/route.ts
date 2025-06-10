// app/api/admin/delete-submission/route.ts

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "lib/mongodb";
import { categoryToCollection } from "@/utils/collectionMap";

export async function DELETE(req: NextRequest) {
      try {
            const { category, id } = await req.json();

            if (!category || !id) {
                  return NextResponse.json({ error: "Missing category or id" }, { status: 400 });
            }

            // Map UI category to actual MongoDB collection name
            const collectionName = categoryToCollection[category];
            if (!collectionName) {
                  return NextResponse.json({ error: "Invalid category" }, { status: 400 });
            }

            await connectMongoDB();

            // Define a generic schema to access the collection without strict validation
            const genericSchema = new mongoose.Schema({}, { strict: false });

            // Use or create a mongoose model with the collection name
            const GenericModel =
                  mongoose.models[collectionName] ||
                  mongoose.model(collectionName, genericSchema, collectionName);

            const result = await GenericModel.deleteOne({ _id: id });

            if (result.deletedCount === 0) {
                  return NextResponse.json({ error: "Document not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Deleted successfully" });
      } catch (error) {
            console.error("API Delete Error:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
}
