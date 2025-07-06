import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PageRouter from './Router/PageRouter';
import Home from './Eliment/Home';
import Login from './Authentication/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/> } />
        <Route path="/" element={<PageRouter />} >
          <Route path='/' element={ <Home/>} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App