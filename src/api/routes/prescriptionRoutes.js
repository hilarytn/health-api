// src/api/routes/prescriptionRoutes.js
import express from 'express';
import { createPrescription, getPrescriptionsByPatient, getPrescriptionsByDoctor } from '../controllers/prescriptionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPrescription);
router.get('/patient', protect, getPrescriptionsByPatient);
router.get('/doctor', protect, getPrescriptionsByDoctor);

export default router;