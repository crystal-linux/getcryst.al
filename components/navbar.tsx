import Image from "next/image";
import Link from "next/link";

const Navbar = () => (
  <header className="flex justify-between px-6 py-4">
    <Link href="/">
      <a className="flex gap-2 items-center font-semibold text-xl">
        <Image src="/svg/crystal-logo.svg" width={30} height={30} />
        Crystal Linux
      </a>
    </Link>
  </header>
);

export default Navbar;
