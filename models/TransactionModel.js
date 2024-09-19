import mongoose from "mongoose";
const TransactionsSchema = new mongoose.Schema({
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

export const transactions = new mongoose.model("transactions",TransactionsSchema);