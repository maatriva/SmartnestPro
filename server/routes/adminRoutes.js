import express from "express";
import { getAdminStats, sendAdminAlert } from "../controllers/adminControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/stats", auth, getAdminStats);
router.post("/send-alert", auth, sendAdminAlert);

export default router;
