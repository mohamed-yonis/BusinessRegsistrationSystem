import express from "express";
import {
  getAllBusinessTypes,
  createBusinessType,
  updateBusinessType,
  deleteBusinessType,
} from "../controllers/businessTypeController.js";

const router = express.Router();

router.get("/", getAllBusinessTypes);
router.post("/", createBusinessType);
router.put("/:id", updateBusinessType);
router.delete("/:id", deleteBusinessType);

export default router;
