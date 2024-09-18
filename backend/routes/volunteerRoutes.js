import express from "express";
import mongoose from "mongoose";
import { volunterModel } from "../models/volunteer.js";

const router = express.Router();

router.post('/vol-registration',async(req,res)=>{
    try {
        const {vol_email,vol_name,vol_phNo,vol_id,vol_evtName} = req.body;
        if(!vol_email || !vol_name || !vol_phNo || !vol_id || !vol_evtName){
            return res.json({"Error":"True","Message":"All Fields are required..."});
        }
        const volunteerExist = await volunterModel.findOne({vol_email});
        console.log(volunteerExist);
        if(volunteerExist){
            return res.json({"Error":"True","Message":"Already Registered for this Event..."});
        }

        const newVolunteer = {
            vol_email,vol_evtName,vol_id,vol_name,vol_phNo
        }

        const resAfterRegistering = await volunterModel.create(newVolunteer);
        if(!resAfterRegistering){
            return res.json({"Error":"True","Message":"Internal Server Error"});
        }
        return res.json({"Message":"Succesfully Register for the Event..."});
    } catch (error) {
        console.log(error.message);
        return res.json({"Error":"True","Message":error.message});
    }
})  
export default router;