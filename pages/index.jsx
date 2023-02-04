import { signOut, signIn, useSession } from "next-auth/react";
import React from "react";

export default function index() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-slate-200">
      <h1>You're currently {status}</h1>
      {status === "unauthenticated" ? (
        <button
          onClick={() => signIn()}
          className="py-2 px-4 rounded-md hover:bg-gray-800 text-slate-100 duration-200 bg-slate-700 outline-none focus:ring-4 focus:ring-slate-400"
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => signOut()}
          className="py-2 px-4 rounded-md hover:bg-gray-800 text-slate-100 duration-200 bg-slate-700 outline-none focus:ring-4 focus:ring-slate-400"
        >
          Logout
        </button>
      )}
    </div>
  );
}
