import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const verification = await prisma.verifyToken.findUnique({
      where: {
        token,
      },
    });

    if (!verification) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (verification.expiredAt < new Date()) {
      return res.status(400).json({ message: "Token has expired" });
    }

    await prisma.user.update({
      where: {
        id: verification.userId,
      },
      data: {
        emailVerified: true,
      },
    });

    return res.status(200).json({ message: "Email verified" });
  }
}
