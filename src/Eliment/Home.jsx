import React, { useContext, useMemo, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Slider from "../CommonComponent/Slider";
import { Themecontext } from "../Context/Theme";
import Profile from "./Profile";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const { theme, toggleTheme } = useContext(Themecontext);
  const location = useLocation();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // this segment will check the path of page
  const isRootPath = useMemo(
    () => location.pathname === "/",
    [location.pathname]
  );

  // is anything change in page slider will not render unnessery
  const sliderComponent = useMemo(() => <Slider />, []);

  if (!user) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <h3>Please log in to access this page. </h3>
        <NavLink
          to={"/login"}
          className="text-[16px] font-medium cursor-pointer text-red-400"
        >
          Click To Login Here
        </NavLink>
      </div>
    );
  }

  if (user && !user.emailVerified) {
    return <div>Please verify your email to access this page.</div>;
  }

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
