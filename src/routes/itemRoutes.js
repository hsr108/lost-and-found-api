const express = require('express');
const router = express.Router();
const {
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('../controllers/itemController.js');
const { protect } = require('../middleware/authMiddleware.js');

// --- PUBLIC ROUTES ---
// Anyone can get a list of items
router.get('/', getAllItems);

// --- PROTECTED ROUTES ---
// Only an admin with a valid token can create, update, or delete items.
// The 'protect' middleware will run before the controller function for these routes.
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;

