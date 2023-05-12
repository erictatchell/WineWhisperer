import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
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
    async signIn(user, account, profile) {
      const client = await clientPromise;
      const db = client.db();

      // Create a new document in the userExtras collection if it doesn't exist
      const userExtraCollection = db.collection("userExtras");
      const filter = { email: user.email };
      const updateDoc = {
        $setOnInsert: {
          id: user.id,
          email: user.email,
          saved: [],
        },
      };
      const options = { upsert: true };
      await userExtraCollection.updateOne(filter, updateDoc, options);

      return true;
    },
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, user) {
      if (user) {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("userExtras");

        const extraData = await collection.findOne({ email: user.email });

        if (extraData) {
          session.user.id = extraData.id;
          session.user.saved = extraData.saved;
        }
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
