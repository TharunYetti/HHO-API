import { NextFunction, Request, Response } from "express";
import offUserModel from "../models/off_users";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import offUserService from "../services/OffUserService";
import { OffUserDocument } from "../types/offUserType";
import dotenv from "dotenv";
import { ConflictError, NotFoundError, ValidationError } from "../exceptions/CustomError";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
console.log(JWT_SECRET_KEY);

interface IPayload {
  user: {
    id: mongoose.Types.ObjectId;
    role: string;
  };
}

class OffUserController {
  async login(req: Request, res: Response,next: NextFunction) {
      try {
        const token = await offUserService.login(req.body);
        res.status(200).json({ success: true, token });
      } catch (error) {
        next(error);
    }
  }
  async getAllUsers(req: Request, res: Response,next: NextFunction) {
    if (res.statusCode === 200) {
      try {
        const data = await offUserModel.find({});
        res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    }
  }
  async addUser(req: Request, res: Response,next: NextFunction) {
    try {
      const user = await offUserService.addUser(req.body);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
  async updateUsers(req: Request, res: Response,next: NextFunction) {
    const offUserData = req.body;
    try {
      const result = await offUserService.updateById(req.params.id, offUserData);
      res.status(200).json({ success: true, result });
    } catch (e) {
      next(e);
    }
  }
  async getUserData(req: Request, res: Response,next: NextFunction) {
    try {
      const data = await offUserService.getUserData(req.user.user.id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(req: Request, res: Response,next: NextFunction) {
    try {
      const result = await offUserService.deleteById(req.params.id);
      res.status(200).json({ success: true, result });
    } catch (e) {
      next(e);
    }
  }
}

export default new OffUserController();
