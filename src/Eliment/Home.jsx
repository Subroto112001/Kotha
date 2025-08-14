import React, { useContext, useMemo, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Slider from "../CommonComponent/Slider";
import { Themecontext } from "../Context/Theme";
import Profile from "./Profile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginError from "../Error/loginError";



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
    return <LoginError />;
  }

  if (user && !user.emailVerified) {
    return <div>Please verify your email to access this page.</div>;
  }

  return (
    <div
      className={`container bg-baackgroundcolor ${theme} h-screen flex flex-col sm:flex-row gap-2.5 relative`}
    >
      <div className="sm:w-[8%]">{sliderComponent}</div>

      {isRootPath ? (
        <div className="w-[100%] h-[96vh]">
          <Profile />
        </div>
      ) : (
        <div className="w-[100%] h-[96vh]">
          <Outlet />
        </div>
      )}

      <h3 className="absolute bottom-[22px] text-white font-normal left-[25%] sm:left-[45%]">
        Powered By @BarmanTech
      </h3>
    </div>
  );
};

export default Home;
