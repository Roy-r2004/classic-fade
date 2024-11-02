import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Listening for the connection event
        mongoose.connection.on("connected", () => console.log("Database connected"));

        // Connect to the MongoDB database
        await mongoose.connect(`${process.env.MONGODB_URI}/classicFade`);

    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); // Exit process with failure in case of error
    }
};

export default connectDB;
