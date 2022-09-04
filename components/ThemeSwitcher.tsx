import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [toggled, setToggled] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => console.log(resolvedTheme, theme), [resolvedTheme, theme])

  return (
    <>
      <button
        className={`${theme !== "system" ? "text-purple-500" : "text-gray-300"} hover:bg-gray-800 hidden focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center md:inline-flex items-center mr-2 dark:hover:bg-zinc-700`}
        type="button"
        onClick={() => setToggled(!toggled)}
      >
        <FontAwesomeIcon size="lg"
          icon={
            resolvedTheme === "light" ? faSun : faMoon
          }
        />
      </button>
      <div
        className={`${
          !toggled ? "hidden" : ""
        } z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 absolute top-16`}
        onBlur={() => setToggled(false)}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          <li>
            <button
              className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-2 w-full"
              onClick={() => {
                setTheme("light");
              }}
            >
              <FontAwesomeIcon size="lg" icon={faSun} />
              Light
            </button>
          </li>
          <li>
            <button
              className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-2 w-full"
              onClick={() => {
                setTheme("dark");
              }}
            >
              <FontAwesomeIcon size="lg" icon={faMoon} />
              Dark
            </button>
          </li>
          <li>
            <button
              className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-2 w-full"
              onClick={() => {
                setTheme("system");
              }}
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
