
import {Router} from 'express'
import { createListing } from '../controller/listing.controller.js'
import multer from 'multer';


const router=Router()

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name
    },
  });
  
  const upload = multer({ storage });

router.post('/createlisting', upload.array("listingPhotos"),createListing)


export default router