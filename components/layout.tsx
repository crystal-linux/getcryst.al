import Navbar from "./navbar";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="bg-ctp-base">
    <Navbar />

    <main>{children}</main>
  </div>
);

export default Layout;
