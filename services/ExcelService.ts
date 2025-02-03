import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { ExcelModel } from "../models/ExcelModel";

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Function to process and save Excel data
export const processExcelFile = async (filePath: string, filename: string) => {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const newExcel = new ExcelModel({ data, filename });
    await newExcel.save();
};

// Fetch stored Excel data
export const getExcelData = async () => {
    return await ExcelModel.find().sort({ uploadedAt: -1 });
};

// Get the last uploaded file
export const getLastUploadedFile = async () => {
    return await ExcelModel.findOne().sort({ uploadedAt: -1 });
};