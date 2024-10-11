import DonationModel from "../models/DonationModel"
import { DonationDocument } from '../types/donationType';
import crudRepository from './crudRepo';
class EventRepository extends crudRepository<DonationDocument>{
    constructor() {
        super(DonationModel);
    }
 
}

export default new EventRepository();