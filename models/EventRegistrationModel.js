import mongoose from "mongoose";

const EventRegistrationsSchema = new mongoose.Schema({
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

export const eventRegistrations = new mongoose.model("eventRegistrations",EventRegistrationsSchema);