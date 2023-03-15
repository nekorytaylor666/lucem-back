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
                <noscript>
                    <div>
                        <img
                            src="https://mc.yandex.ru/watch/92815045"
                            style="position:absolute; left:-9999px;"
                            alt=""
                        />
                    </div>
                </noscript>

                <Script
                    src="//code.jivosite.com/widget/9ROCKznjOu"
                    strategy="afterInteractive"
                ></Script>
                <Script
                    id="yandex"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
   <script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(92815045, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/92815045" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
                        `,
                    }}
                />
            </DependeciesWrapper>
        </SessionProvider>
    );
}

export default MyApp;
