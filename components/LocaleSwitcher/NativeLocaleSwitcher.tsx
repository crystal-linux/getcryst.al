import { faAngleDown, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NativeLocaleSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { locale, push, asPath, locales } = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const localeToName = new Intl.DisplayNames([locale!], {
    type: "language",
  });

  return (
    <div className="relative flex items-center gap-2 rounded-lg bg-ctp-surface0 p-2 px-4 font-semibold capitalize text-ctp-text shadow-sm">
      <FontAwesomeIcon icon={faLanguage} />
      {localeToName.of(locale!)}
      <FontAwesomeIcon icon={faAngleDown} size="sm" />
      <select
        onChange={(e) => {
          push(asPath, undefined, { locale: e.currentTarget.value });
          e.preventDefault();
        }}
        className="absolute inset-0 h-full w-full appearance-none opacity-0"
        value={locale}
      >
        {locales!.map((loc) => (
          <option key={loc} value={loc}>
            {localeToName.of(loc)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NativeLocaleSwitcher;
