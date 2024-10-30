import donationRepository from "../repository/DonationRepo";
import { DonationDocument } from "../types/donationType";

interface DonationResponse{
    data: DonationDocument|null,
    message: string
}

class DonationService{
    async createDonation(donationData: Partial<DonationDocument>): Promise<DonationResponse>{
        try{

            const { name, title, description,amt} = donationData;
            if (!name || !title || !description || !amt) {
                return {data:null,message:"Ensure to enter every field"}
            }
            const donationExist = await donationRepository.findBy({name:name, title:title, description: description, amt:amt});
            console.log(donationExist);
            if (donationExist) {
                return {data:null,message:"Already exist"}
            }

            const donation =  await donationRepository.create(donationData);
            return {data:donation,message:"Successfully created donation"}
        }catch(err){
            console.log("Error while creating donation in service layer\nError:",err.message);
            return {data:null,message:"Error while creating donation in service layer"};
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