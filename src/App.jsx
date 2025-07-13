import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageRouter from "./Router/PageRouter";
import Home from "./Eliment/Home";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import Theme from "./Context/Theme";

import Message from "./Eliment/Message";
import Notificaton from "./Eliment/Notificaton";
import Settings from "./Eliment/Settings";
import Friends from "./Eliment/Friends";
import FriendsRequest from "./Eliment/Friends/FriendsRequest";
import MyFriends from "./Eliment/Friends/MyFriends";
import SuggetionsFriend from "./Eliment/Friends/SuggetionsFriend";
import Fetchuserdata from "./Context/FetchData";
const App = () => {
  return (
    <Theme>
       <Fetchuserdata>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PageRouter />}>
            <Route path="/" element={<Home />}>
              <Route path="/notification" element={<Notificaton />} />
              <Route path="/message" element={<Message />} />
              <Route path="/settings" element={<Settings />} />
             
                <Route path="/friends" element={<Friends />}>
                  <Route path="/friends/myfriends" element={<MyFriends />} />
                  <Route
                    path="/friends/friendsrequest"
                    element={<FriendsRequest />}
                  />
                  <Route
                    path="/friends/suggetions"
                    element={<SuggetionsFriend />}
                  />
                </Route>
              
            </Route>
          </Route>
        </Routes>
        </BrowserRouter>
        </Fetchuserdata>
    </Theme>
  );
};

export default App;
