import express from "express";

import {
  saveProject,
  loadProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post(
  "/save",
  saveProject
);

router.get(
  "/load",
  loadProject
);

export default router;