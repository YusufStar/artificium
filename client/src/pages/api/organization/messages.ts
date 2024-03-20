import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { room } = req.query;

      // get cookie token
      const token = req.cookies.token as string;
      jwt.verify(token, process.env.JWT_KEY as string);

      const artificium = await prisma.artificium.findUnique({
        where: {
          room: room as string,
        },
      });

      const messages = await prisma.message.findMany({
        where: {
          artificiumId: artificium?.id,
        },
        include: {
          author: true,
        }
      });

      return res.status(200).json(messages);
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res.status(201).json({
          message: "Token expired",
          action: "error",
          url: "/login",
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(201).json({
          message: "Jwt must be provided.",
          action: "error",
          url: "/login",
        });
      } else {
        return res.status(201).json({ message: "Unauthorized" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
