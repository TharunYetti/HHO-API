import Donation from "../models/DonationModel";
import { Request, Response } from "express";
// Controller function to create a new donation
const createDonation = async (req: Request, res: Response) => {
  try {
    const { name, title, description, amt, date } = req.body;

    const newDonation = new Donation({
      name,
      title,
      description,
      amt,
      date,
    });

    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Unknown error occurred" });
    }
  }
};

//update Donation
const updateDonation = async (req: Request, res: Response) => {
  try {
    const { name, amt, description, title, date } = req.body;
    if (!name || !amt || !description || !title || !date)
      res.status(400).json({ message: "All fields are required" });
    const newDonation = {
      name,
      amt,
      description,
      title,
      date,
    };
    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      newDonation
    );
    if (updatedDonation) {
       res.json(updatedDonation);
    } else
      res
        .status(200)
        .json({ Error: "True", Message: "Not Updated Donations.." });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Unknown error occurred" });
    }
  }
};

const deleteDonation = async (req: Request, res: Response): Promise<void> => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      res.status(404).json({ message: "Donation not found" });
    }
    res.status(200).json({ message: "Donation deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Unknown error occurred" });
    }
  }
};

//getall Donations
const getAllDonations = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Unknown error occurred" });
    }
  }
};

export { createDonation, updateDonation, deleteDonation, getAllDonations };
