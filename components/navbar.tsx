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
  const [toggled, setToggled] = useState(false);
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
      className={`bg-ctp-base py-2.5 ${
        scrollTop != 0 && !toggled ? "bg-opacity-80 backdrop-blur-md " : ""
      } fixed top-0 left-0 z-20 w-full border-b border-ctp-mantle`}
    >
      <div className="container mx-auto flex max-w-8xl flex-wrap items-center justify-between px-8">
        <Link href="/">
          <a className="flex items-center gap-2">
            <Image src="/svg/crystal-logo.svg" width={35} height={35} alt="" />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-ctp-text">
              Crystal Linux
            </span>
          </a>
        </Link>
        <div className="flex md:order-2">
          <ThemeSwitcherIcon />
          <a
            type="button"
            className="mr-2 hidden items-center rounded-lg p-2.5 text-center text-sm font-medium text-ctp-subtext0 focus:outline-none focus:ring-4 md:inline-flex"
            href="https://github.com/crystal-linux/"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>

          <a
            className="mr-3 rounded-lg bg-ctp-mauve px-5 py-2.5 text-center text-sm font-medium text-ctp-base !no-underline focus:outline-none focus:ring-4 md:mr-0"
            href="https://github.com/crystal-linux/iso/releases/latest"
          >
            Download
          </a>
          <button
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-ctp-subtext0 hover:bg-ctp-mantle focus:outline-none focus:ring-4 md:hidden"
            onClick={() => {
              setToggled(!toggled);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
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
            !toggled ? "hidden" : ""
          } w-full items-center justify-between md:visible md:order-1 md:flex md:w-auto`}
        >
          <ul className="mt-4 flex flex-col gap-2 rounded-lg border border-ctp-mantle bg-ctp-base p-4 md:mt-0 md:flex-row md:gap-0 md:space-x-8 md:border-0 md:bg-inherit md:text-sm md:font-medium md:dark:bg-inherit">
            <li>
              <Link href="/">
                <a
                  className={`block rounded py-2 pr-4 pl-3 md:bg-transparent ${
                    route === "/"
                      ? "bg-ctp-mauve text-ctp-base md:text-ctp-mauve"
                      : "text-ctp-text md:hover:text-ctp-mauve"
                  } md:p-0`}
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <a
                href="https://forum.getcryst.al/"
                className="md:dark:hover:bg-transparen block rounded py-2 pr-4 pl-3 text-ctp-text md:p-0 md:hover:bg-transparent md:hover:text-ctp-mauve"
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
                  className={`block rounded py-2 pr-4 pl-3 md:bg-transparent ${
                    route.split("/")[1] === "docs"
                      ? "bg-ctp-mauve text-ctp-base md:text-ctp-mauve"
                      : "text-ctp-text md:hover:text-ctp-mauve"
                  } md:p-0`}
                >
                  Docs
                </a>
              </Link>
            </li>
            <div
              className={`${
                !toggled ? "hidden" : ""
              } mt-2 flex items-center justify-between border-t border-ctp-mantle px-2 pt-4 md:hidden`}
            >
              <p className="text-ctp-text">Switch Theme</p>{" "}
              <ThemeSwitcherNative />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
