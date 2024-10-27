import express from "express";
// import { createTransaction, deleteTransaction, getAllTransactions, getMatchedTransactions, updateTransaction } from "../Controllers/transactionController";
import transactionController from "../Controllers/transactionController";
const router = express.Router();

router.post('/add-transaction',transactionController.createTransaction);
router.put("/update-transaction",transactionController.updateTransaction);
router.delete("/delete-transaction/:id",transactionController.deleteTransaction);
router.get("/get-all-transactions",transactionController.getAllTransactions);
router.get("/search-transactions",transactionController.getMatchedTransactions);
export default router;