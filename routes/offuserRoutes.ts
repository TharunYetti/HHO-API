import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";
const router = express.Router();
import offUserController from "../controllers/offUserController";
import { middleware } from "../middleware/middleware";

import { uploadExcel, fetchExcelData, downloadLastFile } from "../controllers/excelController";

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "src/uploads");
    },
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.get("/",offUserController.getAllUsers);
router.post("/login", offUserController.login);
router.post("/newUser",middleware(["Admin"]),offUserController.addUser);
router.get("/profile",middleware(["Admin","Core","Accountant"]),offUserController.getUserData);
router.put("/updateUsers/:id",middleware(["Admin"]),offUserController.updateUsers);
router.get("/allusers",middleware(["Admin","Core","Accountant"]),offUserController.getAllUsers);
// router.get("/allusers",offUserController.getAllUsers);

router.delete("/deleteUsers/:id",middleware(["Admin"]),offUserController.deleteUser);

router.post("/upload",upload.single("file"), uploadExcel);
router.get("/data", fetchExcelData);
router.get("/download", downloadLastFile);

export default router
