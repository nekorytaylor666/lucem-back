import React from "react";
import { initializeApollo } from "@services/graphql";
import { ApolloProvider } from "@apollo/client";
import { RecoilRoot } from "recoil";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@lucem/ui/theme";
const DependeciesWrapper: React.FC = ({ children }) => {
    const apolloClient = initializeApollo();

    return (
        <ChakraProvider theme={theme}>
            <AnimateSharedLayout>
                <AnimatePresence exitBeforeEnter>
                    <ApolloProvider client={apolloClient}>
                        <RecoilRoot>{children}</RecoilRoot>
                    </ApolloProvider>
                </AnimatePresence>
            </AnimateSharedLayout>
        </ChakraProvider>
    );
};

export default DependeciesWrapper;
