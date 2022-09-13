import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ThemeSwitcherIcon from "./ThemeSwitcher/Icon";
import ThemeSwitcherNative from "./ThemeSwitcher/Native";

const Navbar = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [toggled, setToggled] = useState(true);
  const { route } = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", () => {
      onScroll();
    });

    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <nav
      className={`px-2 sm:px-4 py-2.5 transition-colors bg-base-light dark:bg-base-dark bg-opacity-50 dark:bg-opacity-50  ${
        scrollTop != 0 ? "backdrop-blur-md dark:backdrop-blur-md" : ""
      } fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600`}
    >
      <div className="container flex flex-wrap justify-between items-center mx-auto max-w-7xl">
        <Link href="/">
          <a className="flex items-center gap-2">
            <Image src="/svg/crystal-logo.svg" width={35} height={35} alt="" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Crystal Linux
            </span>
          </a>
        </Link>
        <div className="flex md:order-2">
          <ThemeSwitcherIcon />
          <a
            type="button"
            className="text-gray-500 dark:text-gray-300 hover:bg-gray-100 hidden focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center md:inline-flex items-center mr-2 dark:hover:bg-gray-700"
            href="https://github.com/crystal-linux/"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>

          <a
            className="text-white bg-purple-700 hover:bg-purple-800 !no-underline focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            href="https://github.com/crystal-linux/iso/releases/latest"
          >
            Download
          </a>
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => {
              setToggled(!toggled);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`${
            toggled ? "hidden" : ""
          } md:visible justify-between items-center w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col gap-2 md:gap-0 p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-base-light dark:bg-base-dark md:bg-inherit md:dark:bg-inherit dark:border-gray-700">
            <li>
              <Link href="/">
                <a
                  className={`block py-2 pr-4 pl-3 rounded md:bg-transparent ${
                    route === "/"
                      ? "bg-purple-700 md:text-purple-700 text-white md:dark:text-white"
                      : "text-gray-700 dark:text-gray-400"
                  } md:p-0`}
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <a
                href="https://forum.getcryst.al/"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Forum
                <FontAwesomeIcon
                  className="ml-2"
                  icon={faArrowUpRightFromSquare}
                />
              </a>
            </li>
            <li>
              <Link href="/docs/">
                <a
                  className={`block py-2 pr-4 pl-3 rounded md:bg-transparent ${
                    route.split("/")[1] === "docs"
                      ? "bg-purple-700 md:text-purple-700 text-white dark:text-white"
                      : "text-gray-700 dark:text-gray-400"
                  } md:p-0`}
                >
                  Docs
                </a>
              </Link>
            </li>
            <div
              className={`${
                toggled ? "hidden" : ""
              } md:hidden flex items-center justify-between pt-4 mt-2 border-gray-200 dark:border-gray-600 border-t px-2`}
            >
              <p className="text-gray-700 dark:text-gray-400">Switch Theme</p>
              <ThemeSwitcherNative />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
