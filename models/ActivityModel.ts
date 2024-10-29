import mongoose, { model, Schema } from "mongoose";
import { ActivityDocument } from "../types/activityType";

const ActivitySchema = new Schema<ActivityDocument>({
    name:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

export default model<ActivityDocument>("activities",ActivitySchema);