import eventModel from "../models/EventModel";
import subEventModel from "../models/SubEventModel";
import { EventDocument } from "../types/eventType"; // Assuming you have types defined for Event

class EventService {
  async createEvent(eventData: Partial<EventDocument>): Promise<EventDocument | null> {
    try {
      const record = await eventModel.create(eventData);
      return record;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }

  async updateEvent(eventId: string, eventData: Partial<EventDocument>): Promise<EventDocument | null> {
    try {
      const event = await eventModel.findById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }
      const updatedEvent = await eventModel.findByIdAndUpdate(eventId, eventData, { new: true });
      return updatedEvent;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      const event = await eventModel.findById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }
      await eventModel.findByIdAndDelete(eventId);
      await subEventModel.deleteMany({ mainEventId: eventId });
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  }

  async getAllEvents(): Promise<EventDocument[]> {
    try {
      return await eventModel.find();
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
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
}

export default new EventService();