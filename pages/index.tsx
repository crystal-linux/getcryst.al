import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import Link from "next/link";

const Home: NextPage = () => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <section className="flex justify-center flex-col items-center text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-ctp-text md:text-5xl lg:text-6xl">
          An arch based distribution
        </h1>
        <p className="mb-6 text-lg font-normal text-ctp-subtext1 lg:text-xl sm:px-16 xl:px-48">
          Crystal Linux is a brand new Arch Linux based distritbution. Powerful
          and easy to use.
        </p>

        <div className="w-full space-2 space-y-2">
          <a
            className="inline-flex w-full sm:w-fit justify-center items-center py-3 px-5 text-base font-medium text-center text-ctp-base bg-ctp-mauve rounded-lg focus:ring-4"
            href="https://github.com/crystal-linux/iso/releases/latest"
          >
            Download
          </a>

          <Link href="/docs/crystal-linux/getting-started">
            <a className="inline-flex w-full sm:w-fit justify-center items-center py-3 px-5 text-base font-medium text-center text-ctp-text rounded-lg focus:ring-4">
              Getting Started
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </Link>
        </div>
      </section>

      <section>
        <p className="mt-8 font-semibold text-ctp-maroon">Beautiful</p>
        <p className="mt-4 text-3xl sm:text-4xl text-ctp-text font-extrabold tracking-tight">
          Onyx built-in
        </p>
        <p className="mt-4 max-w-3xl space-y-6 text-ctp-subtext1">
          Crystal's in-house desktop experience, a custom GNOME session with a
          familiar layout.
        </p>
      </section>

      <section>
        <p className="mt-8 font-semibold text-ctp-rosewater">Buttery</p>
        <p className="mt-4 text-3xl sm:text-4xl text-ctp-text font-extrabold tracking-tight">
          Automatic Backups
        </p>
        <p className="mt-4 max-w-3xl space-y-6 text-ctp-subtext1">
          Backup & Restore your system. Easily boot into Btrfs snapshots.
        </p>
      </section>

      <section>
        <p className="mt-8 font-semibold text-ctp-mauve">Rusty Quartz?</p>
        <p className="mt-4 text-3xl sm:text-4xl text-ctp-text font-extrabold tracking-tight">
          Amethyst
        </p>
        <p className="mt-4 max-w-3xl space-y-6 text-ctp-subtext1">
          Amethyst is a fast, efficient and lightweight AUR helper and Pacman
          wrapper. Made for Crystal, compatible with any Arch-based Linux
          distribution
        </p>
      </section>
    </>
  );
};

export default Home;
