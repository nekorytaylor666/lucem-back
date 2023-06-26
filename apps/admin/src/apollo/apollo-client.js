import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
    uri: "http://lucem-back-production-08e3.up.railway.app",
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: "http://lucem-back-production-08e3.up.railway.app",
    }),
});

export default client;
