import { Schema, model } from "mongoose";
import { MoneyDocument } from "../types/moneyType";
const moneySchema = new Schema<MoneyDocument>({
    amount: {
      type: Number,
      required: true,
    },
    donated_amount:{
      type:Number,
      required:true
    }
  });
  
  const moneyModel = model<MoneyDocument>('Money', moneySchema);
  export default moneyModel;