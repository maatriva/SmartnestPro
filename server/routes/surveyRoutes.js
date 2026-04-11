import express from "express";
import { createSurvey, getSurveys } from "../controllers/surveyControllers.js";

const router = express.Router();

router.post("/", createSurvey);
router.get("/", getSurveys);

export default router;
