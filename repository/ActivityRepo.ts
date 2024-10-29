import ActivityModel from "../models/ActivityModel";
import { ActivityDocument } from "../types/activityType";
import CrudRepository from "./crudRepo";

class ActivityRepository extends CrudRepository<ActivityDocument>{
    constructor(){
        super(ActivityModel);
    }
}

export default new ActivityRepository();