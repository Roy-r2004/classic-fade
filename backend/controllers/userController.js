import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import barberModel from '../models/barberModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'


// API to register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !password || !email) {
            // Return error response if any field is missing
            return res.json({ success: false, message: "Missing details" });
        }

        if (!validator.isEmail(email)) {
            // Return error response if email is invalid and stop further execution
            return res.json({ success: false, message: "Enter a valid email" });
        }

        if (password.length < 8) {
            // Return error response if password is weak
            return res.json({ success: false, message: "Enter a strong password" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // Return success response and stop further execution
        return res.json({ success: true, message: "User registered successfully", token });

    } catch (error) {
        console.log(error);
        // Return error response and stop further execution
        return res.json({ success: false, message: error.message });
    }
};


// API for User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            // Return error response if user not found and stop further execution
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            // Return success response if password matches
            return res.json({ success: true, message: "User logged in successfully", token });
        } else {
            // Return error response if password is incorrect and stop further execution
            return res.json({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.log(error);
        // Return error response and stop further execution
        return res.json({ success: false, message: error.message });
    }
};


// API to get user profile data
const getProfile = async (req, res) => {
    try {
        // Extract userId from the decoded JWT in req.user
        const userId = req.user.id;
        console.log("Requested user ID:", userId); // Log the userId for debugging

        const userData = await userModel.findById(userId).select('-password'); // Fetch user data

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, userData });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// API to update user profile
const updateProfile = async (req, res) => {
    try {
        // Extract necessary fields from the request body
        const { name, phone, address, dob, gender } = req.body;

        // Extract userId from the auth middleware (you can extract it from JWT in authUser)
        const userId = req.user.id;  // Assuming authUser middleware adds user info from JWT
        const imageFile = req.file;  // Multer attaches the file to req.file

        // Validate if required fields are provided
        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        // Check if user exists in the database
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Safely parse address if it's provided as a string
        let parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;

        // Update the user profile fields
        user.name = name;
        user.phone = phone;
        user.address = parsedAddress;
        user.dob = dob;
        user.gender = gender;

        // If a new image is uploaded, update the image path
        if (imageFile) {
            const imagePath = `/uploads/${imageFile.filename}`;
            user.image = imagePath;  // Assuming the user schema has an 'image' field
        }

        // Save the updated user profile in the database
        const updatedUser = await user.save();

        // Return success response
        return res.json({ success: true, message: "Profile updated successfully", updatedUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, barberId, slotDate, slotTime } = req.body;

        // Fetch the barber by ID and select the required fields
        const barberData = await barberModel.findById(barberId).select('-password');

        if (!barberData) {
            return res.status(404).json({ success: false, message: 'Barber not found' });
        }

        if (!barberData.available) {
            return res.status(400).json({ success: false, message: 'Barber not available' });
        }

        // Initialize slots_booked if not already present
        if (!barberData.slots_booked) {
            barberData.slots_booked = new Map();
        }

        // Check if slot already exists in the barber's booked slots
        let slots_booked = barberData.slots_booked;

        // If this date isn't already in slots_booked, initialize an array for that date
        if (!slots_booked.has(slotDate)) {
            slots_booked.set(slotDate, []); // Initialize a new array for the date
        }

        // Check if the slot for this time is already booked on the given date
        if (slots_booked.get(slotDate).includes(slotTime)) {
            return res.status(400).json({ success: false, message: 'Slot not available' });
        }

        // If slot is available, add the time slot to the booked slots
        slots_booked.get(slotDate).push(slotTime);

        // Fetch the user data
        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Prepare appointment data
        const appointmentData = {
            userId,
            barberId,
            userData,
            barberData,
            amount: barberData.fees,
            slotDate,
            slotTime,
            date: Date.now(),
        };

        // Save the new appointment
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Mark slots_booked as modified so Mongoose knows it has changed
        barberData.markModified('slots_booked');
        await barberData.save(); // Save the updated barber data with the new booked slot

        // Return success response
        return res.status(201).json({ success: true, message: 'Appointment booked successfully', appointment: newAppointment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};


// API to get user appointments for frontend my-appointments page
const listAppointments = async (req, res) => {
    try {
      const userId = req.user.id;  // Extract userId from token
      console.log("Fetching appointments for user:", userId);
  
      const appointments = await appointmentModel.find({ userId }).populate('barberId');  // Ensure you populate barber details
      console.log("Appointments found:", appointments);
  
      if (appointments.length === 0) {
        return res.status(404).json({ success: false, message: "No appointments found." });
      }
  
      res.json({ success: true, appointments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
  };


  const cancelAppointment = async (req, res) => {
    try {
      const { appointmentId } = req.body; // appointmentId from the request body
      const userId = req.user.id; // get userId from authenticated user (from authUser middleware)
  
      // Fetch the appointment by ID
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      // Ensure the appointment exists
      if (!appointmentData) {
        return res.status(404).json({ success: false, message: 'Appointment not found.' });
      }
  
      // Verify the appointment belongs to the authenticated user
      if (appointmentData.userId.toString() !== userId) {
        return res.status(403).json({ success: false, message: 'Unauthorized action.' });
      }
  
      // Mark the appointment as canceled
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
  
      // Releasing the barber slot
      const { barberId, slotDate, slotTime } = appointmentData;
      const barberData = await barberModel.findById(barberId);
  
      let slots_booked = barberData.slots_booked;
  
      if (slots_booked.get(slotDate)) {
        // Filter out the canceled time slot
        slots_booked.set(slotDate, slots_booked.get(slotDate).filter(time => time !== slotTime));
  
        // If no slots remain for that date, delete the date key from the map
        if (slots_booked.get(slotDate).length === 0) {
          slots_booked.delete(slotDate);
        }
  
        // Update the barber's booked slots in the database
        await barberModel.findByIdAndUpdate(barberId, { slots_booked });
      }
  
      // Respond with success message
      res.status(200).json({ success: true, message: 'Appointment canceled successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
  };

  
  
  
  

export { registerUser, loginUser, getProfile,updateProfile,bookAppointment,listAppointments,cancelAppointment }