import React from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';



export default function Footer() {
  return (
    <footer className="bg-[#112b3d] border-y">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-around cursor-pointer">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center ">
                            <h1
                            className='text-[45px] no-underline text-blue-600'>
                                Life<span
                                className='text-[#0B8457]'>link.</span>
                            </h1>
                        </Link>
                    </div>
                    <div>
                        <h2 className='text-3xl text-white mb-3 pl-4
                         border-gray-600 border-b-2 rounded-xl'>About</h2>
                        <ul className='text-medium text-pretty text-gray-300'>
                            <li>Health Queries</li>
                            <li>Online Doctor App</li>
                            <li>Contact us</li>
                            <li>Terms and Conditions</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-3xl text-white mb-3 pl-4
                         border-gray-600 border-b-2 rounded-xl'>Services</h2>
                        <ul className='text-medium text-pretty text-gray-300'>
                            <li>Online Doctor Consultation</li>
                            <li>Health Program</li>
                            <li>All Doctors List</li>
                            <li>Find Hospitals</li>
                            <li>Blood donation</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-3xl text-white mb-3 px-6
                         border-gray-600 border-b-2 rounded-xl'>Social</h2>
                        <ul className='text-medium text-pretty text-gray-300'>
                            <li>Facebook</li>
                            <li>LinkedIn</li>
                            <li>Refer & Earn</li>
                        </ul>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-100 sm:text-center">
                        © 2024
                        <a href="https://hiteshchoudhary.com/" className="hover:underline">
                            LifeLink
                        </a>
                        . All Rights Reserved.
                    </span>
                    <div className="flex mt-2 space-x-5 sm:justify-center sm:mt-0">
                        <Link to="#" className="text-gray-100 hover:text-gray-400">
                            <FacebookIcon />
                            <span className="sr-only">Facebook page</span>
                        </Link>
                        <Link to="#" className="text-gray-100 hover:text-gray-400">
                            <InstagramIcon />
                            <span className="sr-only">Discord community</span>
                        </Link>
                        <Link to="#" className="text-gray-100 hover:text-gray-400">
                            <XIcon />
                            <span className="sr-only">Twitter page</span>
                        </Link>
                        <Link to="#" className="text-gray-100 hover:text-gray-400">
                            <GitHubIcon />
                            <span className="sr-only">GitHub account</span>
                        </Link>
                        <Link to="#" className="text-gray-100 hover:text-gray-400">
                            <LinkedInIcon />
                            <span className="sr-only">LinkedIn account</span>
                        </Link>
                    </div>
                </div>
            </div>
    </footer>
  )
}

