import { Document } from "mongoose";

export interface OffUserDocument {
    name: string;
    email: string;
    password: string;
    role: string;
  }