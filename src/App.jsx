import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PageRouter from './Router/PageRouter';
import Home from './Eliment/Home';
import Login from './Authentication/Login';
import SignUp from "./Authentication/SignUp";
import Theme from './Context/Theme';

import Message from "./Eliment/Message"
import Notificaton from './Eliment/Notificaton';
import Settings from './Eliment/Settings';
import Friends from './Eliment/Friends';
const App = () => {
  return (
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PageRouter />}>
            <Route path="/" element={<Home />}>
              <Route path="/notification" element={<Notificaton />} />
              <Route path="/message" element={<Message />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/friends" element={<Friends />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Theme>
  );
}

export default App