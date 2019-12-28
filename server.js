const express = require('express');
const app = express();
const multiparty = require('connect-multiparty');
const bodyParser = require('body-parser')
require('dotenv/config');


const connectDB = require('./config/database');
// const auth = require('./src/routes/api/auth');
// const campaign = require('./src/routes/api/campaign');
// const order = require('./src/routes/api/order');
const product = require('./src/routes/api/product');
const upload = require('./src/routes/api/upload');

// const shopcart = require('./src/routes/api/shopcart');
const category = require('./src/routes/api/category');
const user = require('./src/routes/api/user');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use('/', express.static(path.resolve(__dirname, "build")));
} else {
    app.use('/files', express.static('uploads'));
}

//connect to database
connectDB();

app.get('/', (req, res) => res.send('API running , Hello world!'));
app.use('/users', user);
app.use('/categories', category);
app.use('/upload', upload)
// app.use('/campaign' , campaign);
// app.use('/campaign' , campaign);
// app.use('/order' , order);
// app.use('/shopcart' , shopcart);
app.use('/products', product);
// app.use('/auth' , auth);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
