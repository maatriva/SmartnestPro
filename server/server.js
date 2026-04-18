import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT

import express from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import preorderRoutes from "./routes/preOrderRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


const app = express();
app.use(express.json());

app.use(compression());
app.use(cors());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});


// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/preorders", preorderRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.listen(PORT, () => console.log(`https://localhost:${PORT}`));