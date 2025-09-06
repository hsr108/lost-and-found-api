const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../src/models/Admin.js');

// Load env vars
dotenv.config({ path: './.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();
    await Admin.deleteMany(); // Clear existing admins

    const adminUser = {
      username: 'admin',
      password: 'password123', // We'll use this to log in
    };

    await Admin.create(adminUser);

    console.log('Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: password123');
    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};

// To run this script, you'll use the command: node utils/seeder.js
importData();