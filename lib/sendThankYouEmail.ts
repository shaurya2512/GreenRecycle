// lib/sendThankYouEmail.ts
import nodemailer from "nodemailer";

interface User {
  email: string;
}

interface ProductData {
  name: string;
  image: string;
}

export async function sendThankYouEmail(
  user: User,
  productData: ProductData
) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_EMAIL!,
      pass: process.env.SMTP_PASSWORD!,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://greenrecycle.vercel.app";
  const fullImageUrl = `${baseUrl}${productData.image}`;

  const mailOptions = {
    from: `GreenPoints <${process.env.SMTP_EMAIL}>`,
    to: user.email,
    subject: `🎉 Thank you for redeeming ${productData.name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: green;">✅ Thanks for Redeeming!</h2>
        <p>Hi there,</p>
        <p>You've successfully redeemed <strong>${productData.name}</strong>.</p>
        <div style="text-align: center; margin: 20px 0;">
          <img src="${fullImageUrl}" alt="${productData.name}" style="max-width: 100%; height: auto; border-radius: 10px;" />
        </div>
        <p>Your product will be delivered within <strong>3 days</strong> 🚚📦</p>
        <p>We appreciate your efforts to recycle and earn rewards. Keep recycling to earn more points and unlock more amazing products!</p>
        <p style="font-size: 12px; color: #555;">This is an automated email. Please do not reply.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("❌ Error sending thank-you email:", error);
  }
}
