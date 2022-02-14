import Link from "next/link";

import { SiBlockchaindotcom } from "react-icons/si";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-800 p-3 px-6 fixed top-0 bg-inherit  w-full drop-shadow-lg md:flex md:items-center">
      <p className="text-1xl font-bold text-gray-300 md:mr-auto flex items-center">
        <SiBlockchaindotcom className="mr-1" /> NFTZone
      </p>
      <div className="flex">
        <Link href="/">
          <a className="mr-4 text-gray-400 hover:underline">Home</a>
        </Link>
        <Link href="/create-item">
          <a className="mr-6 text-gray-400 hover:underline">Sell NFT</a>
        </Link>
        <Link href="/my-assets">
          <a className="mr-6 text-gray-400 hover:underline">Your NFT</a>
        </Link>
        <Link href="/creator-dashboard">
          <a className="mr-6 text-gray-400 hover:underline">Dashboard</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
