import express from 'express';
import { 
    getAllContacts 
} from '../Controllers/messageController.js';

const MessageRoute = express.Router();


// GET Methods
MessageRoute.get('/contacts', getAllContacts);

// MessageRoute.get('/messages',);

// MessageRoute.get(':id',);

// POST Methods


// PUT Methods


// DELETE Methods



export default MessageRoute;