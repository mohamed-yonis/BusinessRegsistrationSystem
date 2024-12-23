// models/Ministry.js
import mongoose from 'mongoose';

const MinistrySchema = new mongoose.Schema({
  ministryName: {
    type: String,
    required: true,
  },
  signatureUrl: {
    type: String,
    required: true,
  },
});

const Ministry = mongoose.model('Ministry', MinistrySchema);
export default Ministry;
