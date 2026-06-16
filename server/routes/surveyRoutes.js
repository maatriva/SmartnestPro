import express from "express";
import { createSurvey, getSurveys } from "../controllers/surveyControllers.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createSurvey);
router.get("/", getSurveys);

export default router;
