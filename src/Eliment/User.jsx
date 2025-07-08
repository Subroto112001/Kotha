import React from "react";
import UserCard from "../CommonComponent/UserCard";
import { FaUserPlus } from "react-icons/fa";
import { getAuth } from "firebase/auth";
const User = ({ everyUser, currentuser }) => {
    console.log(currentuser.userUid);
    
  const auth = getAuth();
  console.log(everyUser);
  const handleFriendRequest = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className=" flex flex-col gap-3">
      {everyUser && Array.isArray(everyUser) ? (
        everyUser.map((item) => (
          <div>
            <div
              className="flex flex-row items-center justify-between gap-4 p-3 bg-white rounded  "
              key={item.userKey}
            >
              <div className="flex flex-row items-center gap-4">
                <div className=" w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full">
                  <img
                    src={item.profile_picture}
                    alt={`${item.profile_picture}'s profile`}
                    className="w-full h-full rounded-full border-2 border-buttonblue"
                  />
                </div>
                <div className="card-content">
                  <h3 className="font-medium text-[16px]">{item.username}</h3>
                </div>
              </div>
              <button
                className="text-2xl text-buttonblue"
                onClick={(e) => handleFriendRequest(e)}
              >
                <FaUserPlus />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default User;
