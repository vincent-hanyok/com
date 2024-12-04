// backend/app.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import characterRouter from './routes/characters.js';

const app = express();

// Simplified CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ttrpg', { useNewUrlParser: true, useUnifiedTopology: true });

// Use character routes
app.use('/characters', characterRouter);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;