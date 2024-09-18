const express = require("express");
const app = express();
const connectToDB = require("./connectDB.js");
const dotenv = require("dotenv");
app.use(express.static("public"));
app.use(express.json());
dotenv.config();
connectToDB();
const port = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Working");
})
app.use("/api/event",require("./Routes/eventRoute.js"));
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})