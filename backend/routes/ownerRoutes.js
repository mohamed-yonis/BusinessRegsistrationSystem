import express from "express";
import {
  getAllOwners,
  createOwner,
  updateOwner,
  deleteOwner,
  upload,
} from "../controllers/ownerController.js";

const router = express.Router();

router.get("/", getAllOwners);
router.post("/", upload.single("image"), createOwner);
router.put("/:id", upload.single("image"), updateOwner);
router.delete("/:id", deleteOwner);

export default router;
