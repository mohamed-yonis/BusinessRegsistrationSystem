import BusinessType from "../models/BusinessType.js";

// Get all business types
export const getAllBusinessTypes = async (req, res) => {
  try {
    const businessTypes = await BusinessType.find();
    res.status(200).json(businessTypes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching business types", error });
  }
};

// Create a new business type
export const createBusinessType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newBusinessType = new BusinessType({ name, description });
    await newBusinessType.save();
    res.status(201).json({ message: "Business type created successfully", businessType: newBusinessType });
  } catch (error) {
    res.status(500).json({ message: "Error creating business type", error });
  }
};

// Update a business type
export const updateBusinessType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedBusinessType = await BusinessType.findByIdAndUpdate(id, { name, description }, { new: true });
    res.status(200).json({ message: "Business type updated successfully", businessType: updatedBusinessType });
  } catch (error) {
    res.status(500).json({ message: "Error updating business type", error });
  }
};

// Delete a business type
export const deleteBusinessType = async (req, res) => {
  try {
    const { id } = req.params;
    await BusinessType.findByIdAndDelete(id);
    res.status(200).json({ message: "Business type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting business type", error });
  }
};
