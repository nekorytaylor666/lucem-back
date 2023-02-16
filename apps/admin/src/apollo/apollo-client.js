import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
    uri: "http://lucem-back-production.up.railway.app/graphql",
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: "http://lucem-back-production.up.railway.app/graphql",
    }),
});

export default client;
