import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const ThemeSwitcher = () => {
  const [toggled, setToggled] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const changeTheme = (theme: string) => {
    setTheme(theme);
    setToggled(false);
  };

  return (
    <>
      <button
        className={`${
          resolvedTheme !== "system" && theme !== "system"
            ? "text-purple-500"
            : "text-gray-300"
        } hover:bg-gray-800 hidden focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center md:inline-flex items-center mr-2 dark:hover:bg-zinc-700`}
        type="button"
        onClick={() => {
          setToggled(!toggled);
        }}
        onBlur={() => {
          requestAnimationFrame(() => {
            if (!ref.current?.contains(document.activeElement)) {
              setToggled(!toggled);
            }
          });
        }}
      >
        <FontAwesomeIcon
          size="lg"
          icon={resolvedTheme === "light" ? faSun : faMoon}
        />
      </button>
      <div
        className={`${
          !toggled ? "hidden" : ""
        } z-10 w-32 bg-white font-semibold rounded divide-y divide-gray-100 shadow dark:bg-gray-700 absolute mt-16`}
        ref={ref}
        onBlur={(e) => {
          const currentTarget = e.currentTarget;

          requestAnimationFrame(() => {
            // Check if the new focused element is a child of the original container
            if (!currentTarget.contains(document.activeElement)) {
              setToggled(false);
            }
          });
        }}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          <li>
            <button
              className={`${
                theme === "light" ? "text-purple-500" : ""
              } py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 w-full`}
              onClick={() => changeTheme("light")}
            >
              <FontAwesomeIcon size="lg" icon={faSun} />
              Light
            </button>
          </li>
          <li>
            <button
              className={`${
                theme === "dark" ? "text-purple-500" : ""
              } py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 w-full`}
              onClick={() => changeTheme("dark")}
            >
              <FontAwesomeIcon size="lg" icon={faMoon} />
              Dark
            </button>
          </li>
          <li>
            <button
              className={`${
                theme === "system" ? "text-purple-500" : ""
              } py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 w-full`}
              onClick={() => changeTheme("system")}
            >
              <FontAwesomeIcon size="lg" icon={faDisplay} />
              System
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ThemeSwitcher;
