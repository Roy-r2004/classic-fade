import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddBarber from './pages/Admin/AddBarber';
import BarbersList from './pages/Admin/BarbersList';
import { BarberContext } from './context/BarberContext';
import BarberAppointment from './pages/Barber/BarberAppointment';

import BarberDashboard from './pages/Barber/barberDashboard';
import BarberProfile from './pages/Barber/barberProfile';

const App = () => {
  const { aToken } = useContext(AdminContext); // Use aToken from context
  const {bToken} = useContext(BarberContext)

  return aToken || bToken ? (
    <div className='bg-[#F9F9Fd]'>
      {/* Render the authenticated view here when aToken is present */}
      <Navbar />

      <div className='flex items-start'>
        <Sidebar />
       
        <Routes>
          {/*Admin Route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-barber' element={<AddBarber />} />
          <Route path='/barber-list' element={<BarbersList />} />
          
             {/*Barber Route */}
          <Route path='/barber-dashboard' element={<BarberDashboard/>} />
          <Route path='/barber-appointments' element={<BarberAppointment />} />
          <Route path='/barber-profile' element={<BarberProfile/>} />



        </Routes>




      </div>

      <ToastContainer />
    </div>
  ) : (
    <>
      {/* Render the login form when no token */}
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
