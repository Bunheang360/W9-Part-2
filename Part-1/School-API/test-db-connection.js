import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔄 Testing database connection...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('Connected to database successfully!');
    
    // Test if we can run a simple query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('Database query test passed:', rows[0]);
    
    // Show current database
    const [dbResult] = await connection.execute('SELECT DATABASE() as current_db');
    console.log('Current database:', dbResult[0].current_db);
    
    await connection.end();
    console.log('Database connection test complete!');
    
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

testConnection();
