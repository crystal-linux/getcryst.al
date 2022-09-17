import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

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
        <div className="flex justify-center flex-col items-center text-center px-8 pt-36 lg:pt-44 pb-32">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-ctp-text md:text-5xl lg:text-6xl">
            An arch based distribution
          </h1>
          <p className="mb-6 text-lg font-normal text-ctp-subtext1 lg:text-xl sm:px-16 xl:px-48">
            Crystal Linux is a brand new Arch Linux based distritbution.
            Powerful and easy to use.
          </p>

          <div className="w-full space-2 space-y-2">
            <a
              className="inline-flex w-full sm:w-fit justify-center items-center py-3 px-5 text-base font-medium text-center text-ctp-base bg-ctp-mauve rounded-lg focus:ring-4"
              href="https://github.com/crystal-linux/iso/releases/latest"
            >
              Download
            </a>

            <Link href="/docs/crystal-linux/getting-started">
              <a className="inline-flex w-full sm:w-fit gap-2 justify-center items-center py-3 px-5 text-base font-medium text-center text-ctp-text rounded-lg focus:ring-4">
                Getting Started
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </Link>
          </div>
        </div>
      </section>

      <HomeSection>
        <div className="basis-1/4">
          <p className="mt-8 font-semibold text-ctp-maroon">Beautiful</p>
          <p className="mt-4 text-3xl sm:text-4xl text-ctp-text font-extrabold tracking-tight">
            Onyx built-in
          </p>
          <p className="mt-4 max-w-3xl text-ctp-subtext1">
            Crystal{"'"}s in-house desktop experience, a custom GNOME session
            with a familiar layout.
          </p>
        </div>

        <div className="basis-3/4 flex justify-center">
          <Image
            src={resolvedTheme === "dark" ? onyxDark : onyxLight}
            className="rounded-xl"
            layout="intrinsic"
            alt="demo of the onyx desktop environment"
          />
        </div>
      </HomeSection>

      <HomeSection>
        <div>
          <p className="mt-8 font-semibold text-ctp-rosewater">Buttery</p>
          <p className="mt-4 text-3xl sm:text-4xl text-ctp-text font-extrabold tracking-tight">
            Automatic Backups
          </p>
          <p className="mt-4 max-w-3xl space-y-6 text-ctp-subtext1">
            Backup & Restore your system. Easily boot into Btrfs snapshots.
          </p>
        </div>
      </HomeSection>

      <HomeSection>
        <div className="basis-1/4">
          <p className="mt-8 font-semibold text-ctp-mauve">Rusty Quartz?</p>
          <p className="mt-4 text-3xl sm:text-4xl text-ctp-text font-extrabold tracking-tight">
            Amethyst
          </p>
          <p className="mt-4 max-w-3xl text-ctp-subtext1">
            Amethyst is a fast, efficient and lightweight AUR helper and Pacman
            wrapper. Made for Crystal, compatible with any Arch-based Linux
            distribution
          </p>
        </div>

        <div className="basis-3/4 flex justify-center">
          <AmePreview />
        </div>
      </HomeSection>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <main className="space-y-12 bg-ctp-base">{page}</main>;
};

export default Home;
