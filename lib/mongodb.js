// mongodb.js
import { MongoClient } from 'mongodb'

let cachedDb = null;

export async function connectToDatabase() {
  console.log("Connecting to MongoDB...");
  if (cachedDb) {
    console.log("Using cached database instance.");
    return { db: cachedDb };
  }
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(process.env.MONGODB_DATABASE);
  console.log("Successfully connected to MongoDB.");
  cachedDb = db;
  return { db: db };
}
