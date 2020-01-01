const express = require('express');
const app = express();
const multiparty = require('connect-multiparty');
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv/config');


const connectDB = require('./config/database');
// const auth = require('./src/routes/api/auth');
const campaign = require('./src/routes/api/campaign');
// const order = require('./src/routes/api/order');
const product = require('./src/routes/api/product');
const upload = require('./src/routes/api/upload');

// const shopcart = require('./src/routes/api/shopcart');
const category = require('./src/routes/api/category');
const user = require('./src/routes/api/user');
const contact = require('./src/routes/api/contact');



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use('/files', express.static(path.resolve(__dirname, "uploads")));
    app.use('/apidocs', express.static(path.resolve(__dirname, "docs")));

} else {
    app.use('/files', express.static('uploads'));
    app.use('/apidocs', express.static("docs"));

}

//connect to database
connectDB();

app.get('/', (req, res) => res.send('API running , Hello world!'));
app.use('/users', user);
app.use('/categories', category);
app.use('/contacts' , contact);
app.use('/products', product);
app.use('/campaigns' , campaign);
// app.use('/order' , order);
// app.use('/shopcart' , shopcart);
// app.use('/auth' , auth);
app.use('/upload', upload)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
