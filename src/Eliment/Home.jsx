import React from 'react'
import { NavLink } from 'react-router-dom'
import Slider from '../CommonComponent/Slider';

const Home = () => {
  return (
    <div className='container'>
      <div className='w-[8%]'>
        <Slider />
      </div>
    </div>
  );
}

export default Home