import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // IMPORTANT!: ApolloClint uri
    uri: "http://lucem-back-production-08e3.up.railway.app",
    cache: new InMemoryCache(),
});

export default client;
