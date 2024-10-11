import { TransactionModel } from "../models/TransactionModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import transactionService from "../Services/TransactionService";
import { TransactionDocument } from "../types/transactionType";

class TransactionController{
  async createTransaction(req: Request, res: Response){
    const transactionData = req.body;
    try{
      const transaction = await transactionService.createTransaction(transactionData);
      res.status(200).json(transaction);
    }catch(error){
      res.status(500).json({ message: "Error adding transaction", error });
    }
  }
  
  async deleteTransaction(req: Request, res: Response){
    console.log("Into the controller");
    try{
      const trsn = await transactionService.deleteTransaction(req.params.id); 
      res.status(200).json(trsn);
    }catch(err){
      res.status(500).json({ message: "Error in deleting transaction", err });
    }
  } 

  async updateTransaction(req: Request, res: Response){
    console.log("Into the controller");
    const {id} = req.body;
    const transactionData = req.body;
    try{
      const trsn = await transactionService.updateTransaction(id,transactionData);
      res.status(200).json(trsn);
    }catch(err){
      res.status(500).json({message: "Error in updating transaction",err});
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
    console.log(searchTerm);
    try{
      const transactions = await transactionService.getMacthedTransactions(searchTerm);
      res.status(200).json(transactions);
    }catch(error){
      res.status(500).json({ message: "Error retrieving macthed transactions", error });
    }
  }
}

export default new TransactionController();