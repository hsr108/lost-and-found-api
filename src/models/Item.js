const mongoose = require('mongoose'); // Import Mongoose library

// Define the schema for the Item collection
const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the item.'],
    trim: true // Removes whitespace from both ends of a string
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  category: {
    type: String,
    required: [true, 'Please specify a category (e.g., Electronics, Books, ID).'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Lost', 'Found'], // The value must be either 'Lost' or 'Found'
  },
  location: {
    type: String,
    required: [true, 'Please provide the location where the item was lost or found.'],
  },
  date: {
    type: Date,
    default: Date.now // Sets the default value to the current date and time
  },
  isClaimed: {
    type: Boolean,
    default: false // Defaults to not claimed
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the Item model
// Mongoose will create a collection named 'items' (plural and lowercase)
module.exports = mongoose.model('Item', ItemSchema);
