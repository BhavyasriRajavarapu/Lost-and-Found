const Item = require('../models/Item');

// @desc    Get all items with search & filter options
// @route   GET /api/items
// @access  Public
exports.getItems = async (req, res) => {
  try {
    const { type, category, location, status, search, limit } = req.query;

    let query = {};

    // Filter by type (Lost / Found)
    if (type && ['Lost', 'Found'].includes(type)) {
      query.type = type;
    }

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Filter by location
    if (location && location !== 'All') {
      query.location = { $regex: location, $options: 'i' };
    }

    // Filter by status (Active / Recovered)
    if (status && status !== 'All') {
      query.status = status;
    }

    // Keyword Search (in title, description, location)
    if (search && search.trim() !== '') {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { location: { $regex: search.trim(), $options: 'i' } },
        { category: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    let itemsQuery = Item.find(query).sort({ createdAt: -1 });

    if (limit) {
      itemsQuery = itemsQuery.limit(parseInt(limit, 10));
    }

    const items = await itemsQuery;

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching items',
      error: error.message,
    });
  }
};

// @desc    Get statistics for dashboard/home page
// @route   GET /api/items/stats
// @access  Public
exports.getItemStats = async (req, res) => {
  try {
    const totalLost = await Item.countDocuments({ type: 'Lost' });
    const totalFound = await Item.countDocuments({ type: 'Found' });
    const itemsRecovered = await Item.countDocuments({ status: 'Recovered' });
    const totalItems = await Item.countDocuments();

    // Group items by category
    const categoryStats = await Item.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalLost,
        totalFound,
        itemsRecovered,
        totalItems,
        categoryStats,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while calculating statistics',
      error: error.message,
    });
  }
};

// @desc    Get single item by ID
// @route   GET /api/items/:id
// @access  Public
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found with given ID',
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Item not found (Invalid ID format)',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving item',
      error: error.message,
    });
  }
};

// @desc    Create new item (Lost or Found)
// @route   POST /api/items
// @access  Public
exports.createItem = async (req, res) => {
  try {
    const { title, type, category, location, date, description, contact, status } = req.body;

    // Basic Validation
    if (!title || !type || !category || !location || !date || !description || !contact) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, type, category, location, date, description, contact',
      });
    }

    const newItem = await Item.create({
      title,
      type,
      category,
      location,
      date,
      description,
      contact,
      status: status || 'Active',
    });

    res.status(201).json({
      success: true,
      message: `${type} item successfully reported!`,
      data: newItem,
    });
  } catch (error) {
    console.error('Error creating item:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while creating item',
      error: error.message,
    });
  }
};

// @desc    Update item / Mark as recovered
// @route   PUT /api/items/:id
// @access  Public
exports.updateItem = async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: item,
    });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating item',
      error: error.message,
    });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Public
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Item removed successfully',
      data: {},
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting item',
      error: error.message,
    });
  }
};
