import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [toggled, setToggled] = useState(true);

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
      className={`bg-white px-2 sm:px-4 py-2.5 ${
        scrollTop != 0 ? "dark:bg-zinc-900" : "bg-base-dark"
      } fixed w-full z-20 top-0 left-0 border-b border-zinc-200 dark:border-zinc-600`}
    >
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <a className="flex items-center gap-2">
            <Image src="/svg/crystal-logo.svg" width={35} height={35} />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Crystal Linux
            </span>
          </a>
        </Link>
        <div className="flex md:order-2">
          <a
            type="button"
            className="text-white hover:bg-gray-800 hidden focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center md:inline-flex items-center mr-2 dark:hover:bg-zinc-700"
            href="https://github.com/crystal-linux/"
          >
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>

          <a
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            href="https://github.com/crystal-linux/iso/releases/latest"
          >
            Download
          </a>
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-zinc-500 rounded-lg md:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
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
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`${
            toggled ? "hidden" : ""
          } md:visible justify-between items-center w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col gap-2 md:gap-0 p-4 mt-4 bg-zinc-50 rounded-lg border border-zinc-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-zinc-800 dark:border-zinc-700">
            <li>
              <Link href="/">
                <a className="block py-2 pr-4 pl-3 text-white bg-purple-700 rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-white">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <a
                href="https://forum.getcryst.al/"
                className="block py-2 pr-4 pl-3 text-zinc-700 rounded hover:bg-zinc-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-white dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700"
              >
                Forum
                <FontAwesomeIcon
                  className="ml-2"
                  icon={faArrowUpRightFromSquare}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
