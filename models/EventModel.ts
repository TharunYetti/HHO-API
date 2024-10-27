import mongoose, { Schema, model } from "mongoose";
import { EventDocument } from "../types/eventType";  // Assuming this contains your EventDocument interface

const eventSchema = new Schema<EventDocument>({
  eventName: {
    type: String,
    required: true
  },
  eventDescription: {
    type: String,
    required: true
  },
  event_start_date: {
    type: String,
    required: true
  },
  event_end_date: {
    type: String,
    required: true
  },
  eventVenue: {
    type: String,
    required: true
  },
  eventPoster: {
    type: String
  },
  preEvents: [{
    type: [Schema.Types.ObjectId],  
    required: true
  }]
}, {
  timestamps: true
});

export default  model<EventDocument>("Event", eventSchema);
