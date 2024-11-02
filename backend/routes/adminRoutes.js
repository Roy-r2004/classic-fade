import express from 'express'
import { addBarber,allBarbers,loginAdmin,appointmentsAdmin, appointmentCancel,adminDashboard } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/barberController.js'

const adminRouter = express.Router()

adminRouter.post('/add-barber',authAdmin,upload.single('image'),addBarber)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-barbers',authAdmin,allBarbers)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)



export default adminRouter