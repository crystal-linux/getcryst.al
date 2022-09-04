import Navbar from "./navbar";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />

    <main className="flex flex-col text-center items-center mt-28 md:mt-40">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  </>
);

export default Layout;
