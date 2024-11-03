import mongoose, { Schema, model } from "mongoose";
import { EventDocument } from "../types/eventType";  // Assuming this contains your EventDocument interface

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
    type: [
      {
        subEventTitle: String,
        subEventDescription: String,
        subEventVenue: String,
        subEventPoster: String,
        subEventDate: Date
      }
    ]
  }]
}, {
  timestamps: true
});

export default  model<EventDocument>("Event", eventSchema);
