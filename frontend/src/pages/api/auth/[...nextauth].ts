import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      const name = token.name?.split(" ") ?? [];
      const loginPayload = {
        firstName: name[0],
        lastName: name[1],
        email: token.email,
        image: token.picture,
      };
      const result = await axios.post(`${process.env.NEXT_PUBLIC_API_LINK}/auth/login`, loginPayload)
      if (account) {
        token.accessToken = result.data.accessToken;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
