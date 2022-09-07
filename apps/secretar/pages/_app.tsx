import React, { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "public/styles/global.css";
import { NextPage } from "next";
import DependeciesWrapper from "src/utils/DependeciesWrapper";
import getAdminLayout from "components/layouts/adminLayout";
import { Provider, SessionProvider } from "next-auth/client";
import { AuthGuard } from "components/template/AuthGuard";
import Head from "next/head";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
    isPublic?: boolean;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout): JSX.Element {
    const getLayout = Component.getLayout || ((page) => getAdminLayout(page));
    return (
        <Provider session={session}>
            <DependeciesWrapper>
                <Head>
                    <title>Портал секретаря "Lucem"</title>
                    <link
                        rel="icon"
                        href="/icons/favicon.png"
                        type="image/png"
                    />
                </Head>
                {!Component.isPublic ? (
                    <AuthGuard>
                        {getLayout(<Component {...pageProps} />)}
                    </AuthGuard>
                ) : (
                    <Component {...pageProps} />
                )}
            </DependeciesWrapper>
        </Provider>
    );
}

export default MyApp;
