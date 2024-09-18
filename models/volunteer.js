import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
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

export const volunterModel = new mongoose.model('volunteers',volunteerSchema);