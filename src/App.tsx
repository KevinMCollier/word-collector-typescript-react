import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './user-authentication/LoginPage'
import Homepage from './homepage'
import './App.css';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
    </Router>
  );
}

export default App;
