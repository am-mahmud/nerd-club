import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;
        
        // Check if user has a password (not a Google user)
        if (!user.password) {
          throw new Error("Please sign in with Google");
        }
        
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return { id: String(user._id), name: user.name, email: user.email };
      }
    })
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await dbConnect();
        
        // Check if user already exists
        let existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          // Create new user for Google sign-in
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            // No password for Google users
            provider: "google",
            googleId: account.providerAccountId
          });
        }
        
        // Update user ID to use our database ID
        user.id = String(existingUser._id);
      }
      
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      if (token?.provider) {
        session.user.provider = token.provider;
      }
      return session;
    }
  },

  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };