import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const createDatabase = async () => {
  try {
    console.log('Creating database...');
    
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });

    // Create the database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    console.log(`Database '${process.env.DB_NAME}' created successfully!`);
    
    // Close connection
    await connection.end();
    
    console.log('Database setup complete!');
    console.log('You can now start your server with: npm run dev');
    
  } catch (error) {
    console.error('Error creating database:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n Solution: Make sure MySQL server is running');
      console.log('   - If using XAMPP: Start Apache and MySQL');
      console.log('   - If using WAMP: Start all services');
      console.log('   - If using standalone MySQL: Start MySQL service');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n Solution: Check your database credentials in .env file');
      console.log('   - DB_USER (currently: ' + process.env.DB_USER + ')');
      console.log('   - DB_PASSWORD (currently: ' + process.env.DB_PASSWORD + ')');
    }
  }
};

createDatabase();
