import { TransactionModel } from "../models/TransactionModel";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import transactionService from "../services/TransactionService";
import { TransactionDocument } from "../types/transactionType";
import { NotFoundError, ValidationError } from "../exceptions/CustomError";

class TransactionController{
  async createTransaction(req: Request, res: Response, next: NextFunction) :Promise<void>{
    const transactionData = req.body;
    try{
      const transaction = await transactionService.createTransaction(transactionData);
      res.status(200).json({success:true,transaction});
    }catch(error){
      next(error);
    }
  }
  
  async deleteTransaction(req: Request, res: Response, next: NextFunction){
    console.log("Into the controller");
    try{
      const data = await transactionService.deleteTransaction(req.params.id); 
      res.status(200).json({success:true,data});
    }catch(err){
      next(err);
    }
  } 

  async updateTransaction(req: Request, res: Response, next: NextFunction){
    const {id} = req.params;
    const transactionData = req.body;
    try{
      const data = await transactionService.updateTransaction(id,transactionData);
      res.status(200).json({success:true,data});
    }catch(err){
      next(err);
    }
  }

  async getAllTransactions(req: Request, res: Response, next: NextFunction){
    console.log("Into the controller");
    try{
      const transactions = await transactionService.getAllTransactions();
      res.status(200).json(transactions);
    }catch(error){
      next(error
      );
    }
  }

  async getMatchedTransactions(req: Request, res: Response, next: NextFunction){
    console.log("Into the controller");
    const searchTerm = req.query.searchTerm as string;
    const filterBy = req.query.filterBy as string;
    console.log(searchTerm);
    try{
      const transactions = await transactionService.getMacthedTransactions(searchTerm,filterBy);
      res.status(200).json(transactions);
    }catch(error){
      next(error);
    }
  }
}

export default new TransactionController();