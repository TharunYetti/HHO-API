import { ActivityDocument } from "../types/activityType";
import activityRepo from "../repository/ActivityRepo";

class ActivityService{
    async createActivity(activityData:Partial<ActivityDocument>):Promise<ActivityDocument|null>{
        try{
            const {name,description,image} = activityData;
            if(!name || !description){
                throw new Error("Ensure to enter required field");
            }

            const activity = activityRepo.findBy({name:name,description:description});
            if(activity){
                throw new Error("Activity already exist");
            }
            return await activityRepo.create(activityData);

        }catch(error){
            console.log("Error while creating activity in service layer\nError:",error.message);
            return null;
        }
    }

    async getActivity(id:string):Promise<ActivityDocument>{
        try{
            return await activityRepo.get(id);
        }catch(error){
            console.log("Error while reading activity in service layer\nError:",error.message);
            return null;
        }
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
        try{
            const activityExist = activityRepo.get(id);
            if(!activityExist){
                throw new Error("Activity with given Id doesn't exist");
            }
            return await activityRepo.update(id,activityData);
        }catch(error){
            console.log("Error while updating activity in service layer\nError:",error.message);
            return null;
        }
    }

    async deleteActivity(id:string):Promise<ActivityDocument|null>{
        try{
            const activity = this.getActivity(id);
            return await activityRepo.delete(id);
        }catch(error){
            console.log("Error while deleting activity in service layer\nError:",error.message);
            return null;
        }
    }

}

export default new ActivityService();