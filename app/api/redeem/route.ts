import { NextResponse } from "next/server";
import connectMongoDB from "lib/mongodb";
import User from "@/models/User";
import Redeemed from "@/models/reedemed";
import nodemailer from "nodemailer";
import { Resend } from 'resend';


const product: {
      [key: number]: { cost: number; name: string; image: string };
} = {
      1: {
            cost: 1500,
            name: "Recycled Phone Charging Cable",
            image: "/assets/products/1.jpg",
      },
      2: {
            cost: 2500,
            name: "Laptop Sleeve (Made from Recycled PET Bottles)",
            image: "/assets/products/2.jpg",
      },
      3: {
            cost: 8000,
            name: "Solar-Powered Power Bank",
            image: "/assets/products/3.jpg",
      },
      4: {
            cost: 3000,
            name: "Refurbished Wireless Mouse",
            image: "/assets/products/4.jpg",
      },
      5: {
            cost: 4000,
            name: "Eco-friendly Earphones",
            image: "/assets/products/5.jpg",
      },
      6: {
            cost: 6000,
            name: "DIY E-Waste Reuse Kit",
            image: "/assets/products/6.jpg",
      },
      7: {
            cost: 2000,
            name: "Recycled Metal Water Bottle",
            image: "/assets/products/7.jpg",
      },
      8: {
            cost: 7000,
            name: "Refurbished Bluetooth Speaker",
            image: "/assets/products/8.jpg",
      },
      9: {
            cost: 1000,
            name: "Plant a Tree Certificate",
            image: "/assets/products/9.jpg",
      },
      10: {
            cost: 2500,
            name: "Upcycled Tech Organizer",
            image: "/assets/products/10.jpg",
      },
      11: {
            cost: 3500,
            name: "Second-Life USB Drive (32GB)",
            image: "/assets/products/11.jpg",
      },
      12: {
            cost: 3000,
            name: "Eco-friendly Smartwatch Strap",
            image: "/assets/products/12.jpg",
      },
      13: {
            cost: 9000,
            name: "Sustainable Tech Backpack",
            image: "/assets/products/13.jpg",
      },
      14: {
            cost: 4500,
            name: "Desk Organizer from Circuit Boards",
            image: "/assets/products/14.jpg",
      },
      15: {
            cost: 2000,
            name: "Recycled Aluminum Phone Stand",
            image: "/assets/products/15.jpg",
      },
      16: {
            cost: 1000,
            name: "Donation to E-Waste Awareness Program",
            image: "/assets/products/16.jpg",
      },
};


export async function sendThankYouEmail(
      to: string,
      productName: string,
      productImage: string
) {
      const allowedDomains = ["gmail.com", "yahoo.com", "niet.co.in"];
      const emailDomain = to.split("@")[1];
      console.log(`Target email: ${to} | Extracted domain: ${emailDomain}`);

      if (!allowedDomains.includes(emailDomain)) {
            console.log(`Email not sent — unauthorized domain: ${emailDomain}`);
            return;
      }

      const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                  user: process.env.SMTP_EMAIL,
                  pass: process.env.SMTP_PASSWORD,
            },
      });

      const mailOptions = {
            from: `"GreenPoints" <${process.env.SMTP_EMAIL}>`,
            to,
            subject: `🌱 Your ${productName} Gift Voucher is here!`,
            html: `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 2px dashed #4caf50; background: #f1f8e9; border-radius: 12px;">
        <h2 style="text-align: center; color: #2e7d32;">🌱 A Green Gift for You!</h2>
        
        <p style="text-align: center; font-size: 18px; margin-top: 20px;">
          Thank you for redeeming <strong>${productName}</strong> with GreenPoints.
        </p>

        <div style="text-align: center; margin: 20px 0;">
          <img src="${productImage}" alt="${productName}" style="max-width: 100%; height: auto; border-radius: 8px;" />
        </div>

        <p style="font-size: 16px; color: #2e7d32; text-align: center;">
          Your product will be delivered in 3 days. Keep recycling and earn more points while protecting the planet 🌍!
        </p>

        <hr style="margin: 30px 0; border: none; border-top: 1px dashed #a5d6a7;">
        
        <p style="font-size: 13px; color: #7cb342; text-align: center;">
          This is an automated email. Please do not reply.
        </p>
      </div>
    `,
      };

      try {
            await transporter.sendMail(mailOptions);
            console.log("Thank-you email sent to", to);
      } catch (error) {
            console.error("Error sending thank-you email:", error);
      }
}



export async function POST(req: Request) {
      try {
            await connectMongoDB();
            const { userId, productId }: { userId: string; productId: number } = await req.json();

            const user = await User.findById(userId);
            if (!user) {
                  return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            const productEntry = product[productId];
            if (!productEntry) {
                  return NextResponse.json({ error: "Invalid product" }, { status: 400 });
            }

            if (user.points < productEntry.cost) {
                  return NextResponse.json({ error: "Insufficient points" }, { status: 400 });
            }

            // Deduct points
            user.points -= productEntry.cost;
            await user.save();

            // Record redemption
            await Redeemed.create({ userId, productId });

            const productData = product[productId];
            // Send thank-you email
            if (user.email) {
                  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://greenrecycle.vercel.app";
                  const fullImageUrl = `${baseUrl}${productData.image}`;

                  await sendThankYouEmail(user.email, productData.name, fullImageUrl);

            }

            return NextResponse.json({ message: "Product redeemed successfully" });
      } catch (error) {
            console.error("Redemption error:", error);
            return NextResponse.json({ error: "You have to signin" }, { status: 500 });
      }
}
