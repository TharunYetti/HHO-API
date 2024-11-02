import express from "express";
const router = express.Router();

import testimonialController from "../controllers/testimonialController";
import { middleware } from "../middleware/middleware";

router.get("/", testimonialController.getAllTestimonials);
router.post("/createTestimonial", middleware(["Admin"]),testimonialController.createTestimonial);
router.put("/editTestimonial/:id",middleware(["Admin"]), testimonialController.updateTestimonial);
router.delete("/deleteTestimonial/:id",middleware(["Admin"]),testimonialController.deleteTestimonial);
router.get("/search",testimonialController.getMatchedTestimonials);
export default router;
