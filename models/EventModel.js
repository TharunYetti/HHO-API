const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
    },
    adminId:{
        type: Schema.Types.ObjectId ,
    }
},{
    timestamps:true,
})

const eventModel = mongoose.model("Events",eventSchema);

module.exports = eventModel;