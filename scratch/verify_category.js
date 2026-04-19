const API_BASE = 'http://localhost:3001';

async function verifyLastCategory() {
  try {
    const response = await fetch(`${API_BASE}/api/categories`);
    const categories = await response.json();
    if (categories.length > 0) {
      const last = categories[categories.length - 1];
      console.log('--- Verification of Last Category ---');
      console.log('Name:', last.name);
      console.log('Keys in object:', Object.keys(last));
      console.log('fullImage length:', last.fullImage ? last.fullImage.length : 'MISSING');
      console.log('thumbnailImage length:', last.thumbnailImage ? last.thumbnailImage.length : 'MISSING');
      console.log('image length:', last.image ? last.image.length : 'MISSING');
    } else {
      console.log('No categories found.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

verifyLastCategory();
