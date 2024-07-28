import express from 'express';
import { getAllDoctors, getAllUsers, getPatientsByDoctor } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/doctor-all', getAllDoctors)
router.get('/patient-all', getPatientsByDoctor)

export default router;
