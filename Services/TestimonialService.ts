import testimonialRepository from "../Repository/testimonialRepo";
import { TestimonialDocument } from "../types/testimonialType";

class TestimonialService {
  
  async createTestimonial(testimonialData: Partial<TestimonialDocument>): Promise<TestimonialDocument | null> {
    try {
      return await testimonialRepository.create(testimonialData);
    } catch (err) {
      console.error("Error creating testimonial:", err);
      return null; // Handle error case by returning null or an appropriate value
    }
  }

  async deleteTestimonial(id: string): Promise<TestimonialDocument | null> {
    console.log("Deleting testimonial in service");
    try {
      return await testimonialRepository.delete(id);
    } catch (err) {
      console.log("Error in deleting testimonial with id:", id);
      return null;
    }
  }

  async updateTestimonial(id: string, testimonialData: Partial<TestimonialDocument>): Promise<TestimonialDocument | null> {
    try {
      return await testimonialRepository.update(id, testimonialData);
    } catch (error) {
      console.error("Error updating testimonial:", error);
      return null;
    }
  }

  async getAllTestimonials(): Promise<TestimonialDocument[] | null> {
    console.log("Fetching all testimonials in service");
    try {
      return await testimonialRepository.getAll();
    } catch (err) {
      console.error("Error getting all testimonials:", err);
      return null;
    }
  }

  async getMatchedTestimonials(searchTerm: string): Promise<TestimonialDocument[] | null> {
    console.log("Searching testimonials in service");
    try {
      return await testimonialRepository.getMatched(searchTerm);
    } catch (err) {
      console.error("Error in getting matched testimonials:", err);
      return null;
    }
  }
}

export default new TestimonialService();