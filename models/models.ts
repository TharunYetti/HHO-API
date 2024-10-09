import mongoose from "mongoose";
export interface DonationDocument {
  name: string;
  title: string;
  description: string;
  amt: number;
  date: Date;
}
export interface EventDocument {
  eventName: string;
  eventDescription: string;
  event_start_date: string;
  event_end_date: string;
  eventVenue: string;
  eventPoster: string;
  preEvents: mongoose.Types.ObjectId[];
}
export interface FeedBackDocument {
  name: string;
  id: string;
  email: string;
  feedback: string;
  date: Date;
}
export interface OffUserDocument {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface SubEventDocument {
  name: String;
  description: String;
  venue: String;
  date: Date;
  time: String;
  poster: String;
  mainEventId: mongoose.Types.ObjectId;
}
export interface TestimonialDocument {
  name: String;
  message: String;
  rating: Number;
  discipline: String;
}

export interface TransactionDocument{
    date: Date;
    transaction_type: String;
    amount: Number;
    purpose: String;
}

export interface VolunteerDocument{
    vol_name: String;
    vol_email: String;
    vol_id: String;
    vol_phNo: Number;
    vol_evtName: String;
}

export interface EventRegistrationDocument{
    name: String;
    email: String;
    id: String;
    event: String;
    date_of_registration: Date;
}