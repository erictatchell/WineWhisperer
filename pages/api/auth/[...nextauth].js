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
  callbacks: {
    async jwt(token, user) {
      if (user) { 
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
          
        const { db } = await connectToDatabase();
        const collection = db.collection('users');
  
        // Check if user already exists in the database
        const existingUser = await collection.findOne({ _id: new ObjectId(user.id) });
  
        // If user does not exist, add them
        if (!existingUser) {
          await collection.insertOne({
            _id: new ObjectId(user.id),
            email: user.email,
            name: user.name,
          });
        }
      }
      return token;
    },
  },
  
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
