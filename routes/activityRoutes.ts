import express from "express"
import activityController from "../controllers/activityController";
const router = express.Router();

router.post("/create",activityController.createActivity);
router.get("/getAll",activityController.getAllActivities);
router.put("/update/:id",activityController.updateActivity);
router.delete("/delete/:id",activityController.deleteActivity);

export default router;