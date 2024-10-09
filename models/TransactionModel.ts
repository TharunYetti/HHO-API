import mongoose from "mongoose";
import {TransactionDocument} from "./models";
const TransactionsSchema = new mongoose.Schema<TransactionDocument>({
    date: {
        type: Date,
        require: true,
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

export const transactions =  mongoose.model<TransactionDocument>("transactions",TransactionsSchema);