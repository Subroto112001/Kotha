import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendsSidebar = ({ onSelectFriend, selectedFriend }) => {
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState({});
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    const friendsRef = ref(db, "friends");

    const unsub = onValue(friendsRef, async (snapshot) => {
      const list = [];

      snapshot.forEach((snap) => {
        const d = snap.val();
        if (d.userOneUid === uid) list.push(d.userTwoUid);
        else if (d.userTwoUid === uid) list.push(d.userOneUid);
      });

      setFriends(list);

      const usersSnap = await get(ref(db, "users"));
      if (usersSnap.exists()) {
        setUsers(usersSnap.val());
      }
    });

    return () => unsub();
  }, []);

  const getUserInfo = (uid) =>
    Object.values(users).find((user) => user.userUid === uid);

  return (
    <div className="p-3">
      <h3 className="text-lg font-semibold mb-3">Friends</h3>
      <div className="flex flex-col gap-1">
        {friends.map((uid) => {
          const friend = getUserInfo(uid);
          if (!friend) return null;

          const isActive = selectedFriend?.userUid === friend.userUid;

          return (
            <div
              key={uid}
              onClick={() => onSelectFriend(friend)}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                isActive ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              <img
                src={friend.profile_picture}
                alt={friend.username}
                className="w-10 h-10 rounded-full border object-cover"
              />
              <span className="font-medium">{friend.username}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsSidebar;
