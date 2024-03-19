import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(201).json({
        message: "User not found",
        action: "error",
        field: ["email", "password"],
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(201).json({
        message: "Invalid email or password",
        action: "error",
        field: ["email", "password"],
      });
    }

    if (user.emailVerified === false) {
      return res.status(201).json({
        message: "Please verify your email",
        action: "error",
        field: ["email", "password"],
      });
    }

    /*
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailData = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Login Notification",
      text: `You have logged in at ${new Date().toLocaleString()}`,
    };
    
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
    */

    const token = jwt.sign(user, process.env.JWT_KEY, {
      expiresIn: "365d",
    });

    res.setHeader(
      "Set-Cookie",
      `token=${token}; path=/; max-age=3600; samesite=lax`
    );

    return res.status(200).json({
      message: "Login successful",
      action: "redirect",
      url: "/",
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
