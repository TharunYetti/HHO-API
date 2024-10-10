import mongoose from "mongoose";
import { TestimonialDocument } from "../types/testimonialType";
const TestimonialSchema = new mongoose.Schema<TestimonialDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    discipline: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TestimonialModel = mongoose.model<TestimonialDocument>(
  "testimonials",
  TestimonialSchema
);
export default TestimonialModel;
