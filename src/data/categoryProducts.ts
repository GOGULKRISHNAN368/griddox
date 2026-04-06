import peplumCoords1 from "@/assets/products/peplum-coords-1.jpg";
import peplumCoords2 from "@/assets/products/peplum-coords-2.jpg";
import peplumCoordsSide from "@/assets/products/peplum-coords-side.jpg";
import peplumCoordsBack from "@/assets/products/peplum-coords-back.jpg";
import peplumCoordsDetail from "@/assets/products/peplum-coords-detail.jpg";
import peplumCoordsWalk from "@/assets/products/peplum-coords-walk.jpg";
import peplumCoords3 from "@/assets/products/peplum-coords-3.png";
import peplumCoords4 from "@/assets/products/peplum-coords-4.png";
import peplumCoords5 from "@/assets/products/peplum-coords-5.png";
import peplumCoords6 from "@/assets/products/peplum-coords-6.png";

import kurtiSet1 from "@/assets/products/kurti-set-1.jpg";
import kurtiSet2 from "@/assets/products/kurti-set-2.jpg";
import kurtiSetSide from "@/assets/products/kurti-set-side.jpg";
import kurtiSetBack from "@/assets/products/kurti-set-back.jpg";
import kurtiSetDetail from "@/assets/products/kurti-set-detail.jpg";
import kurtiSetWalk from "@/assets/products/kurti-set-walk.jpg";
import kurtiSetOrange from "@/assets/products/kurti-set-orange.png";

import peplumTops1 from "@/assets/products/peplum-tops-1.jpg";
import peplumTops2 from "@/assets/products/peplum-tops-2.jpg";
import peplumTopsSide from "@/assets/products/peplum-tops-side.jpg";
import peplumTopsBack from "@/assets/products/peplum-tops-back.jpg";
import peplumTopsDetail from "@/assets/products/peplum-tops-detail.jpg";

import rawSilk1 from "@/assets/products/raw-silk-1.jpg";
import rawSilk2 from "@/assets/products/raw-silk-2.jpg";
import rawSilkSide from "@/assets/products/raw-silk-side.jpg";
import rawSilkBack from "@/assets/products/raw-silk-back.jpg";
import rawSilkDetail from "@/assets/products/raw-silk-detail.jpg";

import maternity1 from "@/assets/products/maternity-1.jpg";
import maternity2 from "@/assets/products/maternity-2.jpg";
import maternitySide from "@/assets/products/maternity-side.jpg";

import lounge1 from "@/assets/products/lounge-1.jpg";
import lounge2 from "@/assets/products/lounge-2.jpg";
import loungeDetail from "@/assets/products/lounge-detail.jpg";

import bottom1 from "@/assets/products/bottom-1.jpg";
import bottom2 from "@/assets/products/bottom-2.jpg";
import bottomSide from "@/assets/products/bottom-side.jpg";
import bottomDetail from "@/assets/products/bottom-detail.jpg";

export interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  originalPrice: number;
  discount: number;
  badge?: string;
  tag?: string;
  description: string;
  fabric: string;
  fit: string;
  neckline: string;
  sleeve: string;
  sizes: number[];
  colors: { name: string; hex: string }[];
}

export interface CategoryData {
  slug: string;
  title: string;
  products: Product[];
}

const categories: CategoryData[] = [
  {
    slug: "peplum-co-ords",
    title: "PEPLUM CO-ORDS",
    products: [
      {
        id: "pc1", name: "Navy Gold Printed Peplum Co-Ord Set",
        images: [peplumCoords1, peplumCoordsSide, peplumCoordsBack, peplumCoordsWalk, peplumCoordsDetail],
        price: 2999, originalPrice: 5999, discount: 50, badge: "MOST LOVED", tag: "SAME DAY DISPATCH",
        description: "Step into elegance with this navy blue peplum co-ord set featuring intricate gold print. The peplum top with flared hem pairs beautifully with matching palazzo pants for a coordinated look.",
        fabric: "Crepe", fit: "Regular", neckline: "Round Neck", sleeve: "Full Sleeves", sizes: [32, 34, 36, 38, 40, 42],
        colors: [{ name: "Navy", hex: "#1a2744" }, { name: "Pink", hex: "#f4a8c0" }],
      },
      {
        id: "pc2", name: "Pink Embroidered Peplum Co-Ord Set",
        images: [peplumCoords2, peplumCoordsSide, peplumCoordsBack, peplumCoordsWalk, peplumCoordsDetail],
        price: 2499, originalPrice: 4999, discount: 50, badge: "MOST LOVED",
        description: "A charming pink peplum co-ord set with delicate embroidery work. Perfect for festive occasions and casual outings alike.",
        fabric: "Cotton Blend", fit: "Regular", neckline: "Round Neck", sleeve: "Half Sleeves", sizes: [32, 34, 36, 38, 40],
        colors: [{ name: "Pink", hex: "#f4a8c0" }],
      },
      {
        id: "pc3", name: "Maroon Floral Peplum Co-Ord Set",
        images: [peplumCoords3, peplumCoordsBack, peplumCoordsSide, peplumCoordsDetail, peplumCoordsWalk],
        price: 3199, originalPrice: 5499, discount: 42, tag: "SAME DAY DISPATCH",
        description: "Beautiful maroon floral peplum co-ord set with traditional motifs. A perfect blend of modern silhouette and classic design.",
        fabric: "Rayon", fit: "Relaxed", neckline: "V-Neck", sleeve: "3/4 Sleeves", sizes: [34, 36, 38, 40, 42],
        colors: [{ name: "Maroon", hex: "#800020" }],
      },
      {
        id: "pc4", name: "Blush Pink Peplum Co-Ord Set",
        images: [peplumCoords4, peplumCoordsWalk, peplumCoordsBack, peplumCoordsSide, peplumCoordsDetail],
        price: 2799, originalPrice: 4999, discount: 44, badge: "NEW",
        description: "Soft blush pink peplum co-ord set with subtle embroidery. Ideal for brunch dates and festive gatherings.",
        fabric: "Georgette", fit: "Slim", neckline: "Boat Neck", sleeve: "Half Sleeves", sizes: [32, 34, 36, 38],
        colors: [{ name: "Blush", hex: "#f8b4c8" }],
      },
      {
        id: "pc5", name: "Royal Blue Peplum Co-Ord Set",
        images: [peplumCoords5, peplumCoordsSide, peplumCoordsDetail, peplumCoordsBack, peplumCoordsWalk],
        price: 3499, originalPrice: 5999, discount: 42, badge: "MOST LOVED", tag: "SAME DAY DISPATCH",
        description: "Stunning royal blue peplum co-ord set with golden embroidery. Makes a statement at every occasion.",
        fabric: "Silk Blend", fit: "Regular", neckline: "Round Neck", sleeve: "Full Sleeves", sizes: [32, 34, 36, 38, 40, 42],
        colors: [{ name: "Royal Blue", hex: "#1a3380" }],
      },
      {
        id: "pc6", name: "Pastel Peplum Co-Ord Set",
        images: [peplumCoords6, peplumCoordsBack, peplumCoordsWalk, peplumCoordsSide, peplumCoordsDetail],
        price: 2699, originalPrice: 4499, discount: 40,
        description: "A serene pastel peplum co-ord set with minimal embroidery. Perfect for everyday elegance.",
        fabric: "Cotton", fit: "Regular", neckline: "Round Neck", sleeve: "Short Sleeves", sizes: [34, 36, 38, 40],
        colors: [{ name: "Pastel Pink", hex: "#fdd5e3" }],
      },
    ],
  },
  {
    slug: "cotton-kurti-set",
    title: "COTTON KURTI SET",
    products: [
      {
        id: "ck1", name: "White & Pink Embroidered Kurti Set",
        images: [kurtiSet1, kurtiSetSide, kurtiSetBack, kurtiSetWalk, kurtiSetDetail],
        price: 2399, originalPrice: 3999, discount: 40, badge: "MOST LOVED", tag: "SAME DAY DISPATCH",
        description: "Elegant white cotton kurti set with pink embroidered dupatta. Crafted from pure cotton for the ultimate comfort and breathability.",
        fabric: "Cotton", fit: "Relaxed", neckline: "Round Neck", sleeve: "3/4 Sleeves", sizes: [32, 34, 36, 38, 40, 42],
        colors: [{ name: "White", hex: "#fff" }, { name: "Pink", hex: "#e91e63" }],
      },
      {
        id: "ck2", name: "Orange Embroidered Chanderi Kurti Set",
        images: [kurtiSetOrange, kurtiSetSide, kurtiSetBack, kurtiSetWalk, kurtiSetDetail],
        price: 2599, originalPrice: 4999, discount: 48, badge: "MOST LOVED",
        description: "Vibrant orange chanderi kurti set with golden embroidery. Perfect for festive celebrations.",
        fabric: "Chanderi", fit: "Regular", neckline: "V-Neck", sleeve: "3/4 Sleeves", sizes: [32, 34, 36, 38, 42],
        colors: [{ name: "Orange", hex: "#ff8c00" }],
      },
      {
        id: "ck3", name: "Green Printed Cotton Kurti Set",
        images: [kurtiSet1, kurtiSetBack, kurtiSetSide, kurtiSetDetail, kurtiSetWalk],
        price: 1999, originalPrice: 3999, discount: 50, tag: "SAME DAY DISPATCH",
        description: "Fresh green printed cotton kurti set with matching pants and dupatta. Comfortable for daily wear.",
        fabric: "Cotton", fit: "Regular", neckline: "Round Neck", sleeve: "Half Sleeves", sizes: [34, 36, 38, 40],
        colors: [{ name: "Green", hex: "#2e8b57" }],
      },
      {
        id: "ck4", name: "Yellow Cotton Kurti with Palazzo",
        images: [kurtiSet2, kurtiSetWalk, kurtiSetBack, kurtiSetSide, kurtiSetDetail],
        price: 2299, originalPrice: 3999, discount: 43, badge: "NEW",
        description: "Bright yellow cotton kurti paired with flowing palazzo pants. A sunshine outfit for any occasion.",
        fabric: "Cotton", fit: "Relaxed", neckline: "Boat Neck", sleeve: "Short Sleeves", sizes: [32, 34, 36, 38, 40],
        colors: [{ name: "Yellow", hex: "#ffd700" }],
      },
      {
        id: "ck5", name: "Blue Block Print Kurti Set",
        images: [kurtiSet1, kurtiSetSide, kurtiSetDetail, kurtiSetBack, kurtiSetWalk],
        price: 2699, originalPrice: 4499, discount: 40, badge: "MOST LOVED",
        description: "Handcrafted blue block print kurti set showcasing traditional artisanship. Each piece is unique.",
        fabric: "Cotton", fit: "Regular", neckline: "Mandarin", sleeve: "3/4 Sleeves", sizes: [34, 36, 38, 40, 42],
        colors: [{ name: "Blue", hex: "#4169e1" }],
      },
      {
        id: "ck6", name: "Coral Cotton Kurti Set with Dupatta",
        images: [kurtiSet2, kurtiSetBack, kurtiSetWalk, kurtiSetSide, kurtiSetDetail],
        price: 2199, originalPrice: 3999, discount: 45, tag: "SAME DAY DISPATCH",
        description: "Lovely coral cotton kurti set with matching dupatta. Lightweight and comfortable for everyday wear.",
        fabric: "Cotton", fit: "Regular", neckline: "Round Neck", sleeve: "Half Sleeves", sizes: [32, 34, 36, 38],
        colors: [{ name: "Coral", hex: "#ff6f61" }],
      },
      {
        id: "ck7", name: "Ivory Embroidered Kurti Set",
        images: [kurtiSet1, kurtiSetWalk, kurtiSetBack, kurtiSetDetail, kurtiSetSide],
        price: 2899, originalPrice: 4999, discount: 42,
        description: "Pristine ivory kurti set with delicate embroidery. Exudes understated sophistication.",
        fabric: "Cotton Silk", fit: "Slim", neckline: "V-Neck", sleeve: "Full Sleeves", sizes: [34, 36, 38, 40, 42],
        colors: [{ name: "Ivory", hex: "#fffff0" }],
      },
    ],
  },
  {
    slug: "peplum-tops",
    title: "PEPLUM TOPS",
    products: [
      {
        id: "pt1", name: "Black Cold Shoulder Peplum Top",
        images: [peplumTops1, peplumTopsSide, peplumTopsBack, peplumTopsDetail, peplumTops2],
        price: 1499, originalPrice: 2999, discount: 50, badge: "MOST LOVED", tag: "SAME DAY DISPATCH",
        description: "Chic black cold shoulder peplum top with a flared hem. Perfect for pairing with jeans or palazzos.",
        fabric: "Polyester", fit: "Slim", neckline: "Cold Shoulder", sleeve: "Short Sleeves", sizes: [32, 34, 36, 38, 40],
        colors: [{ name: "Black", hex: "#000" }],
      },
      {
        id: "pt2", name: "White Embroidered Peplum Top",
        images: [peplumTops2, peplumTopsSide, peplumTopsBack, peplumTopsDetail, peplumTops1],
        price: 1299, originalPrice: 2499, discount: 48, badge: "NEW",
        description: "Elegant white peplum top with embroidered details. A versatile piece for any wardrobe.",
        fabric: "Cotton Blend", fit: "Regular", neckline: "Round Neck", sleeve: "Half Sleeves", sizes: [32, 34, 36, 38, 42],
        colors: [{ name: "White", hex: "#fff" }],
      },
      {
        id: "pt3", name: "Red Ruffle Peplum Top",
        images: [peplumTops1, peplumTopsBack, peplumTopsSide, peplumTops2, peplumTopsDetail],
        price: 1699, originalPrice: 2999, discount: 43,
        description: "Bold red peplum top with dramatic ruffle hem. Makes a statement wherever you go.",
        fabric: "Crepe", fit: "Slim", neckline: "Sweetheart", sleeve: "Sleeveless", sizes: [34, 36, 38, 40],
        colors: [{ name: "Red", hex: "#dc143c" }],
      },
      {
        id: "pt4", name: "Ivory Lace Peplum Top",
        images: [peplumTops2, peplumTopsSide, peplumTops1, peplumTopsBack, peplumTopsDetail],
        price: 1599, originalPrice: 2999, discount: 47, badge: "MOST LOVED", tag: "SAME DAY DISPATCH",
        description: "Delicate ivory peplum top with lace overlay. Romantic and feminine for special evenings.",
        fabric: "Lace", fit: "Regular", neckline: "Round Neck", sleeve: "Half Sleeves", sizes: [32, 34, 36, 38],
        colors: [{ name: "Ivory", hex: "#fffff0" }],
      },
      {
        id: "pt5", name: "Navy Blue Peplum Blouse",
        images: [peplumTops1, peplumTopsBack, peplumTopsDetail, peplumTopsSide, peplumTops2],
        price: 1399, originalPrice: 2499, discount: 44,
        description: "Classic navy blue peplum blouse with a structured fit. Effortlessly stylish for work or play.",
        fabric: "Polyester Blend", fit: "Slim", neckline: "V-Neck", sleeve: "Short Sleeves", sizes: [34, 36, 38, 40, 42],
        colors: [{ name: "Navy", hex: "#1a2744" }],
      },
      {
        id: "pt6", name: "Olive Green Peplum Top",
        images: [peplumTops2, peplumTops1, peplumTopsSide, peplumTopsBack, peplumTopsDetail],
        price: 1199, originalPrice: 1999, discount: 40, badge: "NEW",
        description: "Trendy olive green peplum top with a modern silhouette. Perfect for casual outings.",
        fabric: "Cotton", fit: "Relaxed", neckline: "Round Neck", sleeve: "Half Sleeves", sizes: [32, 34, 36, 38],
        colors: [{ name: "Olive", hex: "#808000" }],
      },
    ],
  },
  {
    slug: "raw-silk-set",
    title: "PREMIUM RAW SILK SET",
    products: [
      {
        id: "rs1", name: "Orange Raw Silk Kurta Set with Dupatta",
        images: [rawSilk1, rawSilkSide, rawSilkBack, rawSilkDetail, rawSilk2],
        price: 6949, originalPrice: 13999, discount: 50, badge: "MOST LOVED", tag: "SAME DAY DISPATCH",
        description: "Luxurious orange raw silk kurta set with matching dupatta. Adorned with subtle gold zari embroidery for a regal look.",
        fabric: "Raw Silk", fit: "Regular", neckline: "V-Neck", sleeve: "Full Sleeves", sizes: [32, 34, 36, 38, 40, 42],
        colors: [{ name: "Orange", hex: "#ff8c00" }],
      },
      {
        id: "rs2", name: "Green Raw Silk Sharara Set",
        images: [rawSilk2, rawSilkSide, rawSilkBack, rawSilkDetail, rawSilk1],
        price: 7499, originalPrice: 14999, discount: 50, badge: "MOST LOVED",
        description: "Stunning green raw silk sharara set with heavy gold embroidery. Perfect for weddings and grand celebrations.",
        fabric: "Raw Silk", fit: "Relaxed", neckline: "Square Neck", sleeve: "Full Sleeves", sizes: [34, 36, 38, 40],
        colors: [{ name: "Green", hex: "#6b8e23" }],
      },
      {
        id: "rs3", name: "Maroon Raw Silk Anarkali Set",
        images: [rawSilk1, rawSilkBack, rawSilkSide, rawSilk2, rawSilkDetail],
        price: 6499, originalPrice: 12999, discount: 50, tag: "SAME DAY DISPATCH",
        description: "Rich maroon raw silk anarkali set with flared silhouette. A timeless choice for festive occasions.",
        fabric: "Raw Silk", fit: "Flared", neckline: "Round Neck", sleeve: "3/4 Sleeves", sizes: [32, 34, 36, 38, 40, 42],
        colors: [{ name: "Maroon", hex: "#800020" }],
      },
      {
        id: "rs4", name: "Teal Raw Silk Palazzo Set",
        images: [rawSilk2, rawSilkDetail, rawSilkSide, rawSilkBack, rawSilk1],
        price: 7999, originalPrice: 14999, discount: 47, badge: "NEW",
        description: "Contemporary teal raw silk palazzo set with gold thread work. Elegant and comfortable for festive gatherings.",
        fabric: "Raw Silk", fit: "Regular", neckline: "Boat Neck", sleeve: "Full Sleeves", sizes: [34, 36, 38, 40],
        colors: [{ name: "Teal", hex: "#008080" }],
      },
      {
        id: "rs5", name: "Rose Gold Raw Silk Set",
        images: [rawSilk1, rawSilkSide, rawSilk2, rawSilkBack, rawSilkDetail],
        price: 8499, originalPrice: 15999, discount: 47, badge: "MOST LOVED",
        description: "Glamorous rose gold raw silk set with shimmer embroidery. A showstopper for any celebration.",
        fabric: "Raw Silk", fit: "Slim", neckline: "V-Neck", sleeve: "Full Sleeves", sizes: [32, 34, 36, 38, 40],
        colors: [{ name: "Rose Gold", hex: "#b76e79" }],
      },
      {
        id: "rs6", name: "Royal Purple Raw Silk Set",
        images: [rawSilk2, rawSilkBack, rawSilk1, rawSilkSide, rawSilkDetail],
        price: 7299, originalPrice: 13999, discount: 48, tag: "SAME DAY DISPATCH",
        description: "Majestic royal purple raw silk set with antique gold embroidery. Designed for grand occasions.",
        fabric: "Raw Silk", fit: "Regular", neckline: "Round Neck", sleeve: "Full Sleeves", sizes: [34, 36, 38, 40, 42],
        colors: [{ name: "Purple", hex: "#6a0dad" }],
      },
    ],
  },
  {
    slug: "maternity-wear",
    title: "MATERNITY WEAR",
    products: [
      {
        id: "mw1", name: "Peach Maternity Wrap Dress",
        images: [maternity1, maternitySide, maternity2, maternity1, maternitySide],
        price: 2099, originalPrice: 3999, discount: 48, badge: "MOST LOVED", tag: "SAME DAY DISPATCH",
        description: "Comfortable peach maternity wrap dress with adjustable tie. Grows with you throughout your pregnancy journey.",
        fabric: "Cotton Jersey", fit: "Relaxed", neckline: "V-Neck Wrap", sleeve: "3/4 Sleeves", sizes: [32, 34, 36, 38, 40, 42, 44],
        colors: [{ name: "Peach", hex: "#ffcba4" }],
      },
      {
        id: "mw2", name: "Dusty Rose Maternity Gown",
        images: [maternity2, maternitySide, maternity1, maternity2, maternitySide],
        price: 2499, originalPrice: 4499, discount: 44, badge: "NEW",
        description: "Elegant dusty rose maternity gown perfect for baby shower and special occasions. Ultra-soft fabric for all-day comfort.",
        fabric: "Modal", fit: "Flowing", neckline: "Scoop Neck", sleeve: "3/4 Sleeves", sizes: [34, 36, 38, 40, 42],
        colors: [{ name: "Dusty Rose", hex: "#dcae96" }],
      },
      {
        id: "mw3", name: "Mint Green Maternity Kurta",
        images: [maternity1, maternity2, maternitySide, maternity1, maternity2],
        price: 1899, originalPrice: 3499, discount: 46,
        description: "Breathable mint green maternity kurta with side slits for easy movement. Traditional yet modern.",
        fabric: "Cotton", fit: "Relaxed", neckline: "Round Neck", sleeve: "Half Sleeves", sizes: [34, 36, 38, 40, 42, 44],
        colors: [{ name: "Mint", hex: "#98ff98" }],
      },
      {
        id: "mw4", name: "Navy Maternity Maxi Dress",
        images: [maternity2, maternity1, maternitySide, maternity2, maternity1],
        price: 2299, originalPrice: 3999, discount: 43, badge: "MOST LOVED", tag: "SAME DAY DISPATCH",
        description: "Stylish navy maternity maxi dress that transitions from day to night effortlessly.",
        fabric: "Rayon", fit: "Flowing", neckline: "V-Neck", sleeve: "Short Sleeves", sizes: [32, 34, 36, 38, 40, 42],
        colors: [{ name: "Navy", hex: "#1a2744" }],
      },
      {
        id: "mw5", name: "Yellow Cotton Maternity Dress",
        images: [maternity1, maternitySide, maternity2, maternity1, maternitySide],
        price: 1799, originalPrice: 2999, discount: 40,
        description: "Bright yellow cotton maternity dress that brings sunshine to your wardrobe. Soft and stretchy.",
        fabric: "Cotton Stretch", fit: "Relaxed", neckline: "Round Neck", sleeve: "Short Sleeves", sizes: [34, 36, 38, 40, 42],
        colors: [{ name: "Yellow", hex: "#ffd700" }],
      },
      {
        id: "mw6", name: "Lavender Maternity A-Line Dress",
        images: [maternity2, maternity1, maternitySide, maternity2, maternity1],
        price: 2199, originalPrice: 3999, discount: 45, badge: "NEW",
        description: "Lovely lavender A-line maternity dress with empire waist. Flattering silhouette for all stages.",
        fabric: "Linen Blend", fit: "A-Line", neckline: "Square Neck", sleeve: "Half Sleeves", sizes: [32, 34, 36, 38, 40],
        colors: [{ name: "Lavender", hex: "#e6e6fa" }],
      },
      {
        id: "mw7", name: "Coral Maternity Kaftan",
        images: [maternity1, maternitySide, maternity2, maternity1, maternity2],
        price: 1999, originalPrice: 3499, discount: 43, tag: "SAME DAY DISPATCH",
        description: "Breezy coral maternity kaftan for ultimate comfort. Perfect for lounging or casual outings.",
        fabric: "Cotton", fit: "Oversized", neckline: "V-Neck", sleeve: "3/4 Sleeves", sizes: [0],
        colors: [{ name: "Coral", hex: "#ff6f61" }],
      },
    ],
  },
  {
    slug: "lounge-wear",
    title: "LOUNGE WEAR",
    products: [
      {
        id: "lw1", name: "Pink & Grey Cotton Lounge Set",
        images: [lounge1, lounge2, loungeDetail, lounge1, lounge2],
        price: 1499, originalPrice: 2999, discount: 50, badge: "MOST LOVED", tag: "SAME DAY DISPATCH",
        description: "Ultra-soft pink and grey cotton lounge set for ultimate relaxation. Premium quality fabric for all-day comfort.",
        fabric: "Cotton", fit: "Relaxed", neckline: "Round Neck", sleeve: "Full Sleeves", sizes: [32, 34, 36, 38, 40, 42],
        colors: [{ name: "Pink", hex: "#f4a8c0" }, { name: "Grey", hex: "#808080" }],
      },
      {
        id: "lw2", name: "Printed Kaftan Lounge Dress",
        images: [lounge2, lounge1, loungeDetail, lounge2, lounge1],
        price: 1799, originalPrice: 3499, discount: 49, badge: "MOST LOVED",
        description: "Beautiful printed kaftan lounge dress with pockets. Combines style and comfort seamlessly.",
        fabric: "Viscose", fit: "Oversized", neckline: "V-Neck", sleeve: "Half Sleeves", sizes: [0],
        colors: [{ name: "Beige Print", hex: "#f5f0e1" }],
      },
      {
        id: "lw3", name: "Striped Cotton Night Suit",
        images: [lounge1, loungeDetail, lounge2, lounge1, lounge2],
        price: 1299, originalPrice: 2499, discount: 48,
        description: "Classic striped cotton night suit for comfortable sleep. Breathable fabric keeps you cool all night.",
        fabric: "Cotton", fit: "Regular", neckline: "Collar", sleeve: "Full Sleeves", sizes: [34, 36, 38, 40],
        colors: [{ name: "Pink Stripe", hex: "#f8b4c8" }],
      },
      {
        id: "lw4", name: "Floral Print Kaftan",
        images: [lounge2, lounge1, loungeDetail, lounge2, lounge1],
        price: 1699, originalPrice: 2999, discount: 43, badge: "NEW", tag: "SAME DAY DISPATCH",
        description: "Gorgeous floral print kaftan for lounging in style. One size fits all with relaxed silhouette.",
        fabric: "Rayon", fit: "Oversized", neckline: "V-Neck", sleeve: "Short Sleeves", sizes: [0],
        colors: [{ name: "Floral", hex: "#e8c4a0" }],
      },
      {
        id: "lw5", name: "Solid Pastel Lounge Set",
        images: [lounge1, lounge2, loungeDetail, lounge1, loungeDetail],
        price: 1399, originalPrice: 2499, discount: 44,
        description: "Minimalist pastel lounge set in soothing colors. Premium cotton for the softest touch.",
        fabric: "Cotton", fit: "Relaxed", neckline: "Round Neck", sleeve: "Half Sleeves", sizes: [32, 34, 36, 38, 40],
        colors: [{ name: "Pastel Pink", hex: "#fdd5e3" }],
      },
      {
        id: "lw6", name: "Block Print Lounge Kaftan",
        images: [lounge2, loungeDetail, lounge1, lounge2, lounge1],
        price: 1599, originalPrice: 2999, discount: 47, badge: "MOST LOVED",
        description: "Artisanal block print lounge kaftan handcrafted by skilled artisans. Each piece tells a story.",
        fabric: "Cotton", fit: "Oversized", neckline: "Round Neck", sleeve: "3/4 Sleeves", sizes: [0],
        colors: [{ name: "Block Print", hex: "#c4a882" }],
      },
    ],
  },
  {
    slug: "bottom-wear",
    title: "BOTTOM WEAR",
    products: [
      {
        id: "bw1", name: "Taupe Wide Leg Palazzo Pants",
        images: [bottom1, bottomSide, bottom2, bottomDetail, bottom1],
        price: 999, originalPrice: 1999, discount: 50, badge: "MOST LOVED", tag: "SAME DAY DISPATCH",
        description: "Versatile taupe wide leg palazzo pants with elastic waistband. Comfortable and stylish for any occasion.",
        fabric: "Rayon", fit: "Wide Leg", neckline: "N/A", sleeve: "N/A", sizes: [28, 30, 32, 34, 36, 38],
        colors: [{ name: "Taupe", hex: "#8b7d6b" }],
      },
      {
        id: "bw2", name: "Printed Ankle Length Leggings",
        images: [bottom2, bottomSide, bottom1, bottomDetail, bottom2],
        price: 799, originalPrice: 1499, discount: 47, badge: "NEW",
        description: "Trendy printed ankle length leggings that pair perfectly with any kurta. Stretchy and comfortable.",
        fabric: "Cotton Lycra", fit: "Skinny", neckline: "N/A", sleeve: "N/A", sizes: [28, 30, 32, 34, 36],
        colors: [{ name: "Printed", hex: "#5c3a21" }],
      },
      {
        id: "bw3", name: "Black Straight Fit Pants",
        images: [bottom1, bottom2, bottomSide, bottomDetail, bottom1],
        price: 1199, originalPrice: 1999, discount: 40,
        description: "Classic black straight fit pants that go with everything. A wardrobe essential.",
        fabric: "Cotton Blend", fit: "Straight", neckline: "N/A", sleeve: "N/A", sizes: [28, 30, 32, 34, 36, 38],
        colors: [{ name: "Black", hex: "#000" }],
      },
      {
        id: "bw4", name: "Floral Churidar Leggings",
        images: [bottom2, bottom1, bottomDetail, bottomSide, bottom2],
        price: 899, originalPrice: 1699, discount: 47, tag: "SAME DAY DISPATCH",
        description: "Beautiful floral churidar leggings with gathered ankles. Traditional bottom wear with modern prints.",
        fabric: "Cotton Lycra", fit: "Churidar", neckline: "N/A", sleeve: "N/A", sizes: [28, 30, 32, 34, 36],
        colors: [{ name: "Floral", hex: "#8b4513" }],
      },
      {
        id: "bw5", name: "Navy Palazzo with Embroidery",
        images: [bottom1, bottomSide, bottomDetail, bottom2, bottom1],
        price: 1099, originalPrice: 1999, discount: 45, badge: "MOST LOVED",
        description: "Elegant navy palazzo pants with embroidered hem. Adds a touch of sophistication to any kurta.",
        fabric: "Rayon", fit: "Wide Leg", neckline: "N/A", sleeve: "N/A", sizes: [30, 32, 34, 36, 38],
        colors: [{ name: "Navy", hex: "#1a2744" }],
      },
      {
        id: "bw6", name: "Cream Cotton Pants",
        images: [bottom2, bottomDetail, bottom1, bottomSide, bottom2],
        price: 849, originalPrice: 1499, discount: 43,
        description: "Simple cream cotton pants for everyday comfort. Pairs well with any top or kurta.",
        fabric: "Cotton", fit: "Regular", neckline: "N/A", sleeve: "N/A", sizes: [28, 30, 32, 34, 36],
        colors: [{ name: "Cream", hex: "#fffdd0" }],
      },
      {
        id: "bw7", name: "Olive Green Wide Leg Pants",
        images: [bottom1, bottom2, bottomSide, bottomDetail, bottom1],
        price: 1299, originalPrice: 2299, discount: 44, badge: "NEW", tag: "SAME DAY DISPATCH",
        description: "Contemporary olive green wide leg pants with a modern silhouette. On-trend and comfortable.",
        fabric: "Linen Blend", fit: "Wide Leg", neckline: "N/A", sleeve: "N/A", sizes: [28, 30, 32, 34, 36, 38],
        colors: [{ name: "Olive", hex: "#808000" }],
      },
    ],
  },
];

export default categories;

