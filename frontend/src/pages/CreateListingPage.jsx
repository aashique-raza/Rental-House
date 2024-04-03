import React,{useState} from 'react'
import { BiWorld } from "react-icons/bi";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiCaveEntrance, GiForestCamp, GiCactus, GiBarn } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing, FaHouseUser,  } from "react-icons/fa";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { PiBathtubFill, PiCoatHangerFill, PiTelevisionFill } from "react-icons/pi";
import { FaPumpSoap, FaShower, FaFireExtinguisher, FaKey, } from "react-icons/fa";
import { BiSolidWasher, BiSolidDryer, BiWifi, BiSolidFridge,BiTrash } from "react-icons/bi";
import { TbIroning3 } from "react-icons/tb";
import { GiHeatHaze, GiCctvCamera, GiBarbecue, GiToaster, GiCampfire } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import { MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import { FaUmbrellaBeach } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";

import {RemoveCircleOutline,AddCircleOutline} from '@mui/icons-material'
import {Droppable,DragDropContext,Draggable} from 'react-beautiful-dnd'
import {IoIosImages} from 'react-icons/io'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'





import '../styles/CreateListing.scss'

function CreateListingPage() {

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  // console.log(formLocation)

    /* BASIC COUNTS */
    const [guestCount, setGuestCount] = useState(1);
    const [bedroomCount, setBedroomCount] = useState(1);
    const [bedCount, setBedCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
  
    /* AMENITIES */
    const [amenities, setAmenities] = useState([]);
  
    const handleSelectAmenities = (facility) => {
      if (amenities.includes(facility)) {
        setAmenities((prevAmenities) =>
          prevAmenities.filter((option) => option !== facility)
        );
      } else {
        setAmenities((prev) => [...prev, facility]);
      }
    };

      /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };


  const creatorId = useSelector((state) => state.user._id);
  // console.log(creatorId)

  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      /* Send a POST request to server */
      const response = await fetch("http://localhost:5000/api/listing/createlisting", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };





    const cat = [
        {
          label: "All",
          icon: <BiWorld/>
        },
        {
          img: "assets/beach_cat.jpg",
          label: "Beachfront",
          icon: <TbBeach />,
          description: "This property is close to the beach!",
        },
        {
          img: "assets/windmill_cat.webp",
          label: "Windmills",
          icon: <GiWindmill />,
          description: "This property is has windmills!",
        },
        {
          img: "assets/modern_cat.webp",
          label: "Iconic cities",
          icon: <MdOutlineVilla />,
          description: "This property is modern!",
        },
        {
          img: "assets/countryside_cat.webp",
          label: "Countryside",
          icon: <TbMountain />,
          description: "This property is in the countryside!",
        },
        {
          img: "assets/pool_cat.jpg",
          label: "Amazing Pools",
          icon: <TbPool />,
          description: "This is property has a beautiful pool!",
        },
        {
          img: "assets/island_cat.webp",
          label: "Islands",
          icon: <GiIsland />,
          description: "This property is on an island!",
        },
        {
          img: "assets/lake_cat.webp",
          label: "Lakefront",
          icon: <GiBoatFishing />,
          description: "This property is near a lake!",
        },
        {
          img: "assets/skiing_cat.jpg",
          label: "Ski-in/out",
          icon: <FaSkiing />,
          description: "This property has skiing activies!",
        },
        {
          img: "assets/castle_cat.webp",
          label: "Castles",
          icon: <GiCastle />,
          description: "This property is an ancient castle!",
        },
        {
          img: "assets/cave_cat.jpg",
          label: "Caves",
          icon: <GiCaveEntrance />,
          description: "This property is in a spooky cave!",
        },
        {
          img: "assets/camping_cat.jpg",
          label: "Camping",
          icon: <GiForestCamp />,
          description: "This property offers camping activities!",
        },
        {
          img: "assets/arctic_cat.webp",
          label: "Arctic",
          icon: <BsSnow />,
          description: "This property is in arctic environment!",
        },
        {
          img: "assets/desert_cat.webp",
          label: "Desert",
          icon: <GiCactus />,
          description: "This property is in the desert!",
        },
        {
          img: "assets/barn_cat.jpg",
          label: "Barns",
          icon: <GiBarn />,
          description: "This property is in a barn!",
        },
        {
          img: "assets/lux_cat.jpg",
          label: "Luxury",
          icon: <IoDiamond  />, 
          description: "This property is brand new and luxurious!",
        },
      ];

       const types = [
        {
          name: "An entire place",
          description: "Guests have the whole place to themselves",
          icon: <FaHouseUser />,
        },
        {
          name: "Room(s)",
          description:
            "Guests have their own room in a house, plus access to shared places",
          icon: <BsFillDoorOpenFill />,
        },
        {
          name: "A Shared Room",
          description:
            "Guests sleep in a room or common area that maybe shared with you or others",
        //   icon: <FaPeopleRoof />,
        },
      ];
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
        //   icon: <BiSolidFirstAid />,
        },
        {
          name: "Wifi",
          icon: <BiWifi />,
        },
        {
          name: "Cooking set",
        //   icon: <FaKitchenSet />,
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


  return (
    <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form onSubmit={handlePost} >
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {cat?.map((item, index) => (
                <div
                  className={`category ${
                    cat === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: '#F8395A' },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: '#F8395A' },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: '#F8395A' },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: '#F8395A' },
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: '#F8395A' },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: "#F8395A" },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />

            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>What make your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight details</p>
              <textarea
                type="text"
                placeholder="Highlight details"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
              />
              <p>Now, set your PRICE</p>
              <span>$</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="price"
                required
              />
            </div>
          </div>

          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>
        </form>
      </div>
  )
}

export default CreateListingPage