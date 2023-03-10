import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { MdDirectionsCar } from "react-icons/md";

export default function SidebarMobile({ isOpen, closeSidebar, handleSidebar, menus }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 h-full md:hidden"
        onClose={closeSidebar}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="ease-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Panel
            className={`flex flex-col ease-out duration-300 relative z-10 h-full bg-slate-700 overflow-x-hidden w-72`}
          >
            <div className="h-16 bg-slate-800 text-white flex items-center justify-center text-2xl gap-x-2">
              <span className="text-yellow-500">
                <MdDirectionsCar />
              </span>
              <h1>RentACar</h1>
            </div>
            <div className="py-2 overflow-x-hidden overflow-y-auto flex-1">
              {menus.map((menu, index) => {
                return (
                  <Link
                    href={menu.link}
                    key={index}
                    className={`flex w-full items-center gap-x-4 py-2 pl-8 text-white outline-none duration-200 hover:scale-110 hover:bg-slate-800 hover:text-yellow-500 focus:bg-slate-800 ${menu.active == true
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
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
