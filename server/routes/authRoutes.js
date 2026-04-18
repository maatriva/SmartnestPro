import express from "express";
import { signup, login, getMe , googleLogin } from "../controllers/authControllers.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.post("/auth/google", googleLogin);

export default router;