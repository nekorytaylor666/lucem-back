import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // IMPORTANT!: ApolloClint uri
    uri: "https://api.pulse.org.kg/graphql",
    cache: new InMemoryCache(),
});

export default client;
