const Item = require('../models/Item.js');

// @desc    Create a new lost or found item
// @route   POST /api/items
// @access  Public (for now)
const createItem = async (req, res) => {
  try {
    // We get the item details from the request's body
    const { title, description, category, status, location, dateFoundOrLost } = req.body;

    // Create a new item instance using our Mongoose model
    const newItem = new Item({
      title,
      description,
      category,
      status,
      location,
      date: dateFoundOrLost, // Map the incoming field to our schema's 'date' field
    });

    // Save the new item to the database
    const savedItem = await newItem.save();

    // Send back a success response with the saved item's data
    res.status(201).json(savedItem);
  } catch (error) {
    // If anything goes wrong, send back an error response
    console.error(error);
    res.status(500).json({ message: 'Server error while creating item.' });
  }
};

// @desc    Get all lost and found items
// @route   GET /api/items
// @access  Public
const getAllItems = async (req, res) => {
  try {
    const keyword = {};
    if (req.query.status) {
      keyword.status = req.query.status;
    }
    if (req.query.category) {
      keyword.category = req.query.category;
    }
    if (req.query.search) {
      keyword.title = {
        $regex: req.query.search,
        $options: 'i',
      };
    }
    const items = await Item.find(keyword);
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching items.' });
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (item) {
      // Update fields from the request body
      item.title = req.body.title || item.title;
      item.description = req.body.description || item.description;
      item.category = req.body.category || item.category;
      item.status = req.body.status || item.status;
      item.location = req.body.location || item.location;
      item.isClaimed = req.body.isClaimed !== undefined ? req.body.isClaimed : item.isClaimed;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (item) {
      await item.deleteOne(); // Mongoose v6+ uses deleteOne()
      res.json({ message: 'Item removed' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// We export the functions to be used in our routes file
module.exports = {
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
};
