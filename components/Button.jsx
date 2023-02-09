import React, { useEffect } from "react";

export default function Button({ children, className, ...props }) {
  return (
    <button
      {...{ ...props }}
      className={`px-4 py-2 rounded active:scale-105 duration-200 focus:outline-none ${
        className ? className : "bg-slate-500 hover:bg-slate-600 text-white"
      }`}
    >
      {children}
    </button>
  );
}
