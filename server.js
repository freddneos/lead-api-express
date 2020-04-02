require('appmetrics-dash').attach()
require('dotenv/config');

const express = require('express');
const app = express();
const multiparty = require('connect-multiparty');
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const connectDB = require('./config/database');
const campaign = require('./src/routes/api/campaign');
const product = require('./src/routes/api/product');
const upload = require('./src/routes/api/upload');
const category = require('./src/routes/api/category');
const user = require('./src/routes/api/user');
const contact = require('./src/routes/api/contact');
const webhook = require('./src/routes/api/webhook');

// const shopcart = require('./src/routes/api/shopcart');
// const order = require('./src/routes/api/order');
// const auth = require('./src/routes/api/auth');

app.use(cors({
    exposedHeaders: ['Content-range']
}));

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use('/files', express.static(path.resolve(__dirname, "uploads")));
    app.use('/apidocs', express.static(path.resolve(__dirname, "docs")));
    app.use('/', express.static(path.resolve(__dirname, "website")));

} else {
    app.use('/files', express.static('uploads'));
    app.use('/apidocs', express.static("docs"));
    app.use('/', express.static("website"));
}

//connect to database
connectDB();

app.get('/api/v1/', (req, res) => res.send('API running , Hello world!'));
app.use('/api/v1/users', user);
app.use('/api/v1/categories', category);
app.use('/api/v1/contacts', contact);
app.use('/api/v1/products', product);
app.use('/api/v1/campaigns', campaign);
app.use('/api/v1/upload', upload)
app.use('/api/v1/webhook', webhook)
// app.use('api/v1/order' , order);
// app.use('api/v1/shopcart' , shopcart);
// app.use('api/v1/auth' , auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
