import peplumCoords1 from "@/assets/products/peplum-coords-1.jpg";
import peplumCoords2 from "@/assets/products/peplum-coords-2.jpg";
import kurtiSet1 from "@/assets/products/kurti-set-1.jpg";
import kurtiSet2 from "@/assets/products/kurti-set-2.jpg";
import peplumTops1 from "@/assets/products/peplum-tops-1.jpg";
import peplumTops2 from "@/assets/products/peplum-tops-2.jpg";
import rawSilk1 from "@/assets/products/raw-silk-1.jpg";
import rawSilk2 from "@/assets/products/raw-silk-2.jpg";
import maternity1 from "@/assets/products/maternity-1.jpg";
import maternity2 from "@/assets/products/maternity-2.jpg";
import lounge1 from "@/assets/products/lounge-1.jpg";
import lounge2 from "@/assets/products/lounge-2.jpg";
import bottom1 from "@/assets/products/bottom-1.jpg";
import bottom2 from "@/assets/products/bottom-2.jpg";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  badge?: string;
  tag?: string;
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
      { id: "pc1", name: "Navy Gold Printed Peplum Co-Ord Set", image: peplumCoords1, price: 2999, originalPrice: 5999, discount: 50, badge: "MOST LOVED", tag: "SAME DAY DISPATCH" },
      { id: "pc2", name: "Pink Embroidered Peplum Co-Ord Set", image: peplumCoords2, price: 2499, originalPrice: 4999, discount: 50, badge: "MOST LOVED" },
      { id: "pc3", name: "Maroon Floral Peplum Co-Ord Set", image: peplumCoords1, price: 3199, originalPrice: 5499, discount: 42, tag: "SAME DAY DISPATCH" },
      { id: "pc4", name: "Blush Pink Peplum Co-Ord Set", image: peplumCoords2, price: 2799, originalPrice: 4999, discount: 44, badge: "NEW" },
      { id: "pc5", name: "Royal Blue Peplum Co-Ord Set", image: peplumCoords1, price: 3499, originalPrice: 5999, discount: 42, badge: "MOST LOVED", tag: "SAME DAY DISPATCH" },
      { id: "pc6", name: "Pastel Peplum Co-Ord Set", image: peplumCoords2, price: 2699, originalPrice: 4499, discount: 40 },
    ],
  },
  {
    slug: "cotton-kurti-set",
    title: "COTTON KURTI SET",
    products: [
      { id: "ck1", name: "White & Pink Embroidered Kurti Set", image: kurtiSet1, price: 2399, originalPrice: 3999, discount: 40, badge: "MOST LOVED", tag: "SAME DAY DISPATCH" },
      { id: "ck2", name: "Orange Embroidered Chanderi Kurti Set", image: kurtiSet2, price: 2599, originalPrice: 4999, discount: 48, badge: "MOST LOVED" },
      { id: "ck3", name: "Green Printed Cotton Kurti Set", image: kurtiSet1, price: 1999, originalPrice: 3999, discount: 50, tag: "SAME DAY DISPATCH" },
      { id: "ck4", name: "Yellow Cotton Kurti with Palazzo", image: kurtiSet2, price: 2299, originalPrice: 3999, discount: 43, badge: "NEW" },
      { id: "ck5", name: "Blue Block Print Kurti Set", image: kurtiSet1, price: 2699, originalPrice: 4499, discount: 40, badge: "MOST LOVED" },
      { id: "ck6", name: "Coral Cotton Kurti Set with Dupatta", image: kurtiSet2, price: 2199, originalPrice: 3999, discount: 45, tag: "SAME DAY DISPATCH" },
      { id: "ck7", name: "Ivory Embroidered Kurti Set", image: kurtiSet1, price: 2899, originalPrice: 4999, discount: 42 },
    ],
  },
  {
    slug: "peplum-tops",
    title: "PEPLUM TOPS",
    products: [
      { id: "pt1", name: "Black Cold Shoulder Peplum Top", image: peplumTops1, price: 1499, originalPrice: 2999, discount: 50, badge: "MOST LOVED", tag: "SAME DAY DISPATCH" },
      { id: "pt2", name: "White Embroidered Peplum Top", image: peplumTops2, price: 1299, originalPrice: 2499, discount: 48, badge: "NEW" },
      { id: "pt3", name: "Red Ruffle Peplum Top", image: peplumTops1, price: 1699, originalPrice: 2999, discount: 43 },
      { id: "pt4", name: "Ivory Lace Peplum Top", image: peplumTops2, price: 1599, originalPrice: 2999, discount: 47, badge: "MOST LOVED", tag: "SAME DAY DISPATCH" },
      { id: "pt5", name: "Navy Blue Peplum Blouse", image: peplumTops1, price: 1399, originalPrice: 2499, discount: 44 },
      { id: "pt6", name: "Olive Green Peplum Top", image: peplumTops2, price: 1199, originalPrice: 1999, discount: 40, badge: "NEW" },
    ],
  },
  {
    slug: "raw-silk-set",
    title: "PREMIUM RAW SILK SET",
    products: [
      { id: "rs1", name: "Orange Raw Silk Kurta Set with Dupatta", image: rawSilk1, price: 6949, originalPrice: 13999, discount: 50, badge: "MOST LOVED", tag: "SAME DAY DISPATCH" },
      { id: "rs2", name: "Green Raw Silk Sharara Set", image: rawSilk2, price: 7499, originalPrice: 14999, discount: 50, badge: "MOST LOVED" },
      { id: "rs3", name: "Maroon Raw Silk Anarkali Set", image: rawSilk1, price: 6499, originalPrice: 12999, discount: 50, tag: "SAME DAY DISPATCH" },
      { id: "rs4", name: "Teal Raw Silk Palazzo Set", image: rawSilk2, price: 7999, originalPrice: 14999, discount: 47, badge: "NEW" },
      { id: "rs5", name: "Rose Gold Raw Silk Set", image: rawSilk1, price: 8499, originalPrice: 15999, discount: 47, badge: "MOST LOVED" },
      { id: "rs6", name: "Royal Purple Raw Silk Set", image: rawSilk2, price: 7299, originalPrice: 13999, discount: 48, tag: "SAME DAY DISPATCH" },
    ],
  },
  {
    slug: "maternity-wear",
    title: "MATERNITY WEAR",
    products: [
      { id: "mw1", name: "Peach Maternity Wrap Dress", image: maternity1, price: 2099, originalPrice: 3999, discount: 48, badge: "MOST LOVED", tag: "SAME DAY DISPATCH" },
      { id: "mw2", name: "Dusty Rose Maternity Gown", image: maternity2, price: 2499, originalPrice: 4499, discount: 44, badge: "NEW" },
      { id: "mw3", name: "Mint Green Maternity Kurta", image: maternity1, price: 1899, originalPrice: 3499, discount: 46 },
      { id: "mw4", name: "Navy Maternity Maxi Dress", image: maternity2, price: 2299, originalPrice: 3999, discount: 43, badge: "MOST LOVED", tag: "SAME DAY DISPATCH" },
      { id: "mw5", name: "Yellow Cotton Maternity Dress", image: maternity1, price: 1799, originalPrice: 2999, discount: 40 },
      { id: "mw6", name: "Lavender Maternity A-Line Dress", image: maternity2, price: 2199, originalPrice: 3999, discount: 45, badge: "NEW" },
      { id: "mw7", name: "Coral Maternity Kaftan", image: maternity1, price: 1999, originalPrice: 3499, discount: 43, tag: "SAME DAY DISPATCH" },
    ],
  },
  {
    slug: "lounge-wear",
    title: "LOUNGE WEAR",
    products: [
      { id: "lw1", name: "Pink & Grey Cotton Lounge Set", image: lounge1, price: 1499, originalPrice: 2999, discount: 50, badge: "MOST LOVED", tag: "SAME DAY DISPATCH" },
      { id: "lw2", name: "Printed Kaftan Lounge Dress", image: lounge2, price: 1799, originalPrice: 3499, discount: 49, badge: "MOST LOVED" },
      { id: "lw3", name: "Striped Cotton Night Suit", image: lounge1, price: 1299, originalPrice: 2499, discount: 48 },
      { id: "lw4", name: "Floral Print Kaftan", image: lounge2, price: 1699, originalPrice: 2999, discount: 43, badge: "NEW", tag: "SAME DAY DISPATCH" },
      { id: "lw5", name: "Solid Pastel Lounge Set", image: lounge1, price: 1399, originalPrice: 2499, discount: 44 },
      { id: "lw6", name: "Block Print Lounge Kaftan", image: lounge2, price: 1599, originalPrice: 2999, discount: 47, badge: "MOST LOVED" },
    ],
  },
  {
    slug: "bottom-wear",
    title: "BOTTOM WEAR",
    products: [
      { id: "bw1", name: "Taupe Wide Leg Palazzo Pants", image: bottom1, price: 999, originalPrice: 1999, discount: 50, badge: "MOST LOVED", tag: "SAME DAY DISPATCH" },
      { id: "bw2", name: "Printed Ankle Length Leggings", image: bottom2, price: 799, originalPrice: 1499, discount: 47, badge: "NEW" },
      { id: "bw3", name: "Black Straight Fit Pants", image: bottom1, price: 1199, originalPrice: 1999, discount: 40 },
      { id: "bw4", name: "Floral Churidar Leggings", image: bottom2, price: 899, originalPrice: 1699, discount: 47, tag: "SAME DAY DISPATCH" },
      { id: "bw5", name: "Navy Palazzo with Embroidery", image: bottom1, price: 1099, originalPrice: 1999, discount: 45, badge: "MOST LOVED" },
      { id: "bw6", name: "Cream Cotton Pants", image: bottom2, price: 849, originalPrice: 1499, discount: 43 },
      { id: "bw7", name: "Olive Green Wide Leg Pants", image: bottom1, price: 1299, originalPrice: 2299, discount: 44, badge: "NEW", tag: "SAME DAY DISPATCH" },
    ],
  },
];

export default categories;
