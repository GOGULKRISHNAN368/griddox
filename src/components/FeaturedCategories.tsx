import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";
import "./FeaturedCategories.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

import catCoOrds from "@/assets/cat_peplum_coords_1775373099016.png";
import catKurtaSet from "@/assets/cat_cotton_kurti_1775373114325.png";
import catKurtas from "@/assets/cat_peplum_tops_1775373133551.png";
import catDresses from "@/assets/cat_raw_silk_1775373150282.png";
import catMaternity from "@/assets/cat_maternity_1775373167092.png";
import catChuridar from "@/assets/cat_lounge_wear_1775373183467.png";
import catAnkleLeggings from "@/assets/cat_bottom_wear_1775373197874.png";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  slug: string;
}

const initialCategories: Category[] = [
  { id: "1", name: "PEPLUM CO-ORDS", image: catCoOrds, description: "Shop premium Peplum Co-ords for women. Our designer-crafted coordinating sets blend modern silhouettes with traditional elegance, perfect for festive events and contemporary ethnic wear.", slug: "peplum-co-ords" },
  { id: "2", name: "COTTON KURTI SET", image: catKurtaSet, description: "Discover breathable Cotton Kurti Sets online. High-quality cotton fabrics, intricate prints, and comfortable fits designed for daily casual wear and office elegance.", slug: "cotton-kurti-set" },
  { id: "3", name: "PEPLUM TOPS", image: catKurtas, description: "Trendy Peplum Tops for a stylish fusion look. Pair these versatile designer tops with jeans or ethnic bottoms for a chic, modern appearance in premium fabrics.", slug: "peplum-tops" },
  { id: "4", name: "RAW SILK SET", image: catDresses, description: "Luxurious Raw Silk Sets for weddings and special occasions. Experience the rich texture and royal feel of high-end silk garments tailored to perfection for the modern woman.", slug: "raw-silk-set" },
  { id: "5", name: "MATERNITY WEAR", image: catMaternity, description: "Comfortable and stylish Maternity Wear for expecting mothers. Functional designs, soft fabrics, and flattering silhouettes that keep you fashionable through every trimester.", slug: "maternity-wear" },
  { id: "6", name: "LOUNGE WEAR", image: catChuridar, description: "Premium Women's Lounge Wear for ultimate comfort. Stay chic at home with our collection of soft, breathable, and stylish sets designed for relaxation without compromising on style.", slug: "lounge-wear" },
  { id: "7", name: "BOTTOM WEAR", image: catAnkleLeggings, description: "Versatile Bottom Wear including ankle-length leggings, palazzos, and ethnic trousers. Perfectly tailored basics to complete any ethnic or fusion outfit.", slug: "bottom-wear" },
];

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [animatingClass, setAnimatingClass] = useState<"next" | "prev" | "">("");
  
  // Timing variables
  const timeRunning = 1500; // time corresponding to css animation duration + buffer
  
  const runTimeOut = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    if (animatingClass !== "") return;
    
    setCategories((prev) => {
      const newItems = [...prev];
      const first = newItems.shift();
      if (first) newItems.push(first);
      return newItems;
    });
    
    setAnimatingClass("next");
    resetAutoRun();
  };

  const handlePrev = () => {
    if (animatingClass !== "") return;
    
    setCategories((prev) => {
      const newItems = [...prev];
      const last = newItems.pop();
      if (last) newItems.unshift(last);
      return newItems;
    });
    
    setAnimatingClass("prev");
    resetAutoRun();
  };

  const handleThumbnailClick = (index: number) => {
    if (index === 0 || animatingClass !== "") return;
    
    setCategories((prev) => {
      const newItems = [...prev];
      const shifted = newItems.splice(0, index);
      return [...newItems, ...shifted];
    });
    
    setAnimatingClass("next");
    resetAutoRun();
  };

  const resetAutoRun = () => {
    if (runTimeOut.current) clearTimeout(runTimeOut.current);
    
    runTimeOut.current = setTimeout(() => {
      setAnimatingClass("");
    }, timeRunning);
  };

  return (
    <div className={`featured-carousel ${animatingClass}`}>
      <div className="list">
        {categories.map((cat) => (
          <div key={cat.id} className="item">
            <div className="main-img-container">
               <OptimizedImage src={cat.image} alt={cat.name} className="main-img" />
            </div>
            <div className="content">
              <div className="author">GRIDOX</div>
              <div className="title">CATEGORIES</div>
              <div className="topic">{cat.name}</div>
              <div className="des">{cat.description}</div>
              <div className="buttons">
                <button onClick={() => navigate(`/category/${cat.slug}`)}>SHOP NOW</button>
                <button onClick={() => navigate(`/category/${cat.slug}`)}>SEE ALL</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="thumbnail">
        {categories.map((cat, index) => (
            <div key={`thumb-${cat.id}`} className="item" onClick={() => handleThumbnailClick(index)}>
                <OptimizedImage src={cat.image} alt={cat.name} />
                <div className="content">
                    <div className="title">{cat.name}</div>
                    <div className="description">Explore</div>
                </div>
            </div>
        ))}
      </div>

      <div className="arrows">
        <button id="prev" onClick={handlePrev}><ChevronLeft size={24} /></button>
        <button id="next" onClick={handleNext}><ChevronRight size={24} /></button>
      </div>

      <div className="time"></div>
    </div>
  );
};

export default FeaturedCategories;
