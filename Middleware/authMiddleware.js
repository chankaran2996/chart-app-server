import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    console.log("Cookies received:", req);

    // 1️⃣ Check Cookie token
    if (req.cookies?.token) {
      token = req.cookies.token;
      console.log("Token found in cookies:", token);
    }

    // 2️⃣ Check Authorization Header (Swagger / Postman)
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token found in Authorization header:", token);
    }

    // 3️⃣ If no token found
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    // 4️⃣ Verify token
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment!");
      return res.status(500).json({ message: "Server error: Missing JWT Secret" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // 5️⃣ Find user & remove password
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
};