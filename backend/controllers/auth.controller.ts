import crypto from "crypto";
import bcrypt from "bcryptjs";
import { transporter } from "../utils/mailer";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { PrismaClient, Role, Gender } from "@prisma";
import { OAuth2Client } from "google-auth-library";
import generateJsonWebToken from "../utils/generateJosnWebToken";
import fetch from "node-fetch";
import { jwtDecode } from "jwt-decode";

const prisma = new PrismaClient();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
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
      },
    });

    generateJsonWebToken(password, req, res);

    console.log({ message: "User created successfuly", user });
    return res.status(201).json({ message: "User created successfuly", user });
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

    const dehashedPassword = await bcrypt.compare(password, user.password!);

    if (!dehashedPassword) {
      return res.status(400).json({ error: "Invaled username or password" });
    }

    generateJsonWebToken(password, req, res);

    console.log({ message: "Loged in successfuly", user });
    return res.status(200).json({ message: "Loged in successfuly", user });
  } catch (error) {
    console.error("Error in auth controller Signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  console.log({ message: "Logged out successfully" });
  return res.status(200).json({ message: "Logged out successfully" });
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

export const loginWithGoogleAccount = async (req: Request, res: Response) => {
  const { token: code } = req.body;

  try {
    // تبادل الكود بـ access_token و id_token
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "postmessage",
        grant_type: "authorization_code",
      }),
    });

    const data : any = await response.json();
    if (!data.id_token) {
      return res.status(401).json({ error: "Failed to exchange code" });
    }

    // فك تشفير id_token
    const payload = jwtDecode<any>(data.id_token);

    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    // إذا لم يوجد المستخدم، قم بإنشائه
    if (!user) {
      user = await prisma.user.create({
        data: {
          username: payload.name,
          email: payload.email,
          id: payload.sub,
          avatar: payload.picture,
          firstname: payload.given_name,
          lastname: payload.family_name,
        },
      });

      generateJsonWebToken(payload.name, req, res);

      console.log({ message: "User created and logged in", user });
      return res.status(201).json({ message: "User created and logged in", user });
    }
    
    generateJsonWebToken(payload.name, req, res);

    console.log({ message: "Logged in successfully", user });
    return res.status(200).json({ message: "Logged in successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token", message: err });
  }
};