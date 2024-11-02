import { TransactionModel } from "../models/TransactionModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import transactionService from "../services/TransactionService";
import { TransactionDocument } from "../types/transactionType";
import { NotFoundError, ValidationError } from "../exceptions/CustomError";

class TransactionController{
  async createTransaction(req: Request, res: Response) :Promise<void>{
    const transactionData = req.body;
    try{
      const transaction = await transactionService.createTransaction(transactionData);
      res.status(200).json({success:true,transaction});
    }catch(error){
      if(error instanceof ValidationError){
        res.status(400).json({success:false,message:error.message});
      }else{
        res.status(500).json({success:false, message: "Error adding transaction", error });
      }
    }
  }
  
  async deleteTransaction(req: Request, res: Response){
    console.log("Into the controller");
    try{
      const data = await transactionService.deleteTransaction(req.params.id); 
      res.status(200).json({success:true,data});
    }catch(err){
      if(err instanceof NotFoundError){
        res.status(404).json({success:false,message:err.message});
      }else if(err instanceof ValidationError){
        res.status(400).json({success:false,message:err.message});
      }else{
        res.status(500).json({ success:false,message: "Error in deleting transaction", err });
      }
    }
  } 

  async updateTransaction(req: Request, res: Response){
    const {id} = req.params;
    const transactionData = req.body;
    try{
      const data = await transactionService.updateTransaction(id,transactionData);
      res.status(200).json({success:true,data});
    }catch(err){
      if(err instanceof NotFoundError){
        res.status(404).json({success:false,message:err.message});
      }else if(err instanceof ValidationError){
        res.status(400).json({success:false,message:err.message});
      }else{
        res.status(500).json({success:false,message: "Error in updating transaction",err});
      }
    }
  }

  async getAllTransactions(req: Request, res: Response){
    console.log("Into the controller");
    try{
      const transactions = await transactionService.getAllTransactions();
      res.status(200).json(transactions);
    }catch(error){
      res.status(500).json({ message: "Error retrieving transactions", error });
    }
  }

  async getMatchedTransactions(req: Request, res: Response){
    console.log("Into the controller");
    const searchTerm = req.query.searchTerm as string;
    const filterBy = req.query.filterBy as string;
    console.log(searchTerm);
    try{
      const transactions = await transactionService.getMacthedTransactions(searchTerm,filterBy);
      res.status(200).json(transactions);
    }catch(error){
      res.status(500).json({ message: "Error retrieving macthed transactions", error });
    }
  }
}

export default new TransactionController();