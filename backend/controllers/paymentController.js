// controllers/paymentController.js
import Payment from '../Models/Payment.js';

export const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findOne();
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payment information", error });
  }
};

export const addPayment = async (req, res) => {
  const { amount, description } = req.body;
  try {
    const payment = new Payment({ amount, description });
    await payment.save();
    res.status(201).json({ message: "Payment added successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Failed to add payment", error });
  }
};

export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, description } = req.body;
  try {
    const payment = await Payment.findByIdAndUpdate(id, { amount, description }, { new: true });
    res.status(200).json({ message: "Payment updated successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Failed to update payment", error });
  }
};
