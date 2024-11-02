import barberModel from "../models/barberModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { barberId } = req.body;
    const barberData = await barberModel.findById(barberId);
    await barberModel.findByIdAndUpdate(barberId, { available: !barberData.available });
    res.json({ success: true, message: 'Availability Changed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const barberList = async (req, res) => {
  try {
    console.log("Received request for barber list");
    const barbers = await barberModel.find({}).select(['-password', '-email']);
    res.json({ success: true, barbers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for barber Login
const loginBarber = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the barber by email
    const barber = await barberModel.findOne({ email });

    // If no barber is found, return invalid credentials
    if (!barber) {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }

    // Check if the password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, barber.password);

    // If password matches, sign the token with the barber's id
    if (isMatch) {
      const token = jwt.sign(
        { barberId: barber._id }, // Include the barber's ID in the payload
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expiration time
      );

      res.json({
        success: true,
        message: 'Logged In',
        token, // Send the token
        barberId: barber._id // Send the barberId separately
      });
    } else {
      // If password is incorrect, return invalid credentials
      return res.json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api to get barber appointments to barber panel
const appointmentsBarber = async (req, res) => {
  try {
    const barberId = req.headers.barberid;  // Extract the barberId from headers

    if (!barberId) {
      return res.status(400).json({ success: false, message: "Barber ID is required." });
    }

    const appointments = await appointmentModel.find({ barberId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel appointment function
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { cancelled: true, isCompleted: false }, // Set cancelled to true and isCompleted to false
      { new: true }
    );

    if (appointment) {
      return res.json({ success: true, message: "Appointment canceled successfully", appointment });
    } else {
      return res.json({ success: false, message: "Appointment not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error canceling appointment" });
  }
};

// Edit appointment function
const editAppointment = async (req, res) => {
  try {
    const { appointmentId, slotDate, slotTime, barberId, userId, amount, isCompleted, cancelled } = req.body;

    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { slotDate, slotTime, userId, amount, isCompleted, cancelled }, // Update fields
      { new: true }
    );

    if (appointment) {
      return res.json({ success: true, message: "Appointment updated successfully", appointment });
    } else {
      return res.json({ success: false, message: "Appointment not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error updating appointment" });
  }
};


// API to get dashboard data for barber panel
const barberDashboard = async (req, res) => {
  try {
    const { barberId } = req.body;
    const appointments = await appointmentModel.find({ barberId });

    let earnings = 0;
    let clients = [];

    appointments.forEach((item) => {
      // Only add to earnings if the appointment is completed and not canceled
      if (item.isCompleted && !item.cancelled) {
        earnings += item.amount;
      }

      // Add to the client list if they haven't been counted yet
      if (!clients.includes(item.userId)) {
        clients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      clients: clients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// API to get barber Profile for barber panel
const barberProfile = async (req, res) => {
  try {

    const { barberId } = req.body
    const profileData = await barberModel.findById(barberId).select('-password')
    res.json({ success: true, profileData })

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// API to update barber profile
const updateBarberProfile = async (req, res) => {
  try {
    const { barberId, name, speciality, experience, about, fees, address, available } = req.body;

    // Ensure all fields are available for update
    const updateFields = {
      name,
      speciality,
      experience,
      about,
      fees,
      address,
      available,
    };

    await barberModel.findByIdAndUpdate(barberId, updateFields);

    res.json({ success: true, message: "Profile Updated" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};





export {
  barberProfile,
  updateBarberProfile,
  changeAvailability,
  barberList,
  loginBarber,
  appointmentsBarber,
  cancelAppointment,
  editAppointment,
  barberDashboard
};
