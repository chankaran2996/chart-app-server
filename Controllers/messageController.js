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