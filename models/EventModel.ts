import mongoose, { Schema, model } from "mongoose";
import { EventDocument } from "../types/eventType";  // Assuming this contains your EventDocument interface
import SubEventModel from "./SubEventModel";

const eventSchema = new Schema<EventDocument>({
  eventTitle: {
    type: String,
    required: true
  },
  eventDescription: {
    type: String,
    required: true
  },
  event_start_date: {
    type: Date,
    required: true
  },
  event_end_date: {
    type: Date,
    required: true
  },
  eventVenue: {
    type: String,
    required: true
  },
  eventPoster: {
    type: String
  },
  subEvents: [{
    type: [ SubEventModel ]
  }]
}, {
  timestamps: true
});

export default  model<EventDocument>("Event", eventSchema);
