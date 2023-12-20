import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lists from './pages/Lists';

const App = () => {
  return (
    <Routes>
      <Route path='/detail' element={<Home />} />
      <Route path='/' element={<Lists />} />
    </Routes>
  );
};

export default App;


