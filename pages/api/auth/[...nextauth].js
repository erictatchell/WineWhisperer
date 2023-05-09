import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import { connectToDatabase } from "../../../lib/mongodb";
import MongoClient from 'mongodb'

const authOptions = {
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
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);

/*
callbacks: {
  async jwt(token, user, account, profile, isNewUser) {
    const db = await connectToDatabase();
    const users = db.collection("users");
    if (isNewUser) {
      const userDoc = {
        accountId: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      };
      await users.insertOne(userDoc);
    }
    token.id = user.id;
    return token;
  },
  async session(session, token) {
    session.user.id = token.id;
    return session;
  },
},
*/