import express from 'express';
import { 
    loginUser,
    logoutUser,
    registerUser,
    updateUserProfile,
    updateUserProfilePic
 } from '../Controllers/authController.js';


const Router = express.Router();


// GET Method route



// POST Method route

Router.post('/register', registerUser);

Router.post('/login', loginUser);

Router.post('/logout', logoutUser);

// PUT Method route
Router.put('/profile', updateUserProfile);

Router.put('/profile-pic', updateUserProfilePic);


// DELETE Method route

export default Router;