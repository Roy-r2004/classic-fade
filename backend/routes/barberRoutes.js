import express from "express";
import { barberList, changeAvailability, loginBarber, appointmentsBarber, editAppointment, cancelAppointment,barberDashboard,barberProfile,updateBarberProfile} from '../controllers/barberController.js'; 
import authBarber from "../middlewares/authBarber.js";


const barberRouter = express.Router();

// Define routes
barberRouter.get('/list', barberList);  
barberRouter.post('/availability', changeAvailability); 
barberRouter.post('/login', loginBarber);  
barberRouter.get('/appointments', authBarber, appointmentsBarber);  
barberRouter.post('/cancel-appointment', authBarber, cancelAppointment);  
barberRouter.post('/edit-appointment', authBarber, editAppointment);  
barberRouter.get('/dashboard', authBarber, barberDashboard);  
barberRouter.get('/profile', authBarber, barberProfile); 
barberRouter.post('/update-profile', authBarber, updateBarberProfile);  


export default barberRouter;
