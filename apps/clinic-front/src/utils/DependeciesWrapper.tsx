import React from "react";
import { initializeApollo } from "@services/graphql";
import { ApolloProvider } from "@apollo/client";
import { RecoilRoot } from "recoil";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";

const DependeciesWrapper: React.FC = ({ children }) => {
    const apolloClient = initializeApollo();

    return (
        <AnimateSharedLayout>
            <AnimatePresence exitBeforeEnter>
                <ApolloProvider client={apolloClient}>
                    <RecoilRoot>{children}</RecoilRoot>
                </ApolloProvider>
            </AnimatePresence>
        </AnimateSharedLayout>
    );
};

export default DependeciesWrapper;
