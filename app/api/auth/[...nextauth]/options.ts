import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import type { NextAuthOptions, SessionStrategy } from "next-auth";



export const authOptions: NextAuthOptions = {
      providers: [
            CredentialsProvider({
                  name: "Credentials",
                  credentials: {
                        email: { label: "Email", type: "text" },
                        password: { label: "Password", type: "password" },
                  },
                  authorize: async (credentials) => {
                        console.log("🧪 Authorize called with:", credentials);

                        if (!credentials || !credentials.email || !credentials.password) {
                              console.log("❌ Missing credentials");
                              throw new Error("MISSING_CREDENTIALS");
                        }

                        await connectMongoDB();
                        const user = await User.findOne({ email: credentials.email });
                        if (!user) {
                              console.log("❌ User not found");
                              throw new Error("EMAIL_NOT_FOUND");  // Throw error here
                        }

                        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                        if (!isPasswordValid) {
                              console.log("❌ Invalid password");
                              throw new Error("PASSWORD_INCORRECT");  // Throw error here
                        }

                        console.log("✅ Login successful for:", user.email);
                        return {
                              id: user._id.toString(),
                              email: user.email,
                              name: user.username,
                              fullname: user.fullName,
                              phone: user.phoneNumber,
                              points: user.points,
                              role: user.role,
                        };
                  }


            }),
      ],
      session: {
            strategy: "jwt" as SessionStrategy,
      },
      callbacks: {
            async jwt({ token, user }) {
                  if (user) {
                        token.sub = user.id;
                        token.name = user.name;
                        token.email = user.email;
                        token.role = user.role;
                        token.fullname = user.fullname;
                        token.phone = user.phone;
                        token.points = user.points;
                  }
                  return token;
            },
            async session({ session, token }) {
                  if (session.user) {
                        session.user.id = token.sub as string;
                        session.user.name = token.name;
                        session.user.email = token.email;
                        session.user.role = token.role as string;
                        session.user.fullname = token.fullname as string;
                        session.user.phone = token.phone as string;
                        session.user.points = token.points as number;
                  }
                  return session;

            },
      },
      secret: process.env.NEXTAUTH_SECRET,
};
