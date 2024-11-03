import { NotFoundError } from "../exceptions/CustomError";
import EventModel from "../models/EventModel";
import eventModel from "../models/EventModel";
import subEventModel from "../models/SubEventModel";
import eventRepo from "../repository/EventRepo";
import { EventDocument, subEvent } from "../types/eventType"; // Assuming you have types defined for Event

class EventService {
  async createEvent(eventData: Partial<EventDocument>): Promise<EventDocument | null> {
      const record = await eventRepo.create(eventData);
      return record;
  }

  async updateEvent(eventId: string, eventData: Partial<EventDocument>): Promise<EventDocument | null> {
      const event = await eventRepo.update(eventId, eventData);
      if (!event) {
        throw new NotFoundError("Event not found with given Id");
      }
      return event;
  }

  async deleteEvent(eventId: string): Promise<EventDocument> {
      const event = await eventRepo.delete(eventId);
      if (!event) {
        throw new NotFoundError("Event not found with given Id");
      }
      return event;
      // await eventModel.findByIdAndDelete(eventId);
      // await subEventModel.deleteMany({ mainEventId: eventId });
  }

  async getAllEvents(): Promise<EventDocument[]> {
    try {
      return await eventRepo.getAll();
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Failed in getting all events");
    }
  }

  async getMatchedEvents(searchTerm: string): Promise<EventDocument[]> {
    try {
      const query: any = { $or: [] };
      
      // Check if searchTerm is a number or a valid date or a string
      if (!isNaN(Number(searchTerm))) {
        query.$or.push({ amount: Number(searchTerm) });
      } else if (!isNaN(new Date(searchTerm).getTime())) {
        const dateSearch = new Date(searchTerm);
        query.$or.push({
          date: {
            $gte: new Date(dateSearch.setHours(0, 0, 0)),
            $lt: new Date(dateSearch.setHours(23, 59, 59))
          }
        });
      } else {
        query.$or.push({ eventName: { $regex: searchTerm, $options: "i" } });
      }
      
      return await eventModel.find(query);
    } catch (error) {
      console.error("Error fetching matched events:", error);
      throw error;
    }
  }

  //subevent routes

  // Add a new sub-event
  async addSubEvent(eventId: string, subEventData: Partial<subEvent>): Promise<EventDocument> {

    try {
      const event = await EventModel.findByIdAndUpdate(
        eventId,
        { $push: { subEvents: subEventData } },
        { new: true }
      );
      if (!event) {
        throw new NotFoundError("Event with given Id not found");
      }

      return event;
    } catch (error) {
      throw new Error("Failed to add the subEvent");
    }
  };

}

export default new EventService();