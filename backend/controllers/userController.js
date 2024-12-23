


import User from "../Models/User.js";
import bcrypt from "bcrypt";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role_id", "role_name");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { full_name, user_name, password, role_id } = req.body;
    const newUser = new User({ full_name, user_name, password, role_id });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, user_name, password, role_id } = req.body;
    const updateData = { full_name, user_name, role_id };

    // Hash the password if updated
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
