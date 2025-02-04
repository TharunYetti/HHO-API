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
    const sheetNames = workbook.SheetNames;

    let insertedRecords = [];

    for (const sheetName of sheetNames) {
        const match = sheetName.match(/\d{4}/); // Extract year from sheet name
        if (!match) continue; // Skip if no valid year found

        const year = parseInt(match[0]);
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (data.length > 0) {
            await ExcelModel.deleteMany({ year }); // Remove old data for this year

            const newRecord = new ExcelModel({
                year,
                data,
                filename,
                uploadedAt: new Date()
            });

            await newRecord.save();
            insertedRecords.push(newRecord);
        }
    }

    fs.unlinkSync(filePath); // Remove the uploaded file after processing
};

// Fetch stored Excel data
export const getExcelData = async () => {
    const records = await ExcelModel.find({}, { _id: 0, year: 1, data: 1 });

    const teamMembers = records.map(record => ({
        year: record.year,
        batch: record.data.map((member: any, index: number) => ({
            sNo: index + 1, 
            name: member.Name,
            id: member.ID,
            role: member.Role,
            branch: member.Branch,
            year: member.Year
        }))
    }));
    console.log(JSON.stringify(teamMembers, null, 2));
    return teamMembers;
};

// Get the last uploaded file
export const getLastUploadedFile = async () => {
    return await ExcelModel.findOne().sort({ uploadedAt: -1 });
};