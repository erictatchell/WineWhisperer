import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

function generateRandomString() {
  let pattern = 'W';
  const min = 0;
  const max = 9;

  for (let i = 0; i < 7; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    pattern += randomNumber;
  }

  return pattern;
}

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("users");

      const { email, name, image } = user;
      const id = generateRandomString();

      const saved = []; // your empty array

      await collection.updateOne({"email" : user.email}, {"$set": {"saved": saved, "id": id}})
    },
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
