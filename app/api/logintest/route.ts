// api/logintest/route.ts

import { NextResponse } from "next/server";
import connectMongoDB from "lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

console.log("🚀 Login API route loaded");

export async function POST(req: Request) {
      try {
            await connectMongoDB();
            const { email, password } = await req.json();

            const user = await User.findOne({ email });

            if (!user) {
                  return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
                  expiresIn: "7d",
            });

            const role = user.email === "shauryaagarwal53@gmail.com" ? "admin" : "user";

            const userData = {
                  id: user._id,
                  username: user.username,
                  fullname: user.fullName,
                  email: user.email,
                  phoneNumber: user.phoneNumber,
                  role,
            };

            const response = NextResponse.json({ token, user: userData });

            response.cookies.set("token", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "strict",
                  path: "/",
            });

            response.cookies.set("role", role, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "strict",
                  path: "/",
            });

            return response;
      } catch (error) {
            console.error("Login error:", error);
            return NextResponse.json({ error: "Server error" }, { status: 500 });
      }
}

// 🧩 Add this GET to avoid 405 errors when hitting API directly
export async function GET() {
      return NextResponse.json(
            { message: "This endpoint only supports POST requests." },
            { status: 200 }
      );
}
