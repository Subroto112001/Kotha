import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const Friends = () => {
  const [frRequestdata, setfrRequestdata] = useState([]);

  const db = getDatabase();
  const auth = getAuth();

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
    <div className="bg-themebackgroundcolor w-full p-6 h-full rounded-b-md sm:rounded-r-md">
      <div className="flex flex-col">
        <h3 className="font-medium text-[22px] text-white">Friend Request</h3>

        <div className="flex flex-col gap-3 overflow-y-auto max-h-[200px] sm:max-h-[280px] no-scrollbar rounded-md mt-2">
          {frRequestdata.length > 0 ? (
            frRequestdata.map((item) => (
              <div key={item.userKey}>
                <div className="flex flex-row items-center justify-between gap-4 p-2 bg-white rounded">
                  <div className="flex flex-row items-center gap-4">
                    <div className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] rounded-full">
                      <img
                        src={item.senderProfilePicture}
                        alt={`${item.SenderName}'s profile`}
                        className="w-full h-full rounded-full border-2 border-buttonblue"
                      />
                    </div>
                    <div className="card-content">
                      <h3 className="font-medium text-[16px]">
                        {item.SenderName}
                      </h3>
                    </div>
                  </div>
                  <button className="text-2xl text-buttonblue">
                    <FaUserPlus />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white mt-4">No friend requests.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
