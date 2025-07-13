import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, update, off } from "firebase/database";
import { getAuth } from "firebase/auth";
import { MdOutlineCloudUpload, MdOutlineMail } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import User from './User';
const Profile = () => {
const db=getDatabase()
    const auth = getAuth()
  const [user, setUser] = useState({})
  const [allUser, setallUser]= useState({})
  const [frRequestdata, setfrRequestdata] = useState([]);

  const navigate = useNavigate()
  
/**
 * 
 * todo : this function is working to fetch user data
 * */ 


useEffect(() => {
  const fetchProfiledata = () => {
    const ProfeUser = ref(db, "users/");
    onValue(ProfeUser, (snapshot) => {
      let Profileuserblanarry = null; // For the current user's data
      let EveryuserlistBlankarry = []; // For all users' data

      snapshot.forEach((item) => {
        const userData = {
          ...item.val(),
          userKey: item.key,
        };

        // Add each user to the array
        if (item.val().userUid !== auth.currentUser.uid) {
        EveryuserlistBlankarry.push(userData);
      }

        // Check for the current user's data
        if (item.val().userUid === auth.currentUser.uid) {
          Profileuserblanarry = userData;
        }
      });

      // Update state with the collected data
      setUser(Profileuserblanarry);
      setallUser(EveryuserlistBlankarry);
    });
  };

  fetchProfiledata();

  // Cleanup the listener on unmount
  return () => {
    const ProfeUser = ref(db, "users/");
    off(ProfeUser); // Remove the onValue listener
  };
}, []);
    
   

    /**
     * 
     * todo : now we will upload photo
     * 
     * */
    


    const handleimageUpload = () => {
      cloudinary.openUploadWidget(
        {
          cloudName: "df8qz4g9h",
          uploadPreset: "ChatAppFile",
          sources: [
            "local",
            "url",
            "camera",
            "dropbox",
            "unsplash",
            "google_drive",
            "shutterstock",
            "image_search",
            "gettyimages",
            "istock",
          ],
          googleApiKey: "AIzaSyAykP0egZO9VbeFAJ8hBJE5td7ho2gcOXY",
          searchBySites: ["all", "cloudinary.com"],
          searchByRights: true,
        },
        (err, result) => {
          if (err) {
            console.error("Failed to upload image ", err);
            return;
          }
          console.log(result.info.secure_url);

          update(ref(db, `users/${user.userKey}`), {
            profile_picture: result?.info?.secure_url,
          });
        }
      );
    };

    useEffect(() => {
      const script = document.createElement("script");
      script.src = `https://upload-widget.cloudinary.com/latest/global/all.js`;
      script.async = true;
      document.body.appendChild(script);
    }, []);
  
  
  
  /**
   * 
   * todo : this function will work for fetch data from friends database
   * 
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
console.log(frRequestdata);
 return (
   <div className="bg-themebackgroundcolor p-6 h-full rounded-b-md sm:rounded-r-md ">
     <div className="flex flex-row justify-between items-center">
       <div className="flex flex-row gap-3 items-center">
         <div className="w-[40px] sm:w-[100px] h-[40px] sm:h-[100px] rounded-full bg-white relative border-2 border-buttonblue cursor-pointer">
           <picture>
             <img
               src={user && user.profile_picture}
               alt={user.profile_picture}
               className="w-full h-full rounded-full object-cover"
             />
           </picture>

           <button
             className="text-[16px] sm:text-3xl absolute cursor-pointer top-[30%] sm:top-[45%] left-[25%] sm:left-[35%] text-black transition-all opacity-0 duration-200 hover:opacity-100"
             onClick={handleimageUpload}
           >
             <MdOutlineCloudUpload />
           </button>
         </div>
         <div>
           <h3 className="text-white text-xl font-medium">{user.username}</h3>
         </div>
       </div>
       <button
         className="bg-buttonblue py-2 px-3 rounded-full sm:rounded text-white text-2xl"
         onClick={() => navigate("/friends")}
       >
         <FaUserFriends />
       </button>
     </div>
     <div className="cardBox flex flex-row justify-between items-center gap-2 mt-5">
       <NavLink
         to={"/friendsRequest"}
         className="bg-baackgroundcolor leftside p-2.5 rounded w-full"
       >
         <h3 className="text-[16px] font-medium">
           {" "}
           Friends Request{" "}
           <span className="text-red-400 bg-white rounded-full p-1 ml-1">
             {frRequestdata.length || "0"}
           </span>
         </h3>
       </NavLink>
       <NavLink
         to={"/friends"}
         className="bg-baackgroundcolor rightside p-2.5 rounded w-full "
       >
         <h3 className="text-[16px] font-medium">
           Friends
           <span className="text-red-400 bg-white rounded-full p-1 ml-1">
             0
           </span>
         </h3>
       </NavLink>
     </div>
     {/* <div className="mt-5 overflow-hidden">
        <User everyUser={allUser} currentuser={user} />
      </div> */}
   </div>
 );
}

export default Profile