import React from 'react'
import {logout} from "../../store/authSlice"
import authServices from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';


function LogoutBtn({handleClick}) {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authServices.logout()
        .then(() => {
            dispatch(logout())
            handleClick()
        })
    }
  return (
    <div id='userAcc' className='z-50 float-right bg-gray-50 mr-2 w-44
     cursor-pointer rounded-lg hidden'>
        <Link to='/blood'>
            <button className='h-10 w-full flex items-center justify-between
             bg-transparent text-lg py-2 px-4'>
                <h1>Your account</h1>
                <ManageAccountsIcon />
            </button>
        </Link>
        <Link to='/'> 
            <button className='h-10 w-full flex items-center justify-between
             bg-transparent text-lg py-2 px-4' onClick={logoutHandler}>
                <h1>Sign out</h1>
                <LogoutIcon />
            </button> 
        </Link>
    </div>
  )
}

export default LogoutBtn