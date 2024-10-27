import OffUserModel from '../models/off_users';
import { OffUserDocument } from '../types/offUserType';
import crudRepository from './crudRepo';
class EventRepository extends crudRepository<OffUserDocument>{
    constructor() {
        super(OffUserModel);
    }
 
}

export default new EventRepository();