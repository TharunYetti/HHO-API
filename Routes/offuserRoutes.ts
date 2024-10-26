import express from "express";
const router = express.Router();
import offUserController from "../Controllers/offUserController";

router.post("/login", offUserController.login);
router.get("/:id", offUserController.getUserData);

export default router