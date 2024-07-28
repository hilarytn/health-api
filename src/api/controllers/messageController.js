// src/controllers/messageController.js
import Message from '../models/Message.js';
import User from '../models/User.js';

// Send a message
export const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  //const senderId = req.user._id;
  const senderId = req.params.id;

  try {
    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Get messages for a user
// export const getMessages = async (req, res) => {
//   //const userId = req.user._id;
//   const userId = req.params.id;
//   const receiverId = req.params.doctorId;

//   try {
//     const messages = await Message.find({
//       $or: [{ sender: userId }, { receiver: receiverId }],
//     }).populate('sender receiver');

//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get messages for a user
export const getMessages = async (req, res) => {
    const userId = req.params.id;
    const receiverId = req.params.receiverId; // Ensure this is the correct parameter
  
    try {
      const messages = await Message.find({
        $or: [
          { sender: userId, receiver: receiverId },
          { sender: receiverId, receiver: userId }
        ]
      }).populate('sender receiver');
  
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  