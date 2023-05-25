import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

// Generate a random string to use as the 'id' property in the 'userExtras' collection
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
     // On sign-in, create a new document in the userExtras collection if it doesn't exist 
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
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        // Fetch the user's 'id' from the 'userExtras' collection
        const client = await clientPromise;
        const db = client.db();
        const userExtraCollection = db.collection("userExtras");
        const userExtra = await userExtraCollection.findOne({ email: user.email });

        // Add the 'id' from 'userExtras' to the token
        if (userExtra && userExtra.id) {
          token.customId = userExtra.id;
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      // Check if token exists and if it has a 'customId' property before assigning it
      if (token && token.customId) {
        session.user.customId = token.customId;
      }
      return session;
    }
  },
};

export default NextAuth(authOptions);
