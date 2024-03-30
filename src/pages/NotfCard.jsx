import React from 'react';

const ConsultationCard = ({ name }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 flex 
     mx-36 my-8 justify-between">
      <div>
      <p className="text-lg font-semibold mb-2">Consultation Request</p>
      <p className="mb-4">Mr/Ms {name} is requesting for consultation.</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
            Accept
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationCard;
