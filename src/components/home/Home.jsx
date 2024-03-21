import React from 'react'
import {doctorsImage, doctor1, doctor2,
        doctor3, doctor4, map} from "../../assets/index.js"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {

    const auth = useSelector((state) => state.auth)

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
                <Link to={!auth.status ? '/login' : '/'}
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
         className='w-[90%] h-[400px] flex items-center mx-[5%] my-5'
        >
            <div
             className='h-[90%] w-3/12'
            >
                <img 
                 className='h-3/5 w-4/5 object-cover mt-5 mx-5 rounded-[10px]'
                src={doctor1} alt="" />
                <h2
                 className='font-thin mx-[30px] mt-4'
                >Dr. Jacob Jones</h2>
                <p
                 className='mx-[30px] my-[5px]'
                >Dermatologist</p>
                <button
                 className='text-[#1573ff] border bg-transparent mx-[30px]
                 my-[5px] p-2 rounded-[10px] border-[none] border-solid border-[#1573ff]
                 hover:bg-[#277dff] hover:text-white hover:cursor-pointer'
                >See Profile</button>
            </div>
            <div
             className='h-[90%] w-3/12'
            >
                <img 
                 className='h-3/5 w-4/5 object-cover mt-5 mx-5 rounded-[10px]'
                src={doctor2} alt="" />
                <h2
                 className='font-thin mx-[30px] mt-4'
                >Dr. Jacob Jones</h2>
                <p
                 className='mx-[30px] my-[5px]'
                >Dermatologist</p>
                <button
                 className='text-[#1573ff] border bg-transparent mx-[30px]
                 my-[5px] p-2 rounded-[10px] border-[none] border-solid border-[#1573ff]
                 hover:bg-[#277dff] hover:text-white hover:cursor-pointer'
                >See Profile</button>
            </div>
            <div
             className='h-[90%] w-3/12'
            >
                <img 
                 className='h-3/5 w-4/5 object-cover mt-5 mx-5 rounded-[10px]'
                src={doctor3} alt="" />
                <h2
                 className='font-thin mx-[30px] mt-4'
                >Dr. Jacob Jones</h2>
                <p
                 className='mx-[30px] my-[5px]'
                >Dermatologist</p>
                <button
                 className='text-[#1573ff] border bg-transparent mx-[30px]
                 my-[5px] p-2 rounded-[10px] border-[none] border-solid border-[#1573ff]
                 hover:bg-[#277dff] hover:text-white hover:cursor-pointer'
                >See Profile</button>
            </div>
            <div
             className='h-[90%] w-3/12'
            >
                <img 
                 className='h-3/5 w-4/5 object-cover mt-5 mx-5 rounded-[10px]'
                src={doctor4} alt="" />
                <h2
                 className='font-thin mx-[30px] mt-4'
                >Dr. Jacob Jones</h2>
                <p
                 className='mx-[30px] my-[5px]'
                >Dermatologist</p>
                <button
                 className='text-[#1573ff] border bg-transparent mx-[30px]
                 my-[5px] p-2 rounded-[10px] border-[none] border-solid border-[#1573ff]
                 hover:bg-[#277dff] hover:text-white hover:cursor-pointer'
                >See Profile</button>
            </div>
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

