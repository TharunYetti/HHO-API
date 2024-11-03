import { NotFoundError, ValidationError } from "../exceptions/CustomError";
import transactionRepository from "../repository/transactionRepo"
import  { TransactionDocument } from "../types/transactionType";

class TransactionService{
    
    async createTransaction(transactionData: Partial<TransactionDocument>): Promise<TransactionDocument|null>{
        const {transaction_type,amount,purpose} = transactionData;
        if(!transaction_type || !amount || !purpose){
            throw new ValidationError("Insufficinet paramters");
        }
        return await transactionRepository.create(transactionData);
    }

    async deleteTransaction(id: string): Promise<TransactionDocument|null>{
        const response =  await transactionRepository.delete(id);
        if(!response){
            throw new NotFoundError("Transaction with given Id not found");
        }
        return response;
    }

    async updateTransaction(id: string, transactionData: Partial<TransactionDocument>): Promise<TransactionDocument|null>{
        const response =  await transactionRepository.update(id,transactionData);
        console.log(response);
        if(!response){
            throw new NotFoundError("Transaction with given Id not found");
        }
        return response;
    }
    async getAllTransactions(): Promise<TransactionDocument[]|null>{
        console.log("Into the service");
        try{
            return await transactionRepository.getAll();
        }catch(err){
            console.error("Error getting all transactions:",err);
            throw new Error("Failed in getting all transactions");
        }
    }
    async getMacthedTransactions(searchTerm: string,filterBy: string): Promise<TransactionDocument[]|null>{
        console.log("Into the service");
        console.log(searchTerm);
        try{
            return await transactionRepository.getMatched(searchTerm,filterBy) ;
        }catch(err){
            console.error("Error in getting matched transactions:",err);
            throw new Error("Failed in getting matched transactions");
        }
    }

}

export default new TransactionService();