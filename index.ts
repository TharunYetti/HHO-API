import dotenv from "dotenv";
dotenv.config();
import nodemailer from 'nodemailer';
import bodyParser from "body-parser";
import express,{NextFunction, Request,Response} from "express";
import mongoose from "mongoose";
import offusers from "./routes/offuserRoutes";
import volunteerRoutes from "./routes/volunteerRoutes";
import cors from 'cors';
import eventRoute from "./routes/eventRoute";
const app = express();
import testimonialRoute from "./routes/testimonialRoute";
import transactionsRoute from "./routes/transactionRoutes"
import activityRoute from "./routes/activityRoutes"
import donationRoute from "./routes/donationRoutes"
import connectToDB from "./config/connectDB";
import errorHandler from "./middleware/errorHandler";

app.use(bodyParser.json())
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
connectToDB();

const port = process.env.PORT || 3000;

app.get("/",(req:Request,res:Response)=>{
    res.send("Working");
})

app.use("/api/events",eventRoute);
app.use('/api/users/offusers',offusers);
app.use('/api/volunteer',volunteerRoutes);
app.use('/api/transactions',transactionsRoute);
app.use("/api/testimonials",testimonialRoute);
app.use("/api/activities",activityRoute);
app.use("/api/donations",donationRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
  });



  


app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})