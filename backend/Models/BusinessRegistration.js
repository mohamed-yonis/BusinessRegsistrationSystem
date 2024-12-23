// models/BusinessRegistration.js
import mongoose from "mongoose";

const businessRegistrationSchema = new mongoose.Schema({
  business_name: { type: String, required: true, trim: true, minlength: 3 },
  business_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessType", required: true },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  city_id: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  full_address: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  payment_status: { type: Boolean, default: false },
  status: { type: String, enum: ["Approved", "Pending", "Rejected"], default: "Pending" },
  approvedAt: { type: Date, default: null }, // Date of approval
  created_at: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const BusinessRegistration = mongoose.model("BusinessRegistration", businessRegistrationSchema);
export default BusinessRegistration;
