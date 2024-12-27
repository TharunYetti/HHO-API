import { Document } from "mongoose";

export interface MoneyDocument extends Document{
    amount: Number,
    donated_amount: Number,
}