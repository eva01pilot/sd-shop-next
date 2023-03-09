import Link from "next/link";
import React from "react";
import miku from "/mikumiku.svg";
const Navbar = () => {
  return (
    <nav className="grid h-20 w-full grid-cols-2 bg-slate-900">
      <div className="flex flex-row">
        <img src="/mikumiku.svg" className="h-20 px-4" />
        <ul className="flex items-center gap-x-8">
          <li>
            <Link className="font-Inter text-lg text-white hover:text-sky-400" href="/">
                Explore
            </Link>
          </li>
          <li>
            <Link className="font-Inter text-lg text-white hover:text-sky-400" href="/createImage">
                Create
            </Link>
          </li>
          <li>
            <Link className="font-Inter text-lg text-white hover:text-sky-400" href='/hell'>
                My collection
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center flex-col px-8">
        <img src="/mikumiku.svg" className="h-16 self-end rounded-full w-16 bg-white"/>
      </div>
    </nav>
  );
};

export default Navbar;
