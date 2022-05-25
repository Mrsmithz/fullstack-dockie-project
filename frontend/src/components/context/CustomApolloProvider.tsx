import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    ApolloProvider
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useSession } from "next-auth/react"
import {useMemo} from "react"
import type { AppProps } from "next/app";
// The name here doesn't really matters.
export default function CustomApolloProvider(props:any) {
    const { data: token, status } = useSession()
    const client = useMemo(() => {
        const authLink = setContext((_, { headers }) => ({
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token.accessToken}` : '',
            }
        }));

        const httpLink = createHttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
        });

        return new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });
    }, [token]);


    return <ApolloProvider client={client} {...props} />;
}