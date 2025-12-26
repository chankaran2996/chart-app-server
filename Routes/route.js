import express from 'express';
import { 
    loginUser,
    logoutUser,
    registerUser,
    updateUserProfile,
    updateUserProfilePic
 } from '../Controllers/authController.js';
import { protect } from '../Middleware/authMiddleware.js';


const Router = express.Router();


// GET Method route

Router.get("/check", protect, (req, res) => res.status(200).json(req.user));

// POST Method route

Router.post('/register', registerUser);

Router.post('/login', loginUser);

Router.post('/logout', logoutUser);

// PUT Method route
Router.put('/profile',protect, updateUserProfile);

Router.put('/profile-pic', protect, updateUserProfilePic);


// DELETE Method route

export default Router;