import { transactions } from "../models/TransactionModel.js";
import mongoose from "mongoose";

export const transactionUpdate = async (req,res)=>{
    try{
        const {transaction_type, amount, purpose} = req.body;
        if(!transaction_type || !amount || !purpose){
            res.json({"Error":true, "Message":"All fileds are required"});
        }
        const newTransaction = {
            date: Date.now(), transaction_type, amount, purpose    
        }

        const result = await transactions.create(newTransaction);
        if(!res){
            return res.json({"Error":"True","Message":"Error in pushing data into database"});
        }
        return res.json({"Message":"Succesfully Updated the transaction..."});


    }catch(error){
        console.log(error.message);
        return res.json({"Error":"True","Message":error.message});
    }
}