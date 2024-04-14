import React from 'react'
import docService  from '../../appwrite/authDoc.js'
import {Link} from 'react-router-dom'

export default function DocPost({
    $id, 
    name,
    title, 
    doctorImage,
    status
    }) {
        
  return (
    <div
     className=""
    >
        <img 
         className='h-44 w-64 object-cover mt-5 mx-5 rounded-[10px]'
        src={docService.getFilePreview(doctorImage)} alt={name} />
        <h2
         className='font-thin mx-[30px] mt-4'
        >Dr. {name}</h2>
        <p
         className='mx-[30px] my-[5px]'
        >{title}</p>
        <Link to={`/doctor/${$id}`}>
        <button
         className='text-[#1573ff] border bg-transparent mx-[30px]
         my-[5px] p-2 rounded-[10px] border-[none] border-solid border-[#1573ff]
         hover:bg-[#277dff] hover:text-white hover:cursor-pointer'
        >See Profile</button>
        </Link>
    </div>
    
  )
}
