// lib/mongodb.js
import { MongoClient } from 'mongodb'

let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db();
  cachedDb = db;
  return db;
}