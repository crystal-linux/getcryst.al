import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const IconThemeSwitcher = () => {
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
            ? "text-ctp-mauve"
            : "text-ctp-subtext1"
        } mr-2 hidden items-center rounded-lg p-2.5 text-center text-sm font-medium hover:bg-ctp-mantle focus:outline-none focus:ring-4 md:inline-flex`}
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
          !toggled ? "hidden " : ""
        }z-10 absolute mt-12 w-32 rounded bg-ctp-base font-semibold shadow`}
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
          className="py-1 text-sm text-ctp-text"
          aria-labelledby="dropdownDefault"
        >
          <li>
            <button
              className={`${
                theme === "light" ? "text-ctp-mauve" : ""
              } flex w-full items-center gap-2 py-2 px-4 hover:bg-ctp-mantle`}
              onClick={() => changeTheme("light")}
            >
              <FontAwesomeIcon size="lg" icon={faSun} />
              Light
            </button>
          </li>
          <li>
            <button
              className={`${
                theme === "dark" ? "text-ctp-mauve" : ""
              } flex w-full items-center gap-2 py-2 px-4 hover:bg-ctp-mantle`}
              onClick={() => changeTheme("dark")}
            >
              <FontAwesomeIcon size="lg" icon={faMoon} />
              Dark
            </button>
          </li>
          <li>
            <button
              className={`${
                theme === "system" ? "text-ctp-mauve" : ""
              } flex w-full items-center gap-2 py-2 px-4 hover:bg-ctp-mantle`}
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

export default IconThemeSwitcher;
