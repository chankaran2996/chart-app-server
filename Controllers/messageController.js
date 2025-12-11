import cloudinary from "../Config/cloudnary.js";
import Message from "../Models/MessageModel.js";
import User from "../Models/userModel.js";


export const getAllContacts = async (req, res) => {
  try {
    const userId = req.user._id;
    const contacts = await User.find({ _id: { $ne: userId } }).select('fullName email profilePic');
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    
    const userId = req.user._id;
    const messages = await Message.find({ 
      $or: [
        { senderId: userId, receiverId: id },
        { senderId: id, receiverId: userId }
      ]
    }).sort({ createdAt: 1 }); // Sort by creation time ascending

    res.status(200).json({ messages }); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const {  text , image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const imgageUrl = cloudinary.uploader.upload(image, { folder: "messages" });
    const newMessage = await Message.create({ senderId, receiverId, text, imageUrl: imgageUrl.secure_url });
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  } 
};

export const getChatParameters = async (req, res) => {
    try {
        const userId = req.user._id;
        // Find all chart parameters associated with the user
        const message = await Message.find({ $or: [{ senderId: userId }, { receiverId: userId }] });

        // get all userid except the logged in user from the messages and remove duplicates also shoet userId by recent messages
        const userIds = [
            ...new Set(message.flatMap(msg => 
                [
                    msg.senderId.toString(), 
                    msg.receiverId.toString()
                ]).filter(id => id !== userId.toString()))
            ];

        // Fetch user details for the extracted userIds
        const chatParameters = await User.find({ _id: { $in: userIds } }).select('fullName email profilePic');
        res.status(200).json({ chatParameters });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
