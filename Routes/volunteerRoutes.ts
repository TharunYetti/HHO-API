import express from "express";
// import { volunteerRegistration } from "../Controllers/volunteerController";
import volunteerController from "../Controllers/volunteerController";
const router = express.Router();

router.post('/vol-registration',volunteerController.createVolunteer);  
export default router;