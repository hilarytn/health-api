import User from '../models/User.js';

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

export { getAllUsers, getAllDoctors };