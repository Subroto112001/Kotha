import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { MdOutlineCloudUpload } from 'react-icons/md';
const Profile = () => {
const db=getDatabase()
    const auth = getAuth()
    const [user, setUser]=useState({})


/**
 * 
 * todo : this function is working to fetch user data
 * */ 



    useEffect(() => {
        const fetchProfiledata = () =>{
            const ProfeUser = ref(db, "users/");
            onValue(ProfeUser, (snapshot) => {
                let Profileuserblanarry = []
                snapshot.forEach((item) => {
                    if (item.val().userUid === auth.currentUser.uid) {
                      Profileuserblanarry = {
                        ...item.val(),
                        userKey: item.key,
                      };
                    }
                })
                setUser(Profileuserblanarry);
            })
        } 
        fetchProfiledata();
    }, [])
    console.log(user);
    



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
  return (
    <div className="bg-themebackgroundcolor p-6 h-full rounded-b-md sm:rounded-r-md">
      <div className="w-[100px] h-[100px] rounded-full bg-amber-50 relative">
        <picture>
          <img
            src={user && user.profile_picture}
            alt={user.profile_picture}
            className="w-full h-full rounded-full object-cover"
          />
        </picture>
        <button className="text-4xl absolute cursor-pointer top-[40%] left-[25%] text-white transition-all opacity-0 duration-200 hover:opacity-100" onClick={handleimageUpload}>
          <MdOutlineCloudUpload />
        </button>
      </div>
    </div>
  );
}

export default Profile