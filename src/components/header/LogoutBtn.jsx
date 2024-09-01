import React,{useState} from 'react'
import {logout} from "../../store/authSlice"
import authServices from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';


function LogoutBtn({handleClick, userdata, isopen}) {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    // console.log(userdata);
    const logoutHandler = () => {
        setLoading(true)
        authServices.logout()
        .then(() => {
            dispatch(logout())
            handleClick()
            setLoading(false)
        })
    }
  return (
    <div id='userAcc' className={`relative float-right mr-2 w-44 ${isopen ? "top-0 h-24 bg-slate-50 z-10" : "-top-36"}
     cursor-pointer rounded-lg ease-in duration-500`}>
        {userdata?.labels[0] && (
            <Link to={`/doctor/${userdata?.labels[0]}`}>
                <button className='h-10 w-full flex items-center justify-between
                bg-transparent text-lg py-2 px-4'>
                    <h1>Your account</h1>
                    <ManageAccountsIcon />
                </button>
            </Link>
        )}
        <Link to='/'> 
            <button className='h-10 w-full flex items-center justify-between
             bg-transparent text-lg py-2 px-4' onClick={logoutHandler}>
                <h1>{loading ? "logging out..." : "Sign out"}</h1>
                {!loading && <LogoutIcon />}
            </button> 
        </Link>
    </div>
  )
}

export default LogoutBtn