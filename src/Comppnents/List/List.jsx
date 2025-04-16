import React from 'react'
import "./List.css"
import UserInfo from './Userinfo/UserInfo'
import Chatlist from './Chatlist/Chatlist'
const List = () => {
  return (
    <div className='list'>
<UserInfo/>
<Chatlist/>
    </div>
  )
}

export default List