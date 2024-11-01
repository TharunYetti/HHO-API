import express from "express";
const router = express.Router();
import offUserController from "../controllers/offUserController";
router.get("/",offUserController.getAllUsers);
router.post("/login", offUserController.login);
router.get("/:id", offUserController.getUserData);
router.put("/updateUsers/:id",offUserController.updateUsers);
router.post("/newUser",offUserController.addUser);
export default router;