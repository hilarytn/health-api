// src/routes/messageRoutes.js
import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:id/', protect, sendMessage);
router.get('/:id/:receiverId', protect, getMessages);

export default router;