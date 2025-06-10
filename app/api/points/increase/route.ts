import { NextResponse } from "next/server";
import connectMongoDB from "lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/options";

export async function POST(req: Request) {
      const session = await getServerSession(authOptions);

      if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { points } = await req.json();
      if (typeof points !== "number") {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
      }

      await connectMongoDB();

      let user = await User.findOne({ email: session.user.email });

      if (!user) {
            user = await User.create({ email: session.user.email, points });
      } else {
            user.points += points;
            await user.save();
      }

      return NextResponse.json({ points: user.points });
}
