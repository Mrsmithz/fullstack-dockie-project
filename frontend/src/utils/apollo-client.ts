import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { useSession, signIn, signOut } from "next-auth/react"


const link = new HttpLink({ 
    uri:process.env.NEXT_PUBLIC_GRAPHQL_API,
    headers:{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODkyNTg2MjY2OWU1ZjE1Mjc0ZjIyMyIsImlhdCI6MTY1MzE1NTIwNiwiZXhwIjoxNjUzNzYwMDA2fQ.DsrAnvsVTbgXUbVbpMRkX0gsqiD4-TlBuerVpNu4yBw"}
  });

const client = new ApolloClient({
    // uri:process.env.NEXT_PUBLIC_GRAPHQL_API,
    cache: new InMemoryCache(),
    link

})

export default client