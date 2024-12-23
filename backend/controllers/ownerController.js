import Owner from "../Models/Owner.js";
import multer from "multer";
import path from "path";

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames
  },
});

export const upload = multer({ storage });

// Get all owners
export const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: "Error fetching owners", error });
  }
};

// Add a new owner
export const createOwner = async (req, res) => {
  const { full_name, phone, email, passport_number } = req.body;
  const image = req.file ? req.file.path : "";

  try {
    console.log("request to create",full_name, phone, email, passport_number, image);
    const newOwner = new Owner({ full_name, phone, email, passport_number, image });
    await newOwner.save();
    res.status(201).json({ message: "Owner created successfully", owner: newOwner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating owner", error });
  }
};

// Update an owner
export const updateOwner = async (req, res) => {
  const { id } = req.params;
  const { full_name, phone, email, passport_number } = req.body;
  const image = req.file ? req.file.path : "";

  try {
    const updatedOwner = await Owner.findByIdAndUpdate(
      id,
      { full_name, phone, email, passport_number, image },
      { new: true }
    );
    res.status(200).json({ message: "Owner updated successfully", owner: updatedOwner });
  } catch (error) {
    res.status(500).json({ message: "Error updating owner", error });
  }
};

// Delete an owner
export const deleteOwner = async (req, res) => {
  const { id } = req.params;

  try {
    await Owner.findByIdAndDelete(id);
    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting owner", error });
  }
};
