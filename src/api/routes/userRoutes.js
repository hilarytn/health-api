import express from 'express';
import { getAllDoctors, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/doctor-all', getAllDoctors)

export default router;
