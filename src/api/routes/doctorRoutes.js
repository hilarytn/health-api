import express from 'express';
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';  // Assuming you have middleware for authentication and admin check

const router = express.Router();

router.post('/', protect, admin, createDoctor);
router.get('/', getDoctors); //protect, 
router.get('/:id', protect, getDoctorById);
router.put('/:id', protect, admin, updateDoctor);
router.delete('/:id', protect, admin, deleteDoctor);

export default router;
