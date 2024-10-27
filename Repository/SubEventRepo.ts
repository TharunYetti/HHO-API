import SubEventModel from '../models/SubEventModel';
import { SubEventDocument } from '../types/subEventType';
import crudRepository from './crudRepo';
class EventRepository extends crudRepository<SubEventDocument>{
    constructor() {
        super(SubEventModel);
    }
 
}

export default new EventRepository();