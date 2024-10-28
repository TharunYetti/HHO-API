import express from "express";
// import { createTransaction, deleteTransaction, getAllTransactions, getMatchedTransactions, updateTransaction } from "../Controllers/transactionController";
import transactionController from "../controllers/transactionController";
import { middleware } from "../middleware/middleware";
const router = express.Router();

router.use(middleware)

router.post('/add-transaction',transactionController.createTransaction);
router.put("/update-transaction/:id",transactionController.updateTransaction);
router.delete("/delete-transaction/:id",transactionController.deleteTransaction);
router.get("/get-all-transactions",transactionController.getAllTransactions);
router.get("/search-transactions",transactionController.getMatchedTransactions);
export default router;