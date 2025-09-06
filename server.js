// Import required packages
require('dotenv').config();
const express = require('express');
const connectDB = require('./src/db.js');
const itemRoutes = require('./src/routes/itemRoutes.js'); // <-- 1. MAKE SURE THIS IMPORT IS HERE
const authRoutes = require('./src/routes/authRoutes.js'); // <-- 1. IMPORT YOUR AUTH ROUTES


// Connect to the database
connectDB();

// Initialize the express app
const app = express();

// Init Middleware
app.use(express.json()); // <-- 2. MAKE SURE THIS MIDDLEWARE IS HERE

// A simple test route
app.get('/', (req, res) => {
  res.send('Welcome to the Lost & Found API!');
});

// Define Routes
app.use('/api/items', itemRoutes); // <-- 3. THIS IS THE MOST LIKELY MISSING LINE
app.use('/api/auth', authRoutes); // <-- 2. TELL EXPRESS TO USE YOUR AUTH ROUTES


// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});