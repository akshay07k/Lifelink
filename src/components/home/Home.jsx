import React, {useState, useEffect} from 'react'
import {doctorsImage, map} from "../../assets/index.js"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import docService from '../../appwrite/authDoc.js';
import DocPost from './DocPost.jsx';

export default function Home() {

    const auth = useSelector((state) => state.auth)

    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(auth && posts.length === 0){
            docService.getPosts([]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                    console.log(posts);
                }
            })
        }
        
    }, [])

  return (
    <>
    <div 
     className='flex bg-[aliceblue] mx-[30px] my-[50px] w-[98%]'
    >
        <div className='h-full w-full mx-[50px] my-[30px]'>
            <h2
             className='bg-[rgb(206,232,255)] text-[rgb(66,19,255)] 
             w-[310px] text-lg font-[lighter] mt-2.5 px-2.5 py-[5px]'
            >WE TAKE CARE OF YOUR HEALTH</h2>
            <h1 
             className='text-[80px] font-extralight 
             leading-[100%] pt-[30px] pb-0 px-0'
             >
                Consult your doctor <br /> from home
            </h1>
            <p 
             className='text-[22px] font-thin text-[#6b6b6b] tracking-wider px-2.5 py-[30px]'
            >
                Choose the best online therapy services, begin your free <br />
                assessment and speak to a licensed therapist. Help is at your <br />
                fingertips.
            </p>
            <div className='p-2.5 flex'>
                <Link to={!auth.status ? '/login' : '/doctors'}
                 className='bg-[#0066ff] text-white 
                 text-lg p-3 my-2 rounded-md' 
                >
                    Book a meeting
                </Link>
                <p className='text-[#005ae2] text-xl m-[22px] underline'>
                    How it works
                </p>
            </div>
        </div>
        <div className='w-full h-full'>
            <img
             className='h-[470px] w-[500px] object-cover m-[30px] rounded-[20px]'
             src={doctorsImage} alt="Doctor image" />
        </div>
    </div>
    
    <div className='w-full mx-0 my-[50px]'>
        <div className='w-full flex justify-center'>
            <h1 
             className='text-[40px] font-medium after:content-[""]
             after:block after:w-6/12 after:pb-2 after:border-b-[5px]
             after:border-b-[#9f1823] after:border-solid'
            >Meet Our Specialist Doctors</h1>
        </div>
        <div 
            className='h-[400px] whitespace-nowrap flex items-end
             mx-[5%] my-5 overflow-x-auto overflow-y-hidden
             scroll-smooth'
        >
            {posts.length ? posts.map((post) => (
                <div className='h-[90%] w-[25%] flex-shrink-0' key={post.$id}>
                    <DocPost {...post} />
                </div>
            )) : 
            !auth.status ? (
                <div 
                    className='w-full h-full flex justify-center 
                    items-center text-xl'
                >
                    login to view doctors
                </div>
            ) : (
                <div 
                    className='w-full h-full flex justify-center 
                    items-center text-xl'
                >
                    loading...
                </div>
            )}
        </div>


    </div>

    <div 
     className='w-full h-[650px] p-8 pt-0 flex'
    >
        
        <div className='w-full h-[600px] absolute left-0 z-[-2] p-4'>
            <img
            className='h-[550px] w-full brightness-105
             object-cover rounded-xl opacity-25'
            src={map} alt="" />
        </div>
        <div className='h-full w-full py-16 px-6  backdrop-blur-[1px]
        flex items-center justify-between'>
            <div className='w-1/2 h-full p-3 pt-8'>
            <h1
             className='text-[65px] leading-none mt-4 mb-8'
            >Find the best hospitals <br/>
             near you in <br/> just one click</h1>
            <Link to={!auth.status ? '/login' : '/'}
             className='bg-blue-500 m-10 px-10 py-4
             text-2xl text-white rounded-xl'
            >
                Find<LocationOnIcon/>
            </Link>
            </div>
                    
            <div className='w-1/2 h-[470px]'>
            <img
                className='h-full w-[700px] brightness-105
                object-cover rounded-xl mr-8'
                src={map} alt="" />
            </div>
        </div>

    </div>

    
    </>
  )
}

