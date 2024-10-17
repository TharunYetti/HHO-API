import donationRepository from "../Repository/DonationRepo";
import { DonationDocument } from "../types/donationType";

class DonationService{
    async createDonation(donationData: Partial<DonationDocument>): Promise<DonationDocument|null>{
        try{

            const { name, title, description,amt, date} = donationData;
            if (name || title || description || amt || date) {
                // res.json({ Error: "True", Message: "All Fields are required..." });
                throw new Error("Ensure to enter every field");
            }
            const donationExist = await donationRepository.findBy({name:name, title:title, description: description, amt:amt});
            console.log(donationExist);
            if (donationExist) {
                throw new Error("Ensure not to have redundant data");
            }

            return await donationRepository.create(donationData);
        }catch(err){
            console.log("Error while creating donation in service layer\nError:",err.message);
            return null;
        }
    }
    async deleteDonation(id: string): Promise<DonationDocument|null>{
        try{
            return await donationRepository.delete(id);
        }catch(err){
            console.log("Error while deleting donation in service layer");
            return null;
        }
    }

    async updateDonation(id: string, donationData: Partial<DonationDocument>): Promise<DonationDocument|null>{
        try{
            return await donationRepository.update(id,donationData);
        }catch(error){
            console.error("Error updating donation:", error);
            return null;
        }
    }
    async getAllDonations(): Promise<DonationDocument[]|null>{
        // console.log("Into the service");
        try{
            return await donationRepository.getAll();
        }catch(err){
            console.error("Error getting all donations:",err);
            return null;
        }
    }

    async getMacthedDonations(searchTerm: string): Promise<DonationDocument[]|null>{
        // console.log("Into the service");
        console.log(searchTerm);
        try{
            return await donationRepository.getMatched(searchTerm);
        }catch(err){
            console.error("Error in getting matched transactions:",err);
        }
    }
}

export default new DonationService();