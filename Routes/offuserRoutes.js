import express from "express";
const router = express.Router();
import {offUserLogin} from "../Controllers/offUserController.js";

router.post("/login", offUserLogin)


export default router