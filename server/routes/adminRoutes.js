import express from "express";
import { getAdminStats } from "../controllers/adminControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/stats", auth, getAdminStats);

export default router;
