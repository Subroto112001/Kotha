import React, { createContext, useState, useEffect } from "react";
import { getDatabase, onValue, ref, off } from "firebase/database";
import { getAuth } from "firebase/auth";

export const Usercontext = createContext();

const Fetchuserdata = ({ children }) => {
  const [user, setUser] = useState({});
  const [allUser, setAllUser] = useState([]);

  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const fetchProfiledata = () => {
      const ProfeUser = ref(db, "users/");
      onValue(ProfeUser, (snapshot) => {
        let currentUserData = null;
        let otherUsers = [];

        snapshot.forEach((item) => {
          const userData = {
            ...item.val(),
            userKey: item.key,
          };

          if (item.val().userUid === auth.currentUser?.uid) {
            currentUserData = userData;
          } else {
            otherUsers.push(userData);
          }
        });

        setUser(currentUserData);
        setAllUser(otherUsers);
      });
    };

    fetchProfiledata();

    return () => {
      const ProfeUser = ref(db, "users/");
      off(ProfeUser);
    };
  }, []);

  return (
    <Usercontext.Provider value={{ user, allUser }}>
      {children}
    </Usercontext.Provider>
  );
};

export default Fetchuserdata;
