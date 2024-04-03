
import User from "../models/user.model.js"
import Listing from "../models/listing.model.js"

const createListing=async(req,res)=>{
    try {
        /* Take the information from the form */
        const {
          creator,
          category,
          type,
          streetAddress,
          aptSuite,
          city,
          province,
          country,
          guestCount,
          bedroomCount,
          bedCount,
          bathroomCount,
          amenities,
          title,
          description,
          highlight,
          highlightDesc,
          price,
        } = req.body;
    
        const listingPhotos = req.files
    
        if (!listingPhotos) {
          return res.status(400).send("No file uploaded.")
        }
    
        const listingPhotoPaths = listingPhotos.map((file) => file.path)
    
        const newListing = new Listing({
          creator,
          category,
          type,
          streetAddress,
          aptSuite,
          city,
          province,
          country,
          guestCount,
          bedroomCount,
          bedCount,
          bathroomCount,
          amenities,
          listingPhotoPaths,
          title,
          description,
          highlight,
          highlightDesc,
          price,
        })
    
        await newListing.save()
    
        res.status(200).json(newListing)
      } catch (err) {
        res.status(409).json({ message: "Fail to create Listing", error: err.message })
        console.log(err)
      }

}

export {createListing}