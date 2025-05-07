import dotenv from "dotenv";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const generateJsonWebToken = (
  password: string,
  req: Request,
  res: Response
) => {
  const secret = process.env.JWT_SECRET + password;

  const payload = {
    username: req.body.username,
    role: req.body.role,
    id: req.body.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "30d" });

  res.cookie("token", token, {
    maxAge: 30 * 24 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export default generateJsonWebToken;
