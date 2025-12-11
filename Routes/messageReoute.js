import express from 'express';
import { 
    getAllContacts, 
    getChatParameters, 
    getMessagesByUserId,
    sendMessage
} from '../Controllers/messageController.js';
import { protect } from '../Middleware/authMiddleware.js';

const MessageRoute = express.Router();


// GET Methods
MessageRoute.get('/contacts',protect , getAllContacts);

MessageRoute.get('/chat', protect, getChatParameters);

MessageRoute.get('/:id',protect , getMessagesByUserId);

// POST Methods
MessageRoute.post('/send/:id', protect, sendMessage);

// PUT Methods


// DELETE Methods



export default MessageRoute;