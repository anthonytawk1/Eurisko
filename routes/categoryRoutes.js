const path = require('path');

const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/add-category', categoryController.addCategory);
router.post('/update-category', categoryController.addCategory);
router.get('/category', categoryController.getCategories);
router.get('/category-one', categoryController.getCategoryById);
router.delete('/category', categoryController.deleteCategoryById);

module.exports = router;
