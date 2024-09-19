import mongoose from "mongoose";

const offUserSchema = new mongoose.Schema({
    name:{
       type:String,
       requried:true
    },
    email:{
        type:String,
        requried:true
    },
    password:{
        type:String,
        requried:true
    },
    role:{
        type:String,
        requried:true
    },
    status:{
        type: String,
        enum: ['inactive','active'],
        requried: true
    }
})


export const offUserModel = new mongoose.model('offusers',offUserSchema);


