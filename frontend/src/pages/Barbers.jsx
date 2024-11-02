import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional: blur effect while loading

const Barbers = () => {
  const { speciality } = useParams();
  const { barbers } = useContext(AppContext);
  const [filterBarbers, setFilterBarbers] = useState([]);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterBarbers(barbers.filter((barber) => barber.speciality === speciality));
    } else {
      setFilterBarbers(barbers);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [barbers, speciality]);

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4 sm:px-8'>
      <p className='text-gray-800 text-lg font-semibold mb-6 text-center'>
        Browse through our expert barbers
      </p>

      {/* Specialities Sidebar */}
      <div className='flex flex-col sm:flex-row gap-6'>
        <div className='flex flex-col gap-4 text-base text-gray-700'>
          <p
            onClick={() =>
              speciality === 'Haircut'
                ? navigate('/barbers')
                : navigate('/barbers/Haircut')
            }
            className={`pl-4 pr-16 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition-all cursor-pointer ${speciality === 'Haircut' ? 'bg-indigo-100 text-black' : ''
              }`}
          >
            Haircut
          </p>
          <p
            onClick={() =>
              speciality === 'Beard Trim'
                ? navigate('/barbers')
                : navigate('/barbers/Beard Trim')
            }
            className={`pl-4 pr-16 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition-all cursor-pointer ${speciality === 'Beard Trim' ? 'bg-indigo-100 text-black' : ''
              }`}
          >
            Beard Trim
          </p>
          <p
            onClick={() =>
              speciality === 'Shave'
                ? navigate('/barbers')
                : navigate('/barbers/Shave')
            }
            className={`pl-4 pr-16 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition-all cursor-pointer ${speciality === 'Shave' ? 'bg-indigo-100 text-black' : ''
              }`}
          >
            Shave
          </p>
          <p
            onClick={() =>
              speciality === 'Hair Styling'
                ? navigate('/barbers')
                : navigate('/barbers/Hair Styling')
            }
            className={`pl-4 pr-16 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition-all cursor-pointer ${speciality === 'Hair Styling' ? 'bg-indigo-100 text-black' : ''
              }`}
          >
            Hair Styling
          </p>
          <p
            onClick={() =>
              speciality === 'Head Massage'
                ? navigate('/barbers')
                : navigate('/barbers/Head Massage')
            }
            className={`pl-4 pr-16 py-2 border border-gray-300 rounded-md hover:bg-gray-200 transition-all cursor-pointer ${speciality === 'Head Massage' ? 'bg-indigo-100 text-black' : ''
              }`}
          >
            Head Massage
          </p>
        </div>

        {/* Barber Cards */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filterBarbers.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
              key={index}
            >
              <LazyLoadImage
                className='w-full h-48 object-cover bg-blue-50'
                src={`http://localhost:4000${item.image}`}  // Prepend the backend URL to the image path
                alt={item.name}
                effect='blur'
              />

              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-green-600 mb-2'>
                  <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                  <span>Available</span>
                </div>
                <p className='text-gray-800 text-lg font-semibold mb-1'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Barbers;
