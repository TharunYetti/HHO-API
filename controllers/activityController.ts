import { Request, Response } from "express";
import activityService from "../services/ActivityService";
import { ActivityDocument } from "../types/activityType";

class ActivityController{
    async createActivity(req: Request,res: Response ){
        const activityData: Partial<ActivityDocument> = req.body;
        try{
            const activity = activityService.createActivity(activityData);
            res.status(200).json(activity);
        }catch(error){
            res.status(500).json({ message: "Error creating donation", error });
        }
    }
    async getAllActivities(req: Request, res:Response){
        try {
            const activities = await activityService.getAll();
            res.status(200).json(activities);
          } catch (error) {
            res.status(500).json({ message: "Error fetching donations", error });
          }
    }

    async updateActivity(req: Request, res: Response){
        const activityData = req.body;
        try{
            const updatedActivity = await activityService.updateActivity(req.params.id, activityData);
            res.status(200).json(updatedActivity);
        }catch(error){
            res.status(500).json({ message: "Error updating donation", error });
        }
    }

    async deleteActivity(req:Request, res: Response){
        const { id } = req.params;
        try {
            await activityService.deleteActivity(req.params.id);
        res.status(200).json({ message: "Activity successfully deleted" });
        } catch (error) {
        res.status(500).json({ message: "Error deleting activit", error });
        }
    }

}

export default new ActivityController();