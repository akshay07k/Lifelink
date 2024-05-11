import React from 'react';

function Location() {
  const handleRedirect = () => {
    window.location.href = 'https://www.google.com/maps';
  };

  return (
    <div className="flex flex-col items-center justify-center h-96 my-6">
      <div className="text-center mb-8">
        <p className="text-3xl text-gray-800">This feature is currently unavailable</p>
      </div>
      <button 
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={handleRedirect}
      >
        Go to Google Maps
      </button>
    </div>
  );
}

export default Location;
