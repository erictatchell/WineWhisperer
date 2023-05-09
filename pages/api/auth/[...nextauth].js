import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

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
      console.log('JWT callback invoked');
      if (user) { 
        console.log('User object:', user);
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
          
        const { db } = await connectToDatabase();
        console.log('Connected to database');
        const collection = db.collection('users');
        console.log('Collection selected');
  
        // Check if user already exists in the database
        const existingUser = await collection.findOne({ _id: new ObjectId(user.id) });
        console.log('Existing user:', existingUser);
  
        // If user does not exist, add them
        if (!existingUser) {
          console.log('User does not exist in DB. Inserting...');
          await collection.insertOne({
            _id: new ObjectId(user.id),
            email: user.email,
            name: user.name,
          });
          console.log('User inserted');
        } else {
          console.log('User already exists in DB');
        }
      } else {
        console.log('User object is undefined');
      }
      console.log('Token:', token);
      return token;
    },
    async session(session, token) {
      console.log('Session callback invoked');
      console.log('Token:', token);
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      console.log('Session:', session);
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
