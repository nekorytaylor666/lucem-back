import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // IMPORTANT!: ApolloClint uri
    uri: "https://lucem-back-production.up.railway.app/graphql",
    cache: new InMemoryCache(),
});

export default client;
