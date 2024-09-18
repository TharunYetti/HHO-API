import {eventModel} from "../models/EventModel.js";

export const createEvent = async (req, res) => {
  const {
    eventName,
    eventDescription,
    eventDate,
    eventTime,
    eventVenue,
    eventType,
    eventPoster,
  } = req.body;
  const record = eventModel
    .create(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json("All fields are mandatory");
    });
};

