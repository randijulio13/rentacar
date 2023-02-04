import { AnimatePresence, motion } from "framer-motion";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import React, {
  useState
} from "react";
import { useForm } from "react-hook-form";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [alert, setAlert] = useState({
    display: false,
    type: "success",
    message: "",
  });

  let emailValidation = () => {
    return {
      required: "Email is required",
      pattern: {
        value:
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: "Email format invalid",
      },
    };
  };

  let passwordValidation = () => {
    return {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
    };
  };

  const hideAlert = () => {
    setAlert((alert) => {
      return { ...alert, display: false };
    });
  };

  const handleLogin = async (data) => {
    hideAlert();
    let { email, password } = data;
    let res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res.status == 401) {
      setAlert({
        display: true,
        message: "Incorrect email or password",
        type: "error",
      });
      setTimeout(() => {
        hideAlert();
      }, 2000);
      return;
    }

    setAlert({ display: true, message: "Login success", type: "success" });
    setTimeout(() => {
      hideAlert();
      location.reload();
    }, 2000);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-slate-200 p-6 rounded-md shadow-sm w-2/6 duration-200 min-h-auto"
        >
          <AnimatePresence>
            {alert.display && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeIn", duration: 0.5 }}
                className={`${
                  alert.type == "success" ? "bg-green-600" : "bg-red-500"
                } rounded-md p-4 mb-4 text-white`}
              >
                {alert.message}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", emailValidation)}
              id="email"
              placeholder="user@example.com"
              type="text"
              className={`${
                errors.email
                  ? "outline-1 outline-offset-0 outline-red-500 focus:ring-red-200"
                  : "focus:ring-slate-300"
              } py-2 px-4 outline-none w-full rounded focus:ring-4`}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              {...register("password", passwordValidation)}
              id="password"
              type="password"
              className={`${
                errors.password
                  ? "outline-1 outline-offset-0 outline-red-500 focus:ring-red-200"
                  : "focus:ring-slate-300"
              } py-2 px-4 outline-none w-full rounded focus:ring-4`}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 duration-200 outline-none focus:ring-2 focus:ring-yellow-200"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
