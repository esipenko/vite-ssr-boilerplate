import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core/index.js'
import { APOLLO_URL } from './constants.ts'
import fetch from 'cross-fetch'
export default function createApolloServerInstance() {
    // HTTP connection to the API
    const httpLink = createHttpLink({
        // You should use an absolute URL here
        uri: APOLLO_URL,
        fetch,
    })

    // Cache implementation
    const cache = new InMemoryCache()

    // Create the apollo client
    return new ApolloClient({
        link: httpLink,
        cache,
    })

}