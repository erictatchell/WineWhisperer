  import NextAuth from "next-auth";
  import GoogleProvider from "next-auth/providers/google";
  import InstagramProvider from "next-auth/providers/instagram";
  import { connectToDatabase } from "../../../lib/mongodb";
  import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
  import clientPromise from "../../../lib/mongodb"

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
      async signIn(user) {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("users");
  
        await collection.updateOne(
          { email: user.email },
          { $set: { name: user.name } },
          { upsert: true }
        );
        return true;
      },
    },
    secret: process.env.JWT_SECRET,
  };

  export default NextAuth(authOptions);
