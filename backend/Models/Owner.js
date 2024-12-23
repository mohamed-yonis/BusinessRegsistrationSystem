import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  passport_number: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 9,
  },
  image: {
    type: String, // Store the image path or URL
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;
