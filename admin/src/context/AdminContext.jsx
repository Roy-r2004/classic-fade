import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || "");

    const [barbers,setBarbers] = useState([])
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData]=useState(false)

    // Backend URL from environment variables
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllBarbers = async () => {
        if (!aToken) {
            toast.error("Authorization token is missing");
            return;
        }
    
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-barbers`, {}, {
                headers: { aToken }
            });
            if (data.success) {
                setBarbers(data.barbers);
                console.log(data.barbers);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    

    const changeAvailability = async (barberId) => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {barberId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message);
                getAllBarbers()
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }


    const getAllAppointments = async () =>{

        try {
            
            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})

            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)


            } else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();  // Refresh appointments after cancellation
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error cancelling appointment.');
        }
    };

    const getDashData = async () =>{

        try {
            
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})

            if (data.success) {
                setDashData(data.dashData);
                console.log(data.dashData);
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
        }
    }
    


    const value = {
        aToken,
        setAToken,
        backendUrl ,
        barbers,
        getAllBarbers,
        changeAvailability,
        appointments,
        getAllAppointments,
        setAppointments,
        cancelAppointment,
        getDashData,
        dashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
