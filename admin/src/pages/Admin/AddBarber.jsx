import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import {toast} from 'react-toastify'
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';

const AddBarber = () => {
    const [barberImg, setbarberImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('Haircut');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const {backendUrl, aToken} = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        try {
            if (!barberImg) {
                return toast.error('Image Not Selected');
            }
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees) );
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            formData.append('image', barberImg);

            // console log formdata
            formData.forEach((value,key)=>{
                console.log(`${key} : ${value}`);
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-barber',formData, {headers:{aToken}})

            if (data.success) {
                toast.success('Barber Added Successfully');
                setbarberImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setExperience('1 Year')
                setFees('')
                setAbout('')
                setSpeciality('Haircut')
                setAddress1('')
                setAddress2('')

            }else{
                toast.error(data.message);
            }



         

        } catch (error) {
            toast.error('Error submitting the form');
            console.log(error);
            
        }
    };


   

    return (
        <form onSubmit={onSubmitHandler} className="m-10 w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-start mb-6">
                <h2 className="text-2xl font-bold text-gray-700">Add Barber</h2>
            </div>

            {/* Image Upload Section Moved Below Header */}
            <div className="mb-6 flex justify-start">
                <div className="text-center">
                    <label htmlFor="barber-img" className="block cursor-pointer">
                        <img
                            className="w-24 h-24 mx-auto mb-4 border-2 border-gray-300 rounded-full"
                            src={barberImg ? URL.createObjectURL(barberImg) : assets.upload_area}
                            alt="Upload Barber"
                        />
                    </label>
                    <input onChange={(e) => setbarberImg(e.target.files[0])} type="file" id="barber-img" hidden />
                    <p className="text-gray-500">Upload barber picture</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">

                {/* Left Section */}
                <div className="space-y-6">
                    {/* Barber Name */}
                    <div className="form-group">
                        <label htmlFor="barber-name" className="block text-gray-700">Barber Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            id="barber-name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
                            placeholder="Name"
                            required
                        />
                    </div>

                    {/* Barber Email */}
                    <div className="form-group">
                        <label htmlFor="barber-email" className="block text-gray-700">Barber Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            id="barber-email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
                            placeholder="Email"
                            required
                        />
                    </div>

                    {/* Barber Password */}
                    <div className="form-group">
                        <label htmlFor="barber-password" className="block text-gray-700">Barber Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            id="barber-password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
                            placeholder="Password"
                            required
                        />
                    </div>

                    {/* Experience */}
                    <div className="form-group">
                        <label htmlFor="experience" className="block text-gray-700">Experience</label>
                        <select
                            onChange={(e) => setExperience(e.target.value)}
                            value={experience}
                            id="experience"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
                        >
                            <option value="1 Year">1 Year</option>
                            <option value="2 Years">2 Years</option>
                            <option value="3 Years">3 Years</option>
                            <option value="4 Years">4 Years</option>
                            <option value="5 Years">5 Years</option>
                            <option value="6 Years">6 Years</option>
                            <option value="7 Years">7 Years</option>
                            <option value="8 Years">8 Years</option>
                            <option value="9 Years">9 Years</option>
                            <option value="10 Years">10 Years</option>
                        </select>
                    </div>

                    {/* Fees */}
                    <div className="form-group">
                        <label htmlFor="fees" className="block text-gray-700">Fees</label>
                        <input
                            onChange={(e) => setFees(e.target.value)}
                            value={fees}
                            type="number"
                            id="fees"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
                            placeholder="Fees"
                            required
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="space-y-6">
                    {/* Speciality - Placed at the same level as Barber Name */}
                    <div className="form-group">
                        <label htmlFor="speciality" className="block text-gray-700">Speciality</label>
                        <select
                            onChange={(e) => setSpeciality(e.target.value)}
                            value={speciality}
                            id="speciality"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
                        >
                            <option value="Haircut">Haircut</option>
                            <option value="Beard Trim">Beard Trim</option>
                            <option value="Shave">Shave</option>
                            <option value="Hair Styling">Hair Styling</option>
                            <option value="Head Massage">Head Massage</option>
                        </select>
                    </div>

                    {/* Address */}
                    <div className="form-group">
                        <label htmlFor="address1" className="block text-gray-700">Address</label>
                        <input
                            onChange={(e) => setAddress1(e.target.value)}
                            value={address1}
                            type="text"
                            id="address1"
                            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
                            placeholder="Address 1"
                            required
                        />
                        <input
                            onChange={(e) => setAddress2(e.target.value)}
                            value={address2}
                            type="text"
                            id="address2"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
                            placeholder="Address 2"
                            required
                        />
                    </div>

                    {/* About Barber */}
                    <div className="form-group">
                        <label htmlFor="about-barber" className="block text-gray-700">About Barber</label>
                        <textarea
                            onChange={(e) => setAbout(e.target.value)}
                            value={about}
                            id="about-barber"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
                            placeholder="Write about the barber"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Align the button to the left */}
            <div className="mt-6 text-left">
                <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-md"
                >
                    Add Barber
                </button>
            </div>
        </form>
    );
};

export default AddBarber;
