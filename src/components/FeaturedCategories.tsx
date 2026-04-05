import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedCategories.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

import catCoOrds from "@/assets/cat-co-ords-v2.jpg";
import catKurtaSet from "@/assets/cat-kurta-set-v2.jpg";
import catKurtas from "@/assets/cat-kurtas-v2.jpg";
import catDresses from "@/assets/cat-dresses-v2.jpg";
import catMaternity from "@/assets/cat-maternity-v2.jpg";
import catChuridar from "@/assets/cat-churidar-v2.jpg";
import catAnkleLeggings from "@/assets/cat-ankle-leggings-v2.jpg";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  slug: string;
}

const initialCategories: Category[] = [
  { id: "1", name: "PEPLUM CO-ORDS", image: catCoOrds, description: "Discover our latest collection of Peplum Co-ords. Stylish and comfortable fits for every occasion.", slug: "peplum-co-ords" },
  { id: "2", name: "COTTON KURTI SET", image: catKurtaSet, description: "Traditional yet modern cotton kurti sets for everyday elegance.", slug: "cotton-kurti-set" },
  { id: "3", name: "PEPLUM TOPS", image: catKurtas, description: "Trendy peplum tops perfect for pairing with your favorite bottoms.", slug: "peplum-tops" },
  { id: "4", name: "RAW SILK SET", image: catDresses, description: "Experience luxury with our premium raw silk sets, designed for special occasions.", slug: "raw-silk-set" },
  { id: "5", name: "MATERNITY WEAR", image: catMaternity, description: "Comfortable and stylish maternity wear for expecting mothers.", slug: "maternity-wear" },
  { id: "6", name: "LOUNGE WEAR", image: catChuridar, description: "Relax in style with our premium quality lounge wear collection.", slug: "lounge-wear" },
  { id: "7", name: "BOTTOM WEAR", image: catAnkleLeggings, description: "Versatile bottom wear collection spanning from leggings to palazzo.", slug: "bottom-wear" },
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

  // Optional auto-play
  // useEffect(() => {
  //   const auto = setInterval(() => {
  //     handleNext();
  //   }, 7000);
  //   return () => clearInterval(auto);
  // }, [animatingClass]);

  return (
    <div className={`featured-carousel ${animatingClass}`}>
      <div className="list">
        {categories.map((cat) => (
          <div key={cat.id} className="item">
            <div className="main-img-container">
               <img src={cat.image} alt={cat.name} className="main-img" />
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
                <img src={cat.image} alt={cat.name} />
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
