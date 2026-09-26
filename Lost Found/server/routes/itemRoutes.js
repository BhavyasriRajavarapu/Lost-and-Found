const express = require('express');
const router = express.Router();
const {
  getItems,
  getItemStats,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

const { optionalProtect } = require('../middleware/authMiddleware');

// Stats route must be placed before /:id route
router.get('/stats', getItemStats);

router.route('/')
  .get(getItems)
  .post(optionalProtect, createItem);

router.route('/:id')
  .get(getItemById)
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;
