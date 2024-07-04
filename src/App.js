import './App.css';
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Weather from "./components/Weather.js"; // Add this import if you want to use Weather separately
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/weather" element={<Weather />} /> {/* Add this route if needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
