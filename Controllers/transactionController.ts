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

//create route
// export const createTransaction = async (req: Request, res: Response) => {
//   try {
//     const { transaction_type, amount, purpose } = req.body;
//     if (!transaction_type || !amount || !purpose) {
//       res.json({ Error: true, Message: "All fileds are required" });
//     }
//     const newTransaction = {
//       date: Date.now(),
//       transaction_type,
//       amount,
//       purpose,
//     };
//     const result = await TransactionModel.create(newTransaction);
//     res.status(200).json({ Message: "Succesfully Uploaded the transaction" });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ Error: "True", Message: error.message });
//     } else {
//       res.status(400).send("Unknown Error");
//     }
//   }
// };

//update route
// export const updateTransaction = async (req: Request, res: Response) => {
//   try {
//     const { transaction_id, date } = req.body; //for reference
//     const { new_transaction_type, new_amount, new_purpose } = req.body; // for any updation
//     if (!transaction_id) {
//       res.json({
//         Status: "Error",
//         Message: "Transaction Id was not given",
//       });
//     }
//     if (!new_transaction_type || !new_amount || !new_purpose) {
//       res.json({ Status: "Error", Message: "All fileds are required" });
//     }

//     const updated_data = {
//       transaction_type: new_transaction_type,
//       amount: new_amount,
//       purpose: new_purpose,
//       date: date,
//     };

//     const transaction_to_be_updated = await TransactionModel.findByIdAndUpdate(
//       transaction_id,
//       updated_data,
//       { new: true }
//     );
//     if (!transaction_to_be_updated) {
//       res.json({ Status: "Error", Message: "Transaction Not Updated" });
//     }
//     res.json({ Status: "Success", updatedData: updated_data });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ Status: "Error", Message: error.message });
//     } else {
//       res.status(400).send("Unknown Error");
//     }
//   }
// };

// //delete route
// export const deleteTransaction = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const deletedTransaction = await TransactionModel.findByIdAndDelete(id);
//     if (!deletedTransaction) {
//       res.json({
//         Status: "Error",
//         Message: "Transaction is not deleted",
//       });
//     }
//     res
//       .status(200)
//       .json({ Status: "Success", Message: "Transaction deleted successfully" });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ Status: "Error", Message: error.message });
//     } else {
//       res.status(400).send("Unknown Error");
//     }
//   }
// };

// export const getAllTransactions = async (req: Request, res: Response) => {
//   try {
//     const allTransactions = await TransactionModel.find({});
//     res.status(200).json(allTransactions);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ Status: "Error", Message: error.message });
//     } else {
//       res.status(400).send("Unknown Error");
//     }
//   }
// };

// //get on search
// export const getMatchedTransactions = async (req: Request, res: Response) => {
//   try {
//     const searchTerm = req.query.search as string | undefined;
//     let amountSearch: number | undefined;
//     let dateSearch: Date | undefined;

//     if (searchTerm) {
//       if (!isNaN(Number(searchTerm))) {
//         amountSearch = Number(searchTerm);
//       }

//       const parsedDate = new Date(searchTerm);
//       if (!isNaN(parsedDate.getDate())) {
//         dateSearch = parsedDate;
//       }
//     }

//     const query: any = {
//       $or: [{ purpose: { $regex: searchTerm, $options: "i" } }],
//     };

//     if (dateSearch) {
//       const startOfDay = new Date(dateSearch);
//       startOfDay.setHours(0, 0, 0, 0);

//       const endOfDay = new Date(dateSearch);
//       endOfDay.setHours(23, 59, 59, 999);

//       query.$or.push({ date: { $gte: startOfDay, $lt: endOfDay } });
//     }

//     if (amountSearch !== undefined) {
//       query.$or.push({ amount: { $eq: amountSearch } });
//     }

//     const matchingTransactions = await TransactionModel.find(query);

//     res.status(200).json(matchingTransactions);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ Status: "Error", Message: error.message });
//     } else {
//       res.status(400).send("Unknown Error");
//     }
//   }
// };
