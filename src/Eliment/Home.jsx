import React, { useContext, useMemo } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Slider from "../CommonComponent/Slider";
import { Themecontext } from "../Context/Theme";
import Profile from "./Profile";

const Home = () => {
  const { theme, toggleTheme } = useContext(Themecontext);
  const location = useLocation();

  // this segment will check the path of page
  const isRootPath = useMemo(
    () => location.pathname === "/",
    [location.pathname]
  );

  // is anything change in page slider will not render unnessery
  const sliderComponent = useMemo(() => <Slider />, []);

  return (
    <div
      className={`container bg-baackgroundcolor ${theme} h-screen flex flex-col sm:flex-row gap-2.5 `}
    >
      <div className="sm:w-[8%]">{sliderComponent}</div>

      {isRootPath ? (
        <div className="w-[100%] h-[96vh]">
          <Profile />
        </div>
      ) : (
        <div className="w-[90%] h-[96vh]">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Home;
