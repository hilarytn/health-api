// src/api/controllers/prescriptionController.js
import Prescription from '../models/Prescription.js';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

const createPrescription = async (req, res) => {
  const { appointmentId, medication, dosage, instructions } = req.body;
  //const doctorId = req.user._id;
  const doctorId = req.params.id;

  try {
    const appointment = await Appointment.findById(appointmentId).populate('user');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const prescription = new Prescription({
      appointment: appointmentId,
      doctor: doctorId,
      patient: appointment.user._id,
      medication,
      dosage,
      instructions,
    });

    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrescriptionsByPatient = async (req, res) => {
    //const patientId = req.user._id;
    const patientId = req.params.id
  
    try {
      const prescriptions = await Prescription.find({ patient: patientId })
        .populate('doctor')
        .populate('appointment');
      res.status(200).json(prescriptions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const getPrescriptionsByDoctor = async (req, res) => {
    //const doctorId = req.user._id;
    const doctorId = req.params.id
  
    try {
      const prescriptions = await Prescription.find({ doctor: doctorId })
        .populate('patient')
        .populate('appointment');
      res.status(200).json(prescriptions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


export {createPrescription, getPrescriptionsByPatient, getPrescriptionsByDoctor}