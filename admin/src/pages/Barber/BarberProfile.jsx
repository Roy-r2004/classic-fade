// Frontend component with save functionality

import React, { useContext, useEffect, useState } from 'react';
import { BarberContext } from '../../context/BarberContext';
import { AppContext } from '../../context/AppContext';

const BarberProfile = () => {
  const { bToken, profileData, getProfileData, setProfileData, backendUrl, updateProfileData } = useContext(BarberContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false); // Toggle between edit/view mode

  useEffect(() => {
    if (bToken) {
      getProfileData();
    }
  }, [bToken]);

  // Handle form submission to save profile changes
  const handleSave = async () => {
    try {
      await updateProfileData(); // Calls the backend to update profile
      setIsEdit(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return profileData && (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-md max-w-[90%] md:max-w-[60%] mx-auto">
      {/* Profile Image Section */}
      <div className="w-full md:w-1/4 flex justify-center md:justify-start">
        <img
          className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full bg-primary/80"
          src={`${backendUrl}${profileData.image}`}
          alt={profileData.name}
        />
      </div>

      {/* Profile Information Section */}
      <div className="flex-1 space-y-4">
        {/* Barber Name */}
        <div>
          <p className="text-xl md:text-2xl font-bold text-gray-800">
            {isEdit ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                className="border p-1 rounded-md w-full"
              />
            ) : (
              profileData.name
            )}
          </p>
          <div className="text-sm text-gray-500">
            <p>Specialty: <span className="text-gray-700">{profileData.speciality}</span>  </p>
          
           
            <p className="mt-1 text-xs font-semibold text-primary">
              {isEdit ? (
                <input
                  type="text"
                  value={profileData.experience}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, experience: e.target.value }))}
                  className="border p-1 rounded-md w-full"
                />
              ) : (
                `${profileData.experience}  experience`
              )}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div>
          <p className="font-medium text-gray-600">About me:</p>
          <p className="text-gray-600 leading-relaxed">
            {isEdit ? (
              <textarea
                value={profileData.about}
                onChange={(e) => setProfileData((prev) => ({ ...prev, about: e.target.value }))}
                className="border p-1 rounded-md w-full"
              />
            ) : (
              profileData.about
            )}
          </p>
        </div>

        {/* Appointment Fee */}
        <div>
          <p className="text-md md:text-lg text-gray-800">
            Appointment Fee:
            {isEdit ? (
              <input
                type="number"
                value={profileData.fees}
                onChange={(e) => setProfileData((prev) => ({ ...prev, fees: e.target.value }))}
                className="border p-1 rounded-md w-20 ml-2"
              />
            ) : (
              <span className="text-primary font-semibold ml-2">{currency}{profileData.fees}</span>
            )}
          </p>
        </div>

        {/* Address */}
        <div>
          <p className="font-medium text-gray-600">Address:</p>
          <p className="text-gray-600">
            {isEdit ? (
              <input
                type="text"
                value={profileData.address.line1}
                onChange={(e) => setProfileData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))}
                className="border p-1 rounded-md w-full"
              />
            ) : (
              profileData.address.line1
            )}
          </p>
          {profileData.address.line2 && (
            <p className="text-gray-600">
              {isEdit ? (
                <input
                  type="text"
                  value={profileData.address.line2}
                  onChange={(e) => setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))}
                  className="border p-1 rounded-md w-full"
                />
              ) : (
                profileData.address.line2
              )}
            </p>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-5 h-5 border border-gray-300 rounded focus:ring-0"
            checked={profileData.available}
            onChange={(e) => setProfileData((prev) => ({ ...prev, available: e.target.checked }))}
          />
          <label className="text-gray-600">Available</label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {isEdit ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarberProfile;
