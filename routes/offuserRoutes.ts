import express from "express";
const router = express.Router();
import offUserController from "../controllers/offUserController";
import { middleware } from "../middleware/middleware";
router.get("/",middleware(["Admin","Core","Accountant"]),offUserController.getAllUsers);
router.post("/login", offUserController.login);
router.get("/profile",middleware(["Admin","Core","Accountant"]),offUserController.getUserData);
router.put("/updateUsers/:id",middleware(["Admin","Core"]),offUserController.updateUsers);

export default router