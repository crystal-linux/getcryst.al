import "../styles/globals.css";
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
    <ThemeProvider attribute="class">
      <Layout>
        <DefaultSeo {...SEO} />

        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default GetCrystal;
