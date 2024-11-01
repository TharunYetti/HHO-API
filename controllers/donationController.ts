import Donation from "../models/DonationModel";
import { Request, Response } from "express";
import { DonationDocument } from "../types/donationType";
import donationService from "../services/DonationService";
import { NotFoundError, ValidationError } from "../exceptions/CustomError";

class DonationController{

  // Create a new donation
  async createDonation(req: Request, res: Response) {
    const donationData: Partial<DonationDocument> = req.body;
    try {
      const donation = await donationService.createDonation(donationData);
      res.status(200).json({success:true,donation});
    } catch (err) {
      if(err instanceof NotFoundError){
        res.status(404).json({success:false,message:err.message});
      }else if(err instanceof ValidationError){
        res.status(400).json({success:false,message:err.message});
      }else{
        res.status(500).json({success:false,message: "Error in adding donation",err});
      }
    }
  }

  // Update an existing donation
  async updateDonation(req: Request, res: Response) {
    const { id } = req.params;
    const donationData: Partial<DonationDocument> = req.body;
    try {
      const updatedDonation = await donationService.updateDonation(id, donationData);
      res.status(200).json({success:true,updatedDonation});
    } catch (err) {
      if(err instanceof NotFoundError){
        res.status(404).json({success:false,message:err.message});
      }else if(err instanceof ValidationError){
        res.status(400).json({success:false,message:err.message});
      }else{
        res.status(500).json({success:false,message: "Error in updating donation",err});
      }
    }
  }

  // Delete an donation
  async deleteDonation(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await donationService.deleteDonation(id);
      res.status(200).json({success:true, message: "Donation successfully deleted"});
    } catch (err) {
      if(err instanceof NotFoundError){
        res.status(404).json({success:false,message:err.message});
      }else if(err instanceof ValidationError){
        res.status(400).json({success:false,message:err.message});
      }else{
        res.status(500).json({ success:false,message: "Error in deleting donation", err });
      }
    }
  }

  // Get all donations
  async getAllDonations(req: Request, res: Response) {
    try {
      const donations = await donationService.getAllDonations();
      res.status(200).json(donations);
    } catch (error) {
      res.status(500).json({ message: "Error fetching donations", error });
    }
  }

  // Search for donations by a specific term
  async getMatchedDonations(req: Request, res: Response) {
    const searchTerm = req.query.searchTerm as string;
    try {
      const matchedDonations = await donationService.getMacthedDonations(searchTerm);
      res.status(200).json(matchedDonations);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving matched donations", error });
    }
  }
}

export default new DonationController();