import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Slider from '../CommonComponent/Slider';
import { Themecontext } from '../Context/Theme';

const Home = () => {
  const { theme, toggleTheme } = useContext(Themecontext);
  return (
    <div className={`container bg-baackgroundcolor ${theme} h-screen `}>
      <div className="sm:w-[8%]">
        <Slider />
      </div>
      <div><Outlet/></div>
     
    </div>
  );
}

export default Home