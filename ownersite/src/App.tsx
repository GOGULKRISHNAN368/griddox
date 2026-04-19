import { useState, useEffect, useRef } from 'react'
import './App.css'

interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  link: string;
  createdAt: string;
}

function App() {
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3001' : `http://${window.location.hostname}:3001`;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch banners on load
  useEffect(() => {
    fetchBanners();
  }, []);

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

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setStatus('Processing and uploading image...');

    try {
      const base64 = await convertToBase64(file);
      
      const response = await fetch(`${API_BASE}/api/add-banner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Banner - ${file.name}`,
          imageUrl: base64,
          link: '#'
        }),
      });

      if (response.ok) {
        setStatus('Banner successfully saved to MongoDB Atlas!');
        fetchBanners(); // Refresh list
      } else {
        const errorData = await response.json();
        setStatus(errorData.message || 'Failed to upload banner.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error connecting to server.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this banner?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/api/banners/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setStatus('Banner removed successfully.');
        fetchBanners();
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error removing banner.');
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="logo">GRIDOX <span>Owner Portal</span></div>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li className="active">Banners</li>
            <li>Products</li>
            <li>Settings</li>
          </ul>
        </nav>
      </header>

      <main className="admin-main">
        <div className="page-title">
          <h1>Dynamic Banner Management</h1>
          <p>Upload images directly to store them in your MongoDB Atlas cloud database.</p>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          style={{ display: 'none' }} 
        />

        <div className="banner-grid">
          <div className="banner-card add-new" onClick={triggerUpload}>
            <div className="card-content">
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <div className="plus-icon">+</div>
                  <h3>Upload New Image</h3>
                  <p>Click to select an image from your device</p>
                </>
              )}
            </div>
          </div>
          
          {banners.map(banner => (
            <div key={banner._id} className="banner-card fade-in">
               <div className="banner-preview" style={{backgroundImage: `url("${banner.imageUrl}")`}}></div>
               <div className="banner-info">
                 <div className="info-header">
                    <h4>{banner.title}</h4>
                    <button className="delete-btn" onClick={() => handleDelete(banner._id)}>Remove</button>
                 </div>
                 <p>Stored in Atlas: {new Date(banner.createdAt).toLocaleDateString()}</p>
               </div>
            </div>
          ))}
        </div>

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
