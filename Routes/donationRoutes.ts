import express from "express";
import donationController from "../Controllers/donationController";
const router = express.Router();


router.post("/create", donationController.createDonation);
router.post("/update",donationController.updateDonation);
router.post("/delete/:id",donationController.deleteDonation);
router.get("/getall",donationController.getAllDonations); 
export default router;