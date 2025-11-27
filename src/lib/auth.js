// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/models/User";
// import dbConnect from "@/lib/mongo";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         await dbConnect();
        
//         const user = await User.findOne({ email: credentials.email });
        
//         if (!user) {
//           throw new Error("No user found");
//         }
        
//         const isValid = await bcrypt.compare(credentials.password, user.password);
        
//         if (!isValid) {
//           throw new Error("Invalid password");
//         }
        
//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name
//         };
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt"
//   },
//   pages: {
//     signIn: "/login"
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//       }
//       return session;
//     }
//   }
// };



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
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        await dbConnect();
        
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) {
          throw new Error("No user found");
        }
        
        if (!user.password) {
          throw new Error("Please sign in with Google");
        }
        
        const isValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { 
          id: String(user._id), 
          name: user.name, 
          email: user.email 
        };
      }
    })
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await dbConnect();
        
        let existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            provider: "google",
            googleId: account.providerAccountId
          });
        }
      
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