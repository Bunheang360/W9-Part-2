import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Test if basic dependencies are working
console.log('Testing dependencies...');

dotenv.config();
console.log('Environment loaded');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!', 
    timestamp: new Date(),
    env: {
      port: process.env.PORT,
      dbHost: process.env.DB_HOST,
      dbName: process.env.DB_NAME,
      jwtSecret: process.env.JWT_SECRET ? 'SET' : 'NOT SET'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/test`);
});
