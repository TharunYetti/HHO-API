import { Document } from "mongoose";

// Define the interface for TransactionDocument
export interface TransactionDocument extends Document {
    date: Date;
    transaction_type: 'debit' | 'credit';
    amount: number;
    purpose: string;
}