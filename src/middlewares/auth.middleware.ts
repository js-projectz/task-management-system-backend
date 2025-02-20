/**
 * Here the file all middleware
 * code will be there
 *
 */

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
  user?: jwt.JwtPayload | string;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err: any) {
    res.status(403).json({ message: "Invalid token." });
    return;
  }
};

export default auth;
