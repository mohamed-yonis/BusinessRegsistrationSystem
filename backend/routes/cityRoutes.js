
import express from "express";
import { getAllCities, createCity, updateCity, deleteCity } from "../controllers/cityController.js";

const router = express.Router();

router.get("/", getAllCities);
router.post("/", createCity);
router.put("/:id", updateCity);
router.delete("/:id", deleteCity);

export default router;

