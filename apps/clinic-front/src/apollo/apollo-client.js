import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // IMPORTANT!: ApolloClint uri
    uri: "https://api.lucem.kz/graphql",
    cache: new InMemoryCache(),
});

export default client;
