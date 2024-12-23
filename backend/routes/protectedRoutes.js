
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the dashboard", user: req.user });
});

export default router;
