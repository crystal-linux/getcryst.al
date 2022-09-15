import Navbar from "./navbar";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="bg-ctp-base">
    <Navbar />

    <main className="mx-auto min-h-screen max-w-8xl pt-28 space-y-12 px-8 md:pt-24">{children}</main>
  </div>
);

export default Layout;
