const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3001';

async function testAddCategory() {
  try {
    console.log('--- TEST: Adding Category Directly via API ---');
    
    // Read a local image as source
    const imagePath = path.join(__dirname, '../clientwebsite/src/assets/hero-1.jpg');
    if (!fs.existsSync(imagePath)) {
        console.error('Test image not found at:', imagePath);
        return;
    }
    
    const imageData = fs.readFileSync(imagePath);
    const base64 = `data:image/jpeg;base64,${imageData.toString('base64')}`;
    
    const categoryData = {
      name: 'AI TEST CATEGORY',
      description: 'This is a test category added by the AI to verify the backend saving logic.',
      fullImage: base64,
      thumbnailImage: base64 // Using same image for test
    };

    console.log('Sending request to /api/add-category...');
    const response = await fetch(`${API_BASE}/api/add-category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('SUCCESS!');
      console.log('Saved Record ID:', result.data._id);
      console.log('Saved fullImage length:', result.data.fullImage ? result.data.fullImage.length : 0);
      console.log('Saved thumbnailImage length:', result.data.thumbnailImage ? result.data.thumbnailImage.length : 0);
      console.log('Saved image (fallback) length:', result.data.image ? result.data.image.length : 0);
    } else {
      console.error('FAILED:', result.message);
    }
  } catch (error) {
    console.error('ERROR during fetch:', error.message);
  }
}

testAddCategory();
