import express from "express";
import { volunteerRegistration } from "../Controllers/volunteerController.js";
const router = express.Router();

router.post('/vol-registration',volunteerRegistration);  
export default router;