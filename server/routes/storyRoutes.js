import express from "express";
import { createStory, getStories } from "../controllers/storyControllers.js";

const router = express.Router();

router.post("/", createStory);
router.get("/", getStories);

export default router;
