import express from "express";
import subEventRoute from "./subEventRoute";
import eventController from "../Controllers/eventController";
import { middleware } from "../middleware/middleware"; 
import  eventModel  from "../models/EventModel";
import subEventModel from "../models/SubEventModel";

const router = express.Router();


router.get("/",eventController.getAllEvents);

router.post("/createEvent", eventController.createEvent);

router.put("/editEvent/:id", eventController.updateEvent);

router.delete("/deleteEvent/:id", eventController.deleteEvent);

router.use("/subevent", subEventRoute);

export default router;
