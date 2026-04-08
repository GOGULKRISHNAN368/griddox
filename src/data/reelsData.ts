import thumb1 from "@/assets/products/peplum-coords-1.jpg";
import thumb2 from "@/assets/products/peplum-coords-2.jpg";
import thumb3 from "@/assets/products/peplum-coords-3.png";
import thumb4 from "@/assets/products/peplum-tops-1.jpg";
import thumb5 from "@/assets/products/peplum-coords-4.png";

export interface ReelProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
}

export interface Reel {
  id: string;
  videoUrl: string;
  product: ReelProduct;
}

export const reelsData: Reel[] = [
  {
    id: "reel1",
    videoUrl: "/videos/video1.mp4",
    product: {
      id: "pc1",
      name: "Twilight Flower Violet Viscose Co-ord With Chinese Collar & 3/4th Sleeves",
      price: 1399,
      originalPrice: 1749,
      thumbnail: thumb1,
    },
  },
  {
    id: "reel2",
    videoUrl: "/videos/video2.mp4",
    product: {
      id: "pc2",
      name: "Fuchisa Charm Pink Viscose Co-ord With Boat Neck & 3/4th Sleeves",
      price: 1399,
      originalPrice: 1749,
      thumbnail: thumb2,
    },
  },
  {
    id: "reel3",
    videoUrl: "/videos/video3.mp4",
    product: {
      id: "pc3",
      name: "Petal Pixel Charm Pink Viscose Co-ord With Boat Neck & 3/4th Sleeves",
      price: 1399,
      originalPrice: 1749,
      thumbnail: thumb3,
    },
  },
  {
    id: "reel4",
    videoUrl: "/videos/video4.mp4",
    product: {
      id: "pc4",
      name: "Crackled Chic Black Viscose Co-ord With Shirt Collar Neckline",
      price: 1399,
      originalPrice: 1749,
      thumbnail: thumb4,
    },
  },
  {
    id: "reel5",
    videoUrl: "/videos/video5.mp4",
    product: {
      id: "pc5",
      name: "Lumea Bloom Yellow Viscose Co-ord With Boat Neck & 3/4th Sleeves",
      price: 1399,
      originalPrice: 1749,
      thumbnail: thumb5,
    },
  },
];
