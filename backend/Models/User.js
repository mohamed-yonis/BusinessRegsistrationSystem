
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  user_name: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  created_at: { type: Date, default: Date.now },
});

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hash password
  next();
});




// Method to check password validity
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;





