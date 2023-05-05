// lib/mongoDb.js
import { MongoClient } from 'mongodb';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db();
  cachedDb = db;
  return db;
}

export default connectToDatabase;
