import TestimonialModel from "../models/TestimonialModel";
import { NextFunction, Request, Response } from "express";
import { TestimonialDocument } from "../types/testimonialType";
import testimonialService from "../services/TestimonialService";
import { ConflictError, NotFoundError, ValidationError } from "../exceptions/CustomError";

class TestimonialController {

  // Create a new testimonial
  async createTestimonial(req: Request, res: Response,next: NextFunction) {
    const testimonialData: Partial<TestimonialDocument> = req.body;
    try {
      const testimonial = await testimonialService.createTestimonial(testimonialData);
      res.status(200).json(testimonial);
    } catch (error) {
      next(error);
    }
  }

  // Delete a testimonial by ID
  async deleteTestimonial(req: Request, res: Response,next: NextFunction) {
    console.log("Into the controller");
    try {
      const deletedTestimonial = await testimonialService.deleteTestimonial(req.params.id);
      res.status(200).json(deletedTestimonial);
    } catch (err) {
      next(err);
    }
  }

  // Update an existing testimonial
  async updateTestimonial(req: Request, res: Response,next: NextFunction) {
    console.log("Into the controller");
    const { id } = req.params;
    const testimonialData: Partial<TestimonialDocument> = req.body;
    try {
      const updatedTestimonial = await testimonialService.updateTestimonial(id, testimonialData);
      res.status(200).json(updatedTestimonial);
    } catch (err) {
      next(err);
    }
  }

  // Get all testimonials
  async getAllTestimonials(req: Request, res: Response,next: NextFunction) {
    console.log("Into the controller");
    try {
      const testimonials = await testimonialService.getAllTestimonials();
      res.status(200).json(testimonials);
    } catch (error) {
      next(error);
    }
  }

  // Search for testimonials by a specific term
  async getMatchedTestimonials(req: Request, res: Response,next: NextFunction) {
    console.log("Into the controller");
    const searchTerm = req.query.searchTerm as string;
    console.log(searchTerm);
    try {
      const matchedTestimonials = await testimonialService.getMatchedTestimonials(searchTerm);
      res.status(200).json(matchedTestimonials);
    } catch (error) {
      next(error);
    }
  }
}

export default new TestimonialController();