import mongoose from "mongoose";
import {OffUserDocument} from "../types/offUserType";
const offUserSchema = new mongoose.Schema<OffUserDocument>({
    name:{
       type:String,
       required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})


export default mongoose.model<OffUserDocument>('offusers',offUserSchema);


