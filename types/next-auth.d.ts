import NextAuth from "next-auth";

declare module "next-auth" {
      interface Session {
            user: {
                  id: string;
                  name: string;
                  email: string;
                  role: string;
                  fullname: string;
                  phone: string;
                  points: number;
            };
      }

      interface User {
            id: string;
            name: string;
            email: string;
            role: string;
            fullname: string;
            phone: string;
            points: number;
      }
}

declare module "next-auth/jwt" {
      interface JWT {
            id: string;
            name: string;
            email: string;
            role: string;
            fullname: string;
            phone: string;
            points: number;
      }
}
