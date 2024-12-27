import express from "express"
import { middleware } from "../middleware/middleware";
import moneyController from "../controllers/moneyController";
const router = express.Router();

router.get("/get-money",moneyController.getMoney);
router.put("/update-money",moneyController.updateMoney);

export default router;