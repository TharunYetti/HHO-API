import {Document, Schema, model} from "mongoose";

export interface SubEventDocument extends Document {
    name: string;
    description: string;
    venue: string;
    date: Date;
    time: string;
    poster: string;
    mainEventId: Schema.Types.ObjectId;
    createdAt?: Date;          // These fields are added by Mongoose automatically because of timestamps
    updatedAt?: Date;
  }