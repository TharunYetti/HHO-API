import { eventModel } from "../models/EventModel.js";
import subEventModel from "../models/SubEventModel.js";

export const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDescription,
      event_start_date,
      event_end_date,
      eventVenue,
      eventPoster,
      preEvents,
    } = req.body;
    if (
      !eventName ||
      !eventDescription ||
      !event_start_date ||
      !event_end_date ||
      !eventVenue ||
      !eventPoster ||
      !preEvents
    ) {
      res.json({ Error: true, Message: "All fileds are required" });
    }
    const record = await eventModel.create(req.body);
    res.status(200).json(record);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    const eventName = req.body.eventName || event.eventName;
    const eventDescription = req.body.eventDescription || event.eventDescription;
    const event_start_date = req.body.event_start_date || event.event_start_date;
    const event_end_date = req.body.event_end_date || event.event_end_date;
    const eventVenue = req.body.eventVenue || event.eventVenue;
    const eventPoster = req.body.eventPoster || event.eventPoster;
    const preEvents = req.body.preEvents || event.preEvents;

    const updatedEvent = await eventModel.findByIdAndUpdate(eventId, {
      eventName,
      eventDescription,
      event_start_date,
      event_end_date,
      eventVenue,
      eventPoster,
      preEvents,
    });
    res.send(updatedEvent);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    await eventModel.findByIdAndDelete(eventId);
    await subEventModel.deleteMany({ mainEventId: eventId });
    res.send("Event deleted");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

