import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { token } = req.body;

      if (!token || token === "") {
        return res.status(201).json({
          message: "Token required.",
          action: "auth",
        });
      }

      const data = jwt.verify(token, process.env.JWT_KEY as string);

      const id = (data as any).id;

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          organization: {
            include: {
              members: true,
            },
          },
        },
      });

      if (!user) {
        res.setHeader("Set-Cookie", "path=/; max-age=3600; samesite=lax");

        return res.status(201).json({
          message: "User not found.",
          action: "auth",
        });
      }

      return res.json({
        user,
        action: "success",
        message: "Successfull authenticated.",
      });
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
    return res.status(405).json({ message: "Method not allowed" });
  }
}
