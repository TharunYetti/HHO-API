import express from "express";
import { getSubEvents,updateSubEvent,deleteSubEvent } from "../Controllers/subEventController";
// import {createSubEvent} from "../Controllers/subEventController"
const router = express.Router();
router.get("/:id", getSubEvents)
// router.post("/create", createSubEvent);

router.put("/update/:id",updateSubEvent );

router.delete("/delete/:id", deleteSubEvent);

export default router;
