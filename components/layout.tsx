import Navbar from "./navbar";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />

    <main>
      {children}
    </main>
  </>
);

export default Layout;
