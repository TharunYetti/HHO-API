import Donation from "../models/DonationModel";
import { NextFunction, Request, Response } from "express";
import { DonationDocument } from "../types/donationType";
import donationService from "../services/DonationService";
import { NotFoundError, ValidationError } from "../exceptions/CustomError";

class DonationController{

  // Create a new donation
  async createDonation(req: Request, res: Response,next: NextFunction) {
    const donationData: Partial<DonationDocument> = req.body;
    try {
      const donation = await donationService.createDonation(donationData);
      res.status(200).json({success:true,donation});
    } catch (err) {
      next(err);
    }
  }

  // Update an existing donation
  async updateDonation(req: Request, res: Response,next: NextFunction) {
    const { id } = req.params;
    const donationData: Partial<DonationDocument> = req.body;
    try {
      const updatedDonation = await donationService.updateDonation(id, donationData);
      res.status(200).json({success:true,updatedDonation});
    } catch (err) {
      next(err);
    }
  }

  // Delete an donation
  async deleteDonation(req: Request, res: Response,next: NextFunction) {
    const { id } = req.params;
    try {
      await donationService.deleteDonation(id);
      res.status(200).json({success:true, message: "Donation successfully deleted"});
    } catch (err) {
      next(err);
    }
  }

  // Get all donations
  async getAllDonations(req: Request, res: Response,next: NextFunction) {
    try {
      const donations = await donationService.getAllDonations();
      res.status(200).json(donations);
    } catch (error) {
      next(error);
    }
  }

  // Search for donations by a specific term
  async getMatchedDonations(req: Request, res: Response,next: NextFunction) {
    const searchTerm = req.query.searchTerm as string;
    try {
      const matchedDonations = await donationService.getMacthedDonations(searchTerm);
      res.status(200).json(matchedDonations);
    } catch (error) {
      next(error);
    }
  }
}

export default new DonationController();