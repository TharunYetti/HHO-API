import express from "express";
import mongoose from "mongoose";
import offusers from "./routes/offuserRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import cors from 'cors';
import { MONGODBURL, PORT } from "./config.js";


//creating app 
const app = express();


//using middlewares
app.use(cors())
app.use(express.json())

//routes impoting
app.use('/api/users/offusers',offusers);
app.use('/api/events',eventRoutes);
app.use('/api/volunteers',volunteerRoutes);



//connecting to the mongodb
mongoose.connect(MONGODBURL)
.then(
    app.listen(PORT,()=>{
    console.log(`Server is Running in the port:${PORT}`);
})
)


