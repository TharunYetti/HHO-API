import express from "express";
import subEventRoute from "./subEventRoute";
import eventController from "../controllers/eventController";
import { middleware } from "../middleware/middleware"; 
import  eventModel  from "../models/EventModel";
import subEventModel from "../models/SubEventModel";

const router = express.Router();


router.get("/",eventController.getAllEvents);

router.post("/createEvent", middleware(["Admin","Core"]),eventController.createEvent);

router.put("/editEvent/:id", middleware(["Admin","Core"]),eventController.updateEvent);

router.delete("/deleteEvent/:id",middleware(["Admin","Core"]),eventController.deleteEvent);

router.use("/subevent", subEventRoute);

export default router;
