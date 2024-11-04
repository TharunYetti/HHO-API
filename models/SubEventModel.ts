import mongoose, { Schema, model, Document } from "mongoose";
import { EventDocument, SubEventDocument } from "../types/eventType";

const subEventSchema = new Schema<SubEventDocument>({
  subEventTitle: { type: String, required: true },
  subEventDescription: { type: String, required: true },
  subEventVenue: { type: String, required: true },
  subEventPoster: { type: String },
  subEventDate: { type: Date, required: true },
}, { _id: true });  // Enable _id for each sub-event by default

export default model<SubEventDocument>("SubEvent",subEventSchema);


// import mongoose, {Schema, model} from "mongoose";
// import {SubEventDocument} from '../types/subEventType';
// const subEventSchema = new mongoose.Schema<SubEventDocument>({
//     name:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     venue:{
//         type:String,
//         required:true
//     },
//     date:{
//         type:Date,
//         required:true
//     },
//     time:{
//         type:String,
//         required:true
//     },
//     poster:{
//         type:String
//     },
//     mainEventId:{
//         type: Schema.Types.ObjectId,
//         ref:"Events",
//         required:true
//     }
// },{
//     timestamps:true
// })

// const subEventModel = mongoose.model<SubEventDocument>('subEvents',subEventSchema);

// export default subEventModel;
