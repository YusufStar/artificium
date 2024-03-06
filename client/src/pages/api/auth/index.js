/* get user with token (cookie) */
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { token } = req.body;

      const data = jwt.verify(token, process.env.JWT_KEY);

      const id = data.id;

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      return res.json(user);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.setHeader(
          "Set-Cookie",
          "token=; path=/; max-age=3600; samesite=lax"
        );
        return res
          .status(201)
          .json({
            message: "Token expired",
            action: "redirect",
            url: "/login",
          });
      } else if (error.name === "JsonWebTokenError") {
        return res
          .status(201)
          .json({
            message: "Jwt must be provived.",
            action: "redirect",
            url: "/login",
          });
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
