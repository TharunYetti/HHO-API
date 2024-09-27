import Donation from "../models/DonationModel.js";

// Controller function to create a new donation
const createDonation = async (req, res) => {
    try {
        const { name, title, description, amt, date } = req.body;
        
        const newDonation = new Donation({
            name,
            title,
            description,
            amt,
            date
        });

        const savedDonation = await newDonation.save();
        res.status(201).json(savedDonation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//update Donation
const updateDonation = async (req, res) => {
    try {
        const{name,amt,description,title,date} = req.body;
        if(!name || !amt || !description || !title || !date) return res.status(400).json({ message: "All fields are required" });
        const newDonation = {
            name,amt,description,title,date
        };
        const updatedDonation = await Donation.findByIdAndUpdate(
            req.params.id,
            newDonation
        );
        if(updatedDonation){
            return res.json(updatedDonation);
        }else
            res.status(200).json({"Error":"True","Message":"Not Updated Donations.."});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



//deelte doantiona
//delete donation
const deleteDonation = async (req, res) => {
    try {
        const donation = await Donation.findByIdAndDelete(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }
        res.status(200).json({ message: "Donation deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



//getall Donations
const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).json(donations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}       



export { createDonation,updateDonation,deleteDonation,getAllDonations};
