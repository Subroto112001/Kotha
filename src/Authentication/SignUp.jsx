import React, { useContext, useState } from "react";
import { CiChat1, CiLock, CiUser } from "react-icons/ci";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Themecontext } from "../Context/Theme";
import { FiSun } from "react-icons/fi";
import { PiMoon } from "react-icons/pi";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { AiOutlineMail } from "react-icons/ai";

const Login = () => {
  const { theme, toggleTheme } = useContext(Themecontext);
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [usernameError, setusernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passworError, setPassworError] = useState("");

  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const HoldValue = (event) => {
    const { id, value } = event.target;

    if (id === "email") {
      setemail(value);
      setEmailError("");
    } else if (id === "username") {
      setusername(value);
      setusernameError("");
    } else if (id === "password") {
      setpassword(value);
      setPassworError("");
    }
  };
  
  /**
   *
   * todo : this function will work for signup
   *
   * */

  const handleSignup = async () => {
    if (!email) {
      setEmailError("Email is missing here");
      return;
    }
    if (!username) {
      setusernameError("Username is missing here");
      return;
    }
    if (!password) {
      setPassworError("Password is missing here");
      return;
    }

    /**
     * here if there is no error error state will blank
     * */
    setEmailError("");
    setusernameError("");
    setPassworError("");

    /**
     *
     *  now this section will work for signup
     * */

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: "",
        });
      })
      .then(() => {
        let userRef = push(ref(db, "users/"));
        set(userRef, {
          username: auth.currentUser.displayName || username,
          email: auth.currentUser.email || email,
          profile_picture: "",
          userUid: auth.currentUser.uid,
        });
        sendEmailVerification(auth.currentUser);
        alert("We sent your email a verification link");
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setemail("");
        setusername("");
        setpassword("");
      });
  };

  return (
    <div
      className={`container relative flex flex-col justify-center items-center h-screen w-full bg-baackgroundcolor ${theme}`}
    >
      <div className="absolute top-3.5 left-2.5">
        <button
          className="  bg-buttonblue py-3 px-5 rounded text-white"
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

        <h1 className="text-2xl text-textgray font-bold">Sign Up</h1>
        <p className="text-md text-textgray font-medium">
          Get your Kotha account now
        </p>
      </div>

      <div className="flex flex-col mt-6 gap-3.5  p-8 bg-white  rounded-md hover:border hover:border-inputoutline">
        {/* email section */}

        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="email"
            className={`text-[16px] font-medium ${
              emailError ? "text-red-500" : "text-textgray"
            }`}
          >
            {emailError || "Email"}
          </label>

          <input
            type="email"
            id="email"
            className="border p-2 pl-[40px] rounded text-[16px] outline-inputoutline w-[300px]  sm:w-[350px]"
            placeholder="example@mail.com"
            onChange={(e) => HoldValue(e)}
          />
          <span className="absolute top-[43px] left-2  text-[22px]">
            <AiOutlineMail />
          </span>
        </div>
        {/* email section */}
        {/* username section */}
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="username"
            className={`text-[16px] font-medium ${
              usernameError ? "text-red-400" : "text-textgray"
            }`}
          >
            {usernameError || "Username"}
          </label>

          <input
            type="text"
            id="username"
            className="border p-2 pl-[40px] rounded text-[16px] outline-inputoutline w-[300px]  sm:w-[350px]"
            placeholder="Your Short Name"
            onChange={(e) => HoldValue(e)}
          />
          <span className="absolute top-[43px] left-2  text-[22px]">
            <CiUser />
          </span>
        </div>
        {/* username section */}
        {/* password section */}
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="password"
            className={`text-[16px] font-medium ${
              passworError ? "text-red-400" : "text-textgray"
            }`}
          >
            {passworError || "Password"}
          </label>

          <input
            type="password"
            id="password"
            className="border p-2 pl-[40px] rounded text-[16px] outline-inputoutline w-[300px]  sm:w-[350px]"
            placeholder="*******"
            onChange={(e) => HoldValue(e)}
          />
          <span className="absolute top-[43px] left-2  text-[22px]">
            <CiLock />
          </span>
        </div>
        {/* password section */}
        {/* login button section */}
        <div className="flex w-full">
          <button
            className="w-full py-3 bg-buttonblue text-white rounded cursor-pointer text-[16px] font-normal"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
        {/* login button section */}
        <h3 className="text-[16px] text-textgray">
          Already have an account?{" "}
          <NavLink
            to={"/login"}
            className="text-[16px] font-medium cursor-pointer text-red-400"
          >
            Login Here
          </NavLink>
        </h3>
      </div>
    </div>
  );
};

export default Login;
