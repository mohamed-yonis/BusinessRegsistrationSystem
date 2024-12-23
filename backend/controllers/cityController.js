
import City from "../models/City.js";

// Get all cities
export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cities", error });
  }
};

// Create a new city
export const createCity = async (req, res) => {
  try {
    const { name } = req.body;
    const newCity = new City({ name });
    await newCity.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ message: "Error creating city", error });
  }
};

// Update a city
export const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCity = await City.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(updatedCity);
  } catch (error) {
    res.status(500).json({ message: "Error updating city", error });
  }
};

// Delete a city
export const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting city", error });
  }
};
