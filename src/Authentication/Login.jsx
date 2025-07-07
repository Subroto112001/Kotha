import React, { useContext } from "react";
import { CiChat1, CiLock, CiUser } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { Themecontext } from "../Context/Theme";
import { PiMoon } from "react-icons/pi";
import { FiSun } from "react-icons/fi";

const Login = () => {
  const { theme, toggleTheme } = useContext(Themecontext);
  return (
    <div
      className={`container flex flex-col justify-center items-center h-screen w-full bg-baackgroundcolor  ${theme}`}
    >
      <div className="flex flex-col justify-center items-center gap-3">
        <button
          className="bg-buttonblue py-3 px-5 rounded text-white"
          onClick={toggleTheme}
        >
          {theme === "day" ? <PiMoon /> : <FiSun />}
        </button>
        <div className="flex flex-row gap-1">
          <span className="text-4xl text-inputoutline ">
            <CiChat1 />
          </span>
          <h2 className="text-2xl text-textgray font-bold">Kotha</h2>
        </div>

        <h1 className="text-2xl text-textgray font-bold">Login</h1>
        <p className="text-md text-textgray font-medium">
          Sign in to continue to Kotha.
        </p>
      </div>

      <div className="flex flex-col mt-6 gap-3.5  p-8 bg-white  rounded-md hover:border hover:border-inputoutline">
        {/* username section */}
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="email"
            className="text-[16px] font-medium text-textgray"
          >
            Username
          </label>
          <input
            type="email"
            className="border p-2 pl-[40px] rounded text-[16px] outline-inputoutline w-[300px] sm:w-[350px]"
            placeholder="example@mail.com"
          />
          <span className="absolute top-[43px] left-2  text-[22px]">
            <CiUser />
          </span>
        </div>
        {/* username section */}
        {/* password section */}
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="email"
            className="text-[16px] font-medium text-textgray"
          >
            Password
          </label>
          <input
            type="email"
            className="border p-2 pl-[40px] rounded text-[16px] outline-inputoutline w-[300px] sm:w-[350px]"
            placeholder="*******"
          />
          <span className="absolute top-[43px] left-2  text-[22px]">
            <CiLock />
          </span>
        </div>
        {/* password section */}
        {/* login button section */}
        <div className="flex w-full">
          <button className="w-full py-3 bg-buttonblue text-white rounded cursor-pointer text-[16px] font-normal">
            Log In
          </button>
        </div>
        {/* login button section */}

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

export default Login;
