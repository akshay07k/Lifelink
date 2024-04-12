import React from 'react'
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ReqCard({name, group, location, phno, $createdAt}) {
  return (
    <div className="m-4 max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl">
            <div className="px-4 py-2 border-b border-red-200 bg-red-500 flex justify-between items-center">
                <div className="font-bold text-xl mb-2">Blood Needed</div>
                <div>{new Date($createdAt).toLocaleDateString()}</div>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base mb-2">
                    Blood Group <BloodtypeIcon className="p-[2px]" />: {group}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    Location <PlaceIcon className="p-[2px]" />: {location}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    Phone No <PhoneIcon className="p-[2px]" />:{' '}
                    <span className="text-blue-900 border-b">{phno}</span>
                </p>
            </div>
        </div>
  )
}
