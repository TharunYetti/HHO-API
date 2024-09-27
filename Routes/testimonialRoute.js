import express from "express";
const router = express.Router();

import {
  getTestimonial,
  updateTestimonial,
  createTestimonial,
  deleteTestimonial,
} from "../Controllers/testimonialController.js";

router.get("/", getTestimonial);
router.post("/createTestimonial", createTestimonial);
router.put("/editTestimonial/:id", updateTestimonial);
router.delete("/deleteTestimonial/:id", deleteTestimonial);
export default router;
