import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const IconLocaleSwitcher = () => {
  const [toggled, setToggled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { locale, defaultLocale, push, asPath, locales } = useRouter();

  const localeToName = new Intl.DisplayNames([locale!], {
    type: "language",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="w-[21.88px] p-2.5" />;
  }

  const changeLocale = (locale: string) => {
    push(asPath, undefined, { locale });
    setToggled(false);
  };

  return (
    <>
      <button
        className={`${
          locale !== defaultLocale ? "text-ctp-mauve" : "text-ctp-subtext1"
        } mr-2 hidden items-center rounded-lg p-2.5 text-center text-sm font-medium hover:bg-ctp-mantle focus:outline-none focus:ring-4 md:inline-flex`}
        type="button"
        onClick={() => {
          setToggled(!toggled);
        }}
        onBlur={() => {
          requestAnimationFrame(() => {
            if (!ref.current?.contains(document.activeElement)) {
              setToggled(false);
            }
          });
        }}
      >
        <FontAwesomeIcon size="lg" icon={faLanguage} fixedWidth />
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
          {locales!.map((loc) => (
            <li key={loc}>
              <button
                className={`${
                  locale === loc ? "text-ctp-mauve" : ""
                } flex w-full items-center gap-2 py-2 px-4 hover:bg-ctp-mantle`}
                onClick={() => changeLocale(loc)}
              >
                {localeToName.of(loc)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default IconLocaleSwitcher;
