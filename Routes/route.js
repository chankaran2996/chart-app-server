import express from 'express';
import { 
    registerUser
 } from '../Controllers/authController.js';


const Router = express.Router();


// GET Method route



// POST Method route

Router.post('/register', registerUser);

// PUT Method route


// DELETE Method route

export default Router;