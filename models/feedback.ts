import mongoose from "mongoose";
const {Schema,model} = mongoose;
import {FeedbackDocument} from "../types/feedbackType";
const feedbackSchema = new Schema<FeedbackDocument>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    id: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const feedBackModel = model<FeedbackDocument>("feedbacks",feedbackSchema);
export default feedBackModel;