import Doctor from '../models/Doctor.js';
import Department from '../models/Department.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Create a new doctor
const createDoctor = async (req, res) => {
  const { username, email, password, specialization, departmentId } = req.body;

  try {
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }
  
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = new Doctor({
      username,
      email,
      password: hashedPassword,
      specialization,
      department: departmentId,
      role: 'doctor',
    });

    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('department');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('department');
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a doctor
const updateDoctor = async (req, res) => {
  const { username, email, password, specialization, departmentId } = req.body;

  try {
    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
      doctor.username = username || doctor.username;
      doctor.email = email || doctor.email;
      doctor.password = password || doctor.password;
      doctor.specialization = specialization || doctor.specialization;

      if (departmentId) {
        const department = await Department.findById(departmentId);
        if (!department) {
          return res.status(404).json({ message: 'Department not found' });
        }
        doctor.department = departmentId;
      }

      const updatedDoctor = await doctor.save();
      res.json(updatedDoctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
      await doctor.remove();
      res.json({ message: 'Doctor removed' });
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
