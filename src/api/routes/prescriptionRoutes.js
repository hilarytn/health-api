// src/api/routes/prescriptionRoutes.js
import express from 'express';
import { createPrescription, getPrescriptionsByPatient, getPrescriptionsByDoctor } from '../controllers/prescriptionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:id', createPrescription); //protect all
router.get('/patient/:id', getPrescriptionsByPatient);
router.get('/doctor/:id', getPrescriptionsByDoctor);

export default router;