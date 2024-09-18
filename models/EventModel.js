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
    eventDate:{
        type:Date,
        required:true
    },
    eventTime:{
        type:String,
        required:true
    },
    eventVenue:{
        type:String,
        required:true
    },
    eventType:{
        type:String,
        required:true
    },
    eventPoster:{
        type:String
    }
},{
    timestamps:true,
})

export const eventModel = mongoose.model("Events",eventSchema);