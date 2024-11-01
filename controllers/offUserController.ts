import { Request, Response } from "express";
import offUserModel from "../models/off_users";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import offUserService from "../services/OffUserService";
import { OffUserDocument } from "../types/offUserType";
import dotenv from  'dotenv';
import { NotFoundError, ValidationError } from "../exceptions/CustomError";
dotenv.config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
console.log(JWT_SECRET_KEY)

interface IPayload {
  user: {
    id: string;
    role: string;
  };
}

class OffUserController{
  async login(req: Request, res: Response){
    try {
      const token = await offUserService.login(req.body);
      res.json({ success: true, token });
    } catch (error) {
      if(error instanceof NotFoundError){
        res.status(200).json({success:false,message:error.message});
      }else if(error instanceof ValidationError){
        res.status(200).json({success:false,message:error.message});
      }else{
        res.status(200).json({success:false,message: "Error in logging in",error});
      }
    }

  }
  async getAllUsers(req:Request,res:Response){
    try{
      const data = await offUserModel.find();
      res.status(200).json(data);
    }
    catch(error){
      res.status(400).json({success:false,message:error.message});
    }
  }
  async updateUsers(req:Request,res:Response){
    try{
      const uid = req.params.id;
      const userExist = await offUserModel.findByIdAndUpdate(uid,req.body);
      res.status(200).json({message:"success"});
    }catch(e){
      res.status(400).json(e);
    }
  }
    async getUserData(req: Request, res: Response){
      try{
        const data = await offUserService.getUserData(req.params.id);
        res.json({success:true, data:data});
      }catch(error){
        res.status(400).json({success:false, message: error.message});
      }
    }
}

export default new OffUserController();