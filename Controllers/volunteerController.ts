import volunterModel  from "../models/volunteer";
import mongoose from "mongoose";
import { Request, Response } from "express";
import volunteerService from "../Services/VolunteerService";

class VolunteerController{
  async createVolunteer(req: Request, res: Response){
    const volunteerData = req.body;
    try{
      const volunteer = await volunteerService.createVolunteer(volunteerData);
      res.status(200).json(volunteer);
    }catch(error){
      res.status(500).json({ message: "Error adding transaction", error });
    }
  }
}

export default new VolunteerController();
