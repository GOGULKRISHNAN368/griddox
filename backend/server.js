const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' }); 

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const PORT = 3001;

// MongoDB Connection
let MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI && (!MONGODB_URI.includes('.net/') || MONGODB_URI.endsWith('.net/'))) {
    MONGODB_URI = MONGODB_URI.replace('.net/?', '.net/gridox_db?');
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas: gridox_db'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Schema
const BannerSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  link: String,
  createdAt: { type: Date, default: Date.now }
});

const Banner = mongoose.model('Banner', BannerSchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  discount: String,
  isNew: { type: Boolean, default: false },
  image: String, // Store Base64 or URL
  category: { type: String, default: 'new-arrivals' },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);

// API Routes
app.post('/api/add-banner', async (req, res) => {
  try {
    const { title, imageUrl, link } = req.body;
    console.log(`Received request to add banner: ${title}`);
    
    const newBanner = new Banner({ title, imageUrl, link });
    const savedBanner = await newBanner.save();
    
    console.log(`Successfully saved banner to collection 'banners'. ID: ${savedBanner._id}`);
    res.status(201).send({ message: 'Banner added successfully', data: savedBanner });
  } catch (error) {
    console.error('Error adding banner:', error);
    res.status(500).send({ 
       message: error.message.includes('authentication failed') 
         ? 'Database Authentication Failed. Please check your password in .env' 
         : 'Error adding banner to database',
       error: error.message 
    });
  }
});

app.delete('/api/banners/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Attempting to remove banner with ID: ${id}`);
    const deleted = await Banner.findByIdAndDelete(id);
    if (deleted) {
      console.log(`Successfully removed banner: ${deleted.title}`);
      res.status(200).send({ message: 'Banner removed successfully' });
    } else {
      console.log(`No banner found with ID: ${id}`);
      res.status(404).send({ message: 'Banner not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error removing banner', error: error.message });
  }
});

app.get('/api/banners', async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).send(banners);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching banners', error: error.message });
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching products', error: error.message });
  }
});

app.post('/api/add-product', async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    const saved = await newProduct.save();
    res.status(201).send({ message: 'Product added successfully', data: saved });
  } catch (error) {
    res.status(500).send({ message: 'Error adding product', error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).send({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error removing product', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
