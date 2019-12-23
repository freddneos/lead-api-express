const express = require('express');
const app = express();

const connectDB = require('./config/db');

//connect to database
connectDB();

app.get('/' , (req,res)=> res.send('API running , Hello world!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Server started on port ${PORT}`));
