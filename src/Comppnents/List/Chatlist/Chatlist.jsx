import React, { useState } from "react";
import "./Chatlist.css";
import searchImage from "../../../assets/search.png";
import plus from '../../../assets/plus.png'
import minus from '../../../assets/minus.png'
const Chatlist = () => {
  const [addMode, setAddmode] = useState(false)
  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img className="searchImg" src={searchImage} alt={searchImage} />
          <input className="searchInput" type="text" placeholder="Search" />
        </div>
        <img className="plushicon" src={addMode ? minus:  plus} onClick={()=>setAddmode(prev=> !prev)} alt={plus} />
      </div>
    </div>
  );
};

export default Chatlist;
