import express from "express";
import donationController from "../controllers/donationController";
const router = express.Router();

router.post("/create", donationController.createDonation);
router.post("/update/:id",donationController.updateDonation);
router.post("/delete/:id",donationController.deleteDonation);
router.get("/getall",donationController.getAllDonations); 

export default router;