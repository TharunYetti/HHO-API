import volunterModel  from "../models/volunteer";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import volunteerService from "../services/VolunteerService";
import { ConflictError, ValidationError } from "../exceptions/CustomError";

class VolunteerController{
  async createVolunteer(req: Request, res: Response,next: NextFunction){
    const volunteerData = req.body;
    try{
      const volunteer = await volunteerService.createVolunteer(volunteerData);
      res.status(201).json(volunteer); // Status 201 for resource creation
    }catch(error){
      next(error);
    }
  }
}

export default new VolunteerController();
