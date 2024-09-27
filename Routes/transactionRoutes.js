import express from "express";
import { createTransaction, deleteTransaction, getAllTransactions, updateTransaction } from "../Controllers/transactionController.js";
const router = express.Router();

router.post('/add-transaction',createTransaction);
router.put("/update-transaction",updateTransaction);
router.delete("/delete-transaction/:id",deleteTransaction);
router.get("/get-all-transactions",getAllTransactions);
export default router;