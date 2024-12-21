import express from "express";
const router = express.Router();
import offUserController from "../controllers/offUserController";
import { middleware } from "../middleware/middleware";
// router.get("/",middleware(['Admin']),offUserController.getAllUsers);
router.get("/",offUserController.getAllUsers);
router.post("/login", offUserController.login);
router.post("/newUser",middleware(["Admin"]),offUserController.addUser);
router.get("/profile",middleware(["Admin","Core","Accountant"]),offUserController.getUserData);
router.put("/updateUsers/:id",middleware(["Admin"]),offUserController.updateUsers);
router.get("/allusers",middleware(["Admin","Core","Accountant"]),offUserController.getAllUsers);
// router.get("/allusers",offUserController.getAllUsers);

router.delete("/deleteUsers/:id",middleware(["Admin"]),offUserController.deleteUser);

export default router
