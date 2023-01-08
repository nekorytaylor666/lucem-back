import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
    uri: "https://api.pulse.org.kg/graphql",
    cache: new InMemoryCache(),
    link: createUploadLink({ uri: "https://api.pulse.org.kg/graphql" }),
});

export default client;
