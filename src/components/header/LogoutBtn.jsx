import React,{useState} from 'react'
import {logout} from "../../store/authSlice"
import authServices from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';


function LogoutBtn({handleClick, userdata}) {

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
    <div id='userAcc' className='z-50 float-right bg-gray-50 mr-2 w-44
     cursor-pointer rounded-lg hidden'>
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