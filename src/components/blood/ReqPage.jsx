import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import bloodServices from '../../appwrite/blood'
import { Link } from 'react-router-dom'


function ReqPage() {

    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.user_id === userData.$id : false

    useEffect(() => {
      if(slug){
        bloodServices.getMessage(slug).then((post) => {
            console.log(post);
            if(post) setPost(post)
            else navigate("/")
        })
      }
      else{
        navigate("/")
      }
    }, [slug, navigate])

    const deleteMessage = () => {
        bloodServices.deleteMessage(post.$id)
        .then(() => {
            console.log("resolved");
            navigate("/blood-req")
        })
    }
    

  return post ? (
  
    <div className='w-full min-h-[500px] h-full flex justify-center items-center flex-col p-4 bg-gray-50 border border-black/5 rounded-xl'>
      <div className='backdrop-blur-lg bg-white/30 p-8 rounded-xl shadow-lg font-sans'>
      <div className="mb-4 w-64 sm:w-96 lg:w-[500px]">
          <h1 className="text-xl font-semibold mb-2">Name:</h1>
          <p className="text-gray-800">{post.name}</p>
          </div>
          <div className="mb-4">
          <h1 className="text-xl font-semibold mb-2">Blood Group:</h1>
          <p className="text-gray-800">{post.group}</p>
          </div>
          <div className="mb-4">
          <h1 className="text-xl font-semibold mb-2">Location:</h1>
          <p className="text-gray-800">{post.location}</p>
          </div>
      </div>
      <div className="md:w-1/2 m-8 bg-white rounded-lg shadow-md p-6 w-80 sm:w-96">
          <div className="mb-4">
          <h1 className="text-xl font-semibold mb-2">Phone Number:</h1>
          <p className="text-gray-800">{post.phno}</p>
          </div>
          {!isAuthor ? (
              <div className="text-center">
                  <Link to={`https://wa.me/${post.phno}`}>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Donate
                  </button>
                  </Link>
              </div>
          ) : (
              <div className="text-center">
                  <Link>
                  <button 
                  onClick={deleteMessage}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Resolve
                  </button>
                  </Link>
              </div>
          )}
      </div>
    </div>
    

  ) : (
    <div className="flex-col w-full my-2 flex items-center justify-center">
        <div className="w-8 h-8 border-4 text-blue-400  animate-spin
        border-gray-300 border-t-blue-400 rounded-full">
            
        </div>
        <h1 className='text-xl'>loading...</h1>
    </div>
  )
}

export default ReqPage