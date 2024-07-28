import User from '../models/User.js';
import Appointment from '../models/Appointment.js';

// Fetch all users with role 'user'
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// export const getPatientsByDoctor = async (req, res) => {
//   const doctorId = req.params.doctorId;

//   try {
//     const appointments = await Appointment.find({ doctor: doctorId }).populate('user');
//     const patients = appointments.map(appointment => appointment.user);
//     res.status(200).json(patients);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getPatientsByDoctor = async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    // Find appointments and populate patient data
    const appointments = await Appointment.find({ doctor: doctorId }).populate('user');

    // Check if appointments are retrieved correctly
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this doctor.' });
    }

    // Extract patient IDs to ensure uniqueness
    const patientMap = new Map();

    appointments.forEach(appointment => {
      const patient = appointment.user;
      if (patient && !patientMap.has(patient._id.toString())) {
        patientMap.set(patient._id.toString(), patient);
      }
    });

    // Convert the Map values to an array of unique patients
    const uniquePatients = Array.from(patientMap.values());

    res.status(200).json(uniquePatients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { getAllUsers, getAllDoctors };