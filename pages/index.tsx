import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/future/image";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import onyxDark from "../public/demos/onyx-dark.png";
import onyxLight from "../public/demos/onyx-light.png";
import timeshiftSnapshots from "../public/demos/timeshift-snapshots.png";
import AmePreview from "../components/AmePreview";
import HomeSection from "../components/HomeSection";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "footer",
        "home",
        "navbar",
      ])),
    },
  };
};

const Home: NextPageWithLayout = () => {
  const { resolvedTheme } = useTheme();
  const { locale } = useRouter();

  const { t: common } = useTranslation("common");
  const { t } = useTranslation("home");

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-4 pt-36 text-center md:px-8 md:pb-32 lg:pt-44">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-ctp-text md:text-5xl lg:text-6xl">
            {common("header")}
          </h1>
          <p className="mb-6 text-lg font-normal text-ctp-subtext1 sm:px-16 lg:text-xl xl:px-48">
            {common("subtitle")}
          </p>

          <div className="flex w-full flex-wrap justify-center gap-2">
            <a
              className="inline-flex w-full items-center justify-center rounded-lg bg-ctp-mauve py-3 px-5 text-center text-base font-medium text-ctp-base no-underline focus:ring-4 sm:w-fit"
              href="https://github.com/crystal-linux/iso/releases/latest"
            >
              {common("generics.download")}
            </a>

            <Link href="/docs/crystal-linux/getting-started">
              <a className="inline-flex w-full items-center justify-center gap-2 rounded-lg py-3 px-5 text-center text-base font-medium text-ctp-text no-underline focus:ring-4 sm:w-fit">
                {common("generics.getting_started")}
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </Link>
          </div>
        </div>
      </section>

      <HomeSection className="">
        <div className="basis-1/4">
          <p className="mt-8 font-semibold text-ctp-maroon">{t("onyx.tag")}</p>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-ctp-text sm:text-4xl">
            {t("onyx.title")}
          </p>
          <p className="mt-4 max-w-3xl text-ctp-subtext1">
            {t("onyx.description")}
          </p>
        </div>

        <div className="flex basis-3/4 justify-center">
          <Image
            src={resolvedTheme === "dark" ? onyxDark : onyxLight}
            className="rounded-xl shadow-lg shadow-ctp-crust"
            alt="demo of the onyx desktop environment"
          />
        </div>
      </HomeSection>

      <HomeSection>
        <div>
          <p className="mt-8 font-semibold text-ctp-rosewater">
            {t("timeshift.tag")}
          </p>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-ctp-text sm:text-4xl">
            {t("timeshift.title")}
          </p>
          <p className="mt-4 max-w-3xl space-y-6 text-ctp-subtext1">
            {t("timeshift.description")}
          </p>
        </div>

        <div className="flex basis-3/4 justify-center">
          <Image
            src={timeshiftSnapshots}
            className="rounded-xl shadow-lg shadow-ctp-crust"
            alt="a screenshot showing timeshift, a graphical snapshot tool. 5 snapshots are shown in the window."
          />
        </div>
      </HomeSection>

      <HomeSection className="pb-16 md:pb-28">
        <div className="basis-1/4">
          <p className="mt-8 font-semibold text-ctp-mauve">
            {t("amethyst.tag")}
          </p>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-ctp-text sm:text-4xl">
            {t("amethyst.title")}
          </p>
          <p className="mt-4 max-w-3xl text-ctp-subtext1">
            {t("amethyst.description")}
          </p>

          <Link href="/docs/amethyst/getting-started">
            <a className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ctp-mantle bg-ctp-surface0 py-2 px-4 text-center text-base font-medium text-ctp-text no-underline focus:ring-4 sm:w-fit">
              {common("generics.learn_more")}
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </Link>
        </div>

        <div className="flex basis-3/4 justify-center">
          <AmePreview />
        </div>
      </HomeSection>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <main className="flex flex-col items-center">{page}</main>;
};

export default Home;
