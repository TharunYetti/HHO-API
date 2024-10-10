import { Document } from "mongoose";

// Define the interface for TestimonialDocument
export interface TestimonialDocument extends Document {
    name: string;
    message: string;
    rating: number;
    discipline: string;
    createdAt?: Date;          // These fields are added by Mongoose automatically because of timestamps
    updatedAt?: Date;
}