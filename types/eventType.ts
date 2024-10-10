import { Document, ObjectId } from "mongoose";

// Define the interface for EventDocument
export interface EventDocument extends Document {
  eventName: string;
  eventDescription: string;
  event_start_date: string;  // You can also change this to Date if you are storing it as a Date
  event_end_date: string;    // Same here, can be changed to Date if using Date type in the schema
  eventVenue: string;
  eventPoster?: string;      // Optional field
  preEvents: ObjectId[];     // Array of ObjectIds for referencing other events
  createdAt?: Date;          // These fields are added by Mongoose automatically because of timestamps
  updatedAt?: Date;
}
