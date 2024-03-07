import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body?.password !== req.body?.repeatPassword) {
      return res
        .status(201)
        .json({
          message: "Passwords do not match",
          action: "error",
          field: ["repeatPassword", "password"],
        });
    }

    if (!req.body?.terms_and_conditions) {
      return res
        .status(201)
        .json({
          message: "You must accept the terms and conditions",
          action: "error",
          field: ["terms_and_conditions"],
        });
    }

    const hashedPassword = await bcrypt.hash(req.body?.password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          firstName: req.body?.firstName,
          lastName: req.body?.lastName,
          email: req.body?.email,
          password: hashedPassword,
          profilePhoto: req.body?.profilePhoto,
        },
      });

      const token =
        Math.random().toString(36).substr(4) +
        Math.random().toString(36).substr(4);

      const verifyToken = await prisma.verifyToken.create({
        data: {
          token: token,
          userId: user.id,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      const url = `https://artificium-new.vercel.app/verify-email?token=${verifyToken.token}`;

      await prisma.user.update({
        where: { id: user.id },
        data: { verifyTokenId: verifyToken.id },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "Verify your email",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Kullanıcı Doğrulama</title>
        </head>
        <body style="color: #CDCECF; font-family: Arial, sans-serif;">
        
        <div style="background-color: #363A3D; padding: 20px; border-radius: 10px; width: fit-content; margin: auto;">
            <h2 style="color: #B6F09C; text-align: center; margin-bottom: 4px;">Kullanıcı Doğrulama</h2>
            <p>Merhaba, ${user.firstName}</p>
            <p>Kullanıcı doğrulama işlemi için lütfen aşağıdaki linke tıklayınız:</p>
            <p><a href="${url}" style="color: #9B9C9E;">Doğrulama Linki</a></p>
            
            <p style="color: #9B9C9E;">Artificium.ai</p>
            <p>İyi günler dileriz.</p>
        </div>
        
        </body>
        </html>
        `,
      });

      return res
        .status(200)
        .json({
          message: "User created successfully",
          action: "redirect",
          url: "/login",
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
