import express from "express";
import subEventRoute from "./subEventRoute.js";
const router = express.Router();
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "../Controllers/eventController.js";
import { middleware } from "../middlware.js";
import { eventModel } from "../models/EventModel.js";
import subEventModel from "../models/SubEventModel.js";
router.post("/createEvent", createEvent);

router.put("/editEvent/:id", updateEvent);

router.delete("/deleteEvent/:id", deleteEvent);

router.use("/subevent",subEventRoute );

export default router;
