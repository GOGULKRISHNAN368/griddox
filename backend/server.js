const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 3001;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper to upload Base64 to Cloudinary
const uploadToCloudinary = async (base64Data, folder = 'gridox', resourceType = 'auto') => {
  if (!base64Data || !base64Data.startsWith('data:')) return base64Data;
  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: folder,
      resource_type: resourceType
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
};

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
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  image: String, // Main image (Base64)
  gallery: [String], // Array of 5 look images (Base64)
  sizes: [String], // Array of available sizes (e.g. S, M, L, XL)
  details: String, // Rich text or long description
  category: { type: String, default: 'new-arrivals', index: true }, // Added index for faster filtering
  createdAt: { type: Date, default: Date.now, index: true } // Added index for faster sorting
});

const Product = mongoose.model('Product', ProductSchema);

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String, // Keeping for backward compatibility
  fullImage: String,
  thumbnailImage: String,
  description: String,
  slug: String,
  createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', CategorySchema);

const ReelSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true }, // Base64 or URL
  videoType: { type: String, default: 'video/mp4' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  category: String, // Category slug
  createdAt: { type: Date, default: Date.now }
});

const Reel = mongoose.model('Reel', ReelSchema);

// API Routes
app.post('/api/add-banner', async (req, res) => {
  try {
    const { title, imageUrl, link } = req.body;
    const cloudUrl = await uploadToCloudinary(imageUrl, 'gridox_banners');
    
    const newBanner = new Banner({ title, imageUrl: cloudUrl, link });
    const savedBanner = await newBanner.save();
    
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

app.put('/api/banners/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl, link } = req.body;
    const cloudUrl = await uploadToCloudinary(imageUrl, 'gridox_banners');
    const updated = await Banner.findByIdAndUpdate(id, { title, imageUrl: cloudUrl, link }, { new: true });
    res.status(200).send({ message: 'Banner updated successfully', data: updated });
  } catch (error) {
    res.status(500).send({ message: 'Error updating banner', error: error.message });
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

app.get('/api/products', async (req, res) => {
  try {
    const { category, isNewArrival, isBestSeller } = req.query;
    let query = {};
    if (category) query.category = category;
    if (isNewArrival === 'true') query.isNewArrival = true;
    if (isBestSeller === 'true') query.isBestSeller = true;
    
    // PROJECT fields to exclude heavy images (gallery) and long details when fetching a list
    const products = await Product.find(query)
      .select('-gallery -details -__v') 
      .sort({ createdAt: -1 })
      .lean(); // Faster query execution

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching products', error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).lean();
    if (!product) return res.status(404).send({ message: 'Product not found' });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching product', error: error.message });
  }
});

app.post('/api/add-product', async (req, res) => {
  try {
    const productData = req.body;
    
    // Upload images to Cloudinary
    if (productData.image) productData.image = await uploadToCloudinary(productData.image, 'gridox_products');
    if (productData.gallery && Array.isArray(productData.gallery)) {
        productData.gallery = await Promise.all(productData.gallery.map(img => uploadToCloudinary(img, 'gridox_products')));
    }

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

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    
    if (productData.image) productData.image = await uploadToCloudinary(productData.image, 'gridox_products');
    if (productData.gallery && Array.isArray(productData.gallery)) {
        productData.gallery = await Promise.all(productData.gallery.map(img => uploadToCloudinary(img, 'gridox_products')));
    }

    const updated = await Product.findByIdAndUpdate(id, productData, { new: true });
    res.status(200).send({ message: 'Product updated successfully', data: updated });
  } catch (error) {
    res.status(500).send({ message: 'Error updating product', error: error.message });
  }
});

// Category Routes
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching categories', error: error.message });
  }
});

app.post('/api/add-category', async (req, res) => {
  try {
    const { name, thumbnailImage, description } = req.body;
    const cloudUrl = await uploadToCloudinary(thumbnailImage, 'gridox_categories');
    
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const newCategory = new Category({ 
      name, 
      thumbnailImage: cloudUrl,
      image: cloudUrl, // sync for legacy
      description, 
      slug 
    });
    const saved = await newCategory.save();
    res.status(201).send({ message: 'Category added successfully', data: saved });
  } catch (error) {
    res.status(500).send({ message: 'Error adding category', error: error.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).send({ message: 'Category removed successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error removing category', error: error.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, thumbnailImage, description } = req.body;
    
    const updateData = { name, description };
    if (thumbnailImage && thumbnailImage.startsWith('data:')) {
        updateData.thumbnailImage = await uploadToCloudinary(thumbnailImage, 'gridox_categories');
        updateData.image = updateData.thumbnailImage;
    }
    if (name) updateData.slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const updated = await Category.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).send({ message: 'Category updated successfully', data: updated });
  } catch (error) {
    res.status(500).send({ message: 'Error updating category', error: error.message });
  }
});

// Reel Routes
app.get('/api/reels', async (req, res) => {
  try {
    // Return all reels, but we'll selectively clean the videoUrl in the results
    const reels = await Reel.find().populate('productId').sort({ createdAt: -1 });
    
    const optimizedReels = reels.map(r => {
        const reelObj = r.toObject();
        // If it's heavy Base64, remove it from list to keep response small
        if (reelObj.videoUrl && reelObj.videoUrl.startsWith('data:')) {
            reelObj.videoUrl = ''; // Frontend will fetch it lazily
            reelObj.isBase64 = true;
        } else {
            reelObj.isBase64 = false;
        }
        return reelObj;
    });

    res.status(200).send(optimizedReels);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching reels', error: error.message });
  }
});

// New endpoint to fetch only the video content for a specific reel
app.get('/api/reels/video/:id', async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).send('Not found');
    
    // If it's a URL, redirect or return the URL
    if (!reel.videoUrl.startsWith('data:')) {
        return res.status(200).send({ url: reel.videoUrl, isBase64: false });
    }

    // If it's Base64, return it
    res.status(200).send({ url: reel.videoUrl, isBase64: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/add-reel', async (req, res) => {
  try {
    const { videoUrl, videoType, productId, category } = req.body;
    if (!videoUrl || !productId) {
      return res.status(400).send({ message: 'Missing video or product association' });
    }
    
    const cloudUrl = await uploadToCloudinary(videoUrl, 'gridox_reels', 'video');
    
    const newReel = new Reel({ videoUrl: cloudUrl, videoType, productId, category });
    const saved = await newReel.save();
    res.status(201).send({ message: 'Reel added successfully', data: saved });
  } catch (error) {
    res.status(500).send({ message: 'Error adding reel', error: error.message });
  }
});

app.delete('/api/reels/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Reel.findByIdAndDelete(id);
    res.status(200).send({ message: 'Reel removed successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error removing reel', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
