import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createUploadLink({
        uri: "http://lucem-back-production.up.railway.app/graphql",
        // uri: "http://lucem-back-production.up.railway.app/graphql",
        // uri: "http://8316-93-190-240-68.ngrok.io/graphql",
    }) as any,
    cache: new InMemoryCache(),
});

export const initializeApollo = () => {
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") {
        return createApolloClient;
    }

    // Create the Apollo Client once in the client
    if (!apolloClient) {
        apolloClient = createApolloClient;
    }

    return apolloClient;
};
