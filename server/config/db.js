const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campus_lost_found';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Warning: ${error.message}`);
    console.warn('⚠️ Server will remain online. Please verify MONGO_URI is configured in your Render environment variables.');
  }
};

module.exports = connectDB;
