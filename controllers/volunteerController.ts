import volunterModel  from "../models/volunteer";
import mongoose from "mongoose";
import { Request, Response } from "express";
import volunteerService from "../services/VolunteerService";
import { ConflictError, ValidationError } from "../exceptions/CustomError";

class VolunteerController{
  async createVolunteer(req: Request, res: Response){
    const volunteerData = req.body;
    try{
      const volunteer = await volunteerService.createVolunteer(volunteerData);
      res.status(201).json(volunteer); // Status 201 for resource creation
    }catch(error){
      if(error instanceof ValidationError){
        res.status(400).json({ success:false,message: error.message });  // 400 for bad request
      } else if (error instanceof ConflictError) {
        res.status(409).json({ success:false,message: error.message });  // 409 for conflict
      } else {
        res.status(500).json({ success:false,message: "An error occurred", error });
      }
    }
  }
}

export default new VolunteerController();
