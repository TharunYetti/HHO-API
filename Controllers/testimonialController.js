import TestimonialModel from "../models/TestimonialModel.js";

export const getTestimonial = async (req, res) => {
  const testimonials = await TestimonialModel.find();
  res.send(testimonials);
};

export const createTestimonial = async (req, res) => {
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
};

export const updateTestimonial = async (req, res) => {
  const id = req.params.id;
  let { name, message, rating, discipline } = req.body;
  const testimonial = await TestimonialModel.findById(id);
  if (!testimonial) {
    console.log(id);
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
};

export const deleteTestimonial = async (req, res) => {
  const id = req.params.id;
  const testimonial = await TestimonialModel.findById(id);
  if (!testimonial) {
    res.status(400).send("Testimonial Not found");
  } else {
    await TestimonialModel.findByIdAndDelete(id);
    res.status(200).send("Successfully Deleted");
  }
};
