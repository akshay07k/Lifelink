import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import bloodServices from '../../appwrite/blood'
import Button from '../Button'


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
    <div className="w-full min-h-[500px] flex justify-center items-center bg-blue-50">
        <div className="w-full md:w-1/2 m-8 bg-white rounded-lg shadow-xl py-4 px-28">
            <div className="mb-4">
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
        <div className="w-full md:w-1/2 m-8 bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
            <h1 className="text-xl font-semibold mb-2">Phone Number:</h1>
            <p className="text-gray-800">{post.phno}</p>
            </div>
            {!isAuthor ? (
                <div className="text-center">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Donate
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <button 
                    onClick={deleteMessage}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Resolve
                    </button>
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