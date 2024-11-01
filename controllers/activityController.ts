import { Request, Response } from "express";
import activityService from "../services/ActivityService";
import { ActivityDocument } from "../types/activityType";
import { NotFoundError, ValidationError } from "../exceptions/CustomError";

class ActivityController{
    async createActivity(req: Request,res: Response ){
        const activityData: Partial<ActivityDocument> = req.body;
        try{
            const activityResp = await activityService.createActivity(activityData);
            console.log(activityResp);
            res.status(200).json({success:true,activityResp});
        }catch(error){
            if(error instanceof ValidationError){
                res.status(400).json({success:false,message:error.message});
              }else{
                res.status(500).json({success:false, message: "Error adding activity", error });
              }
        }
    }
    async getAllActivities(req: Request, res:Response){
        try {
            const activities = await activityService.getAll();
            // res.status(200).json(activities);
            res.status(200).json({data:activities,message:"Successfully retrieved all the activities"});
          } catch (error) {
            res.status(500).json({ message: "Error fetching donations", error });
          }
    }

    async updateActivity(req: Request, res: Response){
        const activityData = req.body;
        try{
            const updatedActivity = await activityService.updateActivity(req.params.id, activityData);
            res.status(200).json({success:true,updatedActivity});
        }catch(err){
            if(err instanceof NotFoundError){
                res.status(404).json({success:false,message:err.message});
              }else if(err instanceof ValidationError){
                res.status(400).json({success:false,message:err.message});
              }else{
                res.status(500).json({success:false,message: "Error in updating activity",err});
              }
        }
    }

    async deleteActivity(req:Request, res: Response){
        const { id } = req.params;
        try {
            await activityService.deleteActivity(req.params.id);
            res.status(200).json({success:true,message: "Activity successfully deleted" });
        } catch (err) {
            if(err instanceof NotFoundError){
                res.status(404).json({success:false,message:err.message});
              }else if(err instanceof ValidationError){
                res.status(400).json({success:false,message:err.message});
              }else{
                res.status(500).json({ success:false,message: "Error in deleting activity", err });
              }
        }
    }

}

export default new ActivityController();