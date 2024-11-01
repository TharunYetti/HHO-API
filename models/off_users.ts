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
    },
    image:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    linkedin:{
        type:String,
        required:true
    },
    ID:{
        type:String,
        required:true
    }
},{
    strict:false
})


export default mongoose.model<OffUserDocument>('offusers',offUserSchema);


