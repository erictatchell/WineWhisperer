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
      if (user && user.sub) {
        session.user.id = user.sub;
      }
      return session;
    },
    async jwt(token, user) {
      if (user && user.sub) {
        token.id = user.sub;
      }
      return token;
    },
    async signIn(user, account, profile) {
      const { db } = await connectToDatabase();
      if (db) {
        const { id, name, email, image } = user.id ? user : profile;
        const accountId = account?.id; // Access the account id if it exists
        const userId = id || profile.sub || accountId; // Use the first defined value
        await db.collection('users').updateOne(
          { id: userId },
          {
            $set: {
              name: name,
              email: email,
              image: image,
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
