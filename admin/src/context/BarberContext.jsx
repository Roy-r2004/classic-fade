import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const BarberContext = createContext();

const BarberContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [bToken, setBToken] = useState(localStorage.getItem("bToken") || "");
  const [barberId, setBarberId] = useState(localStorage.getItem("barberId") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData,setDashData] =useState(false);
  const [profileData,setProfileData] = useState(false)
  const [loading, setLoading] = useState(true);

  // Fetch appointments
// Fetch appointments
const getAppointments = async () => {
  try {
    // Check if bToken or barberId is missing before making the request
    if (!bToken || !barberId) {
      toast.error("Missing authentication token or barber ID.");
      return;
    }

    const { data } = await axios.get(`${backendUrl}/api/barber/appointments`, {
      headers: { 
        bToken, 
        barberid: barberId 
      },
    });

    // Handle response success
    if (data.success) {
      setAppointments(data.appointments.reverse());
    } else {
      toast.error(data.message || "Failed to fetch appointments.");
    }
  } catch (error) {
    // Enhanced error handling
    if (error.response && error.response.status === 401) {
      toast.error("Unauthorized access. Please log in again.");
      // Handle token expiry or redirect to login page
    } else if (error.response) {
      toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
    } else {
      console.log("Error", error);
      toast.error("An error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};



  // Edit an appointment
  const editAppointment = async (appointmentId, updatedFields) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/barber/edit-appointment",
        { appointmentId, ...updatedFields },
        { headers: { bToken } }
      );

      if (data.success) {
        toast.success("Appointment updated successfully!");
        getAppointments(); // Refresh appointments after editing
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/barber/cancel-appointment",
        { appointmentId, cancelled: true },
        { headers: { bToken } }
      );

      if (data.success) {
        toast.success("Appointment canceled!");
        getAppointments(); // Refresh appointments after canceling
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (bToken) {
      getAppointments();
    }
  }, [bToken]);

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/barber/dashboard`, {
        headers: { bToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () =>{
    try {
      
      const {data} = await axios.get(backendUrl+'/api/barber/profile',{headers:{bToken}})
      if(data.success){
        setProfileData(data.profileData)
        console.log(data.profileData)
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

   // Function to update the profile data
   const updateProfileData = async () => {
    try {
      const { fees, address, available,name,experience,about } = profileData; // Grab required fields from the state

      const { data } = await axios.post(
        `${backendUrl}/api/barber/update-profile`,
        { barberId, fees, address, available,name,experience,about },
        {
          headers: { bToken },
        }   
      );

      if (data.success) {
        toast.success(data.message);
        getProfileData(); // Refresh the profile after updating
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  };
  

  const value = {
    bToken,
    backendUrl,
    setBToken,
    appointments,
    getAppointments,
    editAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
    setBarberId,
    getProfileData,
    profileData,
    setProfileData,
    updateProfileData,
    loading,
  };

  return (
    <BarberContext.Provider value={value}>
      {props.children}
    </BarberContext.Provider>
  );
};

export default BarberContextProvider;
