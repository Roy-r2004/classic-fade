import mongoose from "mongoose";

const barberSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    
    // Using a Map for dynamically managing booked slots (dates as keys and time slots as arrays)
    slots_booked: {
        type: Map,
        of: [String],  // Array of time slots as values
        default: {}    // Initialize with an empty object
    }

}, { minimize: false });  // Prevent mongoose from removing empty objects (like slots_booked)

const barberModel = mongoose.models.barber || mongoose.model('barber', barberSchema);

export default barberModel;
