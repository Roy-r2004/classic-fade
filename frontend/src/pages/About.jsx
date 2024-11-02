import React from 'react';
import { assets } from '../assets/assets'; // Ensure you have the proper assets file path

const About = () => {
  return (
    <div className="bg-gray-100 py-12">
      {/* About Us Header */}
      <div className="text-center mb-10">
        <p className="text-4xl font-bold text-gray-800">
          ABOUT <span className="text-primary">US</span>
        </p>
      </div>

      {/* About Us Content */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 px-4 sm:px-0">
        {/* Image Section */}
        <div className="w-full sm:w-1/2 flex-shrink-0">
          <img 
            src={assets.about_image} 
            alt="Classic Fade & Co" 
            className="rounded-lg shadow-lg w-full h-auto" 
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col items-start bg-white p-8 rounded-lg shadow-lg">
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            Welcome to Classic Fade & Co
          </p>
          <p className="text-gray-700 text-lg mb-4">
            At <strong>Classic Fade & Co</strong>, we believe that a great haircut is not just about looking good—it's about feeling confident, refreshed, and ready to take on the world. Established in the heart of the community, we have been providing top-notch grooming services for men for over a decade.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            Whether you're looking for a classic fade, modern cut, or just a clean-up, our skilled barbers are here to make sure you leave the shop looking sharp and feeling great.
          </p>
          <b className="text-lg text-primary mt-4">Our Mission:</b>
          <p className="text-gray-700 mt-2">
            To provide impeccable grooming services in a friendly and comfortable environment. We focus on quality, precision, and customer satisfaction, ensuring that every client leaves with a smile.
          </p>
          <b className="text-lg text-primary mt-4">Why Choose Us:</b>
          <ul className="list-disc pl-5 mt-2 text-gray-700">
            <li>Experienced and friendly barbers</li>
            <li>Premium grooming products</li>
            <li>Attention to detail and customer satisfaction</li>
            <li>Modern and relaxing atmosphere</li>
          </ul>
          <p className="text-gray-700 mt-4">
            We look forward to welcoming you at <strong>Classic Fade & Co</strong> for your next haircut or grooming experience. Book an appointment today and experience the difference!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
