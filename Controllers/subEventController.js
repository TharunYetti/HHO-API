import subEventModel from "../models/SubEventModel.js";
import { eventModel } from "../models/EventModel.js";

export const getSubEvents = async (req, res) => {
    try {
        const subEvents = await subEventModel.find({mainEventId:req.params.id});
        res.send(subEvents);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const createSubEvent = async (req, res) => {
    try {
        const { name, description, venue, date, time, poster, mainEventId } =
          req.body;
        if (
          !name ||
          !description ||
          !venue ||
          !date ||
          !time ||
          !poster ||
          !mainEventId
        ) {
          res.status(400).send("All fields are required");
        } else {
          const subEvent = await subEventModel.create({
            name,
            description,
            venue,
            date,
            time,
            poster,
            mainEventId,
          });
          const exists = await eventModel.findById(subEvent.mainEventId);
          if (exists) {
            const mainEvent = await eventModel.findById(mainEventId);
            mainEvent.preEvents.push(subEvent._id);
            mainEvent.save();
            res.status(200).send(subEvent);
          } else {
            res.status(400).send("Event not found");
          }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
  }

  export const updateSubEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const subEvent = subEventModel.findById(id);
        if (!subEvent) {
          res.status(400).send("SubEvent not found");
        }
        let { name, description, venue, date, time, poster, mainEventId } =
          req.body;
        name = name || subEvent.name;
        description = description || subEvent.description;
        venue = venue || subEvent.venue;
        date = date || subEvent.date;
        time = time || subEvent.time;
        poster = poster || subEvent.poster;
        mainEventId = mainEventId || subEvent.mainEventId;
      
        const updatedSubEvent = await subEventModel.findByIdAndUpdate(id, {
          name,
          description,
          venue,
          date,
          time,
          poster,
          mainEventId,
        });
        res.send(updatedSubEvent);
    } catch (error) {
        res.status(400).send(error.message);
    }
  }

  export const deleteSubEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const subEvent = await subEventModel.findById(id);
        if (!subEvent) {
          res.status(400).send("SubEvent not found");
        } else {
          const mainEvent = await eventModel.findById(subEvent.mainEventId);
          await subEventModel.findByIdAndDelete(id);
          res.status(200).send("Successfully Deleted");
          mainEvent.preEvents = mainEvent.preEvents.filter(
            (preEvent) => preEvent !== id
          );
          mainEvent.save();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
  }
