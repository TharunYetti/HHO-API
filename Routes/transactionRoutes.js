import express from "express";
import { transactionUpdate } from "../Controllers/transactionController.js";
const router = express.Router();

router.post('/add-transaction',transactionUpdate);  
export default router;