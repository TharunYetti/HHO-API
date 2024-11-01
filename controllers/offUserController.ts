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
    id: mongoose.Types.ObjectId;
    role: string;
  };
}

class OffUserController{
  async login(req: Request, res: Response){
    try {
      const token = await offUserService.login(req.body);
      res.status(200).json({ success: true, token });
    } catch (error) {
      if(error instanceof NotFoundError){
        res.status(404).json({success:false,message:error.message});
      }else if(error instanceof ValidationError){
        res.status(400).json({success:false,message:error.message});
      }else{
        res.status(500).json({success:false,message: "Error in logging in",error});
      }
    }
  }
  async getAllUsers(req:Request,res:Response){
    try{
      const data = await offUserService.getAll();
      res.status(200).json(data);
    }
    catch(error){
      res.status(400).json({success:false,message:error.message});
    }
  }
  async addUser(req:Request,res:Response){
    try{
      const {name,email,image,ID,password,role,linkedin,mobile} = req.body;
      const user = await offUserModel.create(req.body);
      res.status(200).json(user);
    }catch(e){
      res.status(400).json(e);
    }
  }
  async updateUsers(req:Request,res:Response){
    const offUserData = req.body;
    try{
      const result = offUserService.updateById(req.params.id,offUserData);
      res.status(200).json({success:true,result});
    }catch(e){
      if(e instanceof NotFoundError){
        res.status(404).json({success:false,message:e.message});
      }else{
        res.status(400).json(e);
      }
    }
  }
    async getUserData(req: Request, res: Response){
      try{
        const data = await offUserService.getUserData(req.user.user.id);
        res.status(200).json({success:true, data});
      }catch(error){
        res.status(400).json({success:false, message: error.message});
      }
    }
}

export default new OffUserController();