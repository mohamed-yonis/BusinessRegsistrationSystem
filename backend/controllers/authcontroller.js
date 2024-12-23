// controllers/authController.js
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { user_name, password } = req.body;
  try {
    const user = await User.findOne({ user_name }).populate("role_id", "role_name");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    // Add name and role to the token payload
    const token = jwt.sign(
      { id: user._id, name: user.full_name, role: user.role_id.role_name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
