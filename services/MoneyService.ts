import moneyModel from "../models/MoneyModel";
import { MoneyDocument } from "../types/moneyType";

class MoneyService{
    async getMoney(): Promise<MoneyDocument[]|null>{
        try{
            return await moneyModel.find({});
        }catch(err){
            throw new Error("Failed in getting the money information");
        }
    }
    async updateMoney(moneyData: Partial<MoneyDocument>): Promise<MoneyDocument|null>{
        const {amount, donated_amount}= moneyData;
        try{
            const money = await moneyModel.findOneAndUpdate(
                {}, // Match condition (empty object to match the first document)
                {
                $set: {
                    amount: amount,
                    donated_amount: donated_amount,
                },
                    },
                    {
                    new: true, // Return the updated document
                    upsert: true, // Create a new document if none matches
                    }
                );
              return money;
        }catch(err){
            throw new Error("Failed in updating the money information");
        }
    }
}

export default new MoneyService();