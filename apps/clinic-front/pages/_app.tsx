import React, { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "public/styles/global.css";
import { NextPage } from "next";
import DependeciesWrapper from "src/utils/DependeciesWrapper";
import { SessionProvider } from "next-auth/react";
import withAuth from "components/hocs/withAuth";
import Script from "next/script";
import Head from "next/head";
type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout): JSX.Element {
    const getLayout = Component.getLayout || ((page) => page);
    return (
        <SessionProvider session={session}>
            <DependeciesWrapper>
                <Head>
                    <title>Клиника "Lucem"</title>
                    <link
                        rel="icon"
                        href="/icons/favicon.png"
                        type="image/png"
                    />
                </Head>
                {getLayout(<Component {...pageProps} />)}
                <Script
                    src="//code.jivosite.com/widget/9ROCKznjOu"
                    strategy="afterInteractive"
                ></Script>
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-2XEXNJJ8QY', {
                            page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
            </DependeciesWrapper>
        </SessionProvider>
    );
}

export default MyApp;
