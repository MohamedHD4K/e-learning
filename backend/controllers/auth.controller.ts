import { Request, Response } from "express";
import { PrismaClient, Role, Gender } from "@prisma";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      firstname,
      lastname,
      gender,
      role,
      birthday,
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const takenUsername = await prisma.user.findUnique({ where: { username } });

    if (takenUsername) {
      return res.status(400).json({ error: "Username has been taken" });
    }

    const takenEmail = await prisma.user.findUnique({ where: { email } });

    if (takenEmail) {
      return res.status(400).json({ error: "Email has been taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        phone,
        role: role as Role,
        firstname,
        lastname,
        gender: gender as Gender,
        birthday,
      },
    });

    return res.status(201).json({ message: "User created successfuly" });
  } catch (error) {
    console.error("Error in auth controller Signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const dehashedPassword = await bcrypt.compare(password, user.password);

    if (!dehashedPassword) {
      return res.status(400).json({ error: "Invaled username or password" });
    }

    return res.status(200).json({ message: "Loged in successfuly" });
  } catch (error) {
    console.error("Error in auth controller Signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};