import { Request, Response } from "express";
import  offUserModel  from "../models/off_users";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { OffUserDocument } from "../types/offUserType";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

interface IPayload {
  user: {
    id: string;
    role: string;
  };
}

export const offUserLogin = async (
  req: Request,
  res: Response
)=> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
       res.json({ Error: "True", Message: "All Fields Required..." });
    }

    const userExist = await offUserModel.findOne({ email }) as OffUserDocument;

    if (!userExist) {
      res.json({
        Error: "True",
        Message: "Login with Valid Credentials....",
      });
    }

    if (password !== userExist.password) {
      res.json({
        Error: "True",
        Message: "Login with Valid Credentials...",
      });
    }
    const payload: IPayload = {
      user: {
        id: String(userExist._id),
        role: userExist.role,
      },
    };

    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "100d" }, (err, token) => {
      if (err) {
        console.log(err.message);
        res.json({ Error: "True", Message: "Token is not generated" });
      }
       res.json({ token });
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
       res.json({ Error: "True", Message: error.message });
    } else {
       res.json({ Error: "True", Message: "Something went wrong" });
    }
  }
};
