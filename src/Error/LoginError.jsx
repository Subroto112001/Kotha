
import React, { useContext } from 'react'
import { CiChat1 } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';
import { Themecontext } from '../Context/Theme';
import { PiMoon } from 'react-icons/pi';
import { FiSun } from 'react-icons/fi';

const LoginError = () => {
    const { theme, toggleTheme } = useContext(Themecontext);
   
    
    return (
      <div
        className={`container relative flex flex-col justify-center items-center h-screen w-full bg-baackgroundcolor  ${theme}`}
      >
        {" "}
        <div className="absolute top-3.5 left-2.5">
          <button
            className="bg-buttonblue py-3 px-5 rounded text-white cursor-pointer"
            onClick={toggleTheme}
          >
            {theme === "day" ? <PiMoon /> : <FiSun />}
          </button>
        </div>
        <div className="flex flex-col h-screen justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-3 mb-8">
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
          </div>
          <h3 className={`${theme === "night" ? "text-white" : "text-black"}`}>
            Please log in to access this page.{" "}
          </h3>
          <div className="mt-3 p-2 border-2 rounded border-transparent hover:border-buttonblue transition-all duration-200">
            <NavLink
              to={"/login"}
              className="text-[16px] font-medium cursor-pointer text-red-400  "
            >
              Click To Login Here
            </NavLink>
          </div>
        </div>
      </div>
    );
}

export default React.memo(LoginError);