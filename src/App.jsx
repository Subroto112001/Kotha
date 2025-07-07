import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PageRouter from './Router/PageRouter';
import Home from './Eliment/Home';
import Login from './Authentication/Login';
import SignUp from "./Authentication/SignUp";
import Theme from './Context/Theme';

const App = () => {
  return (
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PageRouter />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Theme>
  );
}

export default App