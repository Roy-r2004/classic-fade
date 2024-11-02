import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional: blur effect while loading

const RelatedBarbers = ({ speciality, barberId }) => {
  const { barbers } = useContext(AppContext);
  const [relBarbers, setRelBarbers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (barbers.length > 0 && speciality) {
      const barbersData = barbers.filter(
        (barber) => barber.speciality === speciality && barber._id !== barberId
      );
      setRelBarbers(barbersData);
    }
  }, [barbers, speciality, barberId]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Barbers to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of top barbers
      </p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relBarbers.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
          >
             <LazyLoadImage
              className='bg-blue-50'
              src={`http://localhost:4000${item.image}`}  // Prepend backend URL to image path
              alt={item.name}
              effect='blur'
            />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p> <p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate('/barbers');
          window.scrollTo(0, 0);
        }}
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
      >
        More
      </button>
    </div>
  );
};

export default RelatedBarbers;
