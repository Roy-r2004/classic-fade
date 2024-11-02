import React, { useContext, useEffect, useState } from 'react';
import { BarberContext } from '../../context/BarberContext';
import { assets } from '../../assets/assets';

const BarberDashboard = () => {
  const { bToken, dashData, setDashData, getDashData, backendUrl,cancelAppointment } = useContext(BarberContext);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (bToken) {
      getDashData()
        .then(() => setLoading(false))
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [bToken]);

  // Function to format date and time
  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return 'Invalid date/time';
    const [day, month, year] = dateStr.split('_');
    const date = new Date(`${year}-${month}-${day} ${timeStr}`);
    if (isNaN(date.getTime())) {
      return 'Invalid date/time';
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

  // Handle state while data is loading
  if (loading) return <div className="text-center py-4">Loading Dashboard...</div>;

  // Handle errors
  if (error) return <div className="text-center py-4 text-red-600">Error: {error}</div>;

  return dashData && (
    <div className="m-5">
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {/* Earnings */}
        <DashboardCard title="Earnings" value={`$${dashData.earnings}`} icon={assets.earning_icon} />
        {/* Total Appointments */}
        <DashboardCard title="Appointments" value={dashData.appointments} icon={assets.appointments_icon} />
        {/* Total Clients */}
        <DashboardCard title="Clients" value={dashData.clients} icon={assets.patients_icon} />
      </div>

      {/* Latest Bookings */}
      <div className="bg-white mt-6 rounded-lg">
        <div className="flex items-center gap-2.5 px-4 py-4 rounded-t-lg border">
          <img src={assets.list_icon} alt="List Icon" />
          <p className="font-semibold">Latest Bookings</p>
        </div>
        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <LatestBooking
                key={index}
                appointment={item}
                backendUrl={backendUrl}
                cancelAppointment={() => cancelAppointment(item._id)}
                formatDateTime={formatDateTime}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 py-4">No recent bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Dashboard Card component
const DashboardCard = ({ title, value, icon }) => (
  <div className="flex flex-col sm:flex-row items-center gap-2 bg-white p-4 min-w-[120px] sm:min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
    <img className="w-10 sm:w-14" src={icon} alt={`${title} Icon`} />
    <div>
      <p className="text-xl font-semibold text-gray-600 text-center">{value}</p>
      <p className="text-gray-400 text-center sm:text-left">{title}</p>
    </div>
  </div>
);

// Reusable LatestBooking component
const LatestBooking = ({ appointment, backendUrl, cancelAppointment, formatDateTime }) => (
  <div
    className={`flex flex-col sm:flex-row items-center px-6 py-3 gap-3 ${appointment.cancelled ? 'bg-red-50' : appointment.isCompleted ? 'bg-green-50' : 'hover:bg-gray-100'}`}
  >
    {/* Barber Image */}
    <img
      className="rounded-full w-10"
      src={`${backendUrl}${appointment.barberData.image}`}
      alt={`${appointment.barberData.name}`}
      onError={(e) => { e.target.onerror = null; e.target.src = assets.placeholder_image; }}
    />

    {/* Appointment Info */}
    <div className="flex-1 text-sm text-center sm:text-left">
      <p className={`text-gray-800 font-medium ${appointment.cancelled ? 'line-through text-red-600' : appointment.isCompleted ? 'text-green-600' : ''}`}>
        {appointment.barberData.name}
      </p>
      <p className={`text-gray-600 ${appointment.cancelled ? 'line-through' : ''}`}>
        {formatDateTime(appointment.slotDate, appointment.slotTime)}
      </p>
    </div>

    {/* Status Label */}
    {appointment.cancelled ? (
      <p className="text-red-500 text-xs font-medium">Cancelled</p>
    ) : appointment.isCompleted ? (
      <p className="text-green-500 text-xs font-medium">Completed</p>
    ) : (
      <button
        onClick={async () => {
          await cancelAppointment();
          window.location.reload();  // Reload the page after the action is performed
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
      >
        Cancel
      </button>
    )}
  </div>
);



export default BarberDashboard;
