import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';

const BarbersList = () => {
  const { barbers, aToken, getAllBarbers, backendUrl, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllBarbers();
    } else {
      toast.error("Authorization token is missing");
    }
  }, [aToken]);

  return (
    <div className='m-2 sm:m-5 lg:m-10 max-h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-500'>
      <h1 className='text-md sm:text-lg font-medium'>All Barbers</h1>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6'>
        {
          barbers.map((barber, index) => (
            <div
              className='border border-indigo-200 rounded-xl max-w-[100%] sm:max-w-[56] overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:border-indigo-400'
              key={index}
            >
              {/* Image Section */}
              <img
                className='bg-indigo-50 group-hover:bg-indigo-100 transition-all duration-500 object-cover h-40 sm:h-36 w-full'
                src={`${backendUrl}${barber.image}`}
                alt={barber.name}
              />

              {/* Barber Details Section */}
              <div className='p-3 sm:p-4'>
                <p className='text-neutral-800 text-md sm:text-lg font-medium'>{barber.name}</p>
                <p className='text-zinc-600 text-xs sm:text-sm mt-1'>Speciality: {barber.speciality}</p>

                <div className='mt-2 flex items-center gap-2 text-xs sm:text-sm'>
                  <input
                    onChange={() => changeAvailability(barber._id)}
                    type="checkbox"
                    checked={barber.available}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <p className="text-neutral-700">Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default BarbersList;
