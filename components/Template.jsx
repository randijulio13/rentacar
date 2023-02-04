import React, { useState } from "react";
import { MdDirectionsCar, MdHome, MdMenu } from "react-icons/md";
import Sidebar from "./Sidebar";
import SidebarMobile from "./SidebarMobile";
import { signIn, useSession } from "next-auth/react";
import ProfileDropdown from "./ProfileDropdown";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ children }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useRouter();

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleSidebar = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  let menus = [
    { title: "Home", icon: <MdHome />, link: "/admin" },
    { title: "Cars", icon: <MdDirectionsCar />, link: "/admin/car" },
  ];

  menus = menus.map((menu, index) => {
    if (menu.link == pathname) {
      menu.active = true;
    }
    return menu;
  });

  return (
    <div className="flex min-h-screen">
      {/* sidebarmobile */}
      <SidebarMobile {...{ menus, isOpen, closeSidebar, handleSidebar }} />

      {/* sidebar */}
      <Sidebar {...{ menus }} />

      {/* sidebar end */}

      {/* appbar & content wrapper */}
      <main className="flex-1 md:ml-64">
        {/* appbar */}
        <div className="flex h-16 w-full items-center bg-slate-800 px-4">
          <button onClick={handleSidebar} className="outline-none md:hidden">
            <div
              className={`text-3xl text-white transition duration-200 ease-out`}
            >
              <MdMenu />
            </div>
          </button>
          {status == "unauthenticated" ? (
            <button
              onClick={() => signIn()}
              className="ml-auto rounded bg-yellow-500 px-4 py-2 text-sm text-slate-800 outline-none duration-200 hover:bg-yellow-600"
            >
              Login
            </button>
          ) : (
            <ProfileDropdown />
          )}
        </div>
        {/* appbar end */}

        {/* content */}
        <div className="p-4">{children}</div>
        {/* content */}
        <ToastContainer />  
      </main>
    </div>
  );
}
