import express from "express";
import { createTransaction, updateTransaction } from "../Controllers/transactionController.js";
const router = express.Router();

router.post('/add-transaction',createTransaction);
router.put("/update-transaction",updateTransaction);

export default router;