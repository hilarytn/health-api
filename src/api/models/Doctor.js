import mongoose from 'mongoose';
import User from './User.js';

const doctorSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  specialization: { type: String, required: true },
});

const Doctor = User.discriminator('Doctor', doctorSchema);

export default Doctor;
