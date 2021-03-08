import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await prisma.user.findUnique({
    where: { username: req.query.username as string },
  });

  if (user) return res.json(user);
  else return res.status(404).json({ message: "User not found" });
};
