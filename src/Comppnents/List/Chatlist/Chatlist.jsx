import React, { useState } from "react";
import "./Chatlist.css";
import searchImage from "../../../assets/search.png";
import plus from "../../../assets/plus.png";
import minus from "../../../assets/minus.png";
import avatar from "../../../assets/avatar.png";
const Chatlist = () => {
  const [addMode, setAddmode] = useState(false);
  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img className="searchImg" src={searchImage} alt={searchImage} />
          <input className="searchInput" type="text" placeholder="Search" />
        </div>
        <img
          className="plushicon"
          src={addMode ? minus : plus}
          onClick={() => setAddmode((prev) => !prev)}
          alt={plus}
        />
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
