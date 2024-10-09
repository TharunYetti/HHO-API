import TestimonialModel from "../models/TestimonialModel";
import { Request, Response } from "express";
export const getTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonials = await TestimonialModel.find();
    res.send(testimonials);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
    else{
      res.status(400).send("Unknown error")
    }
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const { name, message, rating, discipline } = req.body;
    if (!name || !message || !rating || !discipline) {
      res.status(400).send("All fields are mandatory");
    } else {
      const testimonial = await TestimonialModel.create({
        name,
        message,
        rating,
        discipline,
      });
      res.status(200).send(testimonial);
    }
  } catch (error:unknown) {
    if(error instanceof Error){
    res.status(400).send(error.message);
    }else{
      res.status(400).send("Unknown Error")
    }
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    let { name, message, rating, discipline } = req.body;
    const testimonial = await TestimonialModel.findById(id);
    if (!testimonial) {
      res.status(400).send("Testimonial not found");
    } else {
      name = name || testimonial.name;
      message = message || testimonial.message;
      rating = rating || testimonial.rating;
      discipline = discipline || testimonial.discipline;
      const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(id, {
        name,
        message,
        rating,
        discipline,
      });
      res.status(200).send(updatedTestimonial);
    }
  } catch (error:unknown) {
    if(error instanceof Error){
    res.status(400).send(error.message);
    }else{
      res.status(400).send("Unknown Error");
    }
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const testimonial = await TestimonialModel.findById(id);
    if (!testimonial) {
      res.status(400).send("Testimonial Not found");
    } else {
      await TestimonialModel.findByIdAndDelete(id);
      res.status(200).send("Successfully Deleted");
    }
  } catch (error:unknown) {
    if(error instanceof Error){
    res.status(400).send(error.message);
    }
    else{
      res.status(400).send("Unknown error");
    }
  }
};
