import mongoose from "mongoose";
const {Schema,model} = mongoose;
import {FeedBackDocument} from "./models";
const feedbackSchema = new Schema<FeedBackDocument>({
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

const feedBackModel = model<FeedBackDocument>("feedbacks",feedbackSchema);
export default feedBackModel;