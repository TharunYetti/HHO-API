import Donation from "../models/DonationModel";
import { Request, Response } from "express";
import { DonationDocument } from "../types/donationType";
import donationService from "../Services/DonationService";

class DonationController{

  // Create a new donation
  async createDonation(req: Request, res: Response) {
    const donationData: Partial<DonationDocument> = req.body;
    try {
      const donation = await donationService.createDonation(donationData);
      res.status(200).json(donation);
    } catch (error) {
      res.status(500).json({ message: "Error creating donation", error });
    }
  }

  // Update an existing donation
  async updateDonation(req: Request, res: Response) {
    const { id } = req.params;
    const donationData: Partial<DonationDocument> = req.body;
    try {
      const updatedDonation = await donationService.updateDonation(id, donationData);
      res.status(200).json(updatedDonation);
    } catch (error) {
      res.status(500).json({ message: "Error updating donation", error });
    }
  }

  // Delete an donation
  async deleteDonation(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await donationService.deleteDonation(id);
      res.status(200).json({ message: "Donation successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting donation", error });
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

// Controller function to create a new donation
// const createDonation = async (req: Request, res: Response) => {
//   try {
//     const { name, title, description, amt, date } = req.body;

//     const newDonation = new Donation({
//       name,
//       title,
//       description,
//       amt,
//       date,
//     });

//     const savedDonation = await newDonation.save();
//     res.status(201).json(savedDonation);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(400).json({ message: "Unknown error occurred" });
//     }
//   }
// };

// //update Donation
// const updateDonation = async (req: Request, res: Response) => {
//   try {
//     const { name, amt, description, title, date } = req.body;
//     if (!name || !amt || !description || !title || !date)
//       res.status(400).json({ message: "All fields are required" });
//     const newDonation = {
//       name,
//       amt,
//       description,
//       title,
//       date,
//     };
//     const updatedDonation = await Donation.findByIdAndUpdate(
//       req.params.id,
//       newDonation
//     );
//     if (updatedDonation) {
//        res.json(updatedDonation);
//     } else
//       res
//         .status(200)
//         .json({ Error: "True", Message: "Not Updated Donations.." });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(400).json({ message: "Unknown error occurred" });
//     }
//   }
// };

// const deleteDonation = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const donation = await Donation.findByIdAndDelete(req.params.id);
//     if (!donation) {
//       res.status(404).json({ message: "Donation not found" });
//     }
//     res.status(200).json({ message: "Donation deleted successfully" });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(400).json({ message: "Unknown error occurred" });
//     }
//   }
// };

// //getall Donations
// const getAllDonations = async (req: Request, res: Response) => {
//   try {
//     const donations = await Donation.find();
//     res.status(200).json(donations);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(400).json({ message: "Unknown error occurred" });
//     }
//   }
// };

// export { createDonation, updateDonation, deleteDonation, getAllDonations };
