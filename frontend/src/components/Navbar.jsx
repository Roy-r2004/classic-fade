import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData, backendUrl } = useContext(AppContext);

  const logout = () => {
    setToken(null); // Set to null or empty string, not false
    localStorage.removeItem('token');
    navigate('/'); // Redirect to home or login after logout
  };

  // Function to get the profile image URL or fallback to default avatar
  const getProfileImage = () => {
    if (userData && userData.image) {
      return `http://localhost:4000${userData.image}`;  // Full backend URL for profile image
    }
    return assets.default_avatar;  // Fallback to default avatar
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      {/* Logo */}
      <img onClick={() => navigate('/')} className='w-20 cursor-pointer' src={assets.logo} alt="Logo" />

      {/* Desktop Menu */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to={'/'} className='relative'>
          <li className='py-1'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to={'/barbers'} className='relative'>
          <li className='py-1'>All Barbers</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to={'/about'} className='relative'>
          <li className='py-1'>About</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to={'/contact'} className='relative'>
          <li className='py-1'>Contact</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      {/* Profile and Menu */}
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img
              className='w-16 h-15 rounded-full object-cover'
              src={getProfileImage()}  // Use the profile image or fallback
              alt="Profile"
            />
            <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown Menu */}
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>
                  My Profile
                </p>
                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>
                  My Appointments
                </p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden cursor-pointer'
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-30 transition-transform transform ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        } shadow-lg`} // Add shadow for better distinction
      >
        {/* Mobile Menu Header */}
        <div className='flex justify-between p-4 border-b'>
          <img className='w-20' src={assets.logo} alt="Logo" /> {/* Reduced the size for better layout */}
          <img
            onClick={() => setShowMenu(false)}
            className='w-8 h-8 cursor-pointer p-1' // Adjust size and padding
            src={assets.cross_icon}
            alt="Close Menu"
          />
        </div>

        {/* Mobile Menu Links */}
        <ul className='flex flex-col p-4 gap-4'>
          <NavLink onClick={() => setShowMenu(false)} to={'/'}>
            <li className='py-2'>Home</li>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={'/barbers'}>
            <li className='py-2'>All Barbers</li>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={'/about'}>
            <li className='py-2'>About</li>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={'/contact'}>
            <li className='py-2'>Contact</li>
          </NavLink>
          {token ? (
            <>
              <NavLink onClick={() => setShowMenu(false)} to={'/my-profile'}>
                <li className='py-2'>My Profile</li>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to={'/my-appointments'}>
                <li className='py-2'>My Appointments</li>
              </NavLink>
              <li onClick={logout} className='py-2 cursor-pointer'>
                Logout
              </li>
            </>
          ) : (
            <li onClick={() => navigate('/login')} className='bg-primary text-white text-center py-2 rounded cursor-pointer'>
              Create account
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
