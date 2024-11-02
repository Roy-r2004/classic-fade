import React from 'react';
import { assets } from '../assets/assets'; // Ensure you have this path correct

const Contact = () => {
  return (
    <div className="bg-gray-100 py-12">
      {/* Contact Us Header */}
      <div className='text-center text-2xl pt-10 text-gray-800'>
        <p>CONTACT <span className="text-primary">US</span></p>
      </div>

      {/* Contact Image and Details */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 px-4 sm:px-0 mt-10">
        {/* Contact Image */}
        <div className="w-full sm:w-1/2 flex-shrink-0">
          <img 
            src={assets.contact_image} 
            alt="Contact Classic Fade & Co" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        {/* Office Info Section */}
        <div className="flex-1 flex flex-col items-start bg-white p-8 rounded-lg shadow-lg">
          <p className="text-2xl font-semibold text-gray-900 mb-4">Our Office</p>
          <p className="text-gray-700 text-lg mb-4">
            Welcome to <strong>Classic Fade & Co</strong>! We are always here to assist you with your grooming needs. Whether you have a question, need directions, or want to book an appointment, feel free to get in touch with us.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            Visit us at our main location or contact us through the provided details below.
          </p>
          <p className="font-bold text-gray-900 mb-4">Location:</p>
          <p className="text-gray-700 mb-2">123 Main Street, Downtown City</p>
          <p className="text-gray-700 mb-4">Mon - Sun: 10:00 AM - 8:30 PM</p>
          <p className="font-bold text-gray-900 mb-4">Phone:</p>
          <p className="text-gray-700 mb-4">+961 03840728</p>
          <p className="font-bold text-gray-900 mb-4">Email:</p>
          <p className="text-gray-700 mb-4">info@classicfadeco.com</p>
          
          <button  className="mt-4 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition duration-300">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
