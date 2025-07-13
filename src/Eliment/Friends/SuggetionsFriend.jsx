import React, { useContext, useEffect, useState } from "react";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { Usercontext } from "../../Context/FetchData";

const SuggetionsFriend = () => {
  const { user, allUser } = useContext(Usercontext);
  const auth = getAuth();
  const db = getDatabase();

  const [sentRequestUids, setSentRequestUids] = useState([]);

  // 👉 Handle Friend Request
  const handleFriendRequest = (receiver) => {
    push(ref(db, "friendRequest/"), {
      // sender
      SenderEmail: user.email,
      SenderName: user.username,
      senderProfilePicture: user.profile_picture,
      SenderUserKey: user.userKey,
      SenderUserUid: user.userUid,

      // receiver
      RecevierEmail: receiver.email,
      RecevierName: receiver.username,
      RecevierProfilePicture: receiver.profile_picture,
      RecevierUserKey: receiver.userKey,
      RecevierUserUid: receiver.userUid,
    });
  };

  // 👉 Fetch sent friend requests
  useEffect(() => {
    const FriendRequest = ref(db, "friendRequest/");
    onValue(FriendRequest, (snapshot) => {
      let uids = [];

      snapshot.forEach((item) => {
        const data = item.val();
        if (auth.currentUser?.uid === data.SenderUserUid) {
          uids.push(data.RecevierUserUid);
        }
      });

      setSentRequestUids(uids);
    });

    return () => {
      // Optional: remove listener
      // off(FriendRequest);
    };
  }, [auth, db]);

  return (
    <div className="flex flex-col gap-3 overflow-y-auto max-h-[395px] sm:max-h-[475px] mt-2 no-scrollbar rounded-md">
      {allUser && allUser.length > 0 ? (
        allUser.map((item) => (
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

              {sentRequestUids.includes(item.userUid) ? (
                <button className="text-2xl text-buttonblue" disabled>
                  <FaUserMinus />
                </button>
              ) : (
                <button
                  className="text-2xl text-buttonblue"
                  onClick={() => handleFriendRequest(item)}
                >
                  <FaUserPlus />
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No users available</p>
      )}
    </div>
  );
};

export default SuggetionsFriend;
