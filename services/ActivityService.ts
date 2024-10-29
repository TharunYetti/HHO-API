import { ActivityDocument } from "../types/activityType";
import activityRepo from "../repository/ActivityRepo";

interface ActivityResponse {
    data: ActivityDocument | null;
    message: string;
}

class ActivityService{
    async createActivity(activityData:Partial<ActivityDocument>):Promise<ActivityResponse>{
        try{
            const {name,description,image} = activityData;
            if(!name || !description || !image){
                return {data:null,message:"Enter all required fields"}
            }
            const activity = await activityRepo.findBy({name:name,description:description,image:image});
            if(activity){
                return {data:null,message:"Activity already exist"};
            }
            const activityNew = await activityRepo.create(activityData);
            return {data:activityNew,message:"Successfully created activity"};

        }catch(error){
            console.log("Error while creating activity in service layer\nError:",error.message);
            return {data:null,message:"Error while creating activity in service layer"};
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

    async updateActivity(id: string,activityData:Partial<ActivityDocument>):Promise<ActivityResponse>{
        try{
            const activityExist = activityRepo.get(id);
            if(!activityExist){
                return {data:null,message:"Activity already exist"};
            }
            const activityUpdated =  await activityRepo.update(id,activityData);
            return {data:activityUpdated,message:"Successfully updated the activity"};
        }catch(error){
            console.log("Error while updating activity in service layer\nError:",error.message);
            return {data:null,message:"Error while creating activity in service layer"};
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