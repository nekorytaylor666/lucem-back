import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // IMPORTANT!: ApolloClint uri
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
});

export default client;
