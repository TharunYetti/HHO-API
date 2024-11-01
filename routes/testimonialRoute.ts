import express from "express";
const router = express.Router();

import testimonialController from "../controllers/testimonialController";
import { middleware } from "../middleware/middleware";

router.get("/", testimonialController.getAllTestimonials);
router.post("/createTestimonial", middleware(["Admin","Core"]),testimonialController.createTestimonial);
router.put("/editTestimonial/:id",middleware(["Admin","Core"]), testimonialController.updateTestimonial);
router.delete("/deleteTestimonial/:id",middleware(["Admin","Core"]),testimonialController.deleteTestimonial);
router.get("/search",testimonialController.getMatchedTestimonials);
export default router;
