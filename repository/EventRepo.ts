import EventModel from '../models/EventModel';
import { EventDocument } from '../types/eventType';
import crudRepository from './crudRepo';
class EventRepository extends crudRepository<EventDocument>{
    constructor() {
        super(EventModel);
    }
 
}

export default new EventRepository();