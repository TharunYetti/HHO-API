import express from "express";
import { middleware } from "../middleware/middleware";
import donationController from "../controllers/donationController";
const router = express.Router();

router.post("/create", middleware(["Admin","Core","Accountant"]),donationController.createDonation);
router.put("/update/:id",middleware(["Admin","Core","Accountant"]),donationController.updateDonation);
router.delete("/delete/:id",middleware(["Admin","Core","Accountant"]),donationController.deleteDonation);
router.get("/getall",donationController.getAllDonations); 

export default router;