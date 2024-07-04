import React from "react";
import { useLocation } from 'react-router-dom';
import './home.css';
import bg from '../images/bg.jpg'

function Home() {
  const location = useLocation();

  return (
    <div className="homepage">
      <h1>Hello {location.state?.id} and welcome to "KNOW YOUR WEATHER"</h1>
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `${bg}` }} />
      <div className="flex justify-center">
        <button
          className="go-to-weather-btn"
          onClick={() => {
            // Navigate to the weather page
            window.location.href = "/weather";
          }}
        >
          Go to Weather
        </button>
      </div>
    </div>
  );
}

export default Home;
