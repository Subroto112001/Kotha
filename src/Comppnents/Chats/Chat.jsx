import React from 'react'
import "./Chat.css";
import avatar from '../../assets/avatar.png'
import phone from '../../assets/phone.png'
import video from '../../assets/video.png'
import info from '../../assets/info.jpg'
import emoji from '../../assets/emoji.png'

const Chat = () => {
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={avatar} alt={avatar} className="useravatar" />
          <di className="texts">
            <span className="textsheader">Jane Doe</span>
            <p className="texttitle">Lorem ipsum dolor sit amet.</p>
          </di>
        </div>
        <div className="icons">
          <img src={phone} alt={phone} className="iconsimg" />
          <img src={video} alt={video} className="iconsimg" />
          <img src={info} alt={info} className="iconsimg" />
        </div>
      </div>
      <div className="center"></div>
      <div className="bottom">
        <div className="icons">
          
        </div>
        <input type="text" placeholder="Type a message.." />
        <div className="emoji">
          <img src={emoji} alt={emoji} className="emojiimg" />
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
}

export default Chat