import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { toggleFavorite } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/toggle-favorite/:id", protectRoute, toggleFavorite);

export default router;