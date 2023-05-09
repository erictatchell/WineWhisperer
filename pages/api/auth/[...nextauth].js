import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import { connectToDatabase } from "../../../lib/mongodb";

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
    async session(session, user) {
      session.user.id = user.id;
      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn(user, account, profile) {
      const { db } = await connectToDatabase();
      if (db) {
        await db.collection('users').updateOne(
          { id: profile.id },
          {
            $set: {
              name: profile.name,
              email: profile.email,
              image: profile.image,
            },
          },
          { upsert: true }
        );
      }
      return true;
    },
  },

  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
