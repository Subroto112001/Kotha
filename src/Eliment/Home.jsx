import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <NavLink to={"/signup"}>signup page</NavLink>
    </div>
  );
}

export default Home