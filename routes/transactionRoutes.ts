import express from "express";
// import { createTransaction, deleteTransaction, getAllTransactions, getMatchedTransactions, updateTransaction } from "../Controllers/transactionController";
import transactionController from "../controllers/transactionController";
import { middleware } from "../middleware/middleware";
const router = express.Router();

router.post('/add-transaction',middleware(["Accountant"]),transactionController.createTransaction);
router.put("/update-transaction/:id",middleware(["Accountant"]),transactionController.updateTransaction);
router.delete("/delete-transaction/:id",middleware(["Accountant"]),transactionController.deleteTransaction);
router.get("/get-all-transactions",transactionController.getAllTransactions);
router.get("/search-transactions",transactionController.getMatchedTransactions);
export default router;