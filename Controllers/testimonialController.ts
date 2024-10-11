import TestimonialModel from "../models/TestimonialModel";
import { Request, Response } from "express";
import { TestimonialDocument } from "../types/testimonialType";
import testimonialService from "../Services/TestimonialService";

class TestimonialController {

  // Create a new testimonial
  async createTestimonial(req: Request, res: Response) {
    const testimonialData: Partial<TestimonialDocument> = req.body;
    try {
      const testimonial = await testimonialService.createTestimonial(testimonialData);
      res.status(200).json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Error creating testimonial", error });
    }
  }

  // Delete a testimonial by ID
  async deleteTestimonial(req: Request, res: Response) {
    console.log("Into the controller");
    try {
      const deletedTestimonial = await testimonialService.deleteTestimonial(req.params.id);
      res.status(200).json(deletedTestimonial);
    } catch (err) {
      res.status(500).json({ message: "Error deleting testimonial", err });
    }
  }

  // Update an existing testimonial
  async updateTestimonial(req: Request, res: Response) {
    console.log("Into the controller");
    const { id } = req.params;
    const testimonialData: Partial<TestimonialDocument> = req.body;
    try {
      const updatedTestimonial = await testimonialService.updateTestimonial(id, testimonialData);
      res.status(200).json(updatedTestimonial);
    } catch (err) {
      res.status(500).json({ message: "Error updating testimonial", err });
    }
  }

  // Get all testimonials
  async getAllTestimonials(req: Request, res: Response) {
    console.log("Into the controller");
    try {
      const testimonials = await testimonialService.getAllTestimonials();
      res.status(200).json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving testimonials", error });
    }
  }

  // Search for testimonials by a specific term
  async getMatchedTestimonials(req: Request, res: Response) {
    console.log("Into the controller");
    const searchTerm = req.query.searchTerm as string;
    console.log(searchTerm);
    try {
      const matchedTestimonials = await testimonialService.getMatchedTestimonials(searchTerm);
      res.status(200).json(matchedTestimonials);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving matched testimonials", error });
    }
  }
}

export default new TestimonialController();