import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../helpers/db"; 
import { compare } from "bcryptjs"; 

export const authOptions = {
  providers: [

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // 'api/auth/signin' api (Sign-in Of the user)
      async authorize(credentials) {
        const { email, password } = credentials;
        
        const { db } = await connectToDatabase();

      
        const user = await db.collection("users").findOne({ email });

        if (!user) {
          throw new Error('No User Found');
        }

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error('Wrong Credentials');
        }

        return { id: user._id.toString(), email: user.email, username: user.username };
          
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // Also putting the username in the session for re-use in the layout
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    }
  }
};

export default NextAuth(authOptions);