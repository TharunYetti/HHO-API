import { Document } from "mongoose";

// Define the interface for EventRegistrationDocument
export interface EventRegistrationDocument extends Document {
    name: string,
    email: string,
    id: string
    event: string,
    date_of_registration: Date
}