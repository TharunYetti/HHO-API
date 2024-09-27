import express from "express";
import mongoose from "mongoose";
import offusers from "./Routes/offuserRoutes.js";
import volunteerRoutes from "./Routes/volunteerRoutes.js";
import cors from 'cors';
import eventRoute from "./Routes/eventRoute.js";
const app = express();
import testimonialRoute from "./Routes/testimonialRoute.js";
import transactionsRoute from "./Routes/transactionRoutes.js"
import connectToDB from "./connectDB.js";

import dotenv from "dotenv";
dotenv.config();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
connectToDB();

const port = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Working");
})

app.use("/api/event",eventRoute);
app.use('/api/users/offusers',offusers);
app.use('/api/volunteers',volunteerRoutes);
app.use('/api/transaction',transactionsRoute);
app.use("/api/testimonial",testimonialRoute);

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})