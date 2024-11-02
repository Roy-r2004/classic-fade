import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; 
import { assets } from '../assets/assets'; 
import RelatedBarbers from '../components/RelatedBarbers'; 
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
    const { barberId } = useParams();  
    const { barbers, currencySymbol, backendUrl, token, userData, getBarbersData } = useContext(AppContext);  
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const navigate = useNavigate();

    const [barberInfo, setBarberInfo] = useState(null);  
    const [barberSlots, setBarberSlots] = useState([]);  
    const [slotIndex, setSlotIndex] = useState(0);  
    const [slotTime, setSlotTime] = useState('');  

    // Fetch barber information by ID
    const fetchBarberInfo = () => {
        if (barbers) {
            const barber = barbers.find(b => b._id === barberId);
            setBarberInfo(barber);
        }
    };

    // Generate available time slots for appointments
    const getAvailableSlots = async () => {
        setBarberSlots([]);

        let today = new Date();  

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth()+1
                let year = currentDate.getFullYear()

                const slotDate = `${day}_${month}_${year}`;
                const slotTime = `${formattedTime}`

                const isSlotAvailable = barberInfo.slots_booked[slotDate] && barberInfo.slots_booked[slotDate].includes(slotTime) ? false :true

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                    });
                }

               
                currentDate.setMinutes(currentDate.getMinutes() + 30);  
            }

            setBarberSlots(prev => [...prev, timeSlots]);  
        }
    };

    const bookAppointment = async () => {

        if (!token) {
            toast.warn('Login to book appointment');
            return navigate('/login');
        }

        try {
            const date = barberSlots[slotIndex][0].datetime;
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = `${day}_${month}_${year}`;

            const payload = {
                userId: userData._id,  // Pass the userId from userData
                barberId,
                slotDate,
                slotTime
            };

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', payload, {
                headers: { token }
            });

            if (data.success) {
                toast.success(data.message);
                getBarbersData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response ? error.response.data.message : error.message);
        }
    };

    useEffect(() => {
        fetchBarberInfo();  
    }, [barbers, barberId]);

    useEffect(() => {
        if (barberInfo) getAvailableSlots();  
    }, [barberInfo]);

    if (!barberInfo) return <p>Loading...</p>; 

    return (
        <div className="flex flex-col gap-6">
            {/* Barber Info Section */}
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Barber Image */}
                <div className="w-full sm:w-auto flex-shrink-0">
                    <img
                        src={`http://localhost:4000${barberInfo.image}`}  
                        alt={barberInfo.name}
                        className="bg-primary w-full sm:h-full sm:max-w-[250px] rounded-lg object-cover"
                        style={{ height: '100%' }}
                    />
                </div>

                {/* Barber Info */}
                <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-md flex flex-col justify-between">
                    <p className="text-2xl font-semibold flex items-center gap-2 text-gray-900">
                        {barberInfo.name}
                        <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
                    </p>
                    <div className="flex items-center gap-2 text-sm mt-2 text-gray-600">
                        <p>{barberInfo.degree} - {barberInfo.speciality}</p>
                        <button className="py-0.5 px-3 border text-xs rounded-full text-gray-600 border-gray-400">
                            {barberInfo.experience}  experience
                        </button>
                    </div>

                    {/* About Barber */}
                    <div className="mt-4">
                        <p className="flex items-center gap-2 font-semibold text-gray-800">
                            About
                            <img src={assets.info_icon} alt="Info" className="w-5 h-5" />
                        </p>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{barberInfo.about}</p>
                    </div>

                    {/* Appointment Fee */}
                    <p className="text-gray-600 font-medium mt-6">
                        Appointment fee: <span className="text-gray-800">{currencySymbol} {barberInfo.fees}</span>
                    </p>
                </div>
            </div>

            {/* Booking Slots Section */}
            <div className="font-medium text-gray-700 mt-6">
                <p>Booking Slots</p>

                {/* Date Scroll Container */}
                <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 whitespace-nowrap">
                    {barberSlots.length > 0 && barberSlots.map((item, index) => (
                        <div
                            onClick={() => setSlotIndex(index)}
                            className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
                            key={index}
                        >
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* Time Slots Scroll Container */}
                <div className="flex items-center gap-3 w-full max-h-48 overflow-y-auto mt-4">
                    {barberSlots.length > 0 && barberSlots[slotIndex].map((item, index) => (
                        <p
                            onClick={() => setSlotTime(item.time)}
                            className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
                            key={index}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>
                <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book Appointment</button>
            </div>

            {/* Related Barbers Section */}
            <RelatedBarbers barberId={barberId} speciality={barberInfo.speciality} />
        </div>
    );
};

export default Appointment;
