import mongoose from "mongoose";
import {VolunteerDocument} from "./models";
const volunteerSchema = new mongoose.Schema<VolunteerDocument>({
    vol_name:{
        type:String,
        required:true
    },
    vol_email:{
        type:String,
        required:true
    },
    vol_id:{
        type:String,
        required:true
    },
    vol_phNo:{
        type:Number,
        required:true
    },
    vol_evtName:{
        type:String,
        required:true
    }
})

export const volunterModel =  mongoose.model<VolunteerDocument>('volunteers',volunteerSchema);