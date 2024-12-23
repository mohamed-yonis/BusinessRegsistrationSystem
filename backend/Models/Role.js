import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  role_name: { type: String, required: true, enum: ["Admin", "User"] },
  created_at: { type: Date, default: Date.now },
});

const Role = mongoose.model("Role", roleSchema);

// Function to initialize roles if they don't exist
// const initializeRoles = async () => {
//   try {
//     const existingRoles = await Role.find({});
//     if (existingRoles.length === 0) {
      // Roles don't exist, so create them
//       await Role.create([
//         { role_name: "Admin" },
//         { role_name: "User" },
//       ]);
//       console.log("Roles seeded: Admin, User");
//     }
//   } catch (error) {
//     console.error("Error seeding roles:", error);
//   }
// };

// Initialize roles when the model is imported
// initializeRoles();

export default Role;
