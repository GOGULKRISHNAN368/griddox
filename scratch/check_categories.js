const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const Category = mongoose.model('Category', new mongoose.Schema({}, { strict: false }));

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const categories = await Category.find();
  console.log(JSON.stringify(categories, null, 2));
  process.exit(0);
}
check();
