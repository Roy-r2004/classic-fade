import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';
import connectDB from './config/mongodb.js';
import adminRouter from './routes/adminRoutes.js';
import barberRouter from './routes/barberRoutes.js';
import userRouter from './routes/userRoutes.js';

// Get the __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Ensure the 'uploads' directory exists, or create it
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure Multer to store files in the 'uploads' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Create unique filenames
  }
});

const upload = multer({ storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(uploadsDir));

// middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/admin', adminRouter); // localhost:4000/api/admin/add-barber
app.use('/api/barber' ,barberRouter)
app.use('/api/user',userRouter)

// Example route to upload files
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.status(200).json({ success: true, message: 'File uploaded successfully', filePath: `/uploads/${file.filename}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Start the server
app.listen(port, () => console.log(`Server Started on port ${port}`));
