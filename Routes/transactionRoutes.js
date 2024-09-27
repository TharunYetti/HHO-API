import express from "express";
import { createTransaction, deleteTransaction, getAllTransactions, getMatchedTransactions, updateTransaction } from "../Controllers/transactionController.js";
const router = express.Router();

router.post('/add-transaction',createTransaction);
router.put("/update-transaction",updateTransaction);
router.delete("/delete-transaction/:id",deleteTransaction);
router.get("/get-all-transactions",getAllTransactions);
router.get("/search-transactions",getMatchedTransactions);
export default router;