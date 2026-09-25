const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an item title/name'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    type: {
      type: String,
      required: [true, 'Please specify if item is Lost or Found'],
      enum: {
        values: ['Lost', 'Found'],
        message: 'Type must be either Lost or Found',
      },
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Electronics',
        'ID & Cards',
        'Books & Stationery',
        'Keys',
        'Clothing & Accessories',
        'Bags & Wallets',
        'Bottles & Containers',
        'Other',
      ],
    },
    location: {
      type: String,
      required: [true, 'Please provide the campus location where lost or found'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Please provide the approximate date'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a detailed description of the item'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    contact: {
      type: String,
      required: [true, 'Please provide contact information (Phone / Email / WhatsApp)'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Recovered'],
      default: 'Active',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add text indexing for search functionality
ItemSchema.index({ title: 'text', description: 'text', location: 'text', category: 'text' });

module.exports = mongoose.model('Item', ItemSchema);
