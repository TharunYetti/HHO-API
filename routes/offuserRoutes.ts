import express from "express";
const router = express.Router();
import offUserController from "../controllers/offUserController";

router.post("/login", offUserController.login);
router.get("/:id", offUserController.getUserData);

export default router