import React from 'react';

function Map({ longitude, latitude }) {
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-10">
        <div className="w-full h-96 sm:h-[28rem] bg-gray-300 rounded-lg overflow-hidden relative">
          <iframe 
            width="100%" 
            height="100%" 
            className="absolute inset-0" 
            title="map" 
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCAYhOv9bpaK9lPFyTNxDoaeUbDXOUDvec&q=${latitude},${longitude}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Map;
