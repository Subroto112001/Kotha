import React from 'react'
import { FaUserPlus } from 'react-icons/fa';

const UserCard = ({ name, imageUrl, clickFunction }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 p-3 bg-white rounded  ">
      <div className="flex flex-row items-center gap-4">
        <div className=" w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full">
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
            className="w-full h-full rounded-full border-2 border-buttonblue"
          />
        </div>
        <div className="card-content">
          <h3 className="font-medium text-[16px]">{name}</h3>
        </div>
      </div>
      <button className="text-2xl text-buttonblue" onClick={clickFunction}>
        <FaUserPlus />
      </button>
    </div>
  );
};



export default UserCard