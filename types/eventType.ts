import { Document, ObjectId } from "mongoose";

export interface SubEventDocument extends Document{
  subEventTitle: string,
  subEventDescription: string,
  subEventVenue: string,
  subEventPoster?: string,
  subEventDate: Date
}

// Define the interface for EventDocument
export interface EventDocument extends Document {
  eventTitle: string;
  eventDescription: string;
  event_start_date: Date;  // You can also change this to Date if you are storing it as a Date
  event_end_date: Date;    // Same here, can be changed to Date if using Date type in the schema
  eventVenue: string;
  eventPoster?: string;      // Optional field
  subEvents: SubEventDocument[];     // Array of ObjectIds for referencing other events
  createdAt?: Date;          // These fields are added by Mongoose automatically because of timestamps
  updatedAt?: Date;
}
