import React from 'react'
import './userinfo.css'
import more from '../../../assets/more.png'
import video from '../../../assets/video.png'
import edit from '../../../assets/edit.png'
import avatar from '../../../assets/avatar.png'
import { RxAvatar } from 'react-icons/rx'



const UserInfo = () => {
  return (
    <div className="userinfo">
      <div className="user">
        <RxAvatar  className="avatar"  />
        <h2>John Doe</h2>
      </div>
      <div className="icons">
        <img className="iconsOne" src={more} alt={more} />
        <img className="iconsTwo" src={video} alt={video} />
        <img className="iconsThree" src={edit} alt={edit} />
      </div>
    </div>
  );
}

export default UserInfo