import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { ImSpinner2 } from "react-icons/im";
import { AnimatePresence, motion } from "framer-motion";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.admin ? (
        <Admin>
          <Component {...pageProps} />
        </Admin>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function Admin({ children }) {
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") {
    return (
      <div className="flex min-h-screen bg-slate-800 items-center justify-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ImSpinner2 className="animate-spin text-white text-3xl" />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (session?.user.role !== "admin") {
    return <span>You are not permitted here</span>;
  }

  return children;
}
