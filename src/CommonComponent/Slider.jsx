import React, { useContext } from "react";
import { FiMessageSquare, FiSettings, FiSun } from "react-icons/fi";
import { PiMoon } from "react-icons/pi";
import { Themecontext } from "../Context/Theme";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

const Slider = () => {




    const location = useLocation();
    const navigate =useNavigate()
  const slideBaritem = [
    {
      id: 1,
      icon: <IoHomeOutline />,
      path: "/",
    },
    {
      id: 2,
      icon: <FaRegBell />,
      path: "/notification",
    },
    {
      id: 3,
      icon: <FiMessageSquare />,
      path: "/message",
    },
    {
      id: 4,
      icon: <FiSettings />,
      path: "/settings",
    },
  ];

    
    const pageNavigator = (path='/') => {
        navigate(path)
    }
  const { theme, toggleTheme } = useContext(Themecontext);
  return (
    <div className="bg-themebackgroundcolor flex sm:flex-col gap-6 justify-center items-center w-full sm:h-[94vh] rounded-t-md sm:rounded-l-lg px-3.5 py-2.5 sm:p-3">
      <div className="flex justify-center items-center">
        <button
          className="  bg-buttonblue py-3 px-5 rounded-full sm:rounded text-white"
          onClick={toggleTheme}
        >
          {theme === "day" ? <PiMoon /> : <FiSun />}
        </button>
      </div>
      <div className="flex justify-center  sm:flex-col gap-6 items-center ml-[8px] sm:ml-[0] ">
        {slideBaritem.map((item) => (
          <div
            className="bg-buttonblue py-3 px-5 rounded-full sm:rounded text-white"
            onClick={()=>pageNavigator(item.path)}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
