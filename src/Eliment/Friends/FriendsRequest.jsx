import {
  getDatabase,
  onValue,
  ref,
  push,
  set,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";

const FriendsRequest = () => {
  const [frRequestdata, setfrRequestdata] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

  /* ---------------- realtime subscription ---------------- */
  useEffect(() => {
    const FriendRequest = ref(db, "friendRequest/");
    const unsubscribe = onValue(FriendRequest, (snapshot) => {
      const incoming = [];
      snapshot.forEach((snap) => {
        const data = snap.val();
        if (auth.currentUser?.uid === data.RecevierUserUid) {
          incoming.push({ ...data, userKey: snap.key });
        }
      });
      setfrRequestdata(incoming);
    });

    // clean‑up
    return () => unsubscribe();
  }, [auth.currentUser?.uid, db]);

  /* ---------------- handlers ---------------- */
  const handleAccept = async (req) => {
    try {
      // 1️⃣ add both users to a friends list
      const newFriendRef = push(ref(db, "friends"));
      await set(newFriendRef, {
        userOneUid: req.SenderUserUid,
        userTwoUid: req.RecevierUserUid,
        createdAt: Date.now(),
      });

      // 2️⃣ remove pending request
      await remove(ref(db, `friendRequest/${req.userKey}`));
    } catch (err) {
      console.error("Failed to accept friend:", err);
      // 👉🏽 optionally surface a toast/snackbar here
    }
  };

  const handleRemove = async (requestKey) => {
    try {
      await remove(ref(db, `friendRequest/${requestKey}`));
    } catch (err) {
      console.error("Failed to remove request:", err);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-themebackgroundcolor w-full p-6 rounded-b-md sm:rounded-r-md">
      <h3 className="font-medium text-[22px] text-white">Friend Request</h3>

      <div className="flex flex-col gap-3 overflow-y-auto h-full no-scrollbar rounded-md mt-2">
        {frRequestdata.length ? (
          frRequestdata.map((item) => (
            <div
              key={item.userKey}
              className="flex items-center justify-between gap-4 p-2 bg-white rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.senderProfilePicture}
                  alt={`${item.SenderName}'s profile`}
                  className="w-[45px] h-[45px] rounded-full border-2 border-buttonblue object-cover"
                />
                <span className="font-medium text-[16px]">
                  {item.SenderName}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(item)}
                  className="bg-buttonblue px-3 py-1 rounded text-white font-medium"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRemove(item.userKey)}
                  className="bg-red-500 px-3 py-1 rounded text-white font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white mt-4">No friend requests.</p>
        )}
      </div>
    </div>
  );
};

export default FriendsRequest;
