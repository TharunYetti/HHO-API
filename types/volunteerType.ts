import { Document } from "mongoose";

export interface VolunteerDocument extends Document{
    vol_name:string,
    vol_email:string,
    vol_id:string,
    vol_phNo:number,
    vol_evtName:string
}