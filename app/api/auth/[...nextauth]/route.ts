import NextAuth from "next-auth";
import { authOptions } from "./options"; // or "../options" depending on where your `options.ts` is

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };