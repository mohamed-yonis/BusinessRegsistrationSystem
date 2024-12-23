// routes/ministryRoutes.js
import express from 'express';
import multer from 'multer';
import { addMinistry, updateMinistry, getMinistry } from '../controllers/ministryController.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/add', upload.single('signature'), addMinistry);
router.put('/update/:id', upload.single('signature'), updateMinistry);
router.get('/info', getMinistry);

export default router;
