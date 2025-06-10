import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "lib/auth";
import User from "@/models/User";
import dbConnect from "lib/mongodb";
import { cookies } from "next/headers";


export async function GET(req: NextRequest) {
      await dbConnect();

      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      let payload;
      try {
            payload = verifyToken(token);
            if (!payload || typeof payload !== "object" || !("userId" in payload)) {
                  throw new Error("Invalid payload structure");
            }
      } catch (err) {
            console.error("JWT verification failed:", err);
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
      }

      const user = await User.findById(payload.userId).select("-password");
      if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(user);
}
