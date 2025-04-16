import React, { useState } from "react";
import "./Chatlist.css";
import searchImage from "../../../assets/search.png";
import avatar from "../../../assets/avatar.png";

import { IoSearch } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
const Chatlist = () => {
  const [addMode, setAddmode] = useState(false);
  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <IoSearch className="searchImg" />
          <input className="searchInput" type="text" placeholder="Search" />
        </div>
       
        <div className="plushicon" onClick={() => setAddmode((prev) => !prev)}>
          {addMode ? <CiCircleMinus /> : <CiCirclePlus />}
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt={avatar} className="chatavatar" />
        <div className="texts">
          <span className="Nameofitem">Jane Doe</span>
          <p className="msgpart">hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt={avatar} className="chatavatar" />
        <div className="texts">
          <span className="Nameofitem">Jane Doe</span>
          <p className="msgpart">hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt={avatar} className="chatavatar" />
        <div className="texts">
          <span className="Nameofitem">Jane Doe</span>
          <p className="msgpart">hello</p>
        </div>
      </div>
      <div className="item">
        <img src={avatar} alt={avatar} className="chatavatar" />
        <div className="texts">
          <span className="Nameofitem">Jane Doe</span>
          <p className="msgpart">hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
