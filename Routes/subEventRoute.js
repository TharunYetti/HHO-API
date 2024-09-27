import express from "express";
import { getSubEvents,createSubEvent,updateSubEvent,deleteSubEvent } from "../Controllers/subEventController.js";
const router = express.Router();
router.get("/:id", getSubEvents)
router.post("/create", createSubEvent);

router.put("/update/:id",updateSubEvent );

router.delete("/delete/:id", deleteSubEvent);

export default router;
