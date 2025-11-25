// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "./mongo";
// import bcrypt from "bcryptjs";
// import User from "@/models/User";

// export const authOptions = {
//   session: {
//     strategy: "jwt",
//   },

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

//         if (!user) throw new Error("User not found");
        
//         const isValid = await bcrypt.compare(credentials.password, user.password);

//         if (!isValid) throw new Error("Invalid password");

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//         };
//       }
//     })
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.id = user.id;
//       return token;
//     },

//     async session({ session, token }) {
//       if (token) session.user.id = token.id;
//       return session;
//     }
//   },

//   pages: {
//     signIn: "/login",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

export { handlers, auth, signIn, signOut };
