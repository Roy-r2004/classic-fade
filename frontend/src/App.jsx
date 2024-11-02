import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Barbers from './pages/Barbers';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppContextProvider from './context/AppContext';  // Import the context provider
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AppContextProvider>  {/* Wrap the entire app with the context provider */}
      <div className='mx-4 sm:mx-[10%]'>
        <ToastContainer/>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/barbers' element={<Barbers />} />
          <Route path='/barbers/:speciality' element={<Barbers />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
        
          <Route path='/appointment/:barberId' element={<Appointment />} />
        </Routes>
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default App;
