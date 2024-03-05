/* get user with token (cookie) */
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token } = req.body;

    const data = jwt.verify(token, process.env.JWT_KEY);

    if (data.exp < Date.now() / 1000) {
      return res.status(401).json({ message: "Token expired" });
    }

    const id = data.id;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return res.json(user);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
