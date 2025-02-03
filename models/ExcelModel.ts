import mongoose from "mongoose";
const excelSchema = new mongoose.Schema({
    data: Array,
    filename: String,
    uploadedAt: { type: Date, default: Date.now },
});

export const ExcelModel = mongoose.model("ExcelData", excelSchema);