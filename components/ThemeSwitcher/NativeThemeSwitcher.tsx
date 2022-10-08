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
    <div className="relative flex items-center gap-2 rounded-lg bg-ctp-surface0 p-2 px-4 font-semibold capitalize text-ctp-text shadow-sm">
      <FontAwesomeIcon icon={resolvedTheme === "light" ? faSun : faMoon} />
      {theme}
      <FontAwesomeIcon icon={faAngleDown} size="sm" />
      <select
        onChange={(e) => {
          setTheme(e.currentTarget.value);
        }}
        className="absolute inset-0 h-full w-full appearance-none opacity-0"
        value={theme}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
};

export default NativeThemeSwitcher;
