import "../styles/globals.scss";
import "catppuccin-highlightjs/src/catppuccin-highlight.scss";
import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "next-themes";
import { ReactElement, ReactNode, useRef } from "react";
import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";

config.autoAddCss = false;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function GetCrystal({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider
      attribute="class"
      value={{ light: "ctp-latte", dark: "ctp-mocha" }}
      themes={["ctp-mocha", "ctp-latte"]}
    >
      <Layout>
        {getLayout(
          <MDXProvider>
            <DefaultSeo {...SEO} />

            <Component {...pageProps} />
          </MDXProvider>
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(GetCrystal);
