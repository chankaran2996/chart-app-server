import User from "../Models/userModel.js";
import generateToken from "../Utils/generateToken.js";


export const registerUser = async (req, res) => {
  try {
    const { email, password , fullName } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await User.create({ email, password, fullName });
    const token = generateToken(newUser._id, res);
    res.status(201).json({ message: "User registered successfully" ,
      user: { id: newUser._id, email: newUser.email, fullName: newUser.fullName },
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, res);
    res.status(200).json({
      message: "User logged in successfully",
      user: { id: user._id, email: user.email, fullName: user.fullName },
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    sameSite: 'strict',
  });
  res.status(200).json({ message: "User logged out successfully" });
};