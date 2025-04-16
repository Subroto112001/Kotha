import React, { useState } from 'react'
import "./Chat.css";
import avatar from '../../assets/avatar.png'
import { CiMicrophoneOn } from 'react-icons/ci';
import { FaCamera, FaImage, FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { MdEmojiEmotions } from 'react-icons/md';
import { FaCircleInfo } from 'react-icons/fa6';

import EmojiPicker from 'emoji-picker-react';
import { RxAvatar } from 'react-icons/rx';
const Chat = () => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpen(false);
  }
  

  
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <RxAvatar  className="useravatar" />
          <div className="texts">
            <span className="textsheader">Jane Doe</span>
            <p className="texttitle">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <FaPhoneAlt className="iconsimg" />
          <FaVideo className="iconsimg" />
          <FaCircleInfo className="iconsimg" />
        </div>
      </div>
      <div className="center">





      </div>
      <div className="bottom">
        <div className="icons">
          <FaImage className="iconsitem" />
          <FaCamera className="iconsitem" />
          <CiMicrophoneOn className="iconsitem" />
        </div>
        <input
          type="text"
          placeholder="Type a message.."
          className="messageinput"
          value={text}
          onChange={e=>setText(e.target.value)}
        />
        <div className="emoji">
          <MdEmojiEmotions className="emojiitems" onClick={() => setOpen((prev) => !prev)} />
          
          <div className="picker">

          <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
}

export default Chat