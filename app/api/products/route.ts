// app/api/products/route.ts
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import dbConnect from 'lib/mongodb'; // your DB connection

export async function GET() {
      await dbConnect();
      const products = await Product.find();
      return NextResponse.json(products);
}
