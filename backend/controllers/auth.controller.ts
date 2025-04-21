import { Request, Response } from "express";
import { PrismaClient, Role, Gender } from "@prisma";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

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
