import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import connectDB from './Database/connection.js';
import Router from './Routes/route.js';
import MessageRoute from './Routes/messageReoute.js';
import { protect } from './Middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Swagger JSON
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./Swagger/swagger.json"), "utf-8")
);

// Mount Swagger UI at /api/v1/docs
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.get('/', (req, res) => {
    res.send('Welcome to the Chart-app API. Visit /api-docs for Swagger UI.');
});

// Sample route
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is healthy' });
});

app.use("/api/v1/auth", Router);

app.use("/api/v1/messages", protect, MessageRoute);

// Start the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});