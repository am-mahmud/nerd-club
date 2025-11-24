import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';

let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
  return client.db('DB');
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const db = await connectToDatabase();
        const user = await db.collection('users').findOne({ username: credentials.username });
        
        if (user && credentials.password === user.password) {
          return { id: user._id, username: user.username };
        } else {
          throw new Error('Invalid username or password');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    logIn: '/',
  },
});