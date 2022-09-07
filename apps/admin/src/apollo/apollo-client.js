import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
    uri: "https://api.lucem.kz/graphql",
    cache: new InMemoryCache(),
    link: createUploadLink({ uri: "https://api.lucem.kz/graphql" }),
});

export default client;
