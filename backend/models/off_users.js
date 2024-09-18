import mongoose from "mongoose";

const offUserSchema = new mongoose.Schema({
    off_name:{
       type:String,
       requried:true
    },
    off_email:{
        type:String,
        requried:true
    },
    off_password:{
        type:String,
        requried:true
    },
    role:{
        type:String,
        requried:true
    }
})


export const offUserModel = new mongoose.model('offusers',offUserSchema);


