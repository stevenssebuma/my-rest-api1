const Item = require('../models/item');  
const { validationResult } = require('express-validator');  

// GET all items  
exports.getItems = async (req, res) => {  
    try {  
        const items = await Item.find();  
        res.json(items);  
    } catch (error) {  
        res.status(500).json({ message: error.message });  
    }  
};  

// POST a new item  
exports.createItem = async (req, res) => {  
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {  
        return res.status(400).json({ errors: errors.array() });  
    }  

    const item = new Item({  
        name: req.body.name,  
        description: req.body.description,  
    });  

    try {  
        const savedItem = await item.save();  
        res.status(201).json(savedItem);  
    } catch (error) {  
        res.status(400).json({ message: error.message });  
    }  
};  

// PUT (Update an item)  
exports.updateItem = async (req, res) => {  
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {  
        return res.status(400).json({ errors: errors.array() });  
    }  

    try {  
        const { id } = req.params;  
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });  
        if (!updatedItem) return res.status(404).send('Item not found');  
        res.json(updatedItem);  
    } catch (error) {  
        res.status(500).json({ message: error.message });  
    }  
};  

// DELETE an item  
exports.deleteItem = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const deletedItem = await Item.findByIdAndDelete(id);  
        if (!deletedItem) return res.status(404).send('Item not found');  
        res.json({ message: 'Item deleted' });  
    } catch (error) {  
        res.status(500).json({ message: error.message });  
    }  
};