import express from "express";
import { createPreorder } from "../controllers/preOrderControllers.js";

const router = express.Router();

router.post("/", createPreorder);

export default router;