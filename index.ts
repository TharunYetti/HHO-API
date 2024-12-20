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


// Create a transporter object using your email service
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Example: using Gmail
    auth: {
      user: 'your-email@gmail.com', // Your email address
      pass: 'your-email-password',  // Use app password if 2FA is enabled
    },
  });
  
// POST route to send emails
app.post('/send-email', async (req, res) => {
    const { name, id, year, title, description } = req.body;
  
    // Nodemailer transporter configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your preferred email service
      auth: {
        user: 'prasad18062005@gmail.com', // Replace with your email
        pass: 'prasad18_06_2005', // Replace with your email password or app password
      },
    });
  
    // Email options
    const mailOptions = {
      from: `prasadk1729@gmail.com`,
      to: 'prasad18062005@gmail.com', // Replace with the recipient's email
      subject: `Help Request from ${name}`,
      text: `
        Name: ${name}
        ID: ${id}
        Year: ${year}
        Title: ${title}
        Description: ${description}
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to send email');
    }
});

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})