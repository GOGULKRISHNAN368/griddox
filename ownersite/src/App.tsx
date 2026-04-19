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

function App() {
  const [activeTab, setActiveTab] = useState<'banners' | 'new-arrivals'>('banners');
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    discount: '',
    image: ''
  });

  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3001' : `http://${window.location.hostname}:3001`;
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const productInputRef = useRef<HTMLInputElement>(null);

  // Fetch data on load and tab change
  useEffect(() => {
    if (activeTab === 'banners') fetchBanners();
    else fetchProducts();
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

  const optimizeImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max resolution to avoid Atlas limits & browser lag while keeping high quality
          const MAX_SIZE = 1920; 
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);
            // Use high quality JPEG for best balance
            resolve(canvas.toDataURL('image/jpeg', 0.92));
          } else {
            resolve(e.target?.result as string);
          }
        };
      };
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

  const handleProductImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setStatus('Optimizing product image...');
    try {
      const base64 = await optimizeImage(file);
      setProductForm(prev => ({ ...prev, image: base64 }));
      setStatus('Image ready.');
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

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="logo">GRIDOX <span>Owner Portal</span></div>
        <nav>
          <ul>
            <li onClick={() => setActiveTab('banners')} className={activeTab === 'banners' ? 'active' : ''}>Banners</li>
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
