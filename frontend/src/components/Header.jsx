import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div 
      className='flex flex-col md:flex-row items-center justify-center bg-cover bg-center rounded-lg px-6 md:px-10 lg:px-20' 
      style={{ backgroundImage: `url(${assets.header_img})` }}
    >
      {/* Left Side */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight'>
          Book Appointments<br/>With Best Barbers
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt="group profiles" />
          <p>
            Simply browse through our extensive list of best barbers,<br className='hidden sm:block'/>
            schedule your appointment hassle-free
          </p>
        </div>
        <a 
          href="#speciality" 
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300"
        >
          Book appointment 
          <img className="w-3" src={assets.arrow_icon} alt="arrow" />
        </a>
      </div>
    </div>
  )
}

export default Header
