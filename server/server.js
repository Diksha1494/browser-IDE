import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "browser-ide-api" });
});

app.use("/api/projects", projectRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
