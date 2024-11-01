import  eventModel  from "../models/EventModel";
import subEventModel from "../models/SubEventModel";
import { Request, Response } from "express";
import eventService from "../services/EventService";
import { EventDocument } from "../types/eventType";
import { NotFoundError, ValidationError } from "../exceptions/CustomError";

class EventController {
  
  // Create a new event
  async createEvent(req: Request, res: Response) {
    const eventData: Partial<EventDocument> = req.body;
    try {
      const event = await eventService.createEvent(eventData);
      res.status(200).json(event);
    } 
    catch(err){
      if(err instanceof NotFoundError){
        res.status(404).json({success:false,message:err.message});
      }else if(err instanceof ValidationError){
        res.status(400).json({success:false,message:err.message});
      }else{
        res.status(500).json({success:false,message: "Error in adding event",err});
      }
    }
  }

  // Update an existing event
  async updateEvent(req: Request, res: Response) {
    const { id } = req.params;
    const eventData: Partial<EventDocument> = req.body;
    try {
      const updatedEvent = await eventService.updateEvent(id, eventData);
      res.status(200).json({success:true,updatedEvent});
    } catch (err) {
      if(err instanceof NotFoundError){
        res.status(404).json({success:false,message:err.message});
      }else if(err instanceof ValidationError){
        res.status(400).json({success:false,message:err.message});
      }else{
        res.status(500).json({success:false,message: "Error in updating event",err});
      }
    }
  }

  // Delete an event
  async deleteEvent(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await eventService.deleteEvent(id);
      res.status(200).json({success:true, message: "Event successfully deleted" });
    } catch (err) {
      if(err instanceof NotFoundError){
        res.status(404).json({success:false,message:err.message});
      }else if(err instanceof ValidationError){
        res.status(400).json({success:false,message:err.message});
      }else{
        res.status(500).json({ success:false,message: "Error in deleting event", err });
      }
    }
  }

  // Get all events
  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await eventService.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events", error });
    }
  }

  // Search for events by a specific term
  async getMatchedEvents(req: Request, res: Response) {
    const searchTerm = req.query.searchTerm as string;
    try {
      const matchedEvents = await eventService.getMatchedEvents(searchTerm);
      res.status(200).json(matchedEvents);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving matched events", error });
    }
  }
}

export default new EventController();

// export const createEvent = async (req: Request, res: Response) => {
//   try {
//     const {
//       eventName,
//       eventDescription,
//       event_start_date,
//       event_end_date,
//       eventVenue,
//       eventPoster,
//       preEvents,
//     } = req.body;
//     if (
//       !eventName ||
//       !eventDescription ||
//       !event_start_date ||
//       !event_end_date ||
//       !eventVenue ||
//       !eventPoster ||
//       !preEvents
//     ) {
//       res.json({ Error: true, Message: "All fileds are required" });
//     }
//     const record = await eventModel.create(req.body);
//     res.status(200).json(record);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(400).json({ message: "Unknown error occurred" });
//     }
//   }
// };

// export const updateEvent = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const eventId = req.params.id;
//     const event = await eventModel.findById(eventId);
//     if (!event) {
//       res.status(404).send("Event not found");
//     } else {
//       const eventName = req.body.eventName || event.eventName;
//       const eventDescription =
//         req.body.eventDescription || event.eventDescription;
//       const event_start_date =
//         req.body.event_start_date || event.event_start_date;
//       const event_end_date = req.body.event_end_date || event.event_end_date;
//       const eventVenue = req.body.eventVenue || event.eventVenue;
//       const eventPoster = req.body.eventPoster || event.eventPoster;
//       const preEvents = req.body.preEvents || event.preEvents;

//       const updatedEvent = await eventModel.findByIdAndUpdate(eventId, {
//         eventName,
//         eventDescription,
//         event_start_date,
//         event_end_date,
//         eventVenue,
//         eventPoster,
//         preEvents,
//       });
//       res.send(updatedEvent);
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(400).json({ message: "Unknown error occurred" });
//     }
//   }
// };

// export const deleteEvent = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const eventId = req.params.id;
//     const event = await eventModel.findById(eventId);
//     if (!event) {
//       res.status(404).send("Event not found");
//     } else {
//       await eventModel.findByIdAndDelete(eventId);
//       await subEventModel.deleteMany({ mainEventId: eventId });
//       res.status(200).send("Successfully Deleted");
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(400).json({ message: "Unknown error occurred" });
//     }
//   }
// };
