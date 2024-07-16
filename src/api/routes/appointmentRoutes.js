import express from 'express';
import {
  bookAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  acceptAppointment,
  rescheduleAppointment,
  cancelAppointment,
  getDepartments,
  getDoctorsByDepartment
} from '../controllers/appointmentController.js';
import { protect } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post('/book', protect, bookAppointment);
router.get('/', protect, getAppointments);
router.get('/:id', protect, getAppointmentById);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, deleteAppointment);
router.put('/:id/accept', protect, acceptAppointment);
router.put('/:id/reschedule', protect, rescheduleAppointment);
router.put('/:id/cancel', protect, cancelAppointment);
router.get('/departments', getDepartments);
router.get('/doctors/:departmentId', getDoctorsByDepartment);

export default router;
