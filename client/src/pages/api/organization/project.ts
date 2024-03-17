import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { pid, all } = req.query;

    if (!pid) {
      return res.status(400).json({ message: "Missing pid" });
    }

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
    }

    const project = (organization as any)[0].organization.projects.find(
      (project: any) => project.id === pid
    );

    if (!project) {
      return res.status(400).json({ message: "Project not found" });
    }

    return res.status(200).json(project);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
