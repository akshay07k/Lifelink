import React,{ useEffect, useState } from 'react'
import authServices from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input } from '../components/index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


function Login(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async (data) => {
        setLoading(true)
        console.log(data);
        setError("")
        try {
            const session = await authServices.login(data)
            if(session){
                const userData = await authServices.getCurrentUser()
                if(userData) dispatch(authLogin({userData}))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
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
    className='flex items-center justify-center w-full h-full my-8'
    
    >
        <div className={`mx-auto w-full max-w-lg h-full
        bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full text-2xl
                max-w-[100px] bg-gradient-to-r from-blue-700 to-green-700 text-transparent bg-clip-text font-semibold '>
                    LifeLink
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold
            leading-tight'>Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 underline text-blue-900"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 text-center mt-8'>
            {error}</p>}



            <Button className='flex justify-center bg-white ml-8 mt-4 w-5/6 pr-24 gap-10'
             onClick={glogin}
            >
                <img width="28" height="26" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
                <span className='text-black text-lg'>Sign in with Google</span>
            </Button>

            <div className="flex items-center w-5/6 mx-8 my-4">
                <div className="flex-1 h-[1px] bg-black"></div>
                <div className="px-2 text-black">OR</div>
                <div className="flex-1 h-[1px] bg-black"></div>
            </div>

            <form onSubmit={handleSubmit(login)} 
            className='mt-2'>
                <div className='space-y-4'>
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
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                     <Button
                     type="submit"
                     className='w-full px-[40%]'
                     >{loading ? "Signing in..." : "Sign in"}</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login