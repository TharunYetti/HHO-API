import { NextFunction, Request, Response } from "express";
import activityService from "../services/ActivityService";
import { ActivityDocument } from "../types/activityType";
import { NotFoundError, ValidationError } from "../exceptions/CustomError";

class ActivityController{
    async createActivity(req: Request,res: Response, next: NextFunction ){
        const activityData: Partial<ActivityDocument> = req.body;
        try{
            const activityResp = await activityService.createActivity(activityData);
            console.log(activityResp);
            res.status(200).json({success:true,activityResp});
        }catch(error){
            next(error);
        }
    }
    async getAllActivities(req: Request, res:Response, next: NextFunction){
        try {
            const activities = await activityService.getAll();
            // res.status(200).json(activities);
            res.status(200).json({data:activities,message:"Successfully retrieved all the activities"});
          } catch (error) {
            next(error);
          }
    }

    async updateActivity(req: Request, res: Response, next: NextFunction){
        const activityData = req.body;
        try{
            const updatedActivity = await activityService.updateActivity(req.params.id, activityData);
            res.status(200).json({success:true,updatedActivity});
        }catch(err){
            next(err);
        }
    }

    async deleteActivity(req:Request, res: Response, next: NextFunction){
        const { id } = req.params;
        try {
            await activityService.deleteActivity(req.params.id);
            res.status(200).json({success:true,message: "Activity successfully deleted" });
        } catch (err) {
            next(err);
        }
    }

}

export default new ActivityController();