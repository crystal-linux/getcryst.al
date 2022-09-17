import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const NativeThemeSwitcher = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative flex gap-2 capitalize items-center rounded-lg shadow-sm p-2 px-4 text-ctp-text font-semibold bg-ctp-surface0">
      <FontAwesomeIcon icon={resolvedTheme === "light" ? faSun : faMoon} />
      {theme}
      <FontAwesomeIcon icon={faAngleDown} size="sm" />
      <select
        onClick={(e) => {
          setTheme(e.currentTarget.value);
        }}
        className="absolute appearance-none inset-0 w-full h-full opacity-0"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
};

export default NativeThemeSwitcher;
