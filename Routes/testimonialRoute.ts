import express from "express";
const router = express.Router();

import testimonialController from "../Controllers/testimonialController";

router.get("/", testimonialController.getAllTestimonials);
router.post("/createTestimonial", testimonialController.createTestimonial);
router.put("/editTestimonial/:id", testimonialController.updateTestimonial);
router.delete("/deleteTestimonial/:id", testimonialController.deleteTestimonial);
router.get("/search",testimonialController.getMatchedTestimonials);
export default router;
