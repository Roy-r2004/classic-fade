import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';  // Make sure this path is correct
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, backendUrl, loadUserProfileData, token } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);  // Store new image temporarily

  // Function to update the user profile
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      if (image) {
        formData.append('image', image);  // Append image if a new one is selected
      }

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();  // Reload updated profile
        setIsEdit(false);  // Exit edit mode
        setImage(null);  // Clear the image input
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleEditToggle = () => {
    setIsEdit(!isEdit);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      {/* Profile Image */}
      <div className="text-center mb-6">
        <div className="relative inline-block cursor-pointer">
          <img
            src={
              image
                ? URL.createObjectURL(image)  // Show preview if user uploads a new image
                : `http://localhost:4000${userData.image}`  // Load image from backend
            }
            alt="Profile"
            className="w-40 h-40 rounded-full mx-auto object-cover shadow-md"
          />
          {isEdit && (
            <label htmlFor="image" className="absolute inset-0 flex justify-center items-center opacity-75 cursor-pointer">
              <img src={assets.upload_icon} alt="Upload" />
            </label>
          )}
          {isEdit && <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} hidden />}
        </div>

        {/* Move "Edit Profile" button below the image */}
        <div className="mt-4">
          <button className="text-sm text-blue-600 underline" onClick={handleEditToggle}>
            {isEdit ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Name Field */}
      <div className="mb-4 text-center">
        <p className="text-lg font-semibold">Name</p>
        {isEdit ? (
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md w-full p-2 mt-2"
          />
        ) : (
          <p>{userData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      {/* Contact Information */}
      <div className="mb-4">
        <p className="text-lg font-semibold">Contact Information</p>

        {/* Email */}
        <div className="mt-2">
          <p className="font-medium">Email:</p>
          <p>{userData.email}</p>
        </div>

        {/* Phone */}
        <div className="mt-4">
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              name="phone"
              value={userData.phone || ''}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2 mt-2"
            />
          ) : (
            <p>{userData.phone || 'No phone provided'}</p>
          )}
        </div>

        {/* Address */}
        <div className="mt-4">
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <>
              <input
                type="text"
                name="line1"
                value={userData.address?.line1 || ''}
                onChange={handleAddressChange}
                placeholder="Address Line 1"
                className="border border-gray-300 rounded-md w-full p-2 mt-2"
              />
              <input
                type="text"
                name="line2"
                value={userData.address?.line2 || ''}
                onChange={handleAddressChange}
                placeholder="Address Line 2"
                className="border border-gray-300 rounded-md w-full p-2 mt-2"
              />
            </>
          ) : (
            <p>{`${userData.address?.line1 || ''}, ${userData.address?.line2 || ''}`}</p>
          )}
        </div>
      </div>

      <hr className="my-4" />

      {/* Additional Information */}
      <div className="mb-4">
        {/* Gender */}
        <p className="font-medium">Gender:</p>
        {isEdit ? (
          <select
            name="gender"
            value={userData.gender || ''}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md w-full p-2 mt-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        ) : (
          <p>{userData.gender || 'No gender provided'}</p>
        )}

        {/* Birthday */}
        <p className="font-medium mt-4">Birthday:</p>
        {isEdit ? (
          <input
            type="date"
            name="dob"
            value={userData.dob || ''}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md w-full p-2 mt-2"
          />
        ) : (
          <p>{userData.dob || 'No birthday provided'}</p>
        )}
      </div>

      {/* Save Button */}
      {isEdit && (
        <div className="text-center">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4" onClick={updateUserProfileData}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
