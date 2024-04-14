import React, { useState, useEffect } from 'react';
import docService from "../appwrite/authDoc"
import { Link } from 'react-router-dom'
import { Query } from 'appwrite';


export default function AllPosts() {

  const [posts, setPosts] = useState([])
  const [filterOption, setFilterOption] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    docService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  const filteredPosts = (filterOption || searchTerm) ? posts.filter((post) => {
    const titleMatch = filterOption ? post.title.toLowerCase() === filterOption : true;
    const nameMatch = searchTerm ? post.name.toLowerCase().includes(searchTerm)
                    || post.title.toLowerCase().includes(searchTerm) : true;
    
    return titleMatch && nameMatch;
  })
  : posts ;
  


  return (
    <div className="flex w-full min-h-[800px]">
        
      <div className="w-1/4 p-4 flex-shrink-0 border-r">
        
        <h1 className='text-xl my-5'
        >Filter Doctors</h1>
        <div className="my-6 ">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            type="text"
            placeholder="Search Doctors"
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="h-6 w-6 text-gray-400 absolute right-3 top-3" />
        </div>
        
        <div>
          <select
           value={filterOption}
           onChange={(e) => setFilterOption(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">All Specialties</option>
            <option value="dermatologist">Dermatologist</option>
            <option value="neurologist">Neurologist</option>
            <option value="orthopedist">Orthopedist</option>
          </select>
          <div className="h-6 w-6 text-gray-400 absolute right-3 top-3" />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto max-h-[800px]">
        { searchTerm && !filteredPosts.length ? (
          <div className='w-full h-96 flex justify-center text-xl'>
            No Such Doctor Exists
          </div>
        ) : filteredPosts.length ?  (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {filteredPosts.map((post) => (
              <div key={post.$id} className={`border p-4 rounded-md ${post.status == "inactive" ? "hidden" : ""}`}>
                <img src={docService.getFilePreview(post.doctorImage)}
                  alt={post.name} className="w-full h-52 object-cover rounded-md mb-2" />
                <h2 className="text-lg font-semibold mb-2">Dr. {post.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{post.title}</p>
                <p className="text-sm">{post.description}</p>
                <Link to={`/doctor/${post.$id}`}>
                  <button
                    className='text-[#1573ff] border bg-transparent mx-[30px]
                    my-[5px] p-2 rounded-[10px] border-[none] border-solid border-[#1573ff]
                    hover:bg-[#277dff] hover:text-white hover:cursor-pointer'
                  >See Profile</button>
                </Link>
              </div>
            ))}

          </div>
        ) : (
          <div className="flex-col w-full my-2 flex items-center justify-center">
          <div className="w-8 h-8 border-4 text-blue-400  animate-spin
          border-gray-300 border-t-blue-400 rounded-full">
              
          </div>
          <h1 className='text-xl'>loading...</h1>
          </div>
        )}
      </div>
    </div>
  )
};
