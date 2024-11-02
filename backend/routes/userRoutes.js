import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile,bookAppointment,listAppointments,cancelAppointment } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';  // JWT authentication middleware
import upload from '../middlewares/multer.js';  // Multer middleware for file uploads

const userRouter = express.Router();

// Route to register a new user
userRouter.post('/register', registerUser);

// Route to login an existing user
userRouter.post('/login', loginUser);

// Protected route to get the user profile (JWT required in 'token' header)
userRouter.get('/get-profile', authUser, getProfile);

// Protected route to update user profile (JWT required in 'token' header, image upload allowed)
userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile);

userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointments)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)

export default userRouter;
