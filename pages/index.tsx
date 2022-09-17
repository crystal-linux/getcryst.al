import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/future/image";

import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";

import onyxDark from "../public/demos/onyx-dark.png";
import onyxLight from "../public/demos/onyx-light.png";
import AmePreview from "../components/AmePreview";
import HomeSection from "../components/HomeSection";

const Home: NextPageWithLayout = () => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-4 pt-36 text-center md:px-8 md:pb-32 lg:pt-44">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-ctp-text md:text-5xl lg:text-6xl">
            An arch based distribution
          </h1>
          <p className="mb-6 text-lg font-normal text-ctp-subtext1 sm:px-16 lg:text-xl xl:px-48">
            Crystal Linux is a brand new Arch Linux based distritbution.
            Powerful and easy to use.
          </p>

          <div className="space-2 w-full space-y-2">
            <a
              className="inline-flex w-full items-center justify-center rounded-lg bg-ctp-mauve py-3 px-5 text-center text-base font-medium text-ctp-base focus:ring-4 sm:w-fit"
              href="https://github.com/crystal-linux/iso/releases/latest"
            >
              Download
            </a>

            <Link href="/docs/crystal-linux/getting-started">
              <a className="inline-flex w-full items-center justify-center gap-2 rounded-lg py-3 px-5 text-center text-base font-medium text-ctp-text focus:ring-4 sm:w-fit">
                Getting Started
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </Link>
          </div>
        </div>
      </section>

      <HomeSection className="">
        <div className="basis-1/4">
          <p className="mt-8 font-semibold text-ctp-maroon">Beautiful</p>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-ctp-text sm:text-4xl">
            Onyx built-in
          </p>
          <p className="mt-4 max-w-3xl text-ctp-subtext1">
            Install Crystal with it{"'"}s in-house desktop experience, a custom
            GNOME session with a familiar layout. Or choose your favourite!
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
          <p className="mt-8 font-semibold text-ctp-rosewater">Buttery</p>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-ctp-text sm:text-4xl">
            Automatic Backups
          </p>
          <p className="mt-4 max-w-3xl space-y-6 text-ctp-subtext1">
            Backup & Restore your system. Easily boot into Btrfs snapshots.
          </p>
        </div>
      </HomeSection>

      <HomeSection className="pb-28">
        <div className="basis-1/4">
          <p className="mt-8 font-semibold text-ctp-mauve">Rusty Quartz?</p>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-ctp-text sm:text-4xl">
            Amethyst
          </p>
          <p className="mt-4 max-w-3xl text-ctp-subtext1">
            Amethyst is a fast, efficient and lightweight AUR helper and Pacman
            wrapper. Made for Crystal, compatible with any Arch-based Linux
            distribution
          </p>
        </div>

        <div className="flex basis-3/4 justify-center">
          <AmePreview />
        </div>
      </HomeSection>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <main className="flex flex-col items-center bg-ctp-base">{page}</main>;
};

export default Home;
