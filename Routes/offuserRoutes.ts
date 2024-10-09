import express from "express";
const router = express.Router();
import {offUserLogin} from "../Controllers/offUserController";

router.post("/login", offUserLogin)


export default router