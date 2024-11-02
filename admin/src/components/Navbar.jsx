import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { BarberContext } from '../context/BarberContext'; // Import BarberContext
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext); // Access Admin token and setter
    const { bToken, setBToken } = useContext(BarberContext); // Access Barber token and setter
    const navigate = useNavigate();

    const handleLogout = () => {
        // Determine whether the user is an admin or a barber and clear the respective token
        if (aToken) {
            localStorage.removeItem('aToken');  // Remove Admin token from localStorage
            setAToken('');  // Update AdminContext to reflect logout
        } else if (bToken) {
            localStorage.removeItem('bToken');  // Remove Barber token from localStorage
            setBToken('');  // Update BarberContext to reflect logout
        }
        navigate('/'); // Navigate back to login page
    };

    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
            <div className="flex items-center gap-2 text-xs">
                <img className="w-20 sm:w-20 cursor-pointer" src={assets.logo} alt="Logo" />
                <p className="border px-2.5 rounded-full border-gray-500 text-gray-600">
                    {aToken ? 'Admin' : bToken ? 'Barber' : 'Guest'}
                </p>
            </div>
            <button onClick={handleLogout} className="bg-primary text-white text-sm px-10 py-2 rounded-full">
                Logout
            </button>
        </div>
    );
};

export default Navbar;
