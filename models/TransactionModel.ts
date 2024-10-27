import mongoose from "mongoose";
import {TransactionDocument} from "../types/transactionType";
const TransactionsSchema = new mongoose.Schema<TransactionDocument>({
    date: {
        type: Date,
        required : true,
        default: Date.now
    },
    transaction_type: {
        type: String,
        enum: ['debit','credit'],
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    purpose: {
        type: String,
        require: true
    }
});

export const TransactionModel =  mongoose.model<TransactionDocument>("transactions",TransactionsSchema);