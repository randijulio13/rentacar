import React from "react";
import { signOut } from "next-auth/react";
import { MdMenu, MdClose } from "react-icons/md";

export default function Navbar({ children, open, handleSidebar }) {
  const handleSignout = () => {
    signOut();
  };
  return (
    <nav
      className="flex bg-slate-800 h-16  
      items-center justify-between px-10 text-white shadow-lg"
    >
      <button
        onClick={handleSidebar}
        className="text-3xl focus:outline-none menu icon-transition"
      >
        <div className={`transition duration-500 ease-out hover:scale-125 ${open ? "rotate-[360deg]" : ""}`}>
          {open ? <MdClose /> : <MdMenu />}
        </div>
      </button>
      <button
        type="button"
        onClick={handleSignout}
        className="focus:outline-none"
      >
        Logout
      </button>
    </nav>
  );
}
