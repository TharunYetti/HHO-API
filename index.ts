import dotenv from "dotenv";
dotenv.config();
import nodemailer from 'nodemailer';
import bodyParser from "body-parser";
import morgan from 'morgan';
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
import  { model, Schema } from "mongoose";

app.use(bodyParser.json())
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
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


  app.post("/send-email", async (req, res) => {
    console.log(req.body);
    const { id, name, year, email, title, description } = req.body;
  
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "prasad18062005@gmail.com",
          pass: "xcgk lvqj gkbt rrms", // Replace with your app password
        },
      });
  
      // Main email to the organization
      const mailOptions = {
        from: email,
        to: "prasad18062005@gmail.com",
        subject: `Help Request: ${title} (Submitted by ${name})`,
        text: `
  Hello,
  
  You have received a new help request. Here are the details:
  
  Name: ${name}
  ID: ${id}
  Year: ${year}
  Email: ${email}
  Title: ${title}
  
  Description:
  ${description}
  
  Best regards,
  Your HHO Application
        `,
      };
  
      // Auto-reply email to the user
      const autoReplyOptions = {
        from: "prasad18062005@gmail.com",
        to: email,
        subject: `Acknowledgment: Your Help Request "${title}"`,
        text: `
  Hello ${name},
  
  Thank you for reaching out to Helping Hands Organization (HHO). We have received your request and will get back to you shortly. 
  
  Here are the details of your submission:
  - Name: ${name}
  - ID: ${id}
  - Year: ${year}
  - Title: ${title}
  - Description: ${description}
  
  If you have any additional information or questions, feel free to reply to this email.
  
  Best regards,
  Helping Hands Organization
        `,
      };
  
      // Send main email
      await transporter.sendMail(mailOptions);
  
      // Send auto-reply email
      await transporter.sendMail(autoReplyOptions);
  
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email." });
    }
  });


  //model for 
  const moneySchema = new Schema({
    amount: {
      type: Number,
      required: true,
    },
    donated_amount:{
      type:Number,
      required:true
    }
  });
  
  const moneyModel = model('Money', moneySchema);

  app.get('/get-money',async(req,res)=>{
      try {
          const money = await moneyModel.find();
          console.log(money);
          res.status(200).json({money});
      } catch (error) {
          console.log(error.message);
          res.status(400).json({message:error.message});
      }
  })


  app.post('/update-money', async (req, res) => {
    try {
      const { amount, donated_amount } = req.body;
  
      // Log incoming request body
      console.log(req.body);
  
      // Find and update the existing document or create a new one if not found
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
  
      console.log("Updated Money Document:", money);
  
      // Send response
      res.status(200).json({ money });
    } catch (error) {
      console.error("Error updating money:", error.message);
  
      // Send error response
      res.status(400).json({ message: error.message });
    }
  });
  
  
  


app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})