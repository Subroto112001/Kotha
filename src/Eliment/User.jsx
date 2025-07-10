import React, { useEffect, useState } from "react";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { getDatabase,onValue, push, ref, set } from "firebase/database";

const User = ({ everyUser, currentuser }) => {
  const auth = getAuth();
  const db = getDatabase();
  const [frRequestdata, setfrRequestdata] = useState([]);
  const handleFriendRequest = (user) => {
    set(push(ref(db, "friendRequest/")), {
      // sender information
      SenderEmail: currentuser.email,
      SenderName: currentuser.username,
      senderProfilePicture: currentuser.profile_picture,
      SenderUserKey: currentuser.userKey,
      SenderUserUid: currentuser.userUid,

      // receiver information
      RecevierEmail: user.email,
      RecevierName: user.username,
      RecevierProfilePicture: user.profile_picture,
      RecevierUserKey: user.userKey,
      RecevierUserUid: user.userUid,
    });
  };
  /**
   * todo : this funcntion will fetch data from  friend request data
   * */


  useEffect(() => {
    const fetchFriendRequestdata = () => {
      const FriendRequest = ref(db, "friendRequest/");
      onValue(FriendRequest, (snapshot) => {
        let FriendrequBlankArry = [];

        snapshot.forEach((item) => {
          const data = item.val();
          if (auth.currentUser?.uid === data.RecevierUserUid) {
            FriendrequBlankArry.push({
              ...data,
              userKey: item.key,
            });
          }
        });

        setfrRequestdata(FriendrequBlankArry);
      });
    };

    fetchFriendRequestdata();
  }, [auth.currentUser]);
  return (
    <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] sm:max-h-[480px] no-scrollbar rounded-md">
      {everyUser && Array.isArray(everyUser) ? (
        everyUser.map((item) => (
          <div key={item.userKey}>
            <div className="flex flex-row items-center justify-between gap-4 p-3 bg-white rounded">
              <div className="flex flex-row items-center gap-4">
                <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full">
                  <img
                    src={item.profile_picture}
                    alt={`${item.username}'s profile`}
                    className="w-full h-full rounded-full border-2 border-buttonblue"
                  />
                </div>
                <div className="card-content">
                  <h3 className="font-medium text-[16px]">{item.username}</h3>
                </div>
              </div>

              {frRequestdata.includes(item.userUid) ? (
                // friend request remove code
                <button className="text-2xl text-buttonblue">
                  <FaUserMinus />
                </button>
              ) : (
                <button
                  className="text-2xl text-buttonblue"
                  onClick={() => handleFriendRequest(item)}
                >
                  {" "}
                  <FaUserPlus />
                </button>
              )}
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
