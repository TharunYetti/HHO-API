import transactionRepository from "../Repository/transactionRepo"
import  { TransactionDocument } from "../types/transactionType";

class TransactionService{
    
    async createTransaction(transactionData: Partial<TransactionDocument>): Promise<TransactionDocument|null>{
        try{
            return await transactionRepository.create(transactionData);
        }catch(err){
            console.error("Error creating transaction:", err);
            return null;  // Handle error case by returning null or an appropriate value
        }
    }

    async deleteTransaction(id: string): Promise<TransactionDocument|null>{
        console.log("Into the service");
        try{
            return await transactionRepository.delete(id);
        }catch(err){
            console.log("Error in deleting transaction with id:",id);
            return null;
        }
    }

    async updateTransaction(id: string, transactionData: Partial<TransactionDocument>): Promise<TransactionDocument|null>{
        try{
            return await transactionRepository.update(id,transactionData);
        }catch(error){
            console.error("Error updating transaction:", error);
            return null;
        }
    }
    async getAllTransactions(): Promise<TransactionDocument[]|null>{
        console.log("Into the service");
        try{
            return await transactionRepository.getAll();
        }catch(err){
            console.error("Error getting all transactions:",err);
            return null;
        }
    }
    async getMacthedTransactions(searchTerm: string,filterBy: string): Promise<TransactionDocument[]|null>{
        console.log("Into the service");
        console.log(searchTerm);
        try{
            return await transactionRepository.getMatched(searchTerm,filterBy) ;
        }catch(err){
            console.error("Error in getting matched transactions:",err);
        }
    }

}

export default new TransactionService();