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
    async signIn({ user, account, profile, email, credentials }) {
      const client = await clientPromise;
      const db = client.db();

      // Create a new document in the userExtras collection if it doesn't exist
      const userExtraCollection = db.collection("userExtras");
      const filter = { email: user.email };
      const updateDoc = {
        $setOnInsert: {
          id: generateRandomString(),
          email: user.email,
          saved: [],
        },
      };
      const options = { upsert: true };
      await userExtraCollection.updateOne(filter, updateDoc, options);

      return true;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // ...
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Add the user's email to the token
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, user, token }) {
      // Check if token exists and if it has an email property before assigning it
      if (token && token.email) {
        session.user.email = token.email;
      }
      return session;
    }

  },
};

export default NextAuth(authOptions);
