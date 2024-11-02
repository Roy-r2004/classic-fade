import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { aToken, getDashData, dashData, backendUrl, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  // Function to format date and time
  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return "Invalid date/time";
    const [day, month, year] = dateStr.split('_');
    const date = new Date(`${year}-${month}-${day} ${timeStr}`);
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

  return dashData && (
    <div className='m-2 sm:m-5'>
      <div className='flex flex-wrap gap-3 justify-center sm:justify-start'>
        {/* Total Barbers */}
        <div className='flex flex-col sm:flex-row items-center gap-2 bg-white p-4 min-w-[120px] sm:min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-10 sm:w-14' src={assets.barber_icon} alt="Barbers Icon" />
          <div>
            <p className='text-xl font-semibold text-gray-600 text-center'>{dashData.barbers}</p>
            <p className='text-gray-400 text-center sm:text-left'>Barbers</p>
          </div>
        </div>

        {/* Total Appointments */}
        <div className='flex flex-col sm:flex-row items-center gap-2 bg-white p-4 min-w-[120px] sm:min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-10 sm:w-14' src={assets.appointments_icon} alt="Appointments Icon" />
          <div>
            <p className='text-xl font-semibold text-gray-600 text-center'>{dashData.appointments}</p>
            <p className='text-gray-400 text-center sm:text-left'>Appointments</p>
          </div>
        </div>

        {/* Total Clients */}
        <div className='flex flex-col sm:flex-row items-center gap-2 bg-white p-4 min-w-[120px] sm:min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-10 sm:w-14' src={assets.patients_icon} alt="Clients Icon" />
          <div>
            <p className='text-xl font-semibold text-gray-600 text-center'>{dashData.clients}</p>
            <p className='text-gray-400 text-center sm:text-left'>Clients</p>
          </div>
        </div>

        {/* Total Profit */}
        <div className='flex flex-col sm:flex-row items-center gap-2 bg-white p-4 min-w-[120px] sm:min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-10 sm:w-14' src={assets.profit} alt="Profit Icon" />
          <div>
            <p className='text-xl font-semibold text-gray-600 text-center'>${dashData.totalProfit}</p>
            <p className='text-gray-400 text-center sm:text-left'>Total Profit</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='bg-white mt-6 rounded-lg'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t-lg border'>
          <img src={assets.list_icon} alt="List Icon" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointments.length > 0 ? dashData.latestAppointments.map((item, index) => (
              <div
                className={`flex flex-col sm:flex-row items-center px-6 py-3 gap-3 ${item.cancelled ? 'bg-red-50' : 'hover:bg-gray-100'}`}
                key={index}
              >
                {/* Barber Image */}
                <img
                  className='rounded-full w-10'
                  src={`${backendUrl}${item.barberData.image}`}
                  alt={`${item.barberData.name}`}
                  onError={(e) => { e.target.onerror = null; e.target.src = assets.placeholder_image }}
                />

                {/* Appointment Info */}
                <div className='flex-1 text-sm text-center sm:text-left'>
                  <p className={`text-gray-800 font-medium ${item.cancelled ? 'line-through text-red-600' : ''}`}>
                    {item.barberData.name}
                  </p>
                  <p className={`text-gray-600 ${item.cancelled ? 'line-through' : ''}`}>
                    {formatDateTime(item.slotDate, item.slotTime)}
                  </p>
                </div>

                {/* Cancelled Label or Cancel Button */}
                {item.cancelled ? (
                  <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                ) : (
                  <button
                    onClick={async () => {
                      await cancelAppointment(item._id);
                      window.location.reload();  // This will reload the page after canceling
                    }}
                    className='bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-300 ease-in-out'
                  >
                    Cancel
                  </button>
                )}
              </div>
            )) : (
              <p className="text-center text-gray-600 py-4">No recent bookings found.</p>
            )
          }
        </div>
      </div>

      {/* Top 5 Barbers by Profit Section */}
      <div className='bg-white mt-6 rounded-lg shadow-sm'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t-lg bg-blue-100 border-b'>
          <img src={assets.list_icon} alt="List Icon" />
          <p className='font-semibold text-lg text-blue-800'>Top 5 Barbers by Profit</p>
        </div>
        <div className='pt-4 border-t'>
          {
            dashData.topBarbers.length > 0 ? (
              dashData.topBarbers.map((barber, index) => (
                <div
                  className={`flex items-center px-6 py-3 gap-4 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  key={index}
                >
                  {/* Barber Rank */}
                  <p className='text-lg font-bold text-gray-700'>{index + 1}.</p>

                  {/* Barber Info */}
                  <div className='flex items-center flex-1'>
                    <p className='text-md font-semibold text-gray-800'>{barber.barber}</p>
                  </div>

                  {/* Barber Profit */}
                  <p className='text-lg font-bold text-green-600'>${barber.profit}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 py-4">No data available for top barbers.</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
