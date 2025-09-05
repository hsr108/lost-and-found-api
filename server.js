// Import required packages
require('dotenv').config(); // Loads environment variables from a .env file
const express = require('express');
const connectDB = require('./src/db');

// Connect to the database before anything else
connectDB();

// Initialize the express app
const app = express();

// Define the port
// It will use the PORT from the .env file, or default to 3000
const PORT = process.env.PORT || 3000;

// A simple test route to make sure the server is working
app.get('/', (req, res) => {
  res.send('Welcome to the Lost & Found API!');
});

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

