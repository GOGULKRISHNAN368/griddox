import { useState, useEffect, useRef } from 'react'
import './App.css'

interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  link: string;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  category: string;
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
  image?: string;
  fullImage?: string;
  thumbnailImage?: string;
  description: string;
  slug: string;
  createdAt: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<'banners' | 'new-arrivals' | 'categories'>('banners');
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    discount: '',
    image: ''
  });

  // Category Form State
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    fullImage: '',
    thumbnailImage: ''
  });

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3001' : `http://${window.location.hostname}:3001`;
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const productInputRef = useRef<HTMLInputElement>(null);
  const categoryFullInputRef = useRef<HTMLInputElement>(null);
  const categoryThumbInputRef = useRef<HTMLInputElement>(null);

  // Fetch data on load and tab change
  useEffect(() => {
    if (activeTab === 'banners') fetchBanners();
    else if (activeTab === 'new-arrivals') fetchProducts();
    else if (activeTab === 'categories') fetchCategories();
  }, [activeTab]);

  const fetchBanners = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/banners`);
      if (response.ok) {
        const data = await response.json();
        setBanners(data);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/products?category=new-arrivals`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const optimizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setStatus('Optimizing and uploading banner...');

    try {
      const base64 = await optimizeImage(file);
      const response = await fetch(`${API_BASE}/api/add-banner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: `Banner - ${file.name}`, imageUrl: base64, link: '#' }),
      });

      if (response.ok) {
        setStatus('Banner successfully saved!');
        fetchBanners();
      } else {
        setStatus('Failed to upload banner.');
      }
    } catch (error) {
      setStatus('Error connecting to server.');
    } finally {
      setIsLoading(false);
      if (bannerInputRef.current) bannerInputRef.current.value = '';
    }
  };

  const standardizeNewArrival = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const TARGET_W = 1200;
          const TARGET_H = 1600;
          canvas.width = TARGET_W;
          canvas.height = TARGET_H;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, TARGET_W, TARGET_H);

            const imgRatio = img.width / img.height;
            const targetRatio = TARGET_W / TARGET_H;
            let drawW, drawH, offsetLeft, offsetTop;

            if (imgRatio > targetRatio) {
              drawH = TARGET_H;
              drawW = img.width * (TARGET_H / img.height);
              offsetLeft = (TARGET_W - drawW) / 2;
              offsetTop = 0;
            } else {
              drawW = TARGET_W;
              drawH = img.height * (TARGET_W / img.width);
              offsetLeft = 0;
              offsetTop = (TARGET_H - drawH) / 2;
            }

            ctx.drawImage(img, offsetLeft, offsetTop, drawW, drawH);
            resolve(canvas.toDataURL('image/jpeg', 0.95));
          } else {
            resolve(e.target?.result as string);
          }
        };
      };
    });
  };

  const standardizeFullImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const TARGET_W = 1920;
          const TARGET_H = 1080;
          canvas.width = TARGET_W;
          canvas.height = TARGET_H;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            ctx.fillStyle = 'black'; // Better for backgrounds
            ctx.fillRect(0, 0, TARGET_W, TARGET_H);

            const imgRatio = img.width / img.height;
            const targetRatio = TARGET_W / TARGET_H;
            let drawW, drawH, offsetLeft, offsetTop;

            if (imgRatio > targetRatio) {
              drawH = TARGET_H;
              drawW = img.width * (TARGET_H / img.height);
              offsetLeft = (TARGET_W - drawW) / 2;
              offsetTop = 0;
            } else {
              drawW = TARGET_W;
              drawH = img.height * (TARGET_W / img.width);
              offsetLeft = 0;
              offsetTop = (TARGET_H - drawH) / 2;
            }

            ctx.drawImage(img, offsetLeft, offsetTop, drawW, drawH);
            resolve(canvas.toDataURL('image/jpeg', 0.92));
          } else {
            resolve(e.target?.result as string);
          }
        };
      };
    });
  };

  const handleProductImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setStatus('Processing to Perfect Quality (1200x1600)...');
    try {
      const base64 = await standardizeNewArrival(file);
      setProductForm(prev => ({ ...prev, image: base64 }));
      setStatus('Perfect 1200x1600 image ready.');
    } catch (error) {
       setStatus('Error processing image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.image || !productForm.name || !productForm.price) {
      setStatus('Please fill name, price and select an image.');
      return;
    }

    setIsLoading(true);
    setStatus('Adding product to Atlas...');

    try {
      const response = await fetch(`${API_BASE}/api/add-product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          price: Number(productForm.price),
          originalPrice: Number(productForm.originalPrice) || undefined,
          category: 'new-arrivals'
        }),
      });

      if (response.ok) {
        setStatus('Product added successfully!');
        setProductForm({ name: '', price: '', originalPrice: '', discount: '', image: '' });
        fetchProducts();
      } else {
        setStatus('Failed to add product.');
      }
    } catch (error) {
      setStatus('Error connecting to server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (!confirm('Remove this banner?')) return;
    try {
      const response = await fetch(`${API_BASE}/api/banners/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setStatus('Banner removed.');
        fetchBanners();
      }
    } catch (error) {
      setStatus('Error removing banner.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Remove this product?')) return;
    try {
      const response = await fetch(`${API_BASE}/api/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setStatus('Product removed.');
        fetchProducts();
      }
    } catch (error) {
      setStatus('Error removing product.');
    }
  };

  const handleCategoryFullImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setStatus('Processing high-quality background (1920x1080)...');
    try {
      const base64 = await standardizeFullImage(file);
      setCategoryForm(prev => ({ ...prev, fullImage: base64 }));
      setStatus('Background image ready.');
    } catch (error) {
      setStatus('Error processing full image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryThumbImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setStatus('Optimizing thumbnail...');
    try {
      const base64 = await optimizeImage(file);
      setCategoryForm(prev => ({ ...prev, thumbnailImage: base64 }));
      setStatus('Thumbnail ready.');
    } catch (error) {
      setStatus('Error processing thumbnail.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.thumbnailImage || !categoryForm.name || !categoryForm.description) {
      setStatus('Please fill all fields and select a Category Image.');
      return;
    }

    setIsLoading(true);
    setStatus('Adding category to Atlas...');

    try {
      const response = await fetch(`${API_BASE}/api/add-category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: categoryForm.name,
          description: categoryForm.description,
          thumbnailImage: categoryForm.thumbnailImage
        }),
      });

      if (response.ok) {
        setStatus('Category added successfully!');
        setCategoryForm({ name: '', description: '', fullImage: '', thumbnailImage: '' });
        fetchCategories();
      } else {
        setStatus('Failed to add category.');
      }
    } catch (error) {
      setStatus('Error connecting to server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Remove this category?')) return;
    try {
      const response = await fetch(`${API_BASE}/api/categories/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setStatus('Category removed.');
        fetchCategories();
      }
    } catch (error) {
      setStatus('Error removing category.');
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="logo">GRIDOX <span>Owner Portal</span></div>
        <nav>
          <ul>
            <li onClick={() => setActiveTab('banners')} className={activeTab === 'banners' ? 'active' : ''}>Banners</li>
            <li onClick={() => setActiveTab('categories')} className={activeTab === 'categories' ? 'active' : ''}>Categories</li>
            <li onClick={() => setActiveTab('new-arrivals')} className={activeTab === 'new-arrivals' ? 'active' : ''}>New Arrivals</li>
            <li>Settings</li>
          </ul>
        </nav>
      </header>

      <main className="admin-main">
        {activeTab === 'banners' ? (
          <>
            <div className="page-title">
              <h1>Main Banner Management</h1>
              <p>Upload images for the homepage hero carousel.</p>
            </div>
            <input type="file" ref={bannerInputRef} onChange={handleBannerUpload} accept="image/*" style={{ display: 'none' }} />
            <div className="banner-grid">
              <div className="banner-card add-new" onClick={() => bannerInputRef.current?.click()}>
                <div className="card-content">
                  {isLoading ? <div className="spinner"></div> : <><div className="plus-icon">+</div><h3>Add Banner</h3></>}
                </div>
              </div>
              {banners.map(banner => (
                <div key={banner._id} className="banner-card fade-in">
                   <div className="banner-preview" style={{backgroundImage: `url("${banner.imageUrl}")`}}></div>
                   <div className="banner-info">
                     <div className="info-header">
                        <h4>{banner.title}</h4>
                        <button className="delete-btn" onClick={() => handleDeleteBanner(banner._id)}>Remove</button>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </>
        ) : activeTab === 'categories' ? (
          <>
            <div className="page-title">
              <h1>Category Management</h1>
              <p>Add and manage main categories displayed on the shop section.</p>
            </div>
            
            <form className="product-form card" onSubmit={handleAddCategory} style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '4px', color: '#8b231a' }}>Recommended: 1200px x 1600px</p>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>(Standard 3:4 Portrait Ratio)</p>
                
                <div className="image-upload-box" onClick={() => categoryThumbInputRef.current?.click()} style={{ height: '350px', width: '260px', margin: '0 auto 20px', border: '2px dashed #8b231a' }}>
                  {categoryForm.thumbnailImage ? (
                    <img src={categoryForm.thumbnailImage} alt="Preview" className="preview-img" />
                  ) : (
                    <div className="placeholder">
                      <span>+</span>
                      <p>Select Category Image</p>
                    </div>
                  )}
                  <input type="file" ref={categoryThumbInputRef} onChange={handleCategoryThumbImageSelect} accept="image/*" style={{ display: 'none' }} />
                </div>
              </div>

              <div className="form-fields">
                <input type="text" placeholder="Category Name (e.g. PEPLUM CO-ORDS)" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} required />
                <textarea 
                  placeholder="Short Description for SEO and Display" 
                  value={categoryForm.description} 
                  onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} 
                  required 
                  rows={4}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '15px', width: '100%', fontFamily: 'inherit' }}
                />
                <button type="submit" disabled={isLoading || !categoryForm.thumbnailImage || !categoryForm.name} className="submit-btn" style={{ backgroundColor: '#8b231a' }}>
                  {isLoading ? 'Saving...' : 'Add Category to Site'}
                </button>
              </div>
            </form>

            <div className="product-list-grid">
              {categories.map(cat => (
                <div key={cat._id} className="product-admin-card fade-in">
                  <div className="prod-img" style={{backgroundImage: `url("${cat.thumbnailImage || cat.image}")`}}></div>
                  <div className="prod-info">
                    <h5>{cat.name}</h5>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {cat.description}
                    </p>
                    <button className="remove-link" onClick={() => handleDeleteCategory(cat._id)}>Remove Category</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="page-title">
              <h1>New Arrivals Management</h1>
              <p>Add and manage products in the "New Arrivals" section.</p>
            </div>
            
            <form className="product-form card" onSubmit={handleAddProduct}>
              <div className="form-grid">
                <div className="image-upload-box" onClick={() => productInputRef.current?.click()}>
                  {productForm.image ? (
                    <img src={productForm.image} alt="Preview" className="preview-img" />
                  ) : (
                    <div className="placeholder">
                      <span>+</span>
                      <p>Select Dress Image</p>
                    </div>
                  )}
                  <input type="file" ref={productInputRef} onChange={handleProductImageSelect} accept="image/*" style={{ display: 'none' }} />
                </div>
                <div className="form-fields">
                  <input type="text" placeholder="Dress Name" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} required />
                  <div className="price-row">
                    <input type="number" placeholder="Price" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} required />
                    <input type="number" placeholder="Old Price" value={productForm.originalPrice} onChange={e => setProductForm({...productForm, originalPrice: e.target.value})} />
                  </div>
                  <input type="text" placeholder="Discount (e.g. 20%)" value={productForm.discount} onChange={e => setProductForm({...productForm, discount: e.target.value})} />
                  <button type="submit" disabled={isLoading} className="submit-btn">
                    {isLoading ? 'Saving...' : 'Add Product to Section'}
                  </button>
                </div>
              </div>
            </form>

            <div className="product-list-grid">
              {products.map(product => (
                <div key={product._id} className="product-admin-card fade-in">
                  <div className="prod-img" style={{backgroundImage: `url("${product.image}")`}}>
                    {product.discount && <span className="discount-badge">-{product.discount}</span>}
                  </div>
                  <div className="prod-info">
                    <h5>{product.name}</h5>
                    <div className="prices">
                      <span className="p">Rs. {product.price}</span>
                      {product.originalPrice && <span className="op">Rs. {product.originalPrice}</span>}
                    </div>
                    <button className="remove-link" onClick={() => handleDeleteProduct(product._id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {status && (
          <div className={`status-message ${status.includes('Error') || status.includes('Failed') ? 'error' : 'success'}`}>
            {status}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
