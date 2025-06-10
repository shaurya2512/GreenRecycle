import nodemailer from "nodemailer";

// Define and export the transporter
export const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
      },
});

export const sendConfirmationEmail = async (
      to: string,
      name: string,
      brand: string,
      model: string,
      pickupDate: string,
      pickupTime: string,
      estimatedPrice: number,
) => {
      // Allowed domains
      const allowedDomains = ["gmail.com", "yahoo.com", "niet.co.in"];
      const emailDomain = to.split("@")[1];

      if (!allowedDomains.includes(emailDomain)) {
            console.log(`Email not sent: domain "${emailDomain}" is not allowed.`);
            return;
      }

      const mailOptions = {
            from: `"GreenRecycle" <${process.env.SMTP_EMAIL}>`,
            to,
            subject: "🌱 Your Recycling Pickup Is Confirmed! 🌱",
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
        <h2 style="color: #2e7d32;">Hello ${name},</h2>
        <p>We're excited to let you know that your recycling pickup request has been successfully received and confirmed. Thank you for taking a positive step towards a cleaner, greener planet! 🌱</p>
        <hr style="border: none; border-top: 1px solid #ccc;" />
        <h3 style="color: #2e7d32;">📦 Pickup Details</h3>
        <ul style="line-height: 1.6; font-size: 16px;">
          <li><strong>Brand:</strong> ${brand}</li>
          <li><strong>Model:</strong> ${model}</li>
          <li><strong>Pickup Date:</strong> ${pickupDate}</li>
          <li><strong>Pickup Time:</strong> ${pickupTime}</li>
        </ul>
        <h3 style="color: #2e7d32;">🎁 You've Earned Points!</h3>
        <p>You’ve earned <strong>${estimatedPrice} GreenPoints</strong>! These points will be added to your account within 24 hours after your item is picked up.</p>
        <p>These points can be used in the future for rewards, discounts, or donations!</p>
        <p>If you need to make any changes or have questions, feel free to reply to this email.</p>
        <hr style="border: none; border-top: 1px solid #ccc;" />
        <p>Thank you again for being part of the GreenRecycle movement. Together, we can make a lasting impact 💚</p>
        <p style="margin-top: 40px;">Warm regards,</p>
        <p style="font-weight: bold; color: #2e7d32;">— The GreenRecycle Team</p>
      </div>
    `,
      };

      await transporter.sendMail(mailOptions);
};
