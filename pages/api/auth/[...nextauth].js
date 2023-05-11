import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import { connectToDatabase } from "../../../lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

function generateRandomString() {
  let pattern = "W";
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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // This callback is called whenever a new JWT is created. 
      // You can add additional fields to the user object here. 
      // These fields will be included in the JWT and will be available in the session object on the client side.
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      // This callback is called whenever a new session is created. 
      // The token parameter contains the fields added in the jwt callback.
      session.user.id = token.id;
      return session;
    },
    async signIn(user, account, profile) {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("users");

      const randomId = generateRandomString();

      // Update the user document created by NextAuth instead of creating a new one
      await collection.updateOne(
        { _id: user.id }, // Use the user id returned by NextAuth
        { $set: { customId: randomId, saved: [] } }
      );

      return true;
    },
  },

  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
