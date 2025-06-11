// app/api/register/route.ts

import { NextResponse } from "next/server";
import connectMongoDB from "lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
      try {
            await connectMongoDB();

            const { fullName, username, email, phoneNumber, password } = await req.json();

            if (!fullName || !username || !email || !phoneNumber || !password) {
                  return NextResponse.json(
                        { error: "Please fill in all required fields." },
                        { status: 400 }
                  );
            }

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                  return NextResponse.json({ error: "User already exists" }, { status: 400 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                  fullName,
                  username,
                  email,
                  phoneNumber,
                  password: hashedPassword,
                  role: email === "admin@example.com" ? "admin" : "user",
            });

            await newUser.save();

            return NextResponse.json({ message: "Registration successful" }, { status: 201 });
      } catch (error) {
            console.error("Register error:", error);
            return NextResponse.json({ error: "Server error" }, { status: 500 });
      }
}

export function GET() {
  return NextResponse.json({ status: "API is working" });
}

