const express = require('express');  
const { body } = require('express-validator');  
const { getItems, createItem, updateItem, deleteItem } = require('../controllers/itemController');  
const router = express.Router();  

// Validation rules  
const itemValidationRules = [  
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),  
    body('description').isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),  
];  

// Routes  
router.get('/', getItems);  
router.post('/', itemValidationRules, createItem);  
router.put('/:id', itemValidationRules, updateItem);  
router.delete('/:id', deleteItem);  

module.exports = router;