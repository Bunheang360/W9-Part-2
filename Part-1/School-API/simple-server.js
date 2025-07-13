import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Test routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'School API Server is running!',
    timestamp: new Date(),
    environment: {
      port: PORT,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST
    }
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API endpoints are working!',
    routes: [
      'GET /',
      'GET /api/test',
      'POST /api/auth/login',
      'POST /api/auth/register'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Test API: http://localhost:${PORT}/api/test`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
