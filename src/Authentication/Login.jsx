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
const Login = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(Themecontext);

  const [logininfo, setLogininfo] = useState({
    Email: "",
    Password: "",
  });

  const [loginError, setloginError] = useState({
    EmailError: "",
    PasswordError: "",
  });

  /**
   *
   * todo : this function will take value from input
   * and keep it a state
   *
   * */

  const HandlTakelogininfo = (e) => {
    const { id, value } = e.target;

    setLogininfo((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear the corresponding error when the user types
    setloginError((prevError) => ({
      ...prevError,
      [`${id}Error`]: value ? "" : prevError[`${id}Error`],
    }));
    console.log(`your id is ${id} and your value is ${value}`);
  };

  /**
   *
   * todo : this function will work for login
   *
   * */

  const handleLogin = () => {
    // there will handle the error first
    const { Email, Password } = logininfo;
    if (!Email) {
      setloginError({
        ...loginError,
        EmailError: "Please Enter Your Email",
      });
    } else if (!Password) {
      setloginError({
        ...loginError,
        EmailError: "",
        PasswordError: "Please Enter Your Password",
      });
    } else {
      setloginError({
        ...loginError,
        EmailError: "",
        PasswordError: "",
      });
    }

    signInWithEmailAndPassword(auth, Email, Password)
      .then((userinfo) => {
        console.log(userinfo);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`container relative flex flex-col justify-center items-center h-screen w-full bg-baackgroundcolor  ${theme}`}
    >
      <div className="absolute top-3.5 left-2.5">
        <button
          className="bg-buttonblue py-3 px-5 rounded text-white"
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
        {/* username section */}
        {/* password section */}
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
        {/* password section */}
        {/* login button section */}
        <div className="flex w-full">
          <Button HandleClik={handleLogin} Vlaue={"Login"} />
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
