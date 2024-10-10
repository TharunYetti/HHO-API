import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { DonationDocument } from '../types/donationType';
const donationSchema = new Schema<DonationDocument>({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amt: {
    type: Number,
    required: true,
    min: [0, 'Amount must be positive'] // Ensures the amount is positive
  },
  date: {
    type: Date,
    default: Date.now // Automatically set to current date if not provided
  }
});

// Export the Donation model
const Donation = model<DonationDocument>('Donation', donationSchema);
export default Donation;
