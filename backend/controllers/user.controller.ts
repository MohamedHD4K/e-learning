import { Response, Request } from "express";
import { PrismaClient } from "@prisma";

const prisma = new PrismaClient();

export const user = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({ where: { username } });

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in auth controller Get me:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const users = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany();

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in auth controller Get me:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
