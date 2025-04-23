import { Request, Response } from "express";
import { PrismaClient, Role, Gender } from "@prisma";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import crypto from "crypto";
import { transporter } from "../utils/mailer";

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

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry,
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset</p>
             <p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    });

    return res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
