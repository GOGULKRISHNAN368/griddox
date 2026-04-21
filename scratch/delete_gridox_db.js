const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

async function deleteOldDatabase() {
  let uri = process.env.MONGODB_URI;
  
  // Point specifically to gridox_db to delete it
  if (uri.includes('.net/')) {
     const base = uri.split('.net/')[0];
     const params = uri.split('?')[1] || '';
     uri = `${base}.net/gridox_db?${params}`;
  }

  console.log('Connecting to gridox_db for deletion...');
  
  try {
    await mongoose.connect(uri);
    console.log('Connected. Deleting gridox_db now...');
    
    await mongoose.connection.db.dropDatabase();
    
    console.log('✅ Success! gridox_db has been permanently deleted.');
  } catch (err) {
    console.error('❌ Error during deletion:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

deleteOldDatabase();
