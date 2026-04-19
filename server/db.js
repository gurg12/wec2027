import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('[db] MONGODB_URI not set — skipping connection.');
    return false;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    isConnected = true;
    console.log('[db] connected');
    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('[db] disconnected');
    });
    mongoose.connection.on('reconnected', () => {
      isConnected = true;
      console.log('[db] reconnected');
    });
    return true;
  } catch (err) {
    isConnected = false;
    console.error('[db] connection failed:', err.message);
    return false;
  }
}

export function dbReady() {
  return isConnected && mongoose.connection.readyState === 1;
}
