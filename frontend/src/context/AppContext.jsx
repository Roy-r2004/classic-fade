import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

// Create the context
export const AppContext = createContext();

const currencySymbol = '$';
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";  // Ensure there is a fallback

console.log("Backend URL in AppContext:", backendUrl);  // This should print the backend URL

// Create the provider component
const AppContextProvider = (props) => {
    const [barbers, setBarbers] = useState([]);
    const [token, setToken] = useState('');

    const [userData, setUserData] = useState(false)

    const getBarbersData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/barber/list`);
            if (data.success) {
                setBarbers(data.barbers);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
  
    const loadUserProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // Pass the backendUrl and other values through context
    const value = {
        barbers,
        getBarbersData,
        currencySymbol,
        backendUrl, 
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData
    };

    useEffect(() => {
        getBarbersData();
    }, []);

    useEffect(()=>{
        if(token){
            loadUserProfileData();
        } else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
