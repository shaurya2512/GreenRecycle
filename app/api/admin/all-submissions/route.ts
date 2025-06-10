import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/options";
import connectMongoDB from "lib/mongodb";

import SmartphoneModel from "@/models/smartphone/smartphoneRecycleSubmission";
import OthersModel from "@/models/others/othersRecycleSubmission";
import LaptopModel from "@/models/laptop/laptopRecycleSubmission";
import RefrigeratorModel from "@/models/refrigerators/refrigeratorsRecycleSubmission";
import AccessoriesModel from "@/models/accessories/accessoriesRecycleSubmission";
import TelevisionModel from "@/models/television/televisionRecycleSubmission";

export async function GET(req: Request) {
      await connectMongoDB();

      try {
            const [smartphones, laptops, accessories, refrigerators, televisions, others] = await Promise.all([
                  SmartphoneModel.find().lean(),
                  LaptopModel.find().lean(),
                  AccessoriesModel.find().lean(),
                  RefrigeratorModel.find().lean(),
                  TelevisionModel.find().lean(),
                  OthersModel.find().lean(),
            ]);

            // Ensure every submission has a status (for frontend compatibility)
            return NextResponse.json({
                  Smartphones: smartphones.map((s) => ({ ...s, status: s.status ?? "pending" })),
                  Laptop: laptops.map((l) => ({ ...l, status: l.status ?? "pending" })),
                  Accessories: accessories.map((a) => ({ ...a, status: a.status ?? "pending" })),
                  Refrigerator: refrigerators.map((r) => ({ ...r, status: r.status ?? "pending" })),
                  Television: televisions.map((t) => ({ ...t, status: t.status ?? "pending" })),
                  Others: others.map((o) => ({ ...o, status: o.status ?? "pending" })),
            });
      } catch (error) {
            console.error("Admin GET error:", error);
            return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
      }
}
