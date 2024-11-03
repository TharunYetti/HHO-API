import { ActivityDocument } from "../types/activityType";
import activityRepo from "../repository/ActivityRepo";
import { ConflictError, NotFoundError, ValidationError } from "../exceptions/CustomError";

interface ActivityResponse {
    data: ActivityDocument | null;
    message: string;
}

class ActivityService{
    async createActivity(activityData:Partial<ActivityDocument>):Promise<ActivityDocument|null>{
            const {name,description,image} = activityData;
            if(!name || !description || !image){
                throw new ValidationError("Ensure to enter every field");
            }
            const activity = await activityRepo.findBy({name:name,description:description,image:image});
            if(activity){
                throw new ConflictError("Activity already exist");
            }
            const activityNew = await activityRepo.create(activityData);
            return activityNew;
    }

    async getAll():Promise<ActivityDocument[]|null>{
        try{
            return await activityRepo.getAll();
        }catch(error){
            console.log("Error while reading activities in service layer\nError:",error.message);
            return null;
        }
    }

    async updateActivity(id: string,activityData:Partial<ActivityDocument>):Promise<ActivityDocument|null>{
            const activityUpdated =  await activityRepo.update(id,activityData);
            if(!activityUpdated){
                throw new NotFoundError("Activity with given id not found");
            }
            return activityUpdated;
    }

    async deleteActivity(id:string):Promise<ActivityDocument|null>{
        const result = await activityRepo.delete(id);
        if(!result){
            throw new NotFoundError("Activity with given Id not found");
        }
        return result;
    }

}

export default new ActivityService();