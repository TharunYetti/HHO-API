import Testimonial from '../models/TestimonialModel';
import { TestimonialDocument } from '../types/testimonialType';
import crudRepository from './crudRepo';
class TestimonialRepository extends crudRepository<TestimonialDocument>{
    constructor() {
        super(Testimonial);
    }
 
}

export default new TestimonialRepository();