import mongoose from "mongoose";
import {EventRegistrationDocument} from "../types/eventRegistrationType";
const EventRegistrationsSchema = new mongoose.Schema<EventRegistrationDocument>({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    id: {
        type: String,
        require: true
    },
    event: {
        type: String,
        require: true
    },
    date_of_registration: {
        type: Date,
        require: true
    }
});

export const eventRegistrations = mongoose.model<EventRegistrationDocument>("eventRegistrations",EventRegistrationsSchema);