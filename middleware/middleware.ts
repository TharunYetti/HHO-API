import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables.");
}

declare module "express-serve-static-core" {
  interface Request {
    user?: any;  
  }
}

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization']; 
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY); 

    req.user = decoded;
    
    next(); 
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(403).json({ message: "Invalid token", error: error.message });
    } else {
      return res.status(500).json({ message: "An unknown error occurred in middleware" });
    }
  }
};
