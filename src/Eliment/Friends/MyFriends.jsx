import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  get,
  remove,
  push,
  set,
} from "firebase/database";
import { FaUserCheck, FaUserSlash, FaBan } from "react-icons/fa";

const FriendsList = () => {
  const auth = getAuth();
  const db = getDatabase();

  const [friendsData, setFriendsData] = useState([]); // [{ friendUid, friendInfo, friendKey }]

  // 🔁 Step 1: Load friends & full user info
  useEffect(() => {
    const currentUid = auth.currentUser?.uid;
    const friendsRef = ref(db, "friends");

    const unsubscribe = onValue(friendsRef, async (snapshot) => {
      const usersSnap = await get(ref(db, "users"));
      const allUsers = usersSnap.exists() ? usersSnap.val() : {};

      const results = [];

      snapshot.forEach((snap) => {
        const data = snap.val();
        let friendUid = null;

        if (data.userOneUid === currentUid) {
          friendUid = data.userTwoUid;
        } else if (data.userTwoUid === currentUid) {
          friendUid = data.userOneUid;
        }

        if (friendUid && allUsers) {
          const friendInfo = Object.values(allUsers).find(
            (user) => user.userUid === friendUid
          );

          if (friendInfo) {
            results.push({
              friendUid,
              friendKey: snap.key,
              friendInfo,
            });
          }
        }
      });

      setFriendsData(results);
    });

    return () => unsubscribe();
  }, [auth.currentUser?.uid, db]);

  // 🔴 Unfriend
  const handleUnfriend = (friendKey) => {
    remove(ref(db, `friends/${friendKey}`))
      .then(() => {
        console.log("Unfriended");
      })
      .catch((err) => {
        console.error("Failed to unfriend", err);
      });
  };

  // 🚫 Block
  const handleBlock = (friendUid) => {
    const currentUid = auth.currentUser?.uid;

    push(ref(db, "blockedUsers"), {
      blockerUid: currentUid,
      blockedUid: friendUid,
      blockedAt: Date.now(),
    })
      .then(() => {
        console.log("Blocked user");
        // Optional: also remove from friends
        const toRemove = friendsData.find((f) => f.friendUid === friendUid);
        if (toRemove) {
          handleUnfriend(toRemove.friendKey);
        }
      })
      .catch((err) => {
        console.error("Failed to block", err);
      });
  };

  return (
    <div className="bg-themebackgroundcolor w-full p-6 rounded-md">
      <h3 className="font-medium text-[22px] text-white mb-3">My Friends</h3>

      {friendsData.length > 0 ? (
        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto no-scrollbar">
          {friendsData.map(({ friendUid, friendKey, friendInfo }) => (
            <div
              key={friendKey}
              className="flex items-center justify-between gap-4 bg-white p-3 rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={friendInfo.profile_picture}
                  alt={`${friendInfo.username}'s profile`}
                  className="w-[45px] h-[45px] rounded-full border-2 border-buttonblue object-cover"
                />
                <h4 className="font-medium text-[16px]">
                  {friendInfo.username}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUnfriend(friendKey)}
                  className="text-red-500 text-xl"
                  title="Unfriend"
                >
                  <FaUserSlash />
                </button>
                <button
                  onClick={() => handleBlock(friendUid)}
                  className="text-gray-600 text-xl"
                  title="Block"
                >
                  <FaBan />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white mt-2">No friends yet.</p>
      )}
    </div>
  );
};

export default FriendsList;
