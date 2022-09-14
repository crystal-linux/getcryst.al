import "../styles/globals.scss";
import "catppuccin-highlightjs/src/catppuccin-highlight.scss"
import { MDXProvider } from '@mdx-js/react'
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "next-themes";

config.autoAddCss = false;

function GetCrystal({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      value={{ light: "ctp-latte", dark: "ctp-mocha" }}
      themes={["ctp-mocha", "ctp-latte"]}
    >
      <Layout>
        <MDXProvider>
          <DefaultSeo {...SEO} />

          <Component {...pageProps} />
        </MDXProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default GetCrystal;
