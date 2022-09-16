import Navbar from "./navbar";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />

    {children}
  </>
);

export default Layout;
