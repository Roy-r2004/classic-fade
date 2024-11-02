import validator from "validator";
import bcrypt from 'bcrypt';
import barberModel from "../models/barberModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// API for adding barber

const addBarber = async (req, res) => {
    try {
        const { name, email, password, speciality, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Check if all required fields are provided
        if (!name || !email || !password || !speciality || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Construct barber data object
        const barberData = {
            name,
            email,
            image: `/uploads/${imageFile.filename}`,
            password: hashedPassword,
            speciality,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        };

        // Save the barber to the database
        const newBarber = new barberModel(barberData);
        await newBarber.save();

        res.json({ success: true, message: "Barber added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};




// API For admin Login
const loginAdmin = async (req,res) =>{
   try {
     
     const {email,password} = req.body

     if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
       
        const token = jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})

     }else{
        res.json({success:false,message:"Invalid email or password"})
     }

   } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
   }
}

// API to get all barbers list for admin panel
const allBarbers = async (req, res) => {
    try {
        
       const barbers = await barberModel.find({}).select('-password')
       res.json({success:true, barbers})



    } catch (error) {
        console.log(error);
         res.json({ success: false, message: error.message });
    }

}

// API to get all appointments list
const appointmentsAdmin = async(req,res) =>{

    try {
        
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})

    } catch (error) {
        console.log(error);
         res.json({ success: false, message: error.message });
    }
}

// API to cancel an appointment
const appointmentCancel = async (req, res) => {
    try {
      const { appointmentId } = req.body; // appointmentId from the request body
  
      // Fetch the appointment by ID
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      // Ensure the appointment exists
      if (!appointmentData) {
        return res.status(404).json({ success: false, message: 'Appointment not found.' });
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

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const barbers = await barberModel.find({});
    const users = await userModel.find({});
    
    // Fetch only appointments that are not canceled
    const appointments = await appointmentModel.find({ cancelled: false });

    // Calculate the total profit from non-canceled appointments
    const totalProfit = appointments.reduce((sum, appointment) => sum + appointment.amount, 0);

    // Calculate profit for each barber
    const barberProfits = {};
    appointments.forEach(appointment => {
      if (!barberProfits[appointment.barberId]) {
        barberProfits[appointment.barberId] = {
          barber: appointment.barberData.name,
          profit: 0,
        };
      }
      barberProfits[appointment.barberId].profit += appointment.amount;
    });

    // Get the top 5 barbers based on profit
    const topBarbers = Object.values(barberProfits)
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 5);

    const dashData = {
      barbers: barbers.length,
      clients: users.length,
      appointments: appointments.length,
      totalProfit, // Total profit
      latestAppointments: appointments.reverse().slice(0, 5),
      topBarbers // Top 5 barbers by profit
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};


  






export { addBarber,loginAdmin,allBarbers,appointmentsAdmin,appointmentCancel,adminDashboard };
