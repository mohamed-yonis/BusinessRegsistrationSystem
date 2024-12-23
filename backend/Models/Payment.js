import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: 'Business Registration Fee',
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
