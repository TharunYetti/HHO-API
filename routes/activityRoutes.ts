import express from "express"
import { middleware } from "../middleware/middleware";
import activityController from "../controllers/activityController";
const router = express.Router();

router.post("/create",middleware(["Admin"]),activityController.createActivity);
router.get("/getAll",activityController.getAllActivities);
router.put("/update/:id",middleware(["Admin"]),activityController.updateActivity);
router.delete("/delete/:id",middleware(["Admin"]),activityController.deleteActivity);

export default router;