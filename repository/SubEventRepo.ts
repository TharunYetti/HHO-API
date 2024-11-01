import SubEventModel from '../models/SubEventModel';
import { SubEventDocument } from '../types/subEventType';
import crudRepository from './crudRepo';
class SubEventRepository extends crudRepository<SubEventDocument>{
    constructor() {
        super(SubEventModel);
    }
 
}

export default new SubEventRepository();