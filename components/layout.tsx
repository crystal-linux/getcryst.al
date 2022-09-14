import { useTheme } from "next-themes";
import Navbar from "./navbar";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={`${
        resolvedTheme === "dark" ? "ctp-mocha" : "ctp-latte"
      } bg-ctp-base`}
    >
      <Navbar />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
