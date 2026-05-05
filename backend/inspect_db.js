const mongoose = require('mongoose');

const URI = "mongodb+srv://gogul:admin123@cluster0.ycdwfuv.mongodb.net/test?retryWrites=true&w=majority";

async function inspect() {
  try {
    console.log('Connecting to database...');
    const conn = await mongoose.createConnection(URI).asPromise();
    console.log('Connected to:', conn.name);

    const collections = await conn.db.listCollections().toArray();
    console.log(`\nFound ${collections.length} collections:`);
    console.log('-----------------------------------');

    for (const col of collections) {
      const count = await conn.collection(col.name).countDocuments();
      console.log(`${col.name.padEnd(20)} : ${count} documents`);
    }

    console.log('-----------------------------------');
    await conn.close();
  } catch (error) {
    console.error('Inspection Error:', error);
  } finally {
    process.exit(0);
  }
}

inspect();
