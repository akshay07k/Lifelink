import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LogoutBtn } from '../index';
import docService from "../../appwrite/authDoc"

import SearchIcon from '@mui/icons-material/Search'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function Header() {

    const auth = useSelector((state) => state.auth)
    console.log(auth);
    
    const [notification, setNotification] = useState([])
    const slug = auth.userData?.labels[0]
    // console.log(slug);

    const navigate = useNavigate()

    useEffect(() => {
        
        if (slug) {
            docService.getPost(slug).then((post) => {
                if (post) {
                    const data = post.requests
                    setNotification(data)
                }
                else navigate("/")
            });
        } else navigate("/")
    }, [slug, navigate])
    


    const [down, setDown] = useState(false)

    function userClick() {
        let butn = document.querySelector('#userAcc');
        !down ? butn.classList.remove("hidden") : butn.classList.add("hidden")
        setDown(!down)
    }


  return (
    <header className='sticky w-full z-30 top-0 bg-white'>
        <nav className='h-[100px] shadow'>
        <div className="h-[65%] flex items-center justify-between px-5 py-0 border-b-[0.1px] border-b-[#8a9fc5] border-dotted">
                <div className="h-full flex justify-center items-center ml-6">
                    <h1 className="text-4xl  w-full 
                max-w-[160px] bg-gradient-to-r from-blue-700 to-green-700 text-transparent bg-clip-text ">
                        Lifelink.
                    </h1>
                </div>
                <div className=" w-[400px] h-[42px] flex items-center bg-[aliceblue] rounded-full">
                    <SearchIcon className='ml-5 mr-2'/>
                    <input
                        className="border-b-[#a1a1a1] border-b border-solid w-4/5 h-4/5 p-3.5 rounded-[50px]  border-[none] outline-none"
                        type="text"
                        placeholder="Search here..."
                    />
                    {/*  */}
                </div>
                
                {!auth.status ? (
                    <div className='w-60'>
                        <Link to="/login" className="no-underline text-xl mx-8">
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-[#0066ff] text-white no-underline transition-[0.5s] text-xl px-[25px] py-[9px] rounded-md"
                        >
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <div className='flex items-center w-60'>
                        <Link to={`/notifications/${slug}`}
                         className='mx-4 p-2 text-blue-400 
                         mr-2 '>
                            {notification?.length ? <NotificationsActiveIcon /> : <NotificationsIcon /> }
                        </Link>
                    <div className='flex items-center justify-end w-44 cursor-pointer px-3 border-l-2 border-slate-200' 
                    onClick={userClick}>
                            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpc-IOXksvrRZO191r4scUWCErj6cQYqiBcg&usqp=CAU'} 
                            alt="" className='w-10 h-10 object-cover cursor-pointer rounded-[50%] mr-1.5'/>
                            <p>Hi {auth.userData?.name}</p>
                            {!down ? <ExpandMoreIcon className='p-[2px]'/> : <ExpandLessIcon className='p-[2px]'/>}
                    </div>
                    </div>
                )}

            </div>

                    <LogoutBtn handleClick={userClick} userdata={auth.userData}/>

            <div className="h-[35%] absolute bottom-1 left-1/3" >
                <ul className="w-[30%] flex justify-around">
                    <li className="text-xl text-[#333] no-underline transition-[0.5s] inline-block list-none mx-[15px] my-2.5 hover:text-[#0B8457]">
                        <NavLink to="/" className={({ isActive }) => `${isActive ? "text-green-800" : ""}`}>
                            Home
                        </NavLink>
                    </li>
                    <li className="text-xl text-[#333] no-underline transition-[0.5s] inline-block list-none mx-[15px] my-2.5 hover:text-[#0B8457]">
                        <NavLink to="/about" className={({ isActive }) => `${isActive ? "text-green-700" : ""}`}>
                            About
                        </NavLink>
                    </li>
                    <li className="text-xl text-[#333] no-underline transition-[0.5s] inline-block list-none mx-[15px] my-2.5 hover:text-[#0B8457]">
                        <NavLink to="/doctors" className={({ isActive }) => `${isActive ? "text-green-700" : ""}`}>
                            Doctors
                        </NavLink>
                    </li>
                    <li className="text-xl text-[#333] no-underline transition-[0.5s] inline-block list-none mx-[15px] my-2.5 hover:text-red-500">
                        <NavLink to="/blood" className={({ isActive }) => `${isActive ? "text-red-500" : ""}`}>
                            Blood
                        </NavLink>
                    </li>
                    <li className="text-xl text-[#333] no-underline transition-[0.5s] inline-block list-none mx-[15px] my-2.5 hover:text-[#0B8457]">
                        <NavLink to="/contact" className={({ isActive }) => `${isActive ? "text-green-700" : ""}`}>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>

        </nav>

    </header>
  )
}
