import mongoose, { Schema, model } from "mongoose";
import { EventDocument, SubEventDocument } from "../types/eventType";  // Make sure your types are correctly imported

// Define the SubEvent Schema
const subEventSchema = new Schema<SubEventDocument>({
  subEventTitle: {
    type: String,
    required: true,
  },
  subEventDescription: {
    type: String,
    required: true,
  },
  subEventVenue: {
    type: String,
    required: true,
  },
  subEventPoster: {
    type: String
  },
  subEventDate: {
    type: Date,
    required: true,
  },
}, { _id: true });  // Make sure each subEvent has its own ObjectId

// Define the Event Schema
const eventSchema = new Schema<EventDocument>({
  eventTitle: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  event_start_date: {
    type: Date,
    required: true,
  },
  event_end_date: {
    type: Date,
    required: true,
  },
  eventVenue: {
    type: String,
    required: true,
  },
  eventPoster: {
    type: String,
  },
  subEvents: [subEventSchema],  // Use the separate subEventSchema
}, {
  timestamps: true,
});

export default model<EventDocument>("Event", eventSchema);
