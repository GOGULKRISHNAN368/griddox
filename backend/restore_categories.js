const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const Category = mongoose.model('Category', new mongoose.Schema({
  name: String,
  thumbnailImage: String,
  image: String,
  description: String,
  slug: String,
  createdAt: { type: Date, default: Date.now }
}));

const data = [
  { name: "PEPLUM CO-ORDS", url: "https://res.cloudinary.com/dxhet7ynl/image/upload/v1776660422/gridox_categories/skegnreutxch6s6pk28b.jpg", desc: "Shop premium Peplum Co-ords for women. Our designer-crafted coordinating sets blend modern silhouettes with traditional elegance." },
  { name: "COTTON KURTI SET", url: "https://res.cloudinary.com/dxhet7ynl/image/upload/v1776660423/gridox_categories/rgtdfrrmpcsy8wial4jl.jpg", desc: "Discover breathable Cotton Kurti Sets online. High-quality cotton fabrics, intricate prints, and comfortable fits." },
  { name: "PEPLUM TOPS", url: "https://res.cloudinary.com/dxhet7ynl/image/upload/v1776660424/gridox_categories/ygyhdwhrp3ep4ndkfvcp.jpg", desc: "Trendy Peplum Tops for a stylish fusion look. Pair these versatile designer tops with jeans or ethnic bottoms." },
  { name: "RAW SILK SET", url: "https://res.cloudinary.com/dxhet7ynl/image/upload/v1776660424/gridox_categories/t2wpkbiuixxgtusjjhuv.jpg", desc: "Luxurious Raw Silk Sets for weddings and special occasions. Experience the rich texture and royal feel." },
  { name: "MATERNITY WEAR", url: "https://res.cloudinary.com/dxhet7ynl/image/upload/v1776660425/gridox_categories/jvvu1o3dsxyzcrfdmdl4.jpg", desc: "Comfortable and stylish Maternity Wear for expecting mothers. Functional designs and soft fabrics." },
  { name: "LOUNGE WEAR", url: "https://res.cloudinary.com/dxhet7ynl/image/upload/v1776660426/gridox_categories/vphxozkqyhepa53arrxn.jpg", desc: "Premium Women's Lounge Wear for ultimate comfort. Stay chic at home with our collection of soft, breathable sets." },
  { name: "BOTTOM WEAR", url: "https://res.cloudinary.com/dxhet7ynl/image/upload/v1776660427/gridox_categories/wfce0cqbst9d74vn57im.jpg", desc: "Versatile Bottom Wear including ankle-length leggings, palazzos, and ethnic trousers." }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Category.deleteMany({});
  
  for (const item of data) {
    const slug = item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    await new Category({
      name: item.name,
      thumbnailImage: item.url,
      image: item.url,
      description: item.desc,
      slug: slug
    }).save();
    console.log(`Seeded: ${item.name}`);
  }
  
  console.log('Successfully restored 7 categories with existing Cloudinary images.');
  process.exit(0);
}
seed();
