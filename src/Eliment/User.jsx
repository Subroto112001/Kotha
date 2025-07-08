import React from "react";
import UserCard from "../CommonComponent/UserCard";

const User = ({ everyUser }) => {
  console.log(everyUser);

  return (
    <div className=" flex flex-col gap-3">
      {everyUser && Array.isArray(everyUser) ? (
        everyUser.map((item) => (
          <div >
            <UserCard
              key={item.userKey}
              name={item.username}
              imageUrl={item.profile_picture}
            />
          </div>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default User;
