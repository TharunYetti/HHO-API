import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    discipline:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})

const TestimonialModel = new mongoose.model('testimonials',TestimonialSchema)
export default TestimonialModel;