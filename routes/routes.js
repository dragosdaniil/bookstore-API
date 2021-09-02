const express = require('express');
const router = express.Router();
const {getAll, createBook, getOne, getByFilters, updateRow} = require('../controllers/queries');



router.route('/api/v1/books').get(getAll).post(createBook);
// Update book by reference_number
router.route('/api/v1/books/reference_number/:reference_number').get(getOne).put(updateRow);
// Try to add price filter in the future
router.route('/api/v1/books/filters/').get(getByFilters);

module.exports = router;