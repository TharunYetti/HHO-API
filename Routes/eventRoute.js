import express from "express";
const router = express.Router();
import { createEvent,updateEvent,deleteEvent } from "../Controllers/eventController.js";
import { middleware } from "../middlware.js";
import { eventModel } from "../models/EventModel.js";

router.post("/createEvent", createEvent);

router.put("/editEvent/:id",updateEvent );

router.delete("/deleteEvent/:id",deleteEvent );

export default router;
