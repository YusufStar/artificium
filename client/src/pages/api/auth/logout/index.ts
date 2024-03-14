import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", `token=; path=/; max-age=3600; samesite=lax`);

    return res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
