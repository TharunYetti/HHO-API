import subEventModel from "../models/SubEventModel";
import  eventModel from "../models/EventModel";
import { Request, Response } from "express";
export const getSubEvents = async (req: Request, res: Response) => {
  try {
    const subEvents = await subEventModel.find({ mainEventId: req.params.id });
    res.send(subEvents);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("Unknown error occurred");
    }
  }
};

export const updateSubEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subEvent = await subEventModel.findById(id);
    if (!subEvent) {
      res.status(400).send("SubEvent not found");
    } else {
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
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("Unknown error occurred");
    }
  }
};

export const deleteSubEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subEvent = await subEventModel.findById(id);
    if (!subEvent) {
      res.status(400).send("SubEvent not found");
    } else {
      const mainEvent = await eventModel.findById(subEvent.mainEventId);
      if (!mainEvent) {
        res.status(400).send("Event not found");
      } else {
        await subEventModel.findByIdAndDelete(id);
        res.status(200).send("Successfully Deleted");
        mainEvent.preEvents = mainEvent.preEvents.filter(
          (preEvent) => String(preEvent) !== id
        );
        mainEvent.save();
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send("Unknown error occurred");
    }
  }
};
