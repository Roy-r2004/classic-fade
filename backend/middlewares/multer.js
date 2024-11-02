import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer storage to save files in the 'uploads' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));  // Save the file in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // Generate unique filenames
  }
});

// Multer middleware for file uploads
const upload = multer({ storage });

export default upload;
