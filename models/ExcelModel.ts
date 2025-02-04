import mongoose from "mongoose";
const excelSchema = new mongoose.Schema({
    year: { type: Number, required: true }, // Year from sheet name
  data: { type: Array, required: true }, // Student data
  filename: { type: String, required: true }, // Name of uploaded file
  uploadedAt: { type: Date, default: Date.now }, // Timestamp
});

export const ExcelModel = mongoose.model("ExcelData", excelSchema);