import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';
import OptimizedImage from './OptimizedImage';

interface Category {
  id: string;
  name: string;
  thumbnailImage: string;
  image: string;
  slug: string;
}

const CategoryGrid: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:3001' : `http://${window.location.hostname}:3001`;
        const response = await fetch(`${apiBase}/api/categories`);
        const data = await response.json();
        setCategories(data.map((c: any) => ({
          id: c._id,
          name: c.name,
          thumbnailImage: c.thumbnailImage,
          image: c.image,
          slug: c.slug
        })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="category-grid-section">
      <h2 className="section-title">Shop by Category</h2>
      <div className="category-grid">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Link to={`/category/${cat.slug}`} key={cat.id} className="category-card">
              <div className="category-image-wrapper">
                <OptimizedImage 
                  src={cat.thumbnailImage || cat.image} 
                  alt={cat.name} 
                  className="category-img"
                />
                <div className="category-overlay">
                  <h3 className="category-name">{cat.name}</h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#888' }}>
            <p>Loading your designer categories...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryGrid;
