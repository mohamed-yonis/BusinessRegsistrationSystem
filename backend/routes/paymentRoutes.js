// routes/paymentRoutes.js
import express from 'express';
import { getPayment, addPayment, updatePayment } from '../controllers/paymentController.js';

const router = express.Router();

router.get('/', getPayment);            // Fetch current payment
router.post('/add', addPayment);         // Add new payment
router.put('/update/:id', updatePayment); // Update payment by ID

export default router;
