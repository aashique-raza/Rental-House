import React from 'react'
import '../styles/ListingDetails.scss'
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
// import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

import Loader from '../components/Loader';

import { useSelector } from "react-redux";

// import icons
import { PiBathtubFill, PiCoatHangerFill, PiTelevisionFill } from "react-icons/pi";
import { FaPumpSoap, FaShower, FaFireExtinguisher, FaKey } from "react-icons/fa";
import { BiSolidWasher, BiSolidDryer, BiWifi, BiSolidFridge ,BiSolidFirstAid } from "react-icons/bi";
import { TbIroning3 } from "react-icons/tb";
import { GiHeatHaze, GiCctvCamera, GiBarbecue, GiToaster, GiCampfire } from "react-icons/gi";
import { BsPersonWorkspace ,BsSnow} from "react-icons/bs";
import { AiFillCar } from "react-icons/ai";
import { MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import { FaUmbrellaBeach } from "react-icons/fa";



function ListingDetails() {

    const facilities = [
        {
          name: "Bath tub",
          icon: <PiBathtubFill />,
        },
        {
          name: "Personal care products",
          icon: <FaPumpSoap />,
        },
        {
          name: "Outdoor shower",
          icon: <FaShower />,
        },
        {
          name: "Washer",
          icon: <BiSolidWasher />,
        },
        {
          name: "Dryer",
          icon: <BiSolidDryer />,
        },
        {
          name: "Hangers",
          icon: <PiCoatHangerFill />,
        },
        {
          name: "Iron",
          icon: <TbIroning3 />,
        },
        {
          name: "TV",
          icon: <PiTelevisionFill />,
        },
        {
          name: "Dedicated workspace",
          icon: <BsPersonWorkspace />
        },
        {
          name: "Air Conditioning",
          icon: <BsSnow />,
        },
        {
          name: "Heating",
          icon: <GiHeatHaze />,
        },
        {
          name: "Security cameras",
          icon: <GiCctvCamera />,
        },
        {
          name: "Fire extinguisher",
          icon: <FaFireExtinguisher />,
        },
        {
          name: "First Aid",
          icon: <BiSolidFirstAid />,
        },
        {
          name: "Wifi",
          icon: <BiWifi />,
        },
        {
          name: "Cooking set",
          // icon: <FaKitchenSet />,
        },
        {
          name: "Refrigerator",
          icon: <BiSolidFridge />,
        },
        {
          name: "Microwave",
          icon: <MdMicrowave />,
        },
        {
          name: "Stove",
          icon: <GiToaster />,
        },
        {
          name: "Barbecue grill",
          icon: <GiBarbecue />,
        },
        {
          name: "Outdoor dining area",
          icon: <FaUmbrellaBeach />,
        },
        {
          name: "Private patio or Balcony",
          icon: <MdBalcony />,
        },
        {
          name: "Camp fire",
          icon: <GiCampfire />,
        },
        {
          name: "Garden",
          icon: <MdYard />,
        },
        {
          name: "Free parking",
          icon: <AiFillCar />,
        },
        {
          name: "Self check-in",
          icon: <FaKey />
        },
        {
          name: " Pet allowed",
          icon: <MdPets />
        }
      ];

      const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/listing/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  // console.log(listing)


  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

  /* SUBMIT BOOKING */
//   const customerId = useSelector((state) => state?.user?._id)

//   const navigate = useNavigate()

//   const handleSubmit = async () => {
//     try {
//       const bookingForm = {
//         customerId,
//         listingId,
//         hostId: listing.creator._id,
//         startDate: dateRange[0].startDate.toDateString(),
//         endDate: dateRange[0].endDate.toDateString(),
//         totalPrice: listing.price * dayCount,
//       }

//       const response = await fetch("http://localhost:3001/bookings/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingForm)
//       })

//       if (response.ok) {
//         navigate(`/${customerId}/trips`)
//       }
//     } catch (err) {
//       console.log("Submit Booking Failed.", err.message)
//     }
//   }





  return loading ? (
    <Loader />
  ) : (
    <>
     
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              src={`http://localhost:5000/${item.replace("public", "")}`}
              alt="listing photo"
            />
          ))}
        </div>

        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:5000/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ${listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ${listing.price} x {dayCount} night
                </h2>
              )}

              <h2>Total price: ${listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button className="button" type="submit" >
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>

     
    </>
  )
}

export default ListingDetails