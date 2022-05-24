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
      axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODkyNTg2MjY2OWU1ZjE1Mjc0ZjIyMyIsImlhdCI6MTY1MzE1NTIwNiwiZXhwIjoxNjUzNzYwMDA2fQ.DsrAnvsVTbgXUbVbpMRkX0gsqiD4-TlBuerVpNu4yBw`
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
