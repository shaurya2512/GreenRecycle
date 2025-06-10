// app/api/points/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from "lib/mongodb";
import User from '@/models/User';

export async function GET(req: NextRequest) {
      const email = req.nextUrl.searchParams.get('email');

      if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
      }

      try {
            await connectMongoDB();

            const user = await User.findOne({ email });

            if (!user) {
                  return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }

            return NextResponse.json({ points: user.points || 0 });
      } catch (error) {
            console.error('Error fetching points:', error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
      }
}
