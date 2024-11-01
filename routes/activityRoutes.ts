import express from "express"
import { middleware } from "../middleware/middleware";
import activityController from "../controllers/activityController";
const router = express.Router();

router.post("/create",middleware(["Admin","Core"]),activityController.createActivity);
router.get("/getAll",activityController.getAllActivities);
router.put("/update/:id",middleware(["Admin","Core"]),activityController.updateActivity);
router.delete("/delete/:id",middleware(["Admin","Core"]),activityController.deleteActivity);

export default router;