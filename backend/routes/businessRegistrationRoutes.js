// routes/businessRegistrationRoutes.js
import express from "express";
import {
  getAllBusinesses,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  countBusinessesByStatus,
  approveBusiness, // Import the new function
} from "../controllers/businessRegistrationController.js";

const router = express.Router();

router.get("/", getAllBusinesses);
router.post("/", createBusiness);
router.put("/:id", updateBusiness);
router.delete("/:id", deleteBusiness);
router.get("/count-by-status", countBusinessesByStatus);
router.put("/approve/:id", approveBusiness); // New route for approving business

export default router;
