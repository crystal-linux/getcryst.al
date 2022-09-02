import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

function GetCrystal({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default GetCrystal;
