import React from "react";
import { MdDirectionsCar } from "react-icons/md";
import Link from "next/link";

export default function Sidebar({ menus }) {
  return (
    <aside
      className={`fixed hidden h-full w-64 flex-col bg-slate-700 duration-300 ease-out md:flex md:flex-col`}
    >
      <div className="flex h-16 items-center justify-center gap-x-2 text-2xl text-white">
        <span className="text-yellow-500">
          <MdDirectionsCar />
        </span>
        <h1>RentACar</h1>
      </div>
      <div className="scroll flex-1 overflow-x-hidden overflow-y-hidden py-2 duration-300 hover:overflow-y-auto">
        {menus.map((menu, index) => {
          return (
            <Link
              href={menu.link}
              key={index}
              className={`flex w-full items-center gap-x-4 py-2 pl-8 text-white outline-none duration-200 hover:scale-110 hover:bg-slate-800 hover:text-yellow-500 focus:scale-110 focus:bg-slate-800 focus:text-yellow-500 ${
                menu.active == true
                  ? "scale-110 bg-slate-800 text-yellow-500"
                  : ""
              }`}
            >
              {menu.icon}
              {menu.title}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
