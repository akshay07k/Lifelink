import React from 'react'

function ReqCard({name, group, location, phno}) {
  return (
    <div className="m-4 max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl">
      <div className="px-4 py-2 border-b border-red-200 bg-red-500">
        <div className="font-bold text-xl mb-2">Blood Needed</div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base mb-2">Blood Group: {group}</p>
        <p className="text-gray-700 text-base mb-2">Location: {location}</p>
        <p className="text-gray-700 text-base mb-2">Phone Number: {phno}</p>
      </div>
    </div>
  )
}

export default ReqCard