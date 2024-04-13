import React from 'react'
import { doctors } from '../../assets'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import {Link} from 'react-router-dom'


export default function About() {
  return (
    <>
    <div className='flex bg-[aliceblue] w-full mt-10'>
        <div className='w-1/2 mr-5 my-2 py-4'>
            <img 
             className='w-[610px] h-[500px] my-2 mx-10 object-cover rounded-xl'
            src={doctors} alt="image of doctors" />
        </div>
        <div className='w-1/2 m-5 pr-8'>
            <h1 className='w-1/3 text-[40px] font-medium after:content-[""]
             after:block after:w-6/12 after:border-b-[5px]
             after:border-b-[#9f1823] after:border-solid'
            >About Us</h1><br/>
            <p className='text-lg'>
            The main objective of Life link is to connect people to healthcare facilities and provide professional help.
            We will help people book appointments with doctors when they need and blood supply in emergency situations. 
            Our website will help people check and cure their diseases weather physical or mental.
            </p><br/>
            <h2 className='text-3xl border-b-2 border-cyan-700 w-[30%] pl-2'
            id='soln'>Your Solutions</h2>
            <br />
            <ul className='list-disc border-double border-black w-[90%]'>
            <li className='p-2'>
                <h3 className='text-xl'>Choose a Specialist</h3>
                <p className='text-gray-700 text-base'>
                Identify your specific health needs and seek out specialists who have expertise in the relevant field.
                </p>
            </li>
            <li className='p-2'>
                <h3 className='text-xl'>Make a Schedule</h3>
                <p className='text-gray-700 text-base'>
                Prioritize self-care activities such as exercise, mindfulness, hobbies, and spending time with loved ones.
                 Schedule time for relaxation and rejuvenation to prevent burnout and maintain overall well-being.
                </p>
            </li>
            <li className='p-2'>
                <h3 className='text-xl'>Get your Solutions</h3>
                <p className='text-gray-700 text-base'>
                Based on your evaluation, choose the most promising solution or combination of solutions.
                 Trust your instincts, but also rely on logical reasoning, evidence to support your decision.
                </p>
            </li>
            </ul>
        </div>
    </div>

    <div className='w-full mx-0 my-[50px]'>
        <div className='w-full flex justify-center'>
            <h1 
             className='text-[40px] font-medium after:content-[""]
             after:block after:w-6/12 after:pb-2 after:border-b-[5px]
             after:border-b-[#9f1823] after:border-solid'
            >What We Do</h1>
        </div>
        <div 
         className='w-[90%] h-[400px] flex items-center justify-evenly mx-[5%] mt-0'
        >
            <div className='text-center h-[300px] w-[330px] hover:shadow-2xl
             rounded-xl border-[solid] border-2 border-gray-300 shadow-xl'>
                <h1
                className='p-4 text-3xl mt-4'
                >Emergency Care</h1>
                <p className='text-gray-600 m-4 mt-2'>
                Emergency care is a critical aspect of healthcare, providing
                 immediate and often life-saving medical assistance to individuals
                  facing urgent medical conditions or injuries.
                </p>
                <Link to={'/blood'}>
                <button className='border-blue-700 border rounded-3xl m-4 px-8 py-2
                 text-blue-700 font-extrabold hover:bg-blue-500
                  hover:text-white hover:border-none' type="button">
                <ArrowOutwardIcon />
                </button>
                </Link>
            </div>
            <div className='text-center h-[300px] w-[330px] hover:shadow-2xl
             rounded-xl border-[solid] border-2 border-gray-300 shadow-xl'>
                <h2
                className='p-4 text-3xl mt-4'
                >Find hospitals</h2>
                <p className='text-gray-600 m-4 mt-2'>
                Finding a hospital when you or a loved one requires medical attention is a
                 crucial task that demands careful consideration and swift action. 
                </p>
                <button className='border-blue-700 border rounded-3xl m-4 px-8 py-2
                 text-blue-700 font-extrabold hover:bg-blue-500
                 hover:text-white hover:border-none' type="button">
                <ArrowOutwardIcon />
                </button>
            </div>
            <div className='text-center h-[300px] w-[330px] hover:shadow-2xl
             rounded-xl border-[solid] border-2 border-gray-300 shadow-xl'>
                <h2
                className='p-4 text-3xl mt-4'
                >Online Therapy</h2>
                <p className='text-gray-600 m-3'>
                Online therapy, also known as teletherapy or telehealth, has emerged as a
                 convenient and effective alternative to traditional in-person therapy sessions.
                </p>
                <Link to={'/doctors'}>
                <button className='border-blue-700 border rounded-3xl m-4 px-8 py-2
                 text-blue-700 font-extrabold hover:bg-blue-500
                 hover:text-white hover:border-none' type="button">
                <ArrowOutwardIcon />
                </button>
                </Link>
            </div>
        </div>
    </div>
    </>
  )
}
