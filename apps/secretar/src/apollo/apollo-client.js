import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";
import axios from "axios";
import { getCsrfToken, getSession } from "next-auth/client";

const httpLink = createHttpLink({
    uri: "http://localhost:3000/graphql",
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;
