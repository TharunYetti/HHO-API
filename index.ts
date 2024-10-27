import dotenv from "dotenv";
dotenv.config();

import express,{Request,Response} from "express";
import mongoose from "mongoose";
import offusers from "./Routes/offuserRoutes";
import volunteerRoutes from "./Routes/volunteerRoutes";
import cors from 'cors';
import eventRoute from "./Routes/eventRoute";
const app = express();
import testimonialRoute from "./Routes/testimonialRoute";
import transactionsRoute from "./Routes/transactionRoutes"
import connectToDB from "./config/connectDB";
import { errorHandler } from "./middleware/errorHandler";

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
connectToDB();

const port = process.env.PORT || 3000;

app.get("/",(req:Request,res:Response)=>{
    res.send("Working");
})

app.use("/api/event",eventRoute);
app.use('/api/users/offusers',offusers);
app.use('/api/volunteer',volunteerRoutes);
app.use('/api/transaction',transactionsRoute);
app.use("/api/testimonial",testimonialRoute);

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})