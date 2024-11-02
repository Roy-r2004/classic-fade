import React, { useContext, useEffect, useState } from "react";
import { BarberContext } from "../../context/BarberContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const BarberAppointment = () => {
  const { bToken, appointments, getAppointments, backendUrl, cancelAppointment, editAppointment, loading } = useContext(BarberContext);
  const { calculateAge } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false); // Control edit form visibility
  const [editData, setEditData] = useState({}); // Store edit data

  useEffect(() => {
    if (bToken) {
      getAppointments(); // Fetch appointments if bToken exists
    }
  }, [bToken]);

  // Function to format date and time
  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return "Invalid date/time";

    const [day, month, year] = dateStr.split('_'); // Assuming date is in "day_month_year" format
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

  // Handle opening the edit form
  const handleEdit = (appointment) => {
    setIsEditing(true);
    setEditData(appointment); // Pre-fill form with the selected appointment's data
  };

  // Handle form submission for edit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    editAppointment(editData._id, editData);
    setIsEditing(false); // Close form after submission
  };

  // Handle input change for edit form
  const handleInputChange = (e, setData, data) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Fallback image function
  const handleImageError = (e) => {
    e.target.src = '/default-placeholder.png'; // Set to your placeholder image
  };

  if (loading) {
    return <div className="text-center py-4">Loading appointments...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-medium">All Appointments</p>
      </div>

      <div className="bg-white border rounded text-sm overflow-y-scroll">
        {/* Desktop/Table Header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_2fr] gap-1 py-3 px-4">
          <p>#</p>
          <p>Client</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Status</p>
          <p>Action</p>
        </div>

        {/* Appointments for each screen size */}
        {appointments.map((item, index) => (
          <div key={index} className="border-b py-3 px-4">
            {/* Mobile View */}
            <div className="block md:hidden">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">{item.userData.name}</p>
                <p className="text-sm text-gray-500">{item.payment ? "Online" : "CASH"}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">{formatDateTime(item.slotDate, item.slotTime)}</p>
                <p className="text-sm text-gray-500">Age: {calculateAge(item.userData.dob)}</p>
              </div>
              <div className="mt-2">
                <p className={`text-sm ${item.cancelled ? "text-red-600" : item.isCompleted ? "text-green-600" : "text-orange-600"}`}>
                  {item.cancelled ? "Cancelled" : item.isCompleted ? "Completed" : "Pending"}
                </p>
              </div>
              <div className="flex mt-2 gap-2">
                {item.isCompleted || item.cancelled ? (
                  <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm w-full">
                    Edit
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm w-full">
                      Edit
                    </button>
                    <button onClick={() => cancelAppointment(item._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm w-full">
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_2fr] gap-1">
              <p>{index + 1}</p>
              <div className="flex items-center">
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={`${backendUrl}${item.userData.image}`}
                  onError={handleImageError} // Use fallback if image fails
                  alt={item.userData.name}
                />
                <p>{item.userData.name}</p>
              </div>
              <p>{item.payment ? "Online" : "CASH"}</p>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>{formatDateTime(item.slotDate, item.slotTime)}</p> {/* Format the date and time here */}
              <p>${item.amount}</p>
              <p className={item.cancelled ? "text-red-600" : item.isCompleted ? "text-green-600" : "text-orange-600"}>
                {item.cancelled ? "Cancelled" : item.isCompleted ? "Completed" : "Pending"}
              </p>
              <div className="flex gap-2">
                {item.isCompleted || item.cancelled ? (
                  <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => cancelAppointment(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Edit form */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
              <h3 className="text-lg font-bold mb-4">Edit Appointment</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date:</label>
                  <input
                    type="date"
                    name="slotDate"
                    value={editData.slotDate}
                    onChange={(e) => handleInputChange(e, setEditData, editData)}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time:</label>
                  <input
                    type="time"
                    name="slotTime"
                    value={editData.slotTime}
                    onChange={(e) => handleInputChange(e, setEditData, editData)}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Amount:</label>
                  <input
                    type="number"
                    name="amount"
                    value={editData.amount}
                    onChange={(e) => handleInputChange(e, setEditData, editData)}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status:</label>
                  <select
                    name="isCompleted"
                    value={editData.isCompleted}
                    onChange={(e) => handleInputChange(e, setEditData, editData)}
                    className="border border-gray-300 p-2 rounded w-full"
                  >
                    <option value={false}>Pending</option>
                    <option value={true}>Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Cancelled:</label>
                  <select
                    name="cancelled"
                    value={editData.cancelled}
                    onChange={(e) => handleInputChange(e, setEditData, editData)}
                    className="border border-gray-300 p-2 rounded w-full"
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarberAppointment;
