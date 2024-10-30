import { Document } from "mongoose";

export interface ActivityDocument extends Document{
    name: string,
    description: string,
    image: string
}