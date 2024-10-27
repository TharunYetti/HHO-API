import { Document } from "mongoose";

export interface DonationDocument extends Document{
    name: string,
    title: string,
    description: string,
    amt: number,
    date: Date
}