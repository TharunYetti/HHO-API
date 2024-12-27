import { NextFunction, Request, Response } from "express";
import { MoneyDocument } from "../types/moneyType";
import MoneyService from "../services/MoneyService";

class MoneyController{
    async getMoney(req: Request, res: Response, next: NextFunction){
        try{
            const moneyResp = await MoneyService.getMoney();
            res.status(200).json({success:true,moneyResp});
        }catch(error){
            next(error);
        }
    }
    async updateMoney(req: Request, res: Response, next: NextFunction){
        const moneyData:Partial<MoneyDocument> = req.body;
        try{
            const moneyResp = await MoneyService.updateMoney(moneyData);
            res.status(200).json({success:true,moneyResp});
        }catch(err){
            next(err);
        }
    }
}

export default new MoneyController();