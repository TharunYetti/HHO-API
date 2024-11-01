import express from "express";
const router = express.Router();
import offUserController from "../controllers/offUserController";
import { middleware } from "../middleware/middleware";
router.get("/",middleware(["Admin","Core","Accountant"]),offUserController.getAllUsers);
router.post("/login", offUserController.login);
router.post("/newUser",offUserController.addUser);
router.get("/:id",middleware(["Admin","Core"]),offUserController.getUserData);
router.get("/profile",middleware(["Admin","Core","Accountant"]),offUserController.getUserData);
router.put("/updateUsers/:id",middleware(["Admin","Core"]),offUserController.updateUsers);
router.get("/allusers",middleware(["Admin","Core","Accountant"]),offUserController.getAllUsers);

export default router
