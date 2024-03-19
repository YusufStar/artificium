import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { content, artificiumId, userId } = req.body;

      jwt.verify(req.cookies.token as string, process.env.JWT_KEY as string);

      const message = await prisma.message.create({
        data: {
          content,
          author: {
            connect: {
              id: userId,
            },
          },
          artificium: {
            connect: {
              id: artificiumId,
            },
          },
        },
      });

      return res.json(message);
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        res.setHeader(
          "Set-Cookie",
          "token=; path=/; max-age=3600; samesite=lax"
        );
        return res.status(201).json({
          message: "Token expired",
          action: "redirect",
          url: "/login",
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(201).json({
          message: "Jwt must be provived.",
          action: "redirect",
          url: "/login",
        });
      } else {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  }
}
