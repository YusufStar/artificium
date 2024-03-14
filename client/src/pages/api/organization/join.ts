import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { token, name } = req.body;

      const data = jwt.verify(token, process.env.JWT_KEY);

      const user = await prisma.user.findUnique({
        where: {
          id: (data as any).id,
        },
        include: {
          organization: true,
        },
      });

      const oraganization = await prisma.organization.findUnique({
        where: {
          name: name,
        },
      });

      if (oraganization === null) {
        return res.status(201).json({
          message: "Organization not found",
          action: "error",
        });
      }

      if (user.organizationId !== null) {
        return res.status(201).json({
          message: "You are already in an organization",
          action: "error",
        });
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          organization: {
            connect: {
              id: oraganization.id,
            },
          },
        },
      });

      await prisma.organization.update({
        where: {
          id: oraganization.id,
        },
        data: {
          members: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return res.status(201).json({
        message: "Success! Redirecting...",
        action: "redirect",
        url: "/",
      });
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
