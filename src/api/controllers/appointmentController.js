import Appointment from '../models/Appointment.js';
import Department from '../models/Department.js';
import Doctor from '../models/Doctor.js';

// Book an appointment
const bookAppointment = async (req, res) => {
  const { departmentId, doctorId, date, time, fullname, phoneNumber, message } = req.body;

  const appointment = new Appointment({
    department: departmentId,
    doctor: doctorId,
    date,
    time,
    fullname,
    phoneNumber,
    message,
    user: req.user._id,
  });

  try {
    const savedAppointment = await appointment.save();
    console.log(savedAppointment);
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all appointments for the logged-in user
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate('department')
      .populate('doctor');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('department')
      .populate('doctor');
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  const { departmentId, doctorId, date, time, fullname, phoneNumber, message } = req.body;

  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      appointment.department = departmentId || appointment.department;
      appointment.doctor = doctorId || appointment.doctor;
      appointment.date = date || appointment.date;
      appointment.time = time || appointment.time;
      appointment.fullname = fullname || appointment.fullname;
      appointment.phoneNumber = phoneNumber || appointment.phoneNumber;
      appointment.message = message || appointment.message;

      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      await appointment.remove();
      res.json({ message: 'Appointment removed' });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept an appointment
const acceptAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      appointment.status = 'accepted';
      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reschedule an appointment
const rescheduleAppointment = async (req, res) => {
  const { date, time } = req.body;

  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      appointment.status = 'rescheduled';
      appointment.rescheduled = { date, time };
      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      appointment.status = 'canceled';
      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDoctorsByDepartment = async (req, res) => {
  const { departmentId } = req.params;

  try {
    const doctors = await Doctor.find({ department: departmentId });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
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
};
