import {
  faDiscord,
  faGithub,
  faMastodon,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  const icons = [
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
  ];

  return (
    <main className="flex flex-col items-center">
      <Head>
        <title>Crystal Linux</title>
        <meta
          name="description"
          content="A brand new Arch Linux based distribution."
        />
        <link rel="icon" href="/crystal.svg" />
      </Head>

      <h2 className="text-4xl font-bold">An Arch Based Distribution</h2>
      <p>Crystal Linux is a brand new Arch Linux based distribution.</p>
      <p>Powerful and easy to use.</p>

      <div className="flex gap-4">
        {icons.map((link) => (
          <>
            <Link href={link.link} target="_blank">
              <a className="hover:text-purple-700">
                <FontAwesomeIcon icon={link.icon} size="3x" />
              </a>
            </Link>
          </>
        ))}
      </div>
    </main>
  );
};

export default Home;
