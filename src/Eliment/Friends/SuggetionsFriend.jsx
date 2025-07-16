import React, { useContext, useEffect, useState } from "react";
import { FaUserPlus, FaUserMinus, FaUserCheck } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { Usercontext } from "../../Context/FetchData";

const SuggetionsFriend = () => {
  const { user, allUser } = useContext(Usercontext);

  const auth = getAuth();
  const db = getDatabase();

  /* ---------------- state ---------------- */
  // requests YOU have sent  ➜ { [receiverUid]: requestKey }
  const [sentRequests, setSentRequests] = useState({});
  // users that are already FRIENDS with you ➜ { [friendUid]: friendshipKey }
  const [friends, setFriends] = useState({});

  /* ---------------- send request ---------------- */
  const handleFriendRequest = (receiver) => {
    const newRef = push(ref(db, "friendRequest"));
    set(newRef, {
      // sender (you)
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

  /* ---------------- cancel request ---------------- */
  const handleCancelRequest = (receiverUid) => {
    const requestKey = sentRequests[receiverUid];
    if (!requestKey) return;

    remove(ref(db, `friendRequest/${requestKey}`)).catch((err) =>
      console.error("Failed to cancel request", err)
    );
  };

  /* ---------------- listeners : sent requests ---------------- */
  useEffect(() => {
    const reqRef = ref(db, "friendRequest");
    const unsub = onValue(reqRef, (snap) => {
      const map = {};
      snap.forEach((child) => {
        const d = child.val();
        if (d.SenderUserUid === auth.currentUser?.uid) {
          map[d.RecevierUserUid] = child.key;
        }
      });
      setSentRequests(map);
    });
    return () => unsub();
  }, [auth.currentUser?.uid, db]);

  /* ---------------- listeners : accepted friends ---------------- */
  useEffect(() => {
    const friRef = ref(db, "friends");
    const unsub = onValue(friRef, (snap) => {
      const map = {};
      snap.forEach((child) => {
        const d = child.val();
        if (d.userOneUid === auth.currentUser?.uid) {
          map[d.userTwoUid] = child.key;
        } else if (d.userTwoUid === auth.currentUser?.uid) {
          map[d.userOneUid] = child.key;
        }
      });
      setFriends(map);
    });
    return () => unsub();
  }, [auth.currentUser?.uid, db]);

  /* ---------------- UI ---------------- */
  return (
    <div className="flex flex-col gap-3 overflow-y-auto max-h-[395px] sm:max-h-[475px] mt-2 no-scrollbar rounded-md">
      {allUser && allUser.length ? (
        allUser
          .filter((u) => u.userUid !== auth.currentUser?.uid) // hide yourself
          .map((u) => {
            const isFriend = !!friends[u.userUid];
            const requestPending = !!sentRequests[u.userUid];

            return (
              <div key={u.userKey}>
                <div className="flex items-center justify-between gap-4 p-3 bg-white rounded">
                  {/* avatar & name */}
                  <div className="flex items-center gap-4">
                    <img
                      src={u.profile_picture}
                      alt={`${u.username}'s profile`}
                      className="w-[50px] h-[50px] rounded-full border-2 border-buttonblue object-cover"
                    />
                    <h3 className="font-medium text-[16px]">{u.username}</h3>
                  </div>

                  {/* action button */}
                  {isFriend ? (
                    <button
                      className="text-2xl text-green-500 cursor-default"
                      disabled
                      title="Already friends"
                    >
                      <FaUserCheck />
                    </button>
                  ) : requestPending ? (
                    <button
                      className="text-2xl text-red-500"
                      onClick={() => handleCancelRequest(u.userUid)}
                      title="Cancel request"
                    >
                      <FaUserMinus />
                    </button>
                  ) : (
                    <button
                      className="text-2xl text-buttonblue"
                      onClick={() => handleFriendRequest(u)}
                      title="Send friend request"
                    >
                      <FaUserPlus />
                    </button>
                  )}
                </div>
              </div>
            );
          })
      ) : (
        <p className="text-center text-gray-500">No users available</p>
      )}
    </div>
  );
};

export default SuggetionsFriend;
