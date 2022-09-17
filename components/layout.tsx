import Footer from "./footer";
import Navbar from "./navbar";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />

    {children}
    <Footer />
  </>
);

export default Layout;
