import React, {useState} from 'react'
import authServices from '../../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import { login } from '../../store/authSlice'
import {Button, Input} from '../index'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const create = async(data) => {
        setError("")
        try {
            const session = await authServices.createAccount(data);
            if(session){
                const userData = await authServices.getCurrentUser()
                if(userData) dispatch(login({userData}))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const glogin = async () => {
        try {
            const session = await authServices.glogin()
            if(session){
                const userData = await authServices.getCurrentUser()
                if(userData) dispatch(authLogin({userData}))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div 
    className='flex items-center justify-center w-full my-8'
    >
        <div className={`mx-auto w-full max-w-lg 
        bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full text-2xl
                max-w-[100px] bg-gradient-to-r from-blue-700 to-green-700 text-transparent bg-clip-text font-semibold'>
                    LifeLink
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold
            leading-tight'>Sign up to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 underline text-blue-900"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className='text-red-600 text-center mt-8'>
            {error}</p>}

            <Button className='flex justify-center bg-white ml-8 mt-4 w-5/6 pr-24 gap-10'
             onClick={glogin}
            >
                <img width="28" height="26" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
                <span className='text-black text-lg'>Continue with Google</span>
            </Button>

            <div className="flex items-center w-5/6 mx-8 my-4">
                <div className="flex-1 h-[1px] bg-black"></div>
                <div className="px-2 text-black">OR</div>
                <div className="flex-1 h-[1px] bg-black"></div>
            </div>

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-4 mt-1'>
                    <Input 
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true
                    })}
                    />
                    <Input 
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.
                            test(value) || "Email address must be a valid address",
                        }
                    })} 
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter strong password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <Button type='submit'
                    className='w-full'>Create Account</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup