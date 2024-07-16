import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  fullname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  message: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rescheduled', 'canceled'],
    default: 'pending',
  },
  rescheduled: {
    date: { type: Date },
    time: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
