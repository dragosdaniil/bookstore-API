const express = require('express');
const router = express.Router();
const {getAll, createBook, getOne, getByFilters, updateRow} = require('../controllers/queries');



router.route('/api/v1/books').get(getAll).post(createBook);
router.route('/api/v1/books/reference_number/:reference_number').get(getOne).put(updateRow);
router.route('/api/v1/books/title/:title').get(getOne).put(updateRow);
router.route('/api/v1/books/filters/').get(getByFilters);

module.exports = router;