import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { pid, all } = req.query;

      // get cookie token
      const token = req.cookies.token as string;
      const data = jwt.verify(token, process.env.JWT_KEY as string);

      const organization = await prisma.user.findMany({
        where: {
          id: (data as any).id,
        },
        select: {
          organization: {
            select: {
              projects: true,
            },
          },
        },
      });

      if (!organization) {
        return res.status(400).json({ message: "Organization not found" });
      }

      if (all) {
        return res
          .status(200)
          .json((organization as any)[0].organization.projects);
      } else {
        if (!pid) {
          return res.status(400).json({ message: "Missing pid" });
        }

        const project = (organization as any)[0].organization.projects.find(
          (project: any) => project.id === pid
        );

        if (!project) {
          return res.status(400).json({ message: "Project not found" });
        }

        return res.status(200).json(project);
      }
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
  } else if (req.method === "POST") {
    try {
      const { name, description, organizationId } = req.body;

      // get cookie token
      const token = req.cookies.token as string;
      jwt.verify(token, process.env.JWT_KEY as string);

      const room_number = crypto.getRandomValues(new Uint32Array(1))[0];

      const project = await prisma.project.create({
        data: {
          name: name,
          description: description,
          organization: {
            connect: {
              id: organizationId,
            },
          },
          Artificium: {
            create: {
              room: String(room_number),
            },
          },
        },
      });

      return res.status(200).json({
        message: "Project created successfully",
        status: "success",
      });
    } catch (error: any) {
      console.log(error);
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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
