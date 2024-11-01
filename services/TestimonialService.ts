import { NotFoundError, ValidationError } from "../exceptions/CustomError";
import testimonialRepository from "../repository/testimonialRepo";
import { TestimonialDocument } from "../types/testimonialType";

class TestimonialService {
  
  async createTestimonial(testimonialData: Partial<TestimonialDocument>): Promise<TestimonialDocument | null> {
    const {name,message,rating,discipline} = testimonialData;
    if(!name|| !message || !rating || !discipline){
      throw new ValidationError("Insufficinet paramters");
    }
    return await testimonialRepository.create(testimonialData);
  }

  async deleteTestimonial(id: string): Promise<TestimonialDocument | null> {
    const response = await testimonialRepository.delete(id);
    if(!response){
      throw new NotFoundError("Transaction with given Id not found");
    }
    return response;
  }

  async updateTestimonial(id: string, testimonialData: Partial<TestimonialDocument>): Promise<TestimonialDocument | null> {
    const response = await testimonialRepository.update(id, testimonialData);
    if(!response){
      throw new NotFoundError("Transaction with given Id not found");
    }
    return response;
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