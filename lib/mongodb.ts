import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://ankitkumar63703_db_user:dX5nMGRz88yBRXfN@ac-e33rp2s-shard-00-00.e33rp2.mongodb.net:27017,ac-e33rp2s-shard-00-01.e33rp2.mongodb.net:27017,ac-e33rp2s-shard-00-02.e33rp2.mongodb.net:27017/bagcorner?ssl=true&replicaSet=atlas-e33rp2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose | null> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(m => m).catch(err => {
      cached.promise = null;
      console.warn('MongoDB connection unavailable, using fallback data:', err.message);
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch {
    cached.conn = null;
    return null;
  }
}

export default connectDB;
