const express = require('express');  
const mongoose = require('mongoose');  
const itemRoutes = require('./routes/itemRoutes');  
require('dotenv').config();  

const app = express();  
const PORT = process.env.PORT || 5000;  

// Middleware  
app.use(express.json());  

// Connect to MongoDB  
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })  
    .then(() => console.log('MongoDB connected'))  
    .catch(err => console.log(err));  

// Routes  
app.use('/api/items', itemRoutes);  

// Start server  
app.listen(PORT, () => {  
    console.log(`Server is listening on port ${PORT}`);  
});