import express from "express";
import { createDonation,updateDonation,deleteDonation,getAllDonations} from "../Controllers/donationController.js";
const router = express.Router();


router.post("/create", createDonation);
router.post("/update/:id",updateDonation);
router.post("/delete/:id",deleteDonation);
router.get("/getall",getAllDonations); 
export default router;