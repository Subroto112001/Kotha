import React, { useMemo } from 'react'
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { Outlet, useNavigate } from 'react-router-dom';
import MyFriends from './Friends/MyFriends';

const Friends = () => {
const navigate = useNavigate()
 const isRootPath = useMemo(
   () => location.pathname === "/friends",
   [location.pathname]
 );
  return (
    <div className="bg-themebackgroundcolor w-full p-6 h-full rounded-b-md sm:rounded-r-md">
      <div className="flex flex-row gap-1 sm:gap-2.5 items-center">
        <button
          className="bg-buttonblue py-2 px-3 rounded-full sm:rounded text-white text-2xl flex items-center gap-2"
          onClick={() => navigate("/friends/myfriends")}
        >
          <LiaUserFriendsSolid />{" "}
          <h3 className="text-[18px]  font-medium">Friends</h3>
        </button>
        <button
          className="bg-buttonblue py-2 px-3 rounded-full sm:rounded text-white text-xl flex items-center gap-2"
          onClick={() => navigate("/friends/suggetions")}
        >
          <FaUserFriends />
          <h3 className="text-[18px]  font-medium">Suggetions</h3>
        </button>
        <button
          className="bg-buttonblue py-2 px-3 rounded-full sm:rounded text-white text-xl flex items-center gap-2"
          onClick={() => navigate("/friends/friendsrequest")}
        >
          <FaUserPlus />
          <h3 className="text-[18px]  font-medium">Request</h3>
        </button>
      </div>
      {isRootPath ? <MyFriends /> : <Outlet />}
    </div>
  );
}

export default Friends