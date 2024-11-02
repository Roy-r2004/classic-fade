import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);  // Initialize appointments state

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error('Failed to load appointments.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error loading appointments.');
    }
  };

  const cancelAppointment = async(appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();  // Reload appointments after cancellation
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error cancelling the appointment.');
    }
  };

  // Updated formatDate function to include the name of the day
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('_');
    const date = new Date(`${year}-${month}-${day}`);
    return new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();  // Call the function to fetch appointments
    }
  }, [token]);  // Dependency array ensures this runs when token changes

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Appointments</h1>

      {/* Appointments List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.length > 0 ? appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Barber Image */}
            <div className="relative">
              <img
                src={`${backendUrl}${item.barberData.image}`}  // Using backend URL for barber images
                alt={item.barberData.name}
                className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
              />
              <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full px-2 py-1">
                {item.barberData.speciality}
              </div>
            </div>

            {/* Appointment Info */}
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900">{item.barberData.name}</p>
              <p className="text-gray-600 text-sm mb-2">{item.barberData.speciality}</p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Date: </span>{formatDate(item.slotDate)}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Time: </span>{item.slotTime}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Address: </span>{item.barberData.address?.line1}, {item.barberData.address?.line2}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex w-full justify-center gap-4">
              {/* Show "Pay Online" only if not cancelled */}
              {!item.cancelled && (
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 hover:scale-105 transition duration-300 ease-in-out w-full">
                  Pay Online
                </button>
              )}
              
              {!item.cancelled ? (
                <button 
                  onClick={() => cancelAppointment(item._id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 hover:scale-105 transition duration-300 ease-in-out w-full"
                >
                  Cancel
                </button>
              ) : (
                <p className="text-red-500 text-sm font-semibold">Canceled</p>
              )}
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-600 col-span-full">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
