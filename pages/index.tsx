import {
  faDiscord,
  faGithub,
  faMastodon,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col items-center text-center">
      <Head>
        <title>Crystal Linux</title>
        <meta
          name="description"
          content="A brand new Arch Linux based distribution."
        />
        <link rel="icon" href="/crystal.svg" />
      </Head>

      <h1>An Arch Based Distribution</h1>
      <p>Crystal Linux is a brand new Arch Linux based distribution.</p>
      <p>Powerful and easy to use.</p>

      <div className="flex gap-4 my-4 flex-wrap justify-center">
        {[
          {
            link: "https://twitter.com/crystal_linux",
            icon: faTwitter,
          },
          {
            link: "https://github.com/crystal-linux",
            icon: faGithub,
          },
          {
            link: "https://discord.gg/2b47CAKNAx",
            icon: faDiscord,
          },
          {
            link: "https://fosstodon.org/@crystal_linux",
            icon: faMastodon,
          },
        ].map((entry) => (
          <>
            <a
              href={entry.link}
              target="_blank"
              className="hover:text-purple-700"
            >
              <FontAwesomeIcon icon={entry.icon} size="3x" />
            </a>
          </>
        ))}
      </div>

      <div className="flex flex-wrap align-middle my-4 justify-center [&_div]:max-w-sm [&_div]:flex [&_div]:flex-col [&_div]:items-center [&_div]:p-6 [&_div]:gap-4 [&_div]:bg-gray-300">
        <div>
          <h2>Why Crystal?</h2>
          <p>
            What's so different about Crystal compared to other distributions?
          </p>
          <ul className="list-disc list-inside flex flex-col gap-4 text-xl">
            <li>Easy to use package manager</li>
            <li>Beginner Friendly</li>
            <li>Easy Btrfs snapshots</li>
            <li>Easy to install</li>
          </ul>
          <a
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-bold w-full rounded-lg text-lg px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            href="https://github.com/crystal-linux/iso/releases/latest"
          >
            Download
          </a>
        </div>
        <div className="text-center">
          <h2>We 💖 open source software</h2>
          <p>
            Basically everything that Crystal Linux has coded/made is completely
            open source for everyone.
          </p>
          <p>
            The project is licensed under{" "}
            <a href="https://github.com/crystal-linux/.github/blob/main/LICENSE">
              GPLv3.0
            </a>
            .
          </p>
          <p>
            We also are fully transparent, and have adopted the{" "}
            <a href="https://www.contributor-covenant.org/">
              Contributor Covenant
            </a>
            .
          </p>
          <p>
            If you would like to contribute to the project, please adhere to the{" "}
            <a href="https://github.com/crystal-linux/.github/blob/main/CONTRIBUTING.md">
              Contributing Guidelines
            </a>{" "}
            and the <a href="https://developercertificate.org/">The DCO</a>.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
