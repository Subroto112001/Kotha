import React, { useContext, useState } from "react";
import { CiChat1, CiLock, CiUser } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { Themecontext } from "../Context/Theme";
import { PiMoon } from "react-icons/pi";
import { FiSun } from "react-icons/fi";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import Button from "../Component/Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(Themecontext);
  const [loading, setLoading] = useState(false);
  const [logininfo, setLogininfo] = useState({
    Email: "",
    Password: "",
  });

  const [loginError, setloginError] = useState({
    EmailError: "",
    PasswordError: "",
  });

  const HandlTakelogininfo = (e) => {
    const { id, value } = e.target;

    setLogininfo((prev) => ({
      ...prev,
      [id]: value,
    }));

    setloginError((prevError) => ({
      ...prevError,
      [`${id}Error`]: value ? "" : prevError[`${id}Error`],
    }));
    console.log(`your id is ${id} and your value is ${value}`);
  };

  /**
   *title : Handle Login
   *@desc : this function work for login
   */

  const handleLogin = () => {
    setLoading(true);
   

    const { Email, Password } = logininfo;
    if (!Email) {
      setloginError({
        ...loginError,
        EmailError: "Please Enter Your Email",
      });
      setLoading(false);
      return;
    } else if (!Password) {
      setloginError({
        ...loginError,
        EmailError: "",
        PasswordError: "Please Enter Your Password",
      });
      setLoading(false);
      return;
    } else {
      setloginError({
        ...loginError,
        EmailError: "",
        PasswordError: "",
      });

      signInWithEmailAndPassword(auth, Email, Password)
        .then((userinfo) => {
          const user = userinfo.user;
          if (user.emailVerified) {
            
            navigate("/");
          } else {
            setloginError({
              EmailError: "",
              PasswordError: "Please verify your email before logging in.",
            });
            auth.signOut(); // Optionally sign out the unverified user
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/user-not-found") {
            setloginError({
              EmailError: "User not found.",
              PasswordError: "",
            });
          } else if (error.code === "auth/wrong-password") {
            setloginError({
              EmailError: "",
              PasswordError: "Incorrect password.",
            });
          } else {
            setloginError({
              EmailError: "An error occurred. Please try again.",
              PasswordError: "",
            });
          }
        })
        .finally(() => {
          setLoading(false); // এখন শুধু শেষে false হবে
        });
    }
  };


  return (
    <div
      className={`container relative flex flex-col justify-center items-center h-screen w-full bg-baackgroundcolor  ${theme}`}
    >
      <div className="absolute top-3.5 left-2.5">
        <button
          className="bg-buttonblue py-3 px-5 rounded text-white cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "day" ? <PiMoon /> : <FiSun />}
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="flex flex-row gap-1">
          <span className="text-4xl text-inputoutline ">
            <CiChat1 />
          </span>
          <h2
            className={`text-2xl  font-bold ${
              theme === "night" ? "text-white" : "text-textgray"
            }`}
          >
            Kotha
          </h2>
        </div>

        <h1
          className={`text-2xl  font-bold ${
            theme === "night" ? "text-white" : "text-textgray"
          }`}
        >
          Login
        </h1>
        <p className={`text-md font-medium ${
            theme === "night" ? "text-white" : "text-textgray"
          }`}>
          Login to continue to Kotha.
        </p>
      </div>

      <div className="flex flex-col mt-6 gap-3.5  p-8 bg-white  rounded-md hover:border hover:border-inputoutline">
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="Email"
            className="text-[16px] font-medium text-textgray"
          >
            Username
          </label>
          <input
            type="email"
            id="Email"
            className="border p-2 pl-[40px] rounded text-[16px] outline-inputoutline w-[300px] sm:w-[350px]"
            placeholder="example@mail.com"
            onChange={HandlTakelogininfo}
          />
          <span className="absolute top-[43px] left-2  text-[22px]">
            <CiUser />
          </span>
          <h3 className="text-red-500 text-sm">{loginError.EmailError}</h3>
        </div>
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="Password"
            className="text-[16px] font-medium text-textgray"
          >
            Password
          </label>
          <input
            type="Password"
            id="Password"
            className="border p-2 pl-[40px] rounded text-[16px] outline-inputoutline w-[300px] sm:w-[350px]"
            placeholder="*******"
            onChange={HandlTakelogininfo}
          />
          <span className="absolute top-[43px] left-2  text-[22px]">
            <CiLock />
          </span>
          <h3 className="text-red-500 text-sm">{loginError.PasswordError}</h3>
        </div>
        <div className="flex w-full">
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-buttonblue text-white flex justify-center items-center rounded cursor-pointer text-[16px] font-normal"
          >
            {loading ? (
            
                <AiOutlineLoading3Quarters className="animate-spin" />
         
            ) : (
              "Login"
            )}
          </button>
        </div>

        <h3 className="text-[16px] text-textgray">
          Don't have an account?{" "}
          <NavLink
            to={"/signup"}
            className="text-[16px] font-medium cursor-pointer text-red-400"
          >
            SignUp Here
          </NavLink>
        </h3>
      </div>
    </div>
  );
};

export default React.memo(Login);
