import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllApointments = () => {
  const { aToken, appointments, getAllAppointments, backendUrl, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // Function to format date and time
  const formatDateTime = (dateStr, timeStr) => {
    // Ensure dateStr and timeStr are defined and valid
    if (!dateStr || !timeStr) return "Invalid date/time";

    const [day, month, year] = dateStr.split('_'); // Assuming date is in "day_month_year" format

    // Construct date object and validate it
    const date = new Date(`${year}-${month}-${day} ${timeStr}`);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date/time";
    }

    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Client</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Barber</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={`${backendUrl}${item.userData.image}`} // Image with backend URL
                alt={item.userData.name}
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>{formatDateTime(item.slotDate, item.slotTime)}</p> {/* Formatted Date & Time */}

            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={`${backendUrl}${item.barberData.image}`} alt="" />
              <p>{item.barberData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {
              item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointments;
