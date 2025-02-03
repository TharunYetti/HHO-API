import { Request, Response } from "express";
import { processExcelFile, getExcelData, getLastUploadedFile } from "../services/ExcelService";
import path from "path";
import fs from "fs";

export const uploadExcel = async (req: Request, res: Response) => {
      try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }

        const filePath = req.file.path;
        await processExcelFile(filePath, req.file.filename);

        res.json({ message: "File uploaded and processed successfully", filename: req.file.filename });
    } catch (error) {
        res.status(500).json({ message: "Error processing file", error: (error as Error).message });
    }
};

export const fetchExcelData = async (_req: Request, res: Response) => {
    const records = await getExcelData();
    res.json(records);
};

export const downloadLastFile = async (_req: Request, res: Response) => {
  try {
    const lastFile = await getLastUploadedFile();

    if (!lastFile) {
        res.status(404).json({ message: "No file available" });
        return;
    }

    const filePath = path.join(__dirname, "../uploads", lastFile.filename);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
      res.status(500).json({ message: "Error downloading file", error: (error as Error).message });
  }
};