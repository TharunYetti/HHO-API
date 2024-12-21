import { ConflictError, NotFoundError } from "../exceptions/CustomError";
import donationRepository from "../repository/DonationRepo";
import { DonationDocument } from "../types/donationType";

class DonationService{
    async createDonation(donationData: Partial<DonationDocument>): Promise<DonationDocument|null>{
        const { name, title, description,amt,photo} = donationData;
        const donationExist = await donationRepository.findBy({name:name, title:title, description: description, amt:amt,photo:photo});
        console.log(donationExist);
        if (donationExist) {
            throw new ConflictError("Donation already exist, enter carefully");
        }

        const donation =  await donationRepository.create(donationData);
        return donation;
    }
    async deleteDonation(id: string): Promise<DonationDocument|null>{
        const result = await donationRepository.delete(id);
        if(!result){
            throw new NotFoundError("Donation is not found");
        }
        return result;
    }

    async updateDonation(id: string, donationData: Partial<DonationDocument>): Promise<DonationDocument|null>{
        const result = await donationRepository.update(id,donationData);
        if(!result){
            throw new NotFoundError("Donation is not found");
        }
        return result;
    }
    async getAllDonations(): Promise<DonationDocument[]|null>{
        // console.log("Into the service");
        try{
            return await donationRepository.getAll();
        }catch(err){
            throw new Error("Failed in getting all donations");
        }
    }

    async getMacthedDonations(searchTerm: string): Promise<DonationDocument[]|null>{
        // console.log("Into the service");
        console.log(searchTerm);
        try{
            return await donationRepository.getMatched(searchTerm);
        }catch(err){
            console.error("Error in getting matched transactions:",err);
            throw new Error("Failed in getting matched donations");
        }
    }
}

export default new DonationService();