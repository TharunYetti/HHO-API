import volunteerModel from '../models/volunteer';
import { VolunteerDocument } from '../types/volunteerType';
import crudRepository from './crudRepo';
class EventRepository extends crudRepository<VolunteerDocument>{
    constructor() {
        super(volunteerModel);
    }
 
}

export default new EventRepository();