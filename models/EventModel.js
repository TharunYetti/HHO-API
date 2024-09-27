import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    eventDescription:{
        type:String,
        required:true
    },
    event_start_date:{
        type:String,
        required:true
    },
    event_end_date:{
        type:String,
        required:true
    },
    eventVenue:{
        type:String,
        required:true
    },
    eventPoster:{
        type:String
    },
    preEvents:{
        type:[String],
        required:true
    }
},{
    timestamps:true,
})

export const eventModel = mongoose.model("Events",eventSchema);