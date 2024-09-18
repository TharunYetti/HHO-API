import express from "express";
const router = express.Router();
import {createEvent} from "../Controllers/eventController.js";
import { middleware } from "../middlware.js";

router.post("/createEvent", createEvent);

export default router;
