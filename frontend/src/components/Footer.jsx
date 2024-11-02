import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Scrolls to the top when path changes
  }, [pathname]);

  return (
    <div className='md:mx-10'>
       
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>

            {/*--------------left section------------------ */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                  Get the perfect cut every time—sharp style, fresh look, only at Classic Fade & Co!
                </p>
            </div>

            {/*--------------Center section------------------ */}
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>
                      <NavLink to="/" className="hover:text-black transition duration-200">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/about" className="hover:text-black transition duration-200">
                        About us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact" className="hover:text-black transition duration-200">
                        Contact us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/privacy-policy" className="hover:text-black transition duration-200">
                        Privacy policy
                      </NavLink>
                    </li>
                </ul>
            </div>

            {/*--------------right section------------------ */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul  className='flex flex-col gap-2 text-gray-600'>
                    <li>+961 03840728</li>
                    <li>info@classicfadeco.com</li>
                </ul>
            </div>

        </div>

        {/* Copyright text */}
        <div>
            <hr/>
            <p className='py-5 text-sm text-center '>&copy; 2024 Classic Fade & Co. All rights reserved.</p>
        </div>
    </div>
  );
};

export default Footer;
