import express from "express";
import subEventRoute from "./subEventRoute";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "../Controllers/eventController";
import { middleware } from "../middleware/middleware"; 
import  eventModel  from "../models/EventModel";
import subEventModel from "../models/SubEventModel";

const router = express.Router();



router.post("/createEvent", createEvent);

router.put("/editEvent/:id", updateEvent);

router.delete("/deleteEvent/:id", deleteEvent);

router.use("/subevent", subEventRoute);

export default router;
