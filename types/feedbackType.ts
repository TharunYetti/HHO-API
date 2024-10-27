import { Document } from "mongoose";

export interface FeedbackDocument extends Document{
    name: string;
    email: string;
    id: string;
    feedback: string;
    date: Date;
}