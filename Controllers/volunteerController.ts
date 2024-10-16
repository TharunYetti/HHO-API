import volunterModel  from "../models/volunteer";
import mongoose from "mongoose";
import { Request, Response } from "express";
export const volunteerRegistration = async (
  req: Request,
  res: Response
)=> {
  try {
    const { vol_email, vol_name, vol_phNo, vol_id, vol_evtName } = req.body;
    if (!vol_email || !vol_name || !vol_phNo || !vol_id || !vol_evtName) {
      res.json({ Error: "True", Message: "All Fields are required..." });
    }
    const volunteerExist = await volunterModel.findOne({ vol_email });
    console.log(volunteerExist);
    if (volunteerExist) {
      res.json({
        Error: "True",
        Message: "Already Registered for this Event...",
      });
    }

    const newVolunteer = {
      vol_email,
      vol_evtName,
      vol_id,
      vol_name,
      vol_phNo,
    };

    const resAfterRegistering = await volunterModel.create(newVolunteer);
    if (!resAfterRegistering) {
      res.json({ Error: "True", Message: "Internal Server Error" });
    }
    res.json({ Message: "Succesfully Register for the Event..." });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ Status: "Error", Message: error.message });
    } else {
      res.status(400).send("Unknown Error");
    }
  }
};
