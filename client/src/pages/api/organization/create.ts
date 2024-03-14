import { prisma } from "@/lib/prisma";
import { addOrganization } from "@/lib/server";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { token, name, avatar } = req.body;

      jwt.verify(token, process.env.JWT_KEY as string);

      const oraganization = await addOrganization({
        name: name,
        avatar: avatar,
      });

      return res.json(oraganization);
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
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  }
}
